import { useStore } from 'vuex'
import { ref } from 'vue'
import { api,header } from 'boot/axios'
export const useService = () => {
    const store = useStore()
    let token = store.state.auth.token
    const form = ref(null)
    const dataSend = ref({})

    const localheader = (url,islogin = true) => {
        return islogin ? header(token,islogin) : header(url,islogin)
    }

    const getData = (url,islogin = true) => {
        return api.get(url,localheader(url.split("?")[0],islogin))
    }

    const postData = (url,data,islogin = true) =>{
        return api.post(url,data,localheader(url.split("?")[0],islogin))
    }

    const putData = (url,data,islogin = true) =>{
        return api.put(url,data,localheader(url.split("?")[0],islogin))
    }
    const deleteData = (url,islogin = true) =>{
        return api.delete(url,localheader(url.split("?")[0],islogin))
    }

    return {
        getData,
        postData,
        putData,
        deleteData,

        form,
        dataSend
    }
}