<template>
    <breadcrumb  :upload="true" :leftside="false" @openModal="openUpload">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Klaim" style="color:#00000073;"/>
        </template>
    </breadcrumb>
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card class="own-card q-mb-lg" flat>
                <q-card-section>
                    <div class="row items-end">
                        <div class="col-3">
                            <div class="q-pr-md">
                                <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="Distributor :"/>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="q-pl-md">
                                <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="Status Klaim :"/>
                            </div>
                        </div>
                        <div class="col-6 text-right">
                            <q-btn color="primary"  no-caps class="btn-one q-mr-md" unelevated >
                                Sortir
                            </q-btn>
                        </div>
                    </div>
                </q-card-section>
            </q-card>
        </div>
        <div class="col-12">
            <core-table
                :url="`promo/3/product`"
                :columns="klaim"
                :canOpenDetail="false">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="content-title">
                        </div>
                    </div>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td key="action" :props="props">
                        <q-btn color="positive" outline  no-caps class="btn-one q-mr-md" unelevated @click="openSidebarModal">
                            Sudah dibayar
                        </q-btn>
                    </q-td>
                </template>
            </core-table>
            <q-dialog v-model="dialogDetail" position="right" full-height class="dialog-detail">
                <q-card :style="{height:'100%',width: '500px'}">
                    <div  style="padding: 0 20px;">
                        <q-card-section class="row items-start q-pb-none q-pl-none" >
                            <div class="text-h6">{{$route.name}} Detail </div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <div class="row q-my-sm">
                            <div class="col-12 wrapper-primary">
                                <p class="fs-10 q-mb-none">Keterangan :</p>
                                <span class="fs-12">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Porta in et tristique magna vehicula porta natoque.</span>
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Code ULI
                            </div>
                            <div class="col-6 text-right">
                                10219919299991000129
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                               Tanggal Kirim
                            </div>
                            <div class="col-6 text-right">
                                10 Nov 2011
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Tanggal Terima
                            </div>
                            <div class="col-6 text-right">
                                15 Nov 2011
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Klaim
                            </div>
                            <div class="col-6 text-right">
                                100.000.000.000
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Total PPN
                            </div>
                            <div class="col-6 text-right">
                                25.000
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Total PPh
                            </div>
                            <div class="col-6 text-right">
                                0,00
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Dibayar
                            </div>
                            <div class="col-6 text-right">
                                1.000.000.000
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Status
                            </div>
                            <div class="col-6 text-right">
                                <q-btn color="positive" size="sm"  outline no-caps unelevated >
                                Layak bayar
                                </q-btn>
                            </div>
                        </div>
                        <div class="row wrapper-child q-my-sm">
                            <div class="col-8 fs-12">
                                Bukti bayar
                            </div>
                            <div class="col-4 fs-12 text-right pointer" @click="openUpload">
                                <span class="align-middle q-mr-sm t-secondary pointer" @click="isInvoice = true">Upload</span>
                                <img src="~assets/icon/upload_docs.svg" alt="" class="align-middle">
                            </div>
                        </div>
                        <div class="row q-mt-lg">
                            <div class="col-6 fs-14">
                                <q-btn color="secondary" outline  no-caps unelevated>
                                    Cancel
                                </q-btn>
                            </div>
                            <div class="col-6 text-right text-primary">
                                <q-btn color="secondary"  no-caps unelevated>
                                    Submit
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </q-card>
            </q-dialog>
        </div>
        <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" @onUploadSuccess="reloadTable"/>
    </div>
</template>
<style>
.q-dialog__inner--minimized > div {
    max-width: 1000px;
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
import { defineAsyncComponent,ref,watch,onMounted } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'
import { useService } from 'src/composeables/useService'

export default {
    data() {
        return {
            dialogDetail: true,
            isInvoice: false,
            filter: {
                area_id: ""
            }
        }
    },
    setup(){
        const { formatRibuan, modalUpload, reloadTable, openUpload } = usePratesis()
        const { getData } = useService()
        onMounted(()=>{
            getData('laporan-claim?level=depot')
            .then(res=>{
                console.log('laporan claim,',res);
            })
        })
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
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
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