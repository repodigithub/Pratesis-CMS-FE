<template>
<q-page>
    <breadcrumb  :upload="true" :leftside="false" @openModal="openUpload">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Klaim" style="color:#00000073;"/>
        </template>
    </breadcrumb>
    <div class="row q-pa-lg">
        <div class="col-12">
            <core-table
                :url="`claim?level=depot`"
                :columns="klaim"
                :canOpenDetail="false">
                <template v-slot:toptable>
                    <div class="row">
                        <div class="col-6">
                             <div class="font-medium">Klaim</div>
                        </div>
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <q-btn :color="props.row.status == 'approve' ? 'positive' :'negative'" outline  no-caps class="btn-one q-mr-md txt-capitalize" unelevated @click="openSidebarModal(props.row)">
                            {{props.row.status}}
                        </q-btn>
                        <!-- <q-img
                            src="~assets/icon/check.svg"
                            spinner-color="primary"
                            spinner-size="5px"
                            width="20px"
                            height="20px"
                        /> -->
                    </q-td>
                </template>
            </core-table>
            <q-dialog v-model="dialogDetail" position="right" full-height class="dialog-detail">
                <q-card :style="{height:'100%',width: isInvoice ? '1000px' : '500px'}">
                    <div  style="padding: 0 15px;">
                        <div class="row">
                            <div class="col-6 q-pr-sm" style="border-right: 1px solid #ebebeb;" v-if="isInvoice">
                                <q-card-section class="row items-start q-pb-none q-px-none" >
                                    <div class="text-h6">Invoice (Tanpa Materai)</div>
                                        <q-space />
                                    <img src="~assets/icon/arrow_blue.svg" alt="" width="17" style="margin-top:8px;" class="pointer" @click="isInvoice = false">
                                </q-card-section>
                                <div class="row q-mt-md" style="background: #2684FF; height: 14px;"></div>
                                <div class="row q-my-md">
                                    <div class="col-8 fs-14">
                                       <p class="q-mb-none">{{details.nama_distributor}}</p>
                                       <p style="color: #8195AF;" class="fs-12 q-mb-none">Kode Distributor : {{details.nama_distributor}}</p>
                                       <p style="color: #8195AF;" class="fs-12 q-mb-none"><img src="~assets/icon/calendar.svg" alt="" class="align-middle q-mr-sm"><span class="align-middle">{{promoTgl(details.created_at)}}</span></p>
                                    </div>
                                    <div class="col-4 text-right">
                                        <p style="color: #8195AF;" class="fs-10 q-mb-none">Nomor Invoice</p>
                                        <p class="fs-14">36474829927</p>
                                    </div>
                                </div>
                                <div class="row q-px-sm" style="background: #F7FAFE; height: 44px;align-items: center;">
                                    <div class="col-6">
                                        Nama Promo
                                    </div>
                                    <div class="col-6 text-right">
                                        Klaim (Rp)
                                    </div>
                                </div>
                                <div class="row q-px-sm">
                                    <div class="col-9 fs-12">
                                        <p class="q-mb-none">{{details.nama_promo}}</p>
                                        <p class="q-mb-none">OPSO ID {{details.opso_id}}</p>
                                        <p><img src="~assets/icon/calendar_blue.svg" alt="" class="align-middle q-mr-sm"> <span class="align-middle">{{promoTgl(details.start_date)}} - {{promoTgl(details.end_date)}}</span></p>
                                    </div>
                                    <div class="col-3 fs-12 text-right" style="margin: auto;">
                                        Rp {{formatRibuan(details.amount)}}
                                    </div>
                                </div>
                                <div class="row q-px-sm">
                                    <div class="col-5">
                                    </div>
                                    <div class="col-7 fs-12">
                                        <div class="row q-my-sm">
                                            <div class="col-4">
                                                Subtotal
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp {{formatRibuan(details.amount)}}
                                            </div>
                                        </div>
                                        <div class="row q-my-sm">
                                            <div class="col-4">
                                                PPN
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp {{formatRibuan(details.ppn_amount)}}
                                            </div>
                                        </div>
                                        <div class="row q-my-sm">
                                            <div class="col-4">
                                                PPH
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp {{formatRibuan(details.pph_amount)}}
                                            </div>
                                        </div>
                                         <div class="row q-my-sm">
                                            <div class="col-4">
                                                Total
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp {{formatRibuan(details.total_amount)}}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <p class="q-mb-none">Note :</p>
                                    <ul style="list-style: none;" class="q-pl-none fs-12">
                                        <li>1. Klaim diterima Unilever paling lambat 30 hari setelah kegiatan berakhir</li>
                                        <li>2. Nilai maksimal yang dibayarkan oleh Unilever adalah sebesar budget promosi</li>
                                        <li>3. Kelebihan nilai klaim dari budget menjadi tanggunan distributor/concess/store</li>
                                    </ul>
                                </div>
                                <div class="row">
                                    <div class="col-6 text-center">
                                        <p class="q-mb-none">Dibuat oleh</p>
                                        <img src="~assets/icon/ttd_1.svg" alt="" width="100">
                                        <p>DSS/OM</p>
                                    </div>
                                    <div class="col-6 text-center">
                                        <p class="q-mb-none">Menyetujui</p>
                                        <img src="~assets/icon/ttd_2.svg" alt="" width="100">
                                        <p>AASM</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-12 text-center">
                                        <q-btn color="secondary"  no-caps unelevated>Print</q-btn>
                                    </div>
                                </div>
                            </div>
                            <div class="q-px-sm" :class="isInvoice ? 'col-6' : 'col-12'">
                                <q-card-section class="row items-start q-pb-none q-px-none" >
                                    <div class="text-h6">Klaim Detail</div>
                                        <q-space />
                                    <img src="~assets/icon/close_orange.svg" alt="" width="17" style="margin-top:8px;" v-close-popup>
                                </q-card-section>
                                <div class="row q-my-sm">
                                    <div class="col-12 wrapper-primary">
                                        <p class="fs-10 q-mb-none">Keterangan :</p>
                                        <span class="fs-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta in et tristique magna vehicula porta natoque.</span>
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Distributor
                                    </div>
                                    <div class="col-6 fs-12 text-right">
                                        {{details.nama_distributor}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Status
                                    </div>
                                    <div class="col-6 text-right">
                                        {{details.status}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Code ULI
                                    </div>
                                    <div class="col-6 text-right">
                                        {{details.kode_uli}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Tanggal
                                    </div>
                                    <div class="col-6 text-right">
                                        {{promoTgl(details.created_at)}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Jenis Kegiatan
                                    </div>
                                    <div class="col-6 text-right">
                                        {{details.jenis_kegiatan}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total
                                    </div>
                                    <div class="col-6 text-right">
                                        {{formatRibuan(details.total_amount)}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total PPN
                                    </div>
                                    <div class="col-6 text-right">
                                        {{formatRibuan(details.ppn_amount)}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total PPh
                                    </div>
                                    <div class="col-6 text-right">
                                        {{formatRibuan(details.pph_amount)}}
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total Net
                                    </div>
                                    <div class="col-6 text-right">
                                        {{formatRibuan(details.total_amount)}}
                                    </div>
                                </div>
                                <div class="row wrapper-child q-my-sm">
                                    <div class="col-8 fs-12">
                                        Invoice (Tanpa Materai)
                                    </div>
                                    <div class="col-4 fs-12 text-right">
                                        <span class="align-middle q-mr-sm t-primary pointer" @click="isInvoice = true">Lihat Invoice</span>
                                        <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                    </div>
                                </div>
                                <div class="row wrapper-child q-my-sm">
                                    <div class="col-8 fs-12">
                                        Laporan TPR Barang
                                    </div>
                                    <div class="col-4 fs-12 text-right">
                                        <span class="align-middle q-mr-sm t-primary">Lihat</span>
                                        <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                    </div>
                                </div>
                                <div class="row wrapper-child q-my-sm">
                                    <div class="col-8 fs-12">
                                        Laporan TPR Uang
                                    </div>
                                    <div class="col-4 fs-12 text-right">
                                        <span class="align-middle q-mr-sm t-primary">Lihat</span>
                                        <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                    </div>
                                </div>
                                <div class="row wrapper-child q-my-sm">
                                    <div class="col-8 fs-12">
                                        Faktur Pajak
                                    </div>
                                    <div class="col-4 fs-12 text-right">
                                        <span class="align-middle q-mr-sm t-primary">Lihat</span>
                                        <img src="~assets/icon/file_blue.svg" alt="" class="align-middle">
                                    </div>
                                </div>
                                <div class="row q-my-sm">
                                    <div class="col-12">
                                        <p class="fs-12 q-mb-none">Alasan penolakan :</p>
                                        <textarea name="" id="" cols="30" rows="2" placeholder="Masukan alasan penolakan..." class="input-textarea fs-12" v-model="alasan"></textarea>
                                    </div>
                                </div>
                                <div class="row q-my-md">
                                    <div class="col-6 fs-14">
                                        <q-btn color="secondary" outline  no-caps unelevated @click="submitClaim('reject')">
                                            Reject
                                        </q-btn>
                                    </div>
                                    <div class="col-6 text-right text-primary">
                                        <q-btn color="secondary"  no-caps unelevated @click="submitClaim('approve')">
                                            Approve
                                        </q-btn>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </q-card>
            </q-dialog>
        </div>
    </div>
    <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="'claim'" @onUploadSuccess="callBackFuncFile"/>
</q-page>
</template>
<style>
.q-dialog__inner--minimized > div {
    max-width: 1000px;
}
.wrapper-primary {
    border: 1px solid #2684FF;
    border-radius: 8px;
    padding: 10px;
    background: #F3F8FF;
}
.wrapper-child {
    background: #F3F8FF;
    border-radius: 8px;
    padding: 5px 10px;
}
.input-textarea {
    display: block;
    border: 1px solid #B7C4D6;
    width: 100%;
    border-radius: 4px;
}
</style>
<script>
import { defineAsyncComponent,ref,watch, computed } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'
import { useService } from 'src/composeables/useService'

export default {
    data() {
        return {
            isInvoice: false
        }
    },
    setup(){
        const description = ref("")
        const claimAmount = ref(0)
        const sisaBudgetAmount = ref(0)
        const budgetAmount = ref(0)
        const fakturPajak = ref("")
        const tprBarang = ref("")
        const tprUang = ref("")
        const typeFile = ref("")
        const opsoId = ref("")
        const dialogDetail = ref(false)
        const addNewModal = ref(false)
        const details = ref({})
        const alasan = ref('')
        const { promoTgl, successNotif, errorNotif } = useCustom()
        const { getData, postData, putData } = useService()
        const { formatRibuan, openUpload, modalUpload } = usePratesis()
        const klaim = [
            { name: 'kode_distributor', label: 'Kode Distributor', align: 'left', field: 'kode_distributor' },
            { name: 'nama_distributor',  align: 'left',label: 'Nama Distributor', field: 'nama_distributor'},
            { name: 'kode_uli',  align: 'left',label: 'Coding ULI', field: 'kode_uli'},
            { name: 'created_at', label: 'Tanggal', align: 'left', field: row => `${promoTgl(row.created_at)}`},
            { name: 'jenis_kegiatan',  align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'claim',  align: 'left',label: 'Rp. Klaim', field: row => `${formatRibuan(row.claim)}`},
            { name: 'amount',  align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.amount)}`},
            { name: 'status',align:'left',label:'Status',field:'status'}
        ]
        function openSidebarModal(row){
            getData(`claim/${row.id}`).then(res=>{
                details.value = res.data.data;
                dialogDetail.value = true;
            })
        }
        function submitClaim(type){
            const payload =
            {
                status: type,
                alasan: alasan.value
            }
            putData(`/claim/${details.value.id}/status`,payload)
            .then(res=>{
                if(res.status == 200) {
                    successNotif(`Berhasil ${type} Claim`)
                    dialogDetail.value = false;
                }
            })
            .catch(err=>{
                console.log('err',err)
            })
        }
        function createNew() {
            addNewModal.value = true
        }
        function callBackFuncFile(val) {
            if(typeFile.value == "pajak") fakturPajak.value = val.res.data
            if(typeFile.value == "tpr_barang") tprBarang.value = val.res.data
            if(typeFile.value == "tpr_uang") tprUang.value = val.res.data
        }
        function openFile(val) {
            let link =""
            if(typeFile.value == "pajak") link = fakturPajak.value
            if(typeFile.value == "tpr_barang") link = tprBarang.value
            if(typeFile.value == "tpr_uang") link = tprUang.value
            window.open(link,'_blank');
        }
        function uploadFileType(type) {
            typeFile.value = type
            openUpload()
        }
        function  saveClaim(type) {
            const payload = {
                promo_distributor_id: opsoId.value,
                amount: claimAmount.value,
                status: type,
                laporan_tpr_barang: tprBarang.value,
                laporan_tpr_uang: tprUang.value,
                faktur_pajak: fakturPajak.value,
                description: description.value
            }
            postData(`/claim`,payload)
            .then(res=>{
                if(res.status == 200) {
                    successNotif(`Berhasil menyimpan Claim`)
                    addNewModal.value = false;
                }
            })
            .catch(err=>{
                errorNotif(err.response.data.message)
                addNewModal.value = false;
            })
        }
        const isSubmit = computed(()=>{
            return !opsoId.value || claimAmount.value <= 0 || !fakturPajak.value || !tprBarang.value || !tprUang.value
        })
        const isInvoice = ref(false)
        return {
            fakturPajak,
            tprBarang,
            tprUang,
            openFile,

            //amount
            claimAmount,
            sisaBudgetAmount,
            budgetAmount,

            isSubmit,
            saveClaim,
            description,
            opsoId,
            uploadFileType,
            callBackFuncFile,
            createNew,
            addNewModal,
            modalUpload,
            openUpload,
            alasan,
            submitClaim,
            promoTgl,
            details,
            dialogDetail,
            openSidebarModal,
            formatRibuan,
            klaim
        }
    },
    components:{
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['SA','DI'].indexOf(role) >= 0 ? '' : role
        },
    },
}
</script>