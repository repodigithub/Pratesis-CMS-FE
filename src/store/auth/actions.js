import { api } from 'boot/axios'

export function login(context,payload) {
    return new Promise((resolve,reject) =>{
        api.post('auth/login',payload)
        .then(response=>{
            context.commit('setLogin',response.data.data)
            resolve(response)
            this.$router.push({name : 'Overview'})
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function logout(context){
    this.$router.push('/login')
    context.commit('setLogout')
}

export function forgot(context,payload){
    return new Promise((resolve,reject)=>{
        api.post('forgot',payload)
        .then(()=>{
            resolve('ok')
            this.$router.push('forgot-success')
        })
        .catch(error=>{
            reject(error)
        })
    })
}

export function register(context,payload){
    return new Promise((resolve,reject)=>{
        api.post('auth/register',payload)
        .then(response=>{
            resolve(response)
        })
        .catch(error=>{
            reject(error)
        })
    })
}
