import {toRefs, ref, reactive} from 'vue'
import { api,header } from 'boot/axios'
import { useQuasar,date } from 'quasar'
import { useStore } from 'vuex'
export const usePratesis = () => {
    const rows = ref([])
    const state =   reactive({
        error:null,
        loading:false,
        url:null,
        option:null
    })
    const pagination = ref({
        page:1,
        rowsPerPage:2,
        rowsNumber:1
    })
    const filter = ref({})
    const resetFilter = ref(false)
    const Response = {
        success : res => {
            pagination.value.page = res.data.data.current_page
            pagination.value.rowsPerPage = res.data.data.per_page
            pagination.value.rowsNumber = res.data.data.total
            rows.value = res.data.data.data
            state.loading = false
        },
        error : err => {
            state.error = err
            state.loading = false
        }
    }

    const init = async (url,option) => {
        state.loading = true
        state.option = option
        state.url = url
        const { token,status } = option
        if(status){
            state.url += `?status=${status}`
        }

        await api.get(`${state.url}`,header(token))
        .then(res=>{
            Response.success(res)
        })
        .catch(err=>{
            Response.error(err)
        })
    }

    const onRequest = request => {
        state.loading = true
        const {page, rowsPerPage}  = request.pagination
        let filter  = ''
        if(request.filter){
            filter = request.filter.value
        }
       
        const { token,status } = state.option
        let paginate = ''
        let filterKey = ''
        if(filter.kode_group){
            filterKey += `&kode_group=${filter.kode_group}`
        }
        if(filter.kode_pengguna){
            filterKey += `&kode_pengguna=${filter.kode_pengguna}`
        }
        if(status){
            paginate += `&`
        }else{
            paginate += `?`
        }
            paginate += `limit=${rowsPerPage}&page=${page}`
        api.get(state.url + paginate + filterKey,header(token))
        .then(res=>{
            Response.success(res)
        })
        .catch(err=>{
            Response.error(err)
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
    const formatTgl = tgl => {
        return date.formatDate(tgl,'DD/MM/YY')
    }

    const getData = async (url,option) => {
        return await new Promise((resolve,reject)=>{
            api.get(`${url}`,header(option))
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
    
    const onFilter = dataFilter => {
        filter.value = dataFilter
        resetFilter.value = true
    }

    const onResetFilter = () => {
        filter.value = {}
        resetFilter.value = false
    }

    return {
        rows,
        ...toRefs(state),
        pagination,
        filter,
        Response,
        init,
        onRequest,
        successNotif,
        formatTgl,
        getData,
        resetFilter,
        onFilter,
        onResetFilter
    }
}