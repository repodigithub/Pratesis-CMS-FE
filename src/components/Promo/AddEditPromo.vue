<template>
    <q-dialog :model-value="modalPromo" @hide="$emit('update:modalPromo',false)">
        <q-card style="width:480px;">
            
            <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">{{edit ? 'Edit' : 'Add New'}} Promo</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <q-form
            @submit.prevent.stop="onSave" ref="form"
                class="row">
                <div class="col-12">
                    <label for="OPSO ID">OPSO ID</label>
                    <q-input v-model="dataPromo.opso_id" type="text" id="OPSO ID" outlined dense lazy-rules disable
                    placeholder="OPSO ID" class="q-mb-md"/>
                </div>

                <div class="col-12">
                    <label for="Nama Promo">Nama Promo</label>
                    <q-input v-model="dataPromo.nama_promo" type="text" id="Nama Promo" outlined dense lazy-rules
                    :rules="[
                        val => val && val.length > 0 || 'Nama Promo tidak boleh kosong',
                    ]" placeholder="Nama Promo"
                    />
                </div>

                <div class="col-12">
                    <label for="Budget">Budget</label>
                    <input-budget v-model:budget="dataPromo.budget"/>
                </div>

                <div class="row q-col-gutter-sm q-mb-md col-12">
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

                <div class="col-12">
                    <select-dropdown url="spend" v-model:selected="dataPromo.kode_spend_type"  class="q-mb-md" nameLabel="Spend Type"/>
                </div>
                <div class="col-12">
                    <select-dropdown url="budget-holder" v-model:selected="dataPromo.kode_budget_holder"  class="q-mb-md" nameLabel="Budget Holder"/>
                </div>

                <div class="row justify-between items-center col-12">
                    <div class="d">Dokumen Pendukung</div>
                    <q-btn color="primary" no-caps @click="$refs.inputfile.$el.click()" flat v-if="!edit">
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
                    <q-btn color="primary" no-caps type="a" :href="dataPromo.documentClaim" target="_blank" download flat v-if="dataPromo.documentClaim && edit" >
                        Download
                        <q-img
                            src="~assets/icon/download.svg"
                            spinner-color="primary"
                            spinner-size="82px"
                            width="16px"
                            height="16px"
                            style="margin-left:5px;"
                        />
                    </q-btn>
                    <div class="col-12">
                        <q-chip removable @remove="removeFile" color="primary" text-color="white" icon="description" v-if="filesupload">
                            {{filesupload.name}}
                        </q-chip>
                    </div>
                    <q-file borderless v-model="filesupload" label="Borderless" ref="inputfile" style="display:none;"/>
                </div>
                <div class="row col-12 q-mt-lg">
                    <q-btn color="secondary" label="Cancel"  no-caps unelevated outline v-close-popup class="btn-one"/>
                    <q-space />
                    <q-btn color="secondary" :label="edit ? 'Edit' :'Add'" no-caps unelevated class="btn-one" type="submit"/>
                </div>
                </q-form>
            </q-card-section>

        </q-card>
    </q-dialog>
</template>

<script>
import { defineAsyncComponent,ref,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
import { useRouter,useRoute } from 'vue-router'

export default {
    name:'add-edit-promo',
    props:{
        modalPromo:{
            type:Boolean,
            default:false
        },
        edit:{
            type:Boolean,
            default:false
        }
    },
    components:{
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
        'input-budget': defineAsyncComponent(()=> import('components/Promo/InputBudget'))
    },
    setup(props,{emit}){

        const dataPromo = ref({})

        const filesupload = ref(null)
        function removeFile(){
            filesupload.value = null
        }
        const { postData,getData } = useService()
        const { showLoading,hideLoading,successNotif,editTglPromo,errorNotif,GeneralFormatDate } = useCustom()
        const route = useRoute()
        const { formatRibuan } = usePratesis()

        onMounted(()=>{
            if (props.edit) {
                getData(`promo/${route.params.id}`)
                .then(res=>{
                    let result = res.data.data
                    dataPromo.value.id = result.id
                    dataPromo.value.opso_id = result.opso_id
                    dataPromo.value.nama_promo = result.nama_promo
                    dataPromo.value.budget =formatRibuan(String(result.budget).replaceAll('.', '')) 
                    dataPromo.value.start_date = editTglPromo(result.start_date)
                    dataPromo.value.end_date = editTglPromo(result.end_date)
                    dataPromo.value.claim = result.claim
                    dataPromo.value.kode_spend_type = result.kode_spend_type
                    dataPromo.value.kode_budget_holder = result.kode_budget_holder
                    dataPromo.value.documentClaim = result.document
                })
            }else{
                getData('promo/generate-id')
                .then(res=>{
                    dataPromo.value.opso_id = res.data.data.opso_id
                })
            }
        })

        const form = ref(null)
        const router = useRouter()
        
        function onAdd(sendForm){
            form.value.validate()
            .then(valid=>{
                if(valid){
                    showLoading()
                    postData('promo',sendForm)
                    .then(res=>{
                        successNotif('Promo berhasil ditambahkan')
                        router.push({name : 'Detail Promo',params:{id:res.data.data.id}})
                        hideLoading()
                        emit('update:modalPromo',false)
                    })
                    .catch(err=>{
                        hideLoading()
                        let error = err.response.data.data
                        Object.keys(error).forEach(function(key) {
                            errorNotif(`${key} : ${error[key]}`)
                        });
                        console.log('error add edit promo,',err.response.data)
                    })
                }
            })
        }

        function onEdit(sendForm){
            sendForm.append('_method','PUT')
            form.value.validate()
            .then(valid=>{
                if(valid){
                    showLoading()
                    postData(`promo/${dataPromo.value.id}`,sendForm)
                    .then(()=>{
                        successNotif('Promo berhasil diedit')
                        hideLoading()
                        emit('update:modalPromo',false)
                        emit('initData','promo')
                    })
                    .catch(err=>{
                        hideLoading()
                        let error = err.response.data.data
                        Object.keys(error).forEach(function(key) {
                            errorNotif(`${key} : ${error[key]}`)
                        });
                    })
                }
            })
        }


        
        function onSave(){
            let sendForm = new FormData()
            sendForm.append('opso_id',dataPromo.value.opso_id)
            sendForm.append('nama_promo',dataPromo.value.nama_promo)
            sendForm.append('budget',dataPromo.value.budget.replaceAll('.', ''))
            sendForm.append('start_date',dataPromo.value.start_date)
            sendForm.append('end_date',dataPromo.value.end_date)
            sendForm.append('claim',dataPromo.value.claim)
            sendForm.append('kode_spend_type',dataPromo.value.kode_spend_type)
            sendForm.append('kode_budget_holder',dataPromo.value.kode_budget_holder)
            if (filesupload.value) {
                sendForm.append('file',filesupload.value)
            }
            let tglawal = dataPromo.value.start_date
            let today = GeneralFormatDate(Date.now(),'YYYY-MM-DD')
            // if(tglawal < today){
            //     errorNotif(`tanggal awal : harus lebih dari atau sama dengan tanggal hari ini `)
            // }else{
            //     }
                if (props.edit) { //ketika edit
                    onEdit(sendForm)
                }else{
                    onAdd(sendForm)
                }
        }
        

        return {
            dataPromo,
            form,onSave,
            showLoading,hideLoading,successNotif,
            postData,
            filesupload,removeFile,
            onAdd,onEdit,errorNotif
        }
    }
}
</script>

<style>

</style>