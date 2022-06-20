<template>
    <q-dialog :model-value="modalAdd" @hide="$emit('update:modalAdd',false)">
        <q-card style="width:460px;">
            <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6">Add New Klaim Promo </div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section>
                <div class="row q-col-gutter-sm q-mb-md">
                    <div class="col-4">
                    <p class="fs-12 q-mb-sm">Opso ID :</p>
                    <select-dropdown
                        url="promo-distributor?status=claim"
                        v-model:selected="opsoId"
                        placeHold="OPSO ID"
                        @update="onSelected" />
                    </div>
                    <div class="col-8">
                        <p class="fs-12 q-mb-sm">Nama Promo :</p>
                        <q-input  type="text" class="q-pb-none" outlined dense disable v-model="namaPromo"/>
                    </div>
                </div>
                <p class="q-mb-sm fs-12 text-bold">Periode :</p>
                <div class="row q-col-gutter-sm q-mb-md items-center">
                    <div class="col-4">
                        <p class="fs-12 q-mb-sm">Start Date :</p>
                        <q-input
                            v-model="startDate"
                            type="date"
                            dense
                            outlined
                            hide-bottom-space
                            disable
                            />
                    </div>
                    <div class="col-4">
                        <p class="fs-12 q-mb-sm">End Date :</p>
                        <q-input
                            v-model="endDate"
                            type="date"
                            dense
                            outlined
                            hide-bottom-space
                            disable
                            />
                    </div>
                    <div class="col-4" v-if="kode_spend_type">
                        <q-badge outline :label="kode_spend_type" :class="active ? colorStatusSpend(kode_spend_type) : ''" style="margin-left:50px;margin-top:20px;"/>
                    </div>
                </div>
                <div class="row q-col-gutter-sm q-mb-md col-12">
                    <div class="col-4">
                        <p class="fs-12 q-mb-sm">Budget :</p>
                        <q-input  type="text" class="q-pb-none" disable outlined dense lazy-rules v-model="budgetAmount"/>
                    </div>
                    <div class="col-4">
                        <p class="fs-12 q-mb-sm">Rp Klaim :</p>
                        <input-budget v-model:budget="claimAmount"/>
                    </div>
                    <div class="col-4">
                        <p class="fs-12 q-mb-sm">Sisa Budget :</p>
                        <q-input  type="text" class="q-pb-none" disable outlined dense lazy-rules v-model="sisaBudgetAmount"/>
                    </div>
                </div>

                <p class="q-mb-sm fs-12 text-bold">Batas Maximal Claim :</p>
                <div class="row q-col-gutter-sm q-mb-md col-12">
                    <div class="col-6">
                        <p class="fs-12 q-mb-sm">Tanggal Awal :</p>
                        <q-input
                            v-model="startDateMaxClaim"
                            type="date"
                            dense
                            outlined
                            hide-bottom-space
                            disable
                            />
                    </div>
                    <div class="col-6">
                        <p class="fs-12 q-mb-sm">Tanggal Akhir :</p>
                        <q-input
                            v-model="endDateMaxClaim"
                            type="date"
                            dense
                            outlined
                            hide-bottom-space
                            disable
                            />
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 m-auto">
                        Laporan TPR Barang
                    </div>
                    <div class="col-4 text-right">
                        <q-btn color="primary" v-if="tprBarang" no-caps @click="openFile('tpr_barang')" flat>
                            <span class="q-mr-sm">Lihat</span>
                            <q-img
                                src="~assets/icon/search_blue.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                            />
                        </q-btn>
                        <q-btn color="secondary" v-else no-caps @click="uploadFileType('tpr_barang')" flat>
                            <span class="q-mr-sm">Upload</span>
                            <q-img
                                src="~assets/icon/upload_orange.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                            />
                        </q-btn>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 m-auto">
                        Laporan TPR Uang
                    </div>
                    <div class="col-4 text-right">
                        <q-btn color="primary" v-if="tprUang" no-caps @click="openFile('tpr_uang')" flat>
                            <span class="q-mr-sm">Lihat</span>
                            <q-img
                                src="~assets/icon/search_blue.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                            />
                        </q-btn>
                        <q-btn color="secondary" v-else no-caps @click="uploadFileType('tpr_uang')" flat>
                            <span class="q-mr-sm">Upload</span>
                            <q-img
                                src="~assets/icon/upload_orange.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                            />
                        </q-btn>
                    </div>
                </div>

                <div class="row">
                    <div class="col-8 m-auto">
                        Faktur Pajak
                    </div>
                    <div class="col-4 text-right">
                        <q-btn color="primary" v-if="fakturPajak" no-caps @click="openFile('pajak')" flat>
                            <span class="q-mr-sm">Lihat</span>
                            <q-img
                                src="~assets/icon/search_blue.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                            />
                        </q-btn>
                        <q-btn color="secondary" v-else no-caps @click="uploadFileType('pajak')" flat>
                            <span class="q-mr-sm">Upload</span>
                            <q-img
                                src="~assets/icon/upload_orange.svg"
                                spinner-color="primary"
                                spinner-size="82px"
                                width="16px"
                                height="16px"
                            />
                        </q-btn>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <p class="fs-12 q-mb-none">Keterangan :</p>
                        <textarea name="" id="" cols="30" rows="3" placeholder="Masukan keterangan(Optional)" class="input-textarea fs-12 q-px-sm" v-model="description"></textarea>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions align="between" class="q-mb-lg q-pa-md">
                <q-btn color="secondary" label="Cancel" outline class="btn-one q-mr-md" no-caps unelevated v-close-popup/>
                <q-btn :disable="claimAmount == 0" label="Save" :color="claimAmount == 0 ? 'grey' : 'secondary'" class="btn-one q-mr-md" no-caps @click="saveClaim('draft')" unelevated/>
                <q-btn :disable="isSubmit" :color="isSubmit ? 'grey' : 'secondary'" label="Submit" class="btn-one q-mr-md" no-caps unelevated @click="saveClaim('submit')" />
            </q-card-actions>
        </q-card>
    </q-dialog>
    <upload-file v-model:upload="modalUpload" v-if="modalUpload" menu="claim" typeFileUpload=".pdf" @onUploadSuccess="callBackFuncFile"/>
</template>

<script>
import { defineAsyncComponent,ref,computed } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import { date } from 'quasar'
export default {
    components:{
        'select-dropdown' : defineAsyncComponent(()=>import('components/KlaimPromo/SelectDropdown')),
        'input-budget' : defineAsyncComponent(()=>import('components/Promo/InputBudget')),
        'upload-file' : defineAsyncComponent(()=>import('components/Modal/UploadFile'))
    },
    setup(props,{ emit }){
        const { colorStatusSpend,GeneralFormatDate,successNotif,errorNotif,showLoading,hideLoading } = useCustom()
        const { formatRibuan } = usePratesis()
        const { postData } = useService()
        const opsoId = ref("")
        const namaPromo = ref("")
        const startDate = ref("")
        const endDate = ref("")
        const kode_spend_type = ref(null)
        const active = ref(true)
        const claimAmount = ref(0)
        const budgetAmount = ref(0)
        const sisaBudgetAmount = computed(()=>{
            let result = parseInt(String(budgetAmount.value).replaceAll('.','')) - parseInt(String(claimAmount.value).replaceAll('.',''))
            return result ? formatRibuan(result) : 0
        })
        const startDateMaxClaim = ref("")
        const endDateMaxClaim = ref("")
        const fakturPajak = ref("")
        const tprBarang = ref("")
        const tprUang = ref("")
        const description = ref('')

        const promo_distributor_id = ref('')

        const isSubmit = computed(()=>{
            return !opsoId.value || claimAmount.value <= 0 || !fakturPajak.value || !tprBarang.value || !tprUang.value
        })

        function onSelected(val){
            namaPromo.value = val.nama_promo
            startDate.value = GeneralFormatDate(val.start_date,'YYYY-MM-DD')
            endDate.value = GeneralFormatDate(val.end_date,'YYYY-MM-DD')
            budgetAmount.value = formatRibuan(val.budget)
          //Calculation max date claim
            let startDateClaim = date.addToDate(val.end_date, { days: 1})
            let endDateClaim = date.addToDate(startDateClaim, { days: val.claim})
            startDateMaxClaim.value = GeneralFormatDate(startDateClaim,'YYYY-MM-DD')
            endDateMaxClaim.value = GeneralFormatDate(endDateClaim,'YYYY-MM-DD')
            kode_spend_type.value = val.kode_spend_type

            promo_distributor_id.value = val.id
        }

        const modalUpload = ref(false)
        const typeFile = ref('')
        function callBackFuncFile(val) {
            if(typeFile.value == "pajak") fakturPajak.value = val.res.data
            if(typeFile.value == "tpr_barang") tprBarang.value = val.res.data
            if(typeFile.value == "tpr_uang") tprUang.value = val.res.data
        }

        function uploadFileType(type) {
            typeFile.value = type
            modalUpload.value = true
        }

        function openFile(val) {
            let link =""
            if(val == "pajak") link = fakturPajak.value
            if(val == "tpr_barang") link = tprBarang.value
            if(val == "tpr_uang") link = tprUang.value
            window.open(link,'_blank')
        }

        function  saveClaim(type) {
            const payload = {
                promo_distributor_id: promo_distributor_id.value ,
                amount: parseInt(String(claimAmount.value).replaceAll('.','')),
                status: type,
                laporan_tpr_barang: tprBarang.value,
                laporan_tpr_uang: tprUang.value,
                faktur_pajak: fakturPajak.value,
                description: description.value
            }
            showLoading()
            postData(`/claim`,payload)
            .then(()=>{
                successNotif(`Berhasil menyimpan Claim`)
                emit('update:modalAdd',false)
                emit('reloadTable',{
                    pagination:{
                        page: 1
                    }
                })
                hideLoading()
            })
            .catch(err=>{
                errorNotif(err.response.data.message)
                emit('update:modalAdd',false)
                hideLoading()
            })
        }
        
        return {
            opsoId,namaPromo,
            colorStatusSpend,startDate,endDate,kode_spend_type,active,
            budgetAmount,claimAmount,sisaBudgetAmount,
            startDateMaxClaim,endDateMaxClaim,
            fakturPajak,tprBarang,tprUang,description,
            isSubmit,onSelected,
            modalUpload,typeFile,callBackFuncFile,openFile,uploadFileType,
            saveClaim,successNotif,errorNotif,showLoading,hideLoading
        }
    },
    props:{
        modalAdd:{
            type:Boolean
        },
    },
}
</script>