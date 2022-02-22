<template>
    <div class="col-8">
        <div class="font-big blackown  text-center">Hi, Selamat datang kembali!</div>
        <div class="font-medium text-grey  text-center">Silahkan login untuk kembali menggunakan layanan</div>
        <div v-if="error">
            <q-banner inline-actions class="text-white bg-red btn-radius" v-if="error.auth">
                {{error.auth}}
            </q-banner>
        </div>
        <q-form
        @submit.prevent.stop="onSave" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <label for="email" class="font-normal">Email Address</label>
            <q-input v-model="dataSend.email" dense outlined id="email" class="q-mb-md" type="email"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Email tidak boleh kosong'
            ]"
            >
                <template v-slot:append>
                <q-icon
                    name="email"
                />
                </template>
            </q-input>
            <label for="password" class="font-normal">Password</label>
            <q-input v-model="dataSend.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
            lazy-rules
            hide-bottom-space
            :rules="[
                (val) => (val && val.length > 0) || 'password tidak boleh kosong'
            ]"
            >
                <template v-slot:append>
                <q-icon
                    :name="visibility ? 'visibility' : 'visibility_off'"
                    @click="visibility = !visibility"
                    class="cursor-pointer"
                />
                </template>
            </q-input>
            <div class="row">
                <vue-recaptcha :sitekey="recaptchasitekey" :class="error ? error.recaptcha ? '' : 'q-mb-md' : 'q-mb-md'"/>
                <span v-if="error" :class="error ? 'q-my-md' : ''" class="text-secondary"> {{error.recaptcha}} </span>
                <q-btn label="Login" no-caps type="submit" color="primary" unelevated class="col-12" />
            </div>
        </q-form>
        <div class="row items-center justify-center">
            <span>Don't have an account? </span>
            <q-btn flat no-caps class="text-primary text-bold" label="Register" @click="$router.push('/register')"/>
        </div>
    </div>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha';
import { ref } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { useStore } from 'vuex'
export default {
    components:{
        VueRecaptcha
    },
    setup(){
        const dataSend = ref({})
        const form = ref('')
        const { showLoading,hideLoading } = useCustom()
        const error = ref(null)
        // dataSend.value = {
            // email:'admin@local.host',
            // password:'password'
            // email:'fajarilhamrosi@gmail.com',
            // password:'testing'
        // }
        const visibility = ref(true)
        const store = useStore()

        function onSave(){
            form.value.validate()
            .then(valid=>{
                if(valid){
                    let recaptcha = grecaptcha.getResponse()
                    if(recaptcha.length === 0){
                        error.value ={
                            recaptcha : 'You cant leave Captcha Code empty'
                        } 
                    }else{
                        dataSend.value = {
                            ...dataSend.value, "g-recaptcha-response" : recaptcha
                        }
                        showLoading()
                        store.dispatch('auth/login',dataSend.value)
                        .then(()=>{
                            hideLoading()
                        })
                        .catch(err=>{
                            hideLoading()
                            error.value = {
                                auth : `${err.response.data.message}`
                            }
                        })
                    }
                }
            })
        }
        return {
            dataSend,form,
            error,
            visibility,
            onSave
        }
    },
}
</script>

<style>

</style>