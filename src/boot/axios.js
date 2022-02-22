import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.BASE_URL })
const header = (token,islogin = true) => {
  let CryptoJS = require("crypto-js");
  let auth =''
  let basestring =''
  let s = new Date()
  if(islogin){
    auth =`Bearer ${token}`
  }else{
    basestring =`${process.env.BASE_URL}${token}|${Math.floor(s.getTime()/1000)}`
    auth =CryptoJS.HmacSHA256(basestring,process.env.HMAC_SECRET).toString()
  }

  let config = {
            headers: {
                Authorization : auth
            },
        }
    return config
}

export default boot(({ app,store }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = api
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api

  api.interceptors.response.use(response =>{
    return response
  },error =>{
    if(error.response.status === 401){
      store.dispatch('auth/logout')
      // store.dispatch('myprofil/logout')
      delete api.defaults.headers.common['Authorization']
    }
    return Promise.reject(error)
  })
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api,header }
