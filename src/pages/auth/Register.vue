<template>
    <div class="col-8">
        <q-banner inline-actions class="text-white bg-red btn-radius" v-if="error">
            Email/password yang anda masukkan salah
        </q-banner>
        <div class="font-big blackown">Register</div>
        <div class="font-medium text-grey">Bergabung untuk terhubung dengan layanan kami</div>
        <q-form
        @submit.prevent.stop="onAuth('auth/register',user)" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <div class="row justify-between">
                <div class="col-4">
                    <label for="user_id" class="font-normal">User ID</label>
                    <q-input v-model="user.user_id" dense outlined id="user_id" class="q-mb-md" 
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
                    <q-input v-model="user.full_name" dense outlined id="fullname" class="q-mb-md" 
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
                    <q-input v-model="user.email" dense outlined id="email" class="q-mb-md" type="email"
                    lazy-rules
                    hide-bottom-space
                    placeholder="your.name@gmail.com"
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
                </div>
                <div class="col-6">
                    <label for="username" class="font-normal">Username</label>
                    <q-input v-model="user.username" dense outlined id="username" class="q-mb-md" 
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
                    <q-input v-model="user.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
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
                    <label for="email" class="font-normal">User Level</label>
                    <q-select  outlined dense v-model="user.user_level" :options="optrole" placeholder="user level"  lazy-rules hide-bottom-space class="q-mb-md"
                        :rules="[
                            val => val !== null && val !== '' || 'User Level tidak boleh kosong',
                        ]"/>
                </div>
                <div class="col-6">
                    <label for="kode_depo" class="font-normal">Kode Depo</label>
                    <q-select  outlined dense v-model="user.kode_area" :options="optdepo"  lazy-rules hide-bottom-space class="q-mb-md"  id="kode_depo">
                    </q-select>
                </div>
                <div class="col-5">
                    <label for="nama_depo" class="font-normal">Nama Depo</label>
                    <q-input v-model="nama_depo"  dense outlined id="nama_depo" class="q-mb-md"
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
                <div class="col-6">
                    <label for="kode_distributor" class="font-normal">Kode Distributor</label>
                    <q-select  outlined dense v-model="user.kode_distributor" :options="optdistributor" hide-bottom-space class="q-mb-md"  id="kode_distributor">
                    </q-select>
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
            
            <div class="row">
                <q-checkbox v-model="term" class="col-12">
                    <div class="d">
                        I agree to all the <q-btn color="primary" label="Term" no-caps flat @click.stop="onClick" class="q-px-none"/> and 
                        <q-btn color="primary" label="Privacy Policy" no-caps flat @click.stop="onClick" class="q-px-none"/>
                    </div> 
                </q-checkbox>
                <vue-recaptcha :sitekey="recaptchasitekey" class="q-mb-md"/>
                <q-btn label="Create Account" no-caps type="submit" color="primary" unelevated class="col-12" :disabled="btndisabled" :loading="load">
                    <template v-slot:loading>
                        <div class="row items-center">
                            <q-spinner-facebook />  
                        </div>
                    </template>
                </q-btn>
            </div>
        </q-form>
        <div class="row items-center justify-center">

            <span>Already have an account? </span>
            <q-btn flat no-caps class="text-primary text-bold" label="Login" @click="$router.push('/login')"/>
        </div>
    </div>
    <rsuccess v-model:rsuccess="rsuccess" v-if="rsuccess"/>
</template>

<script>
import mixin from 'src/common/mixin'
import { VueRecaptcha } from 'vue-recaptcha';
import Rsuccess from './Rsuccess.vue';
export default {
    mixins:[mixin],
    components:{
        VueRecaptcha,
        Rsuccess
    },
    data(){
        return{
            visibility: true,
            user:{
                user_id:'grtb',
                full_name:'testing',
                username:'test7',
                email:'tes7@gmail.com',
                password:'testing',
                user_level:'Head Office',
                kode_distributor:null,
                kode_area:null,
                kode_group:null
            },
            error:false,
            load:false,
            btndisabled:false,
            term:false,
            optrole:['Head Office','Depot','Distributor','Super Admin'],
            optdepo:['001','002','003'],
            optdistributor:['001','002','003'],
            nama_depo:'dummy',
            nama_distributor:'dummy',
            rsuccess:false
        }
    },
    methods:{
        // filterDepo(val,update){
        //     if (val === '') {
        //     update(() => {
        //         this.optdepo = ['001','002','003']
        //     })
        //     return
        //     }

        //     update(() => {
        //     const needle = val.toLowerCase()
        //     console.log("needle",needle)
        //     this.optdepo.filter(v => v.toLowerCase() === needle)
        //     })
        // },
        onClick(){
            console.log("testing")
        },
    },
}
</script>

<style>

</style>