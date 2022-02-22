<template>
<q-page class="q-pb-lg">
    <breadcrumb  :rightside="false"/>
    <div class="row justify-center">
        <div class="col-12">
            <q-img
                src="~assets/dashboard/gradientpolos.svg"
                spinner-color="primary"
                spinner-size="50px"
            />
        </div>
            <q-card flat class="col-4 " style="margin-top:-70px;">
                <q-card-section >
                    <div class="row justify-center">
                        <div class="bg-primary own-card text-white text-center" style="width:140px;height:140px;margin-top:-70px;border:8px solid white;border-radius:40px; font-size:60px;line-height:140px;">
                            {{name.charAt(0)}}
                        </div>
                    </div>
                    <div class="row justify-between q-mt-md">
                        <div class="col-4">
                            <label for="userid" class="font-normal">User ID</label>
                            <q-input v-model="me.user_id" dense outlined id="userid" class="q-mb-md" 
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
                            <q-input v-model="me.full_name" dense outlined id="fullname" class="q-mb-md" 
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
                            <q-input v-model="me.email" dense outlined id="email" class="q-mb-md" type="email"
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
                        <div class="col-12">
                            <label for="username" class="font-normal">Username</label>
                            <q-input v-model="me.username" dense outlined id="username" class="q-mb-md" 
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
                        <!-- <div class="col-12">
                            <label for="password" class="font-normal">Password</label>
                            <q-input v-model="me.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
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
                        </div> -->
                        <!-- <div class="col-12">
                            <label for="email" class="font-normal">User Level</label>
                            <q-select  outlined dense v-model="me.role" :options="optrole" placeholder="user level"  lazy-rules hide-bottom-space class="q-mb-md"
                                :rules="[
                                    val => val !== null && val !== '' || 'User Level tidak boleh kosong',
                                ]"/>
                        </div> -->
                        <!-- <div class="col-6">
                            <label for="kode_depo" class="font-normal">Kode Depo</label>
                            <q-select  outlined dense v-model="me.depo" :options="optdepo"  lazy-rules hide-bottom-space class="q-mb-md" id="kode_depo"
                                :rules="[
                                    val => val !== null && val !== '' || 'Kode Depo tidak boleh kosong',
                                ]">
                            </q-select>
                        </div>
                        <div class="col-5">
                            <label for="nama_depo" class="font-normal">Nama Depo</label>
                            <q-input v-model="me.nama_depo"  dense outlined id="nama_depo" class="q-mb-md"
                            lazy-rules
                            hide-bottom-space
                            :rules="[
                                (val) => (val && val.length > 0) || 'Nama Depo tidak boleh kosong'
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
                            <label for="kode_distributor" class="font-normal">Kode Distributor</label>
                            <q-select  outlined dense v-model="me.distributor" :options="optdistributor"  lazy-rules hide-bottom-space class="q-mb-md" id="kode_distributor"
                                :rules="[
                                    val => val !== null && val !== '' || 'Kode Depo tidak boleh kosong',
                                ]">
                            </q-select>
                        </div>
                        <div class="col-5">
                            <label for="nama_distributor" class="font-normal">Nama Distributor</label>
                            <q-input v-model="me.nama_distributor"  dense outlined id="nama_distributor" class="q-mb-md"
                            lazy-rules
                            hide-bottom-space
                            :rules="[
                                (val) => (val && val.length > 0) || 'Nama Distributor tidak boleh kosong'
                            ]"
                            >
                                <template v-slot:append>
                                <q-icon
                                    name="person"
                                />
                                </template>
                            </q-input>
                        </div> -->
                    </div>
                </q-card-section>
                <q-card-actions align="right" class="q-px-lg q-pb-lg">
                    <q-btn label="Save" no-caps color="secondary" unelevated padding="9px 16px" @click="onSave"/>
                </q-card-actions>
            </q-card>
    </div>
</q-page>
</template>

<script>
import { useQuasar } from 'quasar'
import { api,header } from 'boot/axios'
import { useStore } from 'vuex'
import { ref,onMounted } from 'vue'
import { defineAsyncComponent } from 'vue'
import {usePratesis} from 'src/composeables/usePratesis'
export default {
    setup(){
        const store = useStore()
        const quasar = useQuasar()
        const {name} = usePratesis()
        const me = ref({})
        function onSave(){
            quasar.loading.show({
                message: 'Menyimpan Data User. Please wait...',
                boxClass: 'bg-grey-2 text-grey-9',
                spinnerColor: 'primary'
            })
            api.put(`user/${me.value.id}`,me.value,header(store.state.auth.token))
            .then(res=>{
                quasar.loading.hide()
            })
            .catch(err=>console.log("err",err))
        }
        onMounted(()=>{
            me.value = {...store.state.auth.user}
        })
        return {
            me,
            onSave,
            name
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
    },
    data(){
        return{
            visibility:true,
        }
    },
  
}
</script>

<style>

</style>