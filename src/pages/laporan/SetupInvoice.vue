<template>
    <breadcrumb  :upload="false" :leftside="false" @openModal="openUpload">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Laporan > Setup Invoice" style="color:#00000073;"/>
        </template>
    </breadcrumb>
    <div class="row q-pa-lg">
        <div class="col-5">
            <q-card flat>
                <q-card-section class="q-py-sm">
                    <div class="row justify-between items-center">
                        <p class="t-grey fs-18">Note Invoice</p>
                    </div>
                    <div class="row q-my-sm" v-for="i in 3" :key="i">
                        <div class="col-12">
                            <p class="fs-12 t-grey q-mb-sm">Message {{i}} :</p>
                            <textarea name="" id="" cols="30" rows="3" placeholder="Note Invoice" class="input-textarea fs-12 q-pa-sm"></textarea>
                        </div>
                    </div>
                    <div class="row q-mt-xl q-mb-md">
                        <div class="col-6">
                            <q-btn color="grey" outline label="Cancel" no-caps class="btn-one" unelevated/>
                        </div>
                        <div class="col-6 text-right">
                            <q-btn color="grey" label="Submit" no-caps class="btn-one" unelevated/>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-1"></div>
        <div class="col-5">
            <q-card flat class="col-11">
                <q-card-section class="q-py-sm">
                    <div class="row justify-between items-center">
                        <p class="fs-18">Setup Tanda Tangan</p>
                    </div>
                    <div class="row">
                        <div class="col-12 text-center">
                            <p class="q-mb-none fs-18">Upload Your File</p>
                        </div>
                        <div class="col-6 text-center">
                            <div class="wrapper-img">
                                <div class="row items-center justify-center body-img">
                                    <div class="row items-center justify-center content-img">
                                        <q-img
                                            src="~assets/icon/image-polaroid.svg"
                                            spinner-color="primary"
                                            spinner-size="5px"
                                            width="24px"
                                            height="24px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p class="q-mb-none fs-14">Dibuat oleh</p>
                            <q-btn color="grey" outline label="Joko Darwono" no-caps class="btn-one" unelevated/>
                        </div>
                        <div class="col-6 text-center">
                            <div class="wrapper-img">
                                <div class="row items-center justify-center body-img">
                                    <div class="row items-center justify-center content-img">
                                        <q-img
                                            src="~assets/icon/image-polaroid.svg"
                                            spinner-color="primary"
                                            spinner-size="5px"
                                            width="24px"
                                            height="24px"
                                        />
                                    </div>
                                </div>
                            </div>
                            <p class="q-mb-none fs-14">Disetujui oleh</p>
                            <q-btn color="grey" outline label="Joko Darwono" no-caps class="btn-one" unelevated/>
                        </div>
                        <div class="col-12 text-center q-my-lg">
                            <q-btn color="secondary" label="Submit" no-caps class="btn-one" unelevated/>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
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
.wrapper-img {
    margin: 20px 0px 15px 0px;
    max-width:1500px;
    max-height:180px;
    overflow-x:auto;
}
.body-img {
    width:180px;
    height:180px;
    background: #F7FAFE;
    border: 1px solid #D4DEEC;
    margin: auto;
}
.content-img {
    width:80px;
    height:80px;
    border: 1px dashed #B7C4D6;
    border-radius: 5px;
}
</style>
<script>
import { defineAsyncComponent,ref,watch } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'
import { useService } from 'src/composeables/useService'

export default {
    data() {
        return {
            dialogDetail: false,
            isInvoice: false,
            filter: {
                area_id: ""
            }
        }
    },
    setup(){
        const { formatRibuan, modalUpload, reloadTable, openUpload } = usePratesis()
        const klaim = [
            { name: 'kode', label: 'Coding ULI', align: 'left', field: 'kode_brand' },
            { name: 'nama_brand',  align: 'left',label: 'Ket', field: 'nama_brand'},
            { name: 'produk_aktif',  align: 'left',label: 'Tanggal Kirim', field: 'produk_aktif'},
            { name: 'kode', label: 'Tanggal Terima', align: 'left', field: 'kode_brand' },
            { name: 'budget',  align: 'left',label: 'Rp Klaim', field: row => `${formatRibuan(row.budget_brand)}`},
            { name: 'kode',  align: 'left',label: 'PPN', field: 'kode'},
            { name: 'budget',  align: 'left',label: 'PPH', field: row => `${formatRibuan(row.budget_brand)}`},
            { name: 'budget',  align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.budget_brand)}`},
            { name: 'actions',align:'left',label:'Status',field:'kode_brand'}
        ]
        const isInvoice = ref(false)
        return {
            openUpload,
            modalUpload,
            reloadTable,
            formatRibuan,
            klaim
        }
    },
    methods: {
        openSidebarModal() {
            this.dialogDetail = true;
        }
    },
    components:{
        // 'select-dropdown' : defineAsyncComponent(()=> import('components/SelectDropdown')),
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        // 'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        // 'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['SA','DI'].indexOf(role) >= 0 ? '' : role
        },
    },
}
</script>