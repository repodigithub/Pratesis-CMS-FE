import { useStore } from  'vuex'
import { ref,reactive,toRefs } from 'vue'
import { api,header } from 'boot/axios'
import { useQuasar } from 'quasar'
export const useForm = () => {
    const store = useStore()
    let token = store.state.auth.token
    const dataSend = ref({})
    const quasar = useQuasar()
    const state =   reactive({
        error:null,
        loading:false,
        disable:false,
        registerSuccess:false
    })
    const form = ref(null)

    const onSubmit = (action,data) => {
        return new Promise((resolve,reject)=>{
            form.value.validate()
            .then(valid=>{
                if(valid){
                    quasar.loading.show({
                        message: 'Data sedang diproses, Mohon tunggu...',
                        boxClass: 'bg-grey-2 text-grey-9',
                        spinnerColor: 'primary'
                    })
                    let send = null
                    if(action ===  'auth/register' || action === 'auth/login'){
                        let recaptcha = grecaptcha.getResponse()
                        if(recaptcha.length === 0){
                            state.error ={
                                recaptcha : 'You cant leave Captcha Code empty'
                            } 
                        }else{
                            send = {
                                ...data, "g-recaptcha-response" : recaptcha
                            }
                        }
                        store.dispatch(action,send)
                        .then(()=>{
                            state.loading = false
                            state.disable = false
                            quasar.loading.hide()
                            if(action === 'auth/register') {
                                state.registerSuccess = true
                            }
                        })
                        .catch(error=>{
                            if(error.response.data.errors){
                                state.error = error.response.data.errors
                            }else{
                                state.error = error.response.data.message
                            }
                            state.loading = false
                            state.disable = false
                        })
                    }else{ //detail data
                        api.put(action,data,header(token))
                        .then(res=>{
                            quasar.loading.hide()
                            return resolve(res)
                        })
                        .catch(err=>{
                            return reject(err)
                        })
                    }
                }
            })
        })
    }

    const showLoading = () => {
        quasar.loading.show({
            message: 'Data sedang diproses, Mohon tunggu...',
            boxClass: 'bg-grey-2 text-grey-9',
            spinnerColor: 'primary'
        })
    }

    const hideLoading = () => {
        quasar.loading.hide()
    }

    return {
        dataSend,
        form,
        ...toRefs(state),
        onSubmit,
        showLoading,
        hideLoading
    }
}