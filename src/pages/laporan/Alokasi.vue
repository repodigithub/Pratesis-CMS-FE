<template>
    <breadcrumb  :upload="false" :leftside="false" @openModal="openUpload">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Laporan > Setup Invoice" style="color:#00000073;"/>
        </template>
    </breadcrumb>
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card flat>
                <q-card-section class="q-py-sm">
                    <div class="row justify-between items-center">
                        <p class="fs-18">Alokasi Budget</p>
                    </div>
                    <div class="row q-mx-none">
                        <div class="col-4 q-pr-md">
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">Area</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-12 q-mt-md">
                                        <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="" class="bg-white" :placeHold="'E4135 - ASM JAKARTA EAST'"/>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">Opso</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input placeholder="ex. 3124" dense outlined class="bg-white">
                                            <template v-slot:append>
                                                <img  src="~assets/icon/docs_grey.svg" alt="">
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-2 text-center m-auto">
                                        <img  src="~assets/icon/rectangle.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input placeholder="ex. 3224" dense outlined class="bg-white">
                                            <template v-slot:append>
                                                <img  src="~assets/icon/docs_grey.svg" alt="">
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">Spend Type</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-12 q-mt-md">
                                        <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="" class="bg-white" :placeHold="'Select Spend Type'"/>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">Distributor</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input placeholder="ex. 3124" dense outlined class="bg-white">
                                            <template v-slot:append>
                                                <img  src="~assets/icon/docs_grey.svg" alt="">
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-2 text-center m-auto">
                                        <img  src="~assets/icon/rectangle.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input placeholder="ex. 3224" dense outlined class="bg-white">
                                            <template v-slot:append>
                                                <img  src="~assets/icon/docs_grey.svg" alt="">
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">Customer Level</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-12 q-mt-md">
                                        <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="" class="bg-white" :placeHold="'Select Customer Level'"/>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">Start Date</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input
                                            class="bg-white"
                                            v-model="filter.start_date"
                                            type="date"
                                            dense
                                            outlined
                                            hide-bottom-space/>
                                    </div>
                                    <div class="col-2 text-center m-auto">
                                        <img  src="~assets/icon/rectangle.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input
                                            class="bg-white"
                                            v-model="filter.start_date"
                                            type="date"
                                            dense
                                            outlined
                                            hide-bottom-space/>
                                    </div>
                                </div>
                            </div>
                            <div class="bg-auth wrapper-init">
                                <div class="row">
                                    <div class="col-9">
                                        <span class="t-grey">End Date</span>
                                    </div>
                                    <div class="col-3 text-right">
                                        <img  src="~assets/icon/minus.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input
                                            class="bg-white"
                                            v-model="filter.start_date"
                                            type="date"
                                            dense
                                            outlined
                                            hide-bottom-space/>
                                    </div>
                                    <div class="col-2 text-center m-auto">
                                        <img  src="~assets/icon/rectangle.svg" alt="">
                                    </div>
                                    <div class="col-5 q-mt-md">
                                        <q-input
                                            class="bg-white"
                                            v-model="filter.start_date"
                                            type="date"
                                            dense
                                            outlined
                                            hide-bottom-space/>
                                    </div>
                                </div>
                            </div>
                            <div class="row q-mt-xl">
                                <div class="col-6">
                                    <q-btn color="secondary" outline label="Reset" no-caps unelevated/>
                                </div>
                                <div class="col-6 text-right">
                                    <q-btn color="secondary" label="Apply" no-caps unelevated/>
                                </div>
                            </div>
                        </div>
                        <div class="col-8 q-pl-lg" style="border-left: 1px solid #B7C4D6;">
                            <div class="bg-auth text-center q-py-xl">
                                <p class="fs-18 q-mb-xl">Your data Has been found</p>
                                <div class="wrapper-file">
                                    <img  src="~assets/icon/file-chart-line.svg" alt="" class="q-mb-md">
                                    <p class="t-grey fs-10 q-mb-none">200145 Data(s) found</p>
                                </div>
                                <q-btn color="secondary" no-caps unelevated class="q-mt-lg">
                                     <img  src="~assets/icon/download_white.svg" alt="" class="q-mr-sm">
                                    <span>Export</span>
                                </q-btn>
                            </div>
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
.wrapper-file {
    background: #BAD8FF;
    width: 400px;
    margin: auto;
    padding: 50px 0px;
    border-radius: 5px;
}
.wrapper-init {
    padding: 10px 10px 30px 10px;
    border-bottom: 1px solid #fff;
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
                area_id: "",
                start_date: new Date()
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
        'select-dropdown' : defineAsyncComponent(()=> import('components/SelectDropdown')),
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