<template>
    <div class="col-8">
        <!-- <q-banner inline-actions class="text-white bg-red btn-radius" v-if="error">
            Email/password yang anda masukkan salah
        </q-banner> -->
        <div class="font-big blackown">Register</div>
        <div class="font-medium text-grey">Bergabung untuk terhubung dengan layanan kami</div>
        <q-form
        @submit.prevent.stop="onSave" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <div class="row justify-between">
                <div class="col-4">
                    <label for="user_id" class="font-normal">User ID</label>
                    <q-input v-model="dataSend.user_id" dense outlined id="user_id" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="User ID"
                    >
                        <template v-slot:append>
                        <q-icon
                            name="person"
                        />
                        </template>
                    </q-input>
                </div>
                <div class="col-7">
                    <label for="fullname" class="font-normal">Full Name</label>
                    <q-input v-model="dataSend.full_name" dense outlined id="fullname" class="q-mb-md" 
                    hide-bottom-space
                    placeholder="Full Name"
                    lazy-rules
                    :rules="[
                    (val) => (val && val.length > 0) || 'Full Name tidak boleh kosong'
                    ]"
                    >
                        <template v-slot:append>
                        <q-icon
                            name="person"
                        />
                        </template>
                    </q-input>
                </div>
                <div class="col-12">
                    <label for="email" class="font-normal">Email Address</label>
                    <q-input v-model="dataSend.email" dense outlined id="email" class="q-mb-md" type="email"
                    lazy-rules
                    hide-bottom-space
                    placeholder="your.name@gmail.com"
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
                </div>
                <div class="col-6">
                    <label for="username" class="font-normal">Username</label>
                    <q-input v-model="dataSend.username" dense outlined id="username" class="q-mb-md" 
                    lazy-rules
                    placeholder="username"
                    hide-bottom-space
                    :rules="[
                    (val) => (val && val.length > 0) || 'Username tidak boleh kosong'
                    ]"
                    >
                        <template v-slot:append>
                        <q-icon
                            name="person"
                        />
                        </template>
                    </q-input>
                </div>
                <div class="col-5">
                    <label for="password" class="font-normal">Password</label>
                    <q-input v-model="dataSend.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
                    lazy-rules
                    placeholder="password"
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
                </div>
                <div class="col-12">
                    <select-dropdown url="user-group" v-model:selected="dataSend.kode_group" :islogin="false" :master="false" class="q-mb-md" nameLabel="User Level"/>
                </div>
                <div class="row col-12 justify-between" v-show="dataSend.kode_group.includes('DI') || dataSend.kode_group.includes('SA')">
                    <div class="col-6">
                        <select-dropdown url="area" v-model:selected="dataSend.kode_area" :islogin="false" :master="false" class="q-mb-md" ref="kodedepo" nameLabel="Kode Depo"/>
                    </div>
                    <div class="col-5">
                        <label for="nama_depo" class="font-normal">Nama Depo</label>
                        <q-input v-model="nama_area"  dense outlined id="nama_depo" class="q-mb-md"
                        hide-bottom-space
                        disable
                        >
                        <template v-slot:append>
                            <q-icon
                                name="person"
                            />
                            </template>
                        </q-input>
                    </div>
                </div>
                <div class="row col-12 justify-between" v-show="dataSend.kode_group.includes('DI')">
                    <div class="col-6">
                        <select-dropdown url="distributor" v-model:selected="dataSend.kode_distributor" :islogin="false" :master="false" class="q-mb-md" ref="kodedistributor" nameLabel="Kode Distributor"/> 
                    </div>
                    <div class="col-5">
                        <label for="nama_distributor" class="font-normal">Nama Distributor</label>
                        <q-input v-model="nama_distributor"  dense outlined id="nama_distributor" class="q-mb-md"
                        hide-bottom-space
                        disable
                        >
                            <template v-slot:append>
                            <q-icon
                                name="person"
                            />
                            </template>
                        </q-input>
                    </div>
                </div>
            </div>
            
            <div class="row">
                <q-checkbox v-model="term" class="col-12">
                    <div class="d">
                        I agree to all the <q-btn color="primary" label="Term" no-caps flat @click.stop="onClick" class="q-px-none"/> and 
                        <q-btn color="primary" label="Privacy Policy" no-caps flat @click.stop="onClick" class="q-px-none"/>
                    </div> 
                </q-checkbox>
                <vue-recaptcha :sitekey="recaptchasitekey" :class="error ? '' : 'q-mb-md'"/>
                <span v-if="error" :class="error ? 'q-my-md' : ''" class="text-secondary"> {{error.recaptcha}} </span>
                <q-btn label="Create Account" no-caps type="submit" color="primary" unelevated class="col-12" />
            </div>
        </q-form>
        <div class="row items-center justify-center">

            <span>Already have an account? </span>
            <q-btn flat no-caps class="text-primary text-bold" label="Login" @click="$router.push('/login')"/>
        </div>
    </div>
    <rsuccess v-model:rsuccess="registerSuccess" v-if="registerSuccess"/>
</template>

<script>
import { VueRecaptcha } from 'vue-recaptcha';
import Rsuccess from './Rsuccess.vue';
import { ref,watch,defineAsyncComponent } from 'vue'
import { useStore } from  'vuex'
import { useCustom } from 'src/composeables/useCustom'
export default {
    components:{
        VueRecaptcha,
        Rsuccess,
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown'))
    },
    setup(){
        const dataSend = ref({})
        const form = ref('')
        const registerSuccess = ref(false)
        const store = useStore()
        const error = ref('')
        const { showLoading,hideLoading } = useCustom()

        dataSend.value = {
                user_id:'',
                full_name:'',
                username:'',
                email:'',
                password:'',
                kode_distributor:null,
                kode_area:null,
                kode_group:''
        }
        const visibility = ref(true)
        const kodedepo = ref('')
        const nama_area = ref('')

        const kodedistributor = ref('')
        const nama_distributor = ref('')
        
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
                        store.dispatch('auth/register',dataSend.value)
                        .then(()=>{
                            registerSuccess.value = true
                            hideLoading()
                        })
                        .catch(()=>{
                            hideLoading()
                            grecaptcha.reset()
                        })
                    }
                }
            })
        }

        watch(()=>dataSend.value.kode_area,val=>{
            let a = kodedepo.value.options.filter(f=>f.value === val)
            nama_area.value = a[0].label
        })

        watch(()=>dataSend.value.kode_distributor,val=>{
            let b = kodedistributor.value.options.filter(f=>f.value === val)
            nama_distributor.value = b[0].label
        })
        return {
            visibility,
            error,
            dataSend,form,registerSuccess,
            onSave,

            kodedepo,
            nama_area,
            kodedistributor,
            nama_distributor
        }
    },
    data(){
        return{
            term:false,
        }
    },
    methods:{
        onClick(){
            console.log("testing")
        },
    },
    beforeCreate(){
        if(this.$store.getters['auth/isAuthenticated']){
            this.$router.push({ name : 'Overview'})
        }
    }
}
</script>

<style>

</style>