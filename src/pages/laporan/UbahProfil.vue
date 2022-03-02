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
                <div v-if="valid">
                    <q-card-section >
                        <div class="row justify-center">
                            <div class="bg-primary own-card text-white text-center" style="width:140px;height:140px;margin-top:-70px;border:8px solid white;border-radius:40px; font-size:60px;line-height:140px;">
                                {{name.charAt(0)}}
                            </div>
                        </div>
                        <div class="row justify-between q-mt-md">
                            <div class="col-4">
                                <label for="userid" class="font-normal">User ID</label>
                                <q-input v-model="dataSend.user_id" dense outlined id="userid" class="q-mb-md" 
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
                            <div class="col-12">
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
                            <select-dropdown url="user-group" v-model:selected="dataSend.kode_group" :islogin="false" :master="false" class="q-mb-md col-12" nameLabel="User Level"/>
                            <div class="row col-12 justify-between" v-show="dataSend.kode_group.includes('DI') || dataSend.kode_group.includes('SA')">
                        <div class="col-6">
                            <select-dropdown url="area" v-model:selected="dataSend.kode_area" :islogin="false" :master="false" class="q-mb-md" nameLabel="Kode Depo"/>
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
                            <select-dropdown url="distributor" v-model:selected="dataSend.kode_distributor" :islogin="false" :master="false" class="q-mb-md" nameLabel="Kode Distributor"/> 
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
                    </q-card-section>
                    <q-card-actions align="right" class="q-px-lg q-pb-lg">
                        <q-btn label="Save" no-caps color="secondary" unelevated padding="9px 16px" @click="onSave"/>
                    </q-card-actions>
                </div>
                <q-card-section class="row justify-center items-center" v-else>
                    <q-spinner-grid class="col-4 text-primary"/>
                    <span class="col-12 text-primary font-medium text-center">Memuat Data</span>
                </q-card-section>
            </q-card>
    </div>
</q-page>
</template>

<script>
import { useStore } from 'vuex'
import { ref,watch,defineAsyncComponent } from 'vue'
import {usePratesis} from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
export default {
    setup(){
        const store = useStore()
        const { name } = usePratesis()
        const { putData,getData } = useService()
        const { showLoading,hideLoading,successNotif } = useCustom()
        const dataSend = ref({})

        const valid = ref(false)
        getData('auth/me')
        .then(res=>{
            valid.value = true
            dataSend.value = res.data.data
        })

        
        function onSave(){
            showLoading()
            putData(`user/${dataSend.value.id}`,dataSend.value)
            .then(res=>{
                store.dispatch('auth/saveUser',res.data.data)
                getData(`user-group?search=${res.data.data.kode_group}`,false)
                .then(response=>{
                    store.dispatch('auth/changeRole',response.data.data.data[0].nama_group)
                    hideLoading()
                    successNotif('Data User Berhasil Diupdate')
                })
                dataSend.value = res.data.data
                
            })
            .catch(()=>{
                hideLoading()
            })
        }
        const nama_area = ref('undefined')
        if(dataSend.value.kode_area){
            getData(`area?search=${dataSend.value.kode_area}`)
            .then(res=>{
                nama_area.value = res.data.data.data[0].nama_area
            })
        }
        watch(()=>dataSend.value.kode_area,val=>{
            if(val !== null){
                getData(`area?search=${val}`)
                .then(res=>{
                    nama_area.value = res.data.data.data[0].nama_area
                })
            }else{
                nama_area.value = 'undefined'
            }
        })

        const nama_distributor = ref('undefined')
        if(dataSend.value.kode_distributor){
            getData(`distributor?search=${dataSend.value.kode_distributor}`)
            .then(res=>{
                nama_distributor.value = res.data.data.data[0].nama_distributor
            })
        }
        watch(()=>dataSend.value.kode_distributor,val=>{
            if(val !== null){
                getData(`distributor?search=${val}`)
                .then(res=>{
                    nama_distributor.value = res.data.data.data[0].nama_distributor
                })
            }else{
                nama_distributor.value = 'undefined'
            }
        })

        watch(()=>dataSend.value.kode_group,val=>{
            if(val.includes('SA')){
                dataSend.value.kode_distributor = null
            }else if (!val.includes('DI')){
                dataSend.value.kode_distributor = null
                dataSend.value.kode_area = null
            }
        })
        return {
            onSave,
            name,
            nama_area,
            nama_distributor,
            showLoading,hideLoading,successNotif,
            putData,
            valid,
            dataSend
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'select-dropdown': defineAsyncComponent(()=>import('components/SelectDropdown'))
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