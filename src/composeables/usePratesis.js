import {toRefs, ref, reactive,computed} from 'vue'
import { api,header } from 'boot/axios'
import { useQuasar,date } from 'quasar'
import { useStore } from 'vuex'
export const usePratesis = () => {
    const store = useStore()
    let token = store.state.auth.token
    const modalUpload = ref(false)
    const rows = ref([])
    const state =   reactive({
        error:null,
        loading:false,
        url:null,
        option:null
    })
    const pagination = ref({})
    const pagesNumber = computed(()=>{
        return Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
    })

    const success = res => {
        pagination.value.page = res.data.data.current_page
        pagination.value.rowsPerPage = res.data.data.per_page
        pagination.value.rowsNumber = res.data.data.total
        rows.value = res.data.data.data
        state.loading = false
    }
    const error = err => {
        state.error = err
        state.loading = false
    }

    const init = async (url,option) => {
        state.loading = true
        state.url = url
        if(option){
            state.option = option
            const { status,include } = option
            if(status){
                state.url += `?status=${status}`
            }
            if(include){
                state.url += `?include=${include}`
            }
        }

        await api.get(`${state.url}`,header(token))
        .then(res=>{
            success(res)
        })
        .catch(err=>{
            error(err)
        })
    }

    const onRequest = request => {
        state.loading = true
        const {page, rowsPerPage}  = request.pagination
        let filter  = ''
        let filterKey = ''
        if(request.filter){
            filter = request.filter
            if(filter.value){
                if(filter.value.kode_group){
                    filterKey += `&kode_group=${filter.value.kode_group}`
                }
                if(filter.value.kode_pengguna){
                    filterKey += `&kode_pengguna=${filter.value.kode_pengguna}`
                }
            }

            if(filter.searchKey){
                filterKey += `&search=${filter.searchKey}`
            }
        }
        const { status,include } = state.option
        let paginate = ''
        
        if(status || include ){
            paginate += `&`
        }else{
            paginate += `?`
        }
        if(page){
            paginate +=`page=${page}`
        }
        if(rowsPerPage){
            paginate += `&limit=${rowsPerPage}`
        }
        api.get(state.url + paginate + filterKey,header(token))
        .then(res=>{
            success(res)
        })
        .catch(err=>{
            error(err)
        })
    }

    const gotoPage = page =>{
        onRequest({
            pagination : {
                page : page
            }
        })
    }

    const notif = useQuasar()
    const successNotif = msg => {
        notif.notify({
            message: msg,
            icon:'check',
            type: 'positive',
            position: 'top-right',
            progress: true
        })
    }
    const errorNotif = msg => {
        notif.notify({
            message: msg,
            icon:'close',
            type: 'negative',
            position: 'top-right',
            progress: true
        })
    }
    const formatTgl = tgl => {
        return date.formatDate(tgl,'DD/MM/YY')
    }

    const getData = async (url) => {
        return await new Promise((resolve,reject)=>{
            api.get(`${url}`,header(token))
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    const postData = async (url,data) =>{
        return await new Promise((resolve,reject)=>{
            console.log("data",data)
            let kirim = new FormData()
            kirim.append('file',data)
            console.log("kirim",kirim)
            api.post(`${url}`,kirim,header(token))
            .then(res=>{
                resolve(res.data.data)
            })
            .catch(err=>{
                reject(err)
                console.log('error',err)
            })
        })
    }


    const filter = ref({})
    const resetFilter = ref(false)
    const onFilter = dataFilter => {
        filter.value = dataFilter
        resetFilter.value = true
    }
    const onResetFilter = () => {
        filter.value = null
        resetFilter.value = false
    }
    return {
        rows,
        ...toRefs(state),
        pagination, //table
        init,
        onRequest,

        successNotif,
        errorNotif,

        formatTgl, //general function
        getData,
        postData,

        filter, //filtering
        resetFilter,
        onFilter,
        onResetFilter,

        gotoPage, //pagination
        pagesNumber,

        modalUpload
    }
}