import {toRefs, ref, reactive,computed} from 'vue'
import { useRouter,useRoute } from 'vue-router'
// import { api,header } from 'boot/axios'
// import { useQuasar,date } from 'quasar'
import { useStore } from 'vuex'
import { useService } from './useService'
export const usePratesis = () => {
    const router  = useRouter()
    const store = useStore()
    const route = useRoute()
    const rows = ref([])
    const state =   reactive({
        error:null,
        loading:false,
        url:null,
        option:null,
    })

    const pagination = ref({})
    const pagesNumber = computed(()=>{
        return Math.ceil(pagination.value.rowsNumber / pagination.value.rowsPerPage)
    })

    const userLogin = ref(true)

    const role = computed(()=>{
        return store.state.auth.user?.kode_group?.substr(0,2)
    })

    const success = res => {
        pagination.value.page = res.data.data.data ? res.data.data.current_page : 1
        pagination.value.rowsPerPage = res.data.data.data ? res.data.data.per_page : 5
        pagination.value.rowsNumber =  res.data.data.data ? res.data.data.total : 0
        rows.value = res.data.data.data || res.data.data
        state.loading = false
    }
    const error = err => {
        state.error = err
        state.loading = false
    }

    const { getData } = useService()

    const init =  (url,option,islogin = true) => {
        state.loading = true
        state.url = url
        userLogin.value = islogin
        if(option){
            state.option = option
            const { status,include,level } = option
            if(status){
                state.url += `?status=${status}`
            }
            if(include){
                state.url += `?include=${include}`
            }
            if(level){
                state.url += level
            }
        }

        getData(state.url,islogin)
        .then(res=>{
            success(res)
            // console.table(res.data.data.data)
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
            if(filter.kode_group){
                filterKey += `&kode_group=${filter.kode_group}`
            }
            if(filter.kode_pengguna){
                filterKey += `&kode_pengguna=${filter.kode_pengguna}`
            }
            if(filter.nama){
                filterKey += `&nama=${filter.nama}`
            }
            if(filter.email){
                filterKey += `&email=${filter.email}`
            }
            if(filter.searchKey){
                filterKey += `&search=${filter.searchKey}`
            }
            if(filter.status){
                filterKey += `&status=${filter.status}`
            }
            if(filter.status_distributor){
                filterKey += `&status_distributor=${filter.status_distributor}`
            }
            if(filter.kode_distributor_group){
                filterKey += `&kode_distributor_group=${filter.kode_distributor_group}`
            }
            if(filter.kode_area){
                filterKey += `&kode_area=${filter.kode_area}`
            }
            if(filter.kode_divisi){
                filterKey += `&kode_divisi=${filter.kode_divisi}`
            }
            if(filter.kode_kategori){
                filterKey += `&kode_kategori=${filter.kode_kategori}`
            }
            if(filter.kode_sub_brand){
                filterKey += `&kode_sub_brand=${filter.kode_sub_brand}`
            }
            if(filter.kode_spend_type){
                filterKey += `&kode_spend_type=${filter.kode_spend_type}`
            }
            if(filter.kode_distributor){
                filterKey += `&kode_distributor=${filter.kode_distributor}`
            }
            if(filter.status_claim){
                filterKey += `&status=${filter.status_claim}`
            }
        }
 
        let paginate = ''
        if(state.option){
            const { status,include,level } = state.option
            if(status || include || level){
                paginate += `&`
            }
        }else{
            paginate += `?`
        }
        
        if(page){
            paginate +=`page=${page}`
        }
        if(rowsPerPage){
            paginate += `&limit=${rowsPerPage}`
        }
        getData(state.url+paginate+filterKey,userLogin.value)
        .then(res=>{
            success(res)
        })
        .catch(err=>{
            error(err)
        })
    }

    const filter = ref({})
    const onFilter = dataFilter => {
        filter.value = dataFilter
    }

    const gotoPage = page => {
        if(!state.loading){
            onRequest({
                pagination : {
                    page : page
                }
            })
        } 
    }

    const onResetFilter = () => {
        filter.value = null
    }

    const modalUpload = ref(false)
    const openUpload = () =>{
        modalUpload.value = true
    }
    const reload = ref(null)
    const reloadTable = (data) =>{
        reload.value = data
    }

    const modalDetail = ref(false)
    const dataDetail = ref({})
    
    const openDetail = (evt,row) => {
        modalDetail.value = true
        dataDetail.value = row
    }

    const modalAdd = ref(false)
    const openAdd = () => {
        modalAdd.value = true
    }

    const name = computed(()=>{
        let fullname = store.state.auth.user.full_name 
        return fullname ? fullname : ''
    })

    const randomColor = () =>{
        const arrayColor = ['text-red-7','text-pink-7','text-purple-7','text-deep-purple-7','text-indigo-7','text-blue-7','text-light-blue-7','text-cyan-7','text-teal-7','text-green-7','text-light-green-7','text-lime-7','text-yellow-7','text-amber-7','text-orange-7','text-deep-orange-7','text-brown-7']
        let random = Math.floor(Math.random() * 16)
        return arrayColor[random]
    }

    const changeData = (val,isCapital = true) => {
        if(isCapital){
            return val.replace(/-/g," ").replace(/(?:^|\s)\S/g,function(a){ return a.toUpperCase()})
        }else{
            return val.replace(/ /g,"-").toLowerCase()
        }
    }

    const formatRibuan = (val) =>{
        let string = String(val)
        return string.replace(/(\d)(?=(\d{3})+(?!\d))/g,"\$1.")
    }

    return {
        rows,
        ...toRefs(state),
        pagination, //table
        init,
        onRequest,


        filter, //filtering table
        onFilter,
        onResetFilter,

        gotoPage, //pagination
        pagesNumber,

        modalUpload,//for upload and reload table
        openUpload,
        reload,
        reloadTable,

        modalDetail,//for detail data
        openDetail,
        dataDetail,

        modalAdd, //for add data
        openAdd,

        name,
        randomColor,
        changeData,
        formatRibuan, //change ribuan
        role,
        
    }
}