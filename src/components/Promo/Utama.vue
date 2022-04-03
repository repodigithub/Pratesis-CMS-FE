<template>
    <breadcrumb  :upload="false" :leftside="false">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Promo" style="color:#00000073;"/>
        </template>
        <template v-slot:rightside-content v-if="userRole != 'GA'">
            <q-btn color="secondary"  no-caps class="btn-one" style="padding-left:10px!important;" unelevated @click="openAdd">
                <q-icon name="add" />
                Add New
            </q-btn>
        </template>
    </breadcrumb>
    <div class="row q-pa-lg">
        <component :is="userTampil"/>
    </div>
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" :normal="false" @onSubmitAdd="saveAdd">
            <template v-slot:add-content>
                    <label for="OPSO ID">OPSO ID</label>
                    <q-input v-model="dataPromo.opso_id" type="text" id="OPSO ID" outlined dense lazy-rules disable
                    placeholder="OPSO ID" class="q-mb-md"/>
                    <label for="Nama Promo">Nama Promo</label>
                    <q-input v-model="dataPromo.nama_promo" type="text" id="Nama Promo" outlined dense lazy-rules
                    :rules="[
                        val => val && val.length > 0 || 'Nama Promo tidak boleh kosong',
                    ]" placeholder="Nama Promo"/>
                    <label for="Budget">Budget</label>
                    <q-input v-model="dataPromo.budget" id="Budget" type="number" outlined dense lazy-rules
                    :rules="[
                        val => val && val.length > 0 || 'Budget tidak boleh kosong',
                    ]" placeholder="Budget"/>
                    <div class="row q-col-gutter-sm q-mb-md">
                        <div class="col">
                            <div class="font-normal">Tanggal Awal :</div>
                            <q-input
                                v-model="dataPromo.start_date"
                                type="date"
                                dense
                                outlined
                                hide-bottom-space
                                class="option-two col-9">
                            </q-input>
                        </div>
                        <div class="col">
                            <div class="font-normal">Tanggal Akhir :</div>
                            <q-input
                                v-model="dataPromo.end_date"
                                type="date"
                                dense
                                outlined
                                hide-bottom-space
                                class="option-two col-9">
                            </q-input>
                        </div>
                        <div class="col">
                            <div class="font-normal">Batas Waktu Claim :</div>
                            <q-input
                                v-model="dataPromo.claim"
                                type="number"
                                dense
                                outlined
                                hide-bottom-space
                                class="option-two col-9">
                                <template v-slot:append>
                                    <div class="font-normal">Hari</div>
                                </template>
                            </q-input>
                        </div>
                    </div>
                    <select-dropdown url="spend" v-model:selected="dataPromo.kode_spend_type" class="q-mb-md" nameLabel="Spend Type"/>
                    <select-dropdown url="budget-holder" v-model:selected="dataPromo.kode_budget_holder" class="q-mb-md" nameLabel="Budget Holder"/>
                    <div class="row justify-between items-center">
                        <div class="d">Dokumen Pendukung</div>
                        <q-btn color="primary" no-caps @click="onUpload" flat>
                            <q-img
                                src="~assets/icon/upload.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                                style="margin-right:5px;"
                            />
                            Upload
                        </q-btn>
                        <div class="col-12">
                            <q-chip removable @remove="removeFile" color="primary" text-color="white" icon="description" v-if="filesupload">
                                {{filesupload.name}}
                            </q-chip>
                        </div>
                        <q-file borderless v-model="filesupload" label="Borderless" ref="inputfile" style="display:none;"/>
                    </div>
            </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref,watch } from 'vue'
import HeadOffice from './HeadOffice.vue'
import Distributor from './Distributor.vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'
import { useService } from 'src/composeables/useService'


export default {
    setup(){
        const { modalAdd,openAdd } = usePratesis()
        const dataPromo = ref({})
        const { showLoading,hideLoading,successNotif } = useCustom()
        const router = useRouter()
        const filesupload = ref(null)
        const { getData,postData } = useService()
        function removeFile(){
            filesupload.value = null
        }
        function saveAdd(){
            let sendForm = new FormData()
            sendForm.append('opso_id',dataPromo.value.opso_id)
            sendForm.append('nama_promo',dataPromo.value.nama_promo)
            sendForm.append('budget',dataPromo.value.budget)
            sendForm.append('start_date',dataPromo.value.start_date)
            sendForm.append('end_date',dataPromo.value.end_date)
            sendForm.append('claim',dataPromo.value.claim)
            sendForm.append('kode_spend_type',dataPromo.value.kode_spend_type)
            sendForm.append('kode_budget_holder',dataPromo.value.kode_budget_holder)
            sendForm.append('file',filesupload.value)
            showLoading()
            postData('promo',sendForm)
            .then(res=>{
                console.log('res,',res.data.data.id)
                successNotif('Promo berhasil ditambahkan')
                // router.push({name : 'Detail Promo',query:{id:res.data.data.id}})
                hideLoading()
                modalAdd.value = false
            })
            .catch(err=>{
                console.log('error,',err)
            })
        }
        

        watch(()=>modalAdd.value,val=>{
            if(val){
                getData('promo/generate-id')
                .then(res=>{
                    dataPromo.value.opso_id = res.data.data.opso_id
                })
            }
        })

        const inputfile = ref('')
        function onUpload(){
            inputfile.value.$el.click()
        }

        return {
            modalAdd,openAdd,
            dataPromo,saveAdd,
            showLoading,hideLoading,successNotif,
            filesupload,inputfile,onUpload,removeFile
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        HeadOffice,
        Distributor,
        'add-data': defineAsyncComponent(() => import('components/Modal/AddData')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown'))
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['SA','DI'].indexOf(role) >= 0 ? '' : role
        },
        userTampil(){
            return this.userRole ? 'HeadOffice' : 'Distributor'
        }
    },
}
</script>

<style>

</style>