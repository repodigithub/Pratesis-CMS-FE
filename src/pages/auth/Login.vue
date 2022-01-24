<template>
    <div class="col-8">
        <q-banner inline-actions class="text-white bg-red btn-radius" v-if="error">
            Email/password yang anda masukkan salah
        </q-banner>
        <div class="font-big blackown  text-center">Hi, Selamat datang kembali!</div>
        <div class="font-medium text-grey  text-center">Silahkan login untuk kembali menggunakan layanan</div>
        <q-form
        @submit.prevent.stop="onAuth('auth/login',user)" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <label for="email" class="font-normal">Email Address</label>
            <q-input v-model="user.email" dense outlined id="email" class="q-mb-md" type="email"
            lazy-rules
            hide-bottom-space
            :rules="[
            (val) => (val && val.length > 0) || 'Email tidak boleh kosong',val => validemail(val)
            ]"
            >
                <template v-slot:append>
                <q-icon
                    name="email"
                />
                </template>
            </q-input>
            <label for="password" class="font-normal">Password</label>
            <q-input v-model="user.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
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
                <vue-recaptcha :sitekey="recaptchasitekey" class="q-mb-md"/>
                <q-btn label="Login" no-caps type="submit" color="primary" unelevated class="col-12" :disabled="btndisabled" :loading="load">
                    <template v-slot:loading>
                        <div class="row items-center">
                            <q-spinner-facebook />  
                        </div>
                    </template>
                </q-btn>
            </div>
        </q-form>
        <div class="row items-center justify-center">
            <span>Don't have an account? </span>
            <q-btn flat no-caps class="text-primary text-bold" label="Register" @click="$router.push('/register')"/>
        </div>
    </div>
</template>

<script>
import mixin from 'src/common/mixin'
import { VueRecaptcha } from 'vue-recaptcha';
export default {
    mixins:[mixin],
    components:{
        VueRecaptcha
    },
    data(){
        return{
            visibility: true,
            user:{
                email:'',
                password:''
            },
        }
    },
}
</script>

<style>

</style>