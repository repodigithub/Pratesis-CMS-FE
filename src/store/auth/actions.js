import { api } from 'boot/axios'

export function login(context,payload) {
    return api.post('auth/login',payload)
    .then(response=>{
        context.commit('setLogin',response.data.data)
        this.$router.push({name : 'Overview'})
    })
}

export function logout(context){
    this.$router.push('/login')
    context.commit('setLogout')
}

export function forgot(context,payload){
    return  api.post('forgot',payload)
        .then(()=>{
            this.$router.push('forgot-success')
        })
}

export function register(context,payload){
    return api.post('auth/register',payload)
}
