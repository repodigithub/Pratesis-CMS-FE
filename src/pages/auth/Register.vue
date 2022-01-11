<template>
    <div class="col-8">
        <q-banner inline-actions class="text-white bg-red btn-radius" v-if="error">
            Email/password yang anda masukkan salah
        </q-banner>
        <div class="font-big blackown">Register</div>
        <div class="font-medium text-grey">Bergabung untuk terhubung dengan layanan kami</div>
        <q-form
        @submit.prevent.stop="onSubmit('auth/register',user)" ref="form"
            class="q-gutter-sm q-mt-lg "
        >
            <div class="row justify-between">
                <div class="col-6">
                    <label for="email" class="font-normal">First Name</label>
                    <q-input v-model="user.firstname" dense outlined id="email" class="q-mb-md" 
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                    (val) => (val && val.length > 0) || 'First Name tidak boleh kosong'
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
                    <label for="email" class="font-normal">Last Name</label>
                    <q-input v-model="user.lastname" dense outlined id="email" class="q-mb-md" 
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                    (val) => (val && val.length > 0) || 'Last Name tidak boleh kosong'
                    ]"
                    >
                        <template v-slot:append>
                        <q-icon
                            name="person"
                        />
                        </template>
                    </q-input>
                </div>
                <div class="col-6">
                    <label for="email" class="font-normal">Phone Number</label>
                    <q-input v-model="user.phone" dense outlined id="email" class="q-mb-md" 
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                    (val) => (val && val.length > 0) || 'Phone number tidak boleh kosong'
                    ]"
                    >
                        <template v-slot:append>
                        <q-icon
                            name="phone"
                        />
                        </template>
                    </q-input>
                </div>
                <div class="col-5">
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
                </div>
                <div class="col-6">
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
                </div>
                <div class="col-5">
                    <label for="password" class="font-normal">Repeat Password</label>
                    <q-input v-model="user.confirmpassword"  dense outlined id="password" :type="visibility2 ? 'password' : 'text'" class="q-mb-md"
                    lazy-rules
                    hide-bottom-space
                    :rules="[
                        (val) => (val && val.length > 0) || 'Repeat password tidak boleh kosong', val => konfirmasipw(val)
                    ]"
                    >
                        <template v-slot:append>
                        <q-icon
                            :name="visibility2 ? 'visibility' : 'visibility_off'"
                            @click="visibility2 = !visibility2"
                            class="cursor-pointer"
                        />
                        </template>
                    </q-input>
                </div>
            </div>
            
            <div class="row">
                <q-checkbox v-model="term" label="I agree to all the Term and Privacy Policy " class="col-12"/>
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

            <span>sudah bergabung? </span>
            <q-btn flat no-caps class="text-primary text-bold" label="Login sekarang" @click="$router.push('/login')"/>
        </div>
    </div>
</template>

<script>
import mixin from 'src/common/mixin'
export default {
    mixins:[mixin],
    data(){
        return{
            visibility: true,
            visibility2: true,
            user:{
                firstname:'',
                lastname:'',
                phone:'',
                email:'',
                password:'',
                confirmpassword:''
            },
            error:false,
            load:false,
            btndisabled:false,
            term:false
        }
    },
    methods:{
        konfirmasipw(val){
            if(val === this.user.password){
                return true;
            }else{
                return 'Password tidak sama';
            }
        },
    }
}
</script>

<style>

</style>