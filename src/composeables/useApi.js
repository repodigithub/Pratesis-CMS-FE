import {toRefs, ref, reactive} from 'vue'
import { api,header } from 'boot/axios'
export const useApi = () => {
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
        const { token,status } = option
        if(status){
            state.url = `${url}?status=${status}`
        }else{
            state.url = url
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
        const { token,status } = state.option
        let paginate = ''
        if(status){
            paginate = `&limit=${rowsPerPage}&page=${page}`
        }else{
            paginate = `?limit=${rowsPerPage}&page=${page}`
        }
        api.get(state.url + paginate,header(token))
        .then(res=>{
            Response.success(res)
        })
        .catch(err=>{
            Response.error(err)
        })
    }
    
    return {rows,...toRefs(state),pagination,Response,init,onRequest}
}