<template>
<q-dialog :modelValue="modalDetail" @hide="$emit('update:modalDetail',false)" position="right" full-height class="dialog-detail">
    <q-card :style="{height:'100%',width: isInvoice ? '800px' : '400px'}">
        <q-card-section class="row justify-center q-mt-xl" v-if="!load" style="height:100%;">
                <q-spinner-grid class="col-4 text-primary"/>
                <span class="col-12 text-primary font-medium text-center">Memuat Data</span>
        </q-card-section>
            <div class="row" v-else>
                <div class="col-6" style="border-right: 3px solid #ebebeb;" v-if="isInvoice">
                    <invoice v-model:isInvoice="isInvoice" v-model:details="detail"/>
                </div>
                <div :class="isInvoice ? 'col-6' : 'col-12'">
                    <q-card-section class="row items-start q-pb-none q-px-lg">
                        <div class="text-h6">Klaim Detail </div>
                        <q-space />
                        <q-btn icon="close" flat round dense v-close-popup />
                    </q-card-section>
                    <div :class="Approval ? 'klaim-needapprove' : 'klaim'">
                        <q-scroll-area class="fit">
                            <q-card-section class="q-px-lg">

                            <div class="row q-mb-md">
                                <div class="col-12 wrapper-primary">
                                    <p class="fs-10 q-mb-none">Keterangan :</p>
                                    <span>{{detail.description ? detail.description : 'Tidak Ada Deskripsi'}}</span>
                                </div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Distributor</div>
                                <q-space />
                                <div>{{detail.nama_distributor}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Status</div>
                                <q-space />
                                <div>{{detail.status}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Code ULI</div>
                                <q-space />
                                <div>{{detail.kode_uli}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Tanggal</div>
                                <q-space />
                                <div>{{GeneralFormatDate(detail.created_at,'DD MMM YYYY')}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Jenis Kegiatan</div>
                                <q-space />
                                <div>{{detail.jenis_kegiatan}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Total</div>
                                <q-space />
                                <div>{{formatRibuan(detail.amount)}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Total PPN</div>
                                <q-space />
                                <div>{{formatRibuan(detail.ppn_amount)}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Total PPh</div>
                                <q-space />
                                <div>{{formatRibuan(detail.pph_amount)}}</div>
                            </div>
                            <div class="row q-my-sm">
                                <div>Total Net</div>
                                <q-space />
                                <div>{{formatRibuan(detail.total_amount)}}</div>
                            </div>
                            <div class="row items-center q-mt-md bg-primary4" style="border-radius: 8px;
                                padding: 5px 10px;">
                                <div>Invoice (Tanpa Materai)</div>
                                <q-space />
                                <q-btn color="primary" no-caps @click="isInvoice = true" flat dense>
                                    <span class="q-mr-sm">Lihat Invoice</span>
                                    <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                </q-btn>
                            </div>
                            <div class="row items-center q-mt-md bg-primary4" style="border-radius: 8px;
                                padding: 5px 10px;">
                                <div>Laporan TPR Barang</div>
                                <q-space />
                                <q-btn color="primary" no-caps flat dense v-if="tprBarang" type="a" :href="tprBarang" target="_blank" download>
                                    <span class="q-mr-sm">Lihat </span>
                                    <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                </q-btn>
                                <q-btn color="secondary" no-caps @click="uploadFileType('tpr_barang')" flat v-if="detail.status == 'draft' && !tprBarang" dense>
                                    <span class="q-mr-sm">Upload</span>
                                    <img src="~assets/icon/upload_orange.svg" alt="" class="align-middle">
                                </q-btn>
                                <q-btn color="secondary" no-caps @click="uploadFileType('tpr_barang')" flat v-if="detail.status == 'reject' && role == 'DI'" dense>
                                    <span class="q-mr-sm">Reupload</span>
                                    <img src="~assets/icon/upload_orange.svg" alt="" class="align-middle">
                                </q-btn>
                            </div>
                            <div class="row items-center q-mt-md bg-primary4" style="border-radius: 8px;
                                padding: 5px 10px;">
                                <div>Laporan TPR Uang</div>
                                <q-space />
                                <q-btn color="primary" no-caps flat dense v-if="tprUang" type="a" :href="tprUang" target="_blank" download>
                                    <span class="q-mr-sm">Lihat </span>
                                    <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                </q-btn>
                                <q-btn color="secondary" no-caps @click="uploadFileType('tpr_uang')" flat v-if="detail.status == 'draft' && !tprUang" dense>
                                    <span class="q-mr-sm">Upload</span>
                                    <img src="~assets/icon/upload_orange.svg" alt="" class="align-middle">
                                </q-btn>
                                <q-btn color="secondary" no-caps @click="uploadFileType('tpr_uang')" flat v-if="detail.status == 'reject' && role == 'DI'" dense>
                                    <span class="q-mr-sm">Reupload</span>
                                    <img src="~assets/icon/upload_orange.svg" alt="" class="align-middle">
                                </q-btn>
                            </div>
                            <div class="row items-center q-mt-md bg-primary4" style="border-radius: 8px;
                                padding: 5px 10px;">
                                <div>Faktur Pajak</div>
                                <q-space />
                                <q-btn color="primary" no-caps flat dense v-if="fakturPajak" type="a" :href="fakturPajak" target="_blank" download>
                                    <span class="q-mr-sm">Lihat </span>
                                    <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                </q-btn>
                                <q-btn color="secondary" no-caps @click="uploadFileType('faktur_pajak')" flat v-if="detail.status == 'draft' && !fakturPajak" dense>
                                    <span class="q-mr-sm">Upload</span>
                                    <img src="~assets/icon/upload_orange.svg" alt="" class="align-middle">
                                </q-btn>
                                <q-btn color="secondary" no-caps @click="uploadFileType('faktur_pajak')" flat v-if="detail.status == 'reject' && role == 'DI'" dense>
                                    <span class="q-mr-sm">Reupload</span>
                                    <img src="~assets/icon/upload_orange.svg" alt="" class="align-middle">
                                </q-btn>
                            </div>
                            <div class="row q-mt-md bg-primary4" style="border-radius: 8px;
                                padding: 5px 10px;height:130px;overflow-y:auto;" v-if="role === 'DI' || detail.status == 'reject'">
                                <div class="fs-12 text-grey1">Alasan Penolakan :</div>
                                <q-space />
                                <div class="fs-12 text-grey1">{{detail.alasan}}</div>
                            </div>
                            <div class="row q-my-sm" v-if="role === 'GA' && detail.status == 'submit'">
                                <div class="col-12">
                                    <p class="fs-12 q-mb-none">Alasan penolakan :</p>
                                    <textarea name="" id="" cols="30" rows="2" placeholder="Masukan alasan penolakan..." class="input-textarea fs-12" v-model="alasan"></textarea>
                                </div>
                            </div>

                            </q-card-section>
                        </q-scroll-area>
                        <q-card-section v-if="Approval" class="q-px-lg">
                            <div class="row justify-between q-pt-sm" v-if="['draft','reject'].indexOf(detail.status) >= 0">
                                <q-btn color="secondary" label="Cancel" outline no-caps unelevated class="q-px-sm btn-one" v-close-popup />
                                <q-btn color="secondary" label="Save" no-caps unelevated class="q-px-sm btn-one" @click="saveClaim('draft')" v-if="detail.status == 'draft'"/>
                                <q-btn :disable="isSubmit" :color="isSubmit ? 'grey' : 'secondary'" label="Submit" no-caps unelevated class="q-px-sm btn-one" @click="saveClaim('submit')"/>
                            </div>
                            <div class="row justify-between q-pt-sm" v-if="detail.status == 'submit' && role == 'GA'">
                                <q-btn color="secondary" label="Reject" outline no-caps unelevated class="q-px-sm btn-one" @click="onApproval('reject')" />
                                <q-btn color="secondary" label="Approve" no-caps unelevated class="q-px-sm btn-one" @click="onApproval('approve')"/>
                            </div>
                        </q-card-section>
                    </div>
                </div>
            </div>
    </q-card>
</q-dialog>
<upload-file v-model:upload="modalUpload" v-if="modalUpload" menu="claim" typeFileUpload=".pdf" @onUploadSuccess="callBackFuncFile" />
</template>

<script>
import { ref,computed,defineAsyncComponent } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
export default {
    setup(props,{emit}){
        const isInvoice = ref(false)
        const { GeneralFormatDate,showLoading,hideLoading,successNotif,errorNotif } = useCustom()
        const { formatRibuan,role } = usePratesis()
        const { getData,putData } = useService()
        const detail = ref({})
        const load = ref(false)
        

        const Approval = computed(()=>{
            if (['draft','reject'].indexOf(detail.value.status) >= 0 && role.value == 'DI') {
                return true
            }else if(detail.value.status == 'submit' && role.value == 'GA'){
                return true
            }else{
                return false
            }
        })

        const modalUpload = ref(false)
        const typeFile = ref('')
        const fakturPajak = ref('')
        const tprBarang = ref('')
        const tprUang = ref('')

        getData(`claim/${props.dataDetail.id}`)
        .then(res=>{
            let result = res.data.data
            detail.value = result
            load.value = true
            fakturPajak.value = result.faktur_pajak ?? ''
            tprBarang.value = result.laporan_tpr_barang ?? ''
            tprUang.value = result.laporan_tpr_uang ?? ''
        })

        function callBackFuncFile(val) {
            if(typeFile.value == "faktur_pajak") fakturPajak.value = val.res.data
            if(typeFile.value == "tpr_barang") tprBarang.value = val.res.data
            if(typeFile.value == "tpr_uang") tprUang.value = val.res.data
        }

        function uploadFileType(type) {
            typeFile.value = type
            modalUpload.value = true
        }


        const isSubmit = computed(()=>{
            return !fakturPajak.value || !tprBarang.value || !tprUang.value
        })

        const sendToApi = (url,payload) => {
            showLoading()
            putData(url,payload)
            .then(()=>{
                successNotif(`Berhasil update Klaim`)
                emit('update:modalDetail',false)
                emit('reloadTable',{
                    pagination:{
                        page: 1
                    }
                })
                hideLoading()
            })
            .catch(err=>{
                errorNotif(err?.response?.data?.message)
                hideLoading()
                emit('update:modalDetail',false)
            })
        }

        function  saveClaim(type) {
            const payload = {
                status: type,
                promo_distributor_id: detail.value.promo_distributor_id,
                laporan_tpr_barang : tprBarang.value, 
                laporan_tpr_uang : tprUang.value, 
                faktur_pajak : fakturPajak.value 
            }
            sendToApi(`/claim/${detail.value.id}`,payload)
        }

        const alasan = ref('')
        function onApproval(type){
            const payload = {
                status: type,
                alasan: alasan.value
            }
            sendToApi(`/claim/${detail.value.id}/status`,payload)
        }

        return {
            isInvoice,GeneralFormatDate,formatRibuan,detail,load,
            Approval,role,
            tprUang,tprBarang,fakturPajak,modalUpload,
            callBackFuncFile,uploadFileType,isSubmit,
            saveClaim,
            showLoading,hideLoading,successNotif,errorNotif,typeFile,

            alasan,onApproval
        }
    },
    props:{
        modalDetail:{
            type:Boolean
        },
        dataDetail:{
            type:Object
        }
    },
    components:{
        'upload-file' : defineAsyncComponent(()=>import('components/Modal/UploadFile')),
        'invoice' : defineAsyncComponent(()=>import('./Invoice'))
    }
}
</script>

<style>
.klaim-needapprove{
    display: grid;
    grid-template-rows:auto 20px; 
    height: calc(100vh - 100px);
}
.klaim{
    display: grid;
    grid-template-rows:auto; 
    height: calc(100vh - 70px);
}

</style>