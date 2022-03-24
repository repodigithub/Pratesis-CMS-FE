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

    const getData = async (url,islogin = true) => {
        return new Promise((resolve,reject)=>{
            api.get(url,localheader(url.split("?")[0],islogin))
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    const postData = async (url,data,islogin = true) =>{
        return new Promise((resolve,reject)=>{
            api.post(url,data,localheader(url.split("?")[0],islogin))
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }

    const putData = async (url,data,islogin = true) =>{
        return new Promise((resolve,reject)=>{
            api.put(url,data,localheader(url.split("?")[0],islogin))
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
    }
    const deleteData = async (url,islogin = true) =>{
        return new Promise((resolve,reject)=>{
            api.delete(url,localheader(url.split("?")[0],islogin))
            .then(res=>{
                resolve(res)
            })
            .catch(err=>{
                reject(err)
            })
        })
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