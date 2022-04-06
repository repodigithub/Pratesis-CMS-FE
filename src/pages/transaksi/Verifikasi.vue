<template>
<q-page>
    <div class="row q-pa-lg">
        <div class="col-12">
            <core-table
                :url="`promo/3/product`"
                :columns="klaim"
                :canOpenDetail="false">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="content-title">
                            <div class="font-medium">Klaim</div>
                        </div>
                    </div>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td key="action" :props="props">
                        <q-btn color="positive" outline  no-caps class="btn-one q-mr-md" unelevated @click="openSidebarModal">
                            Submit
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
                                       <p class="q-mb-none">PT. Makmur Jaya</p>
                                       <p style="color: #8195AF;" class="fs-12 q-mb-none">Kode Distributor : 095830492948</p>
                                       <p style="color: #8195AF;" class="fs-12 q-mb-none"><img src="~assets/icon/calendar.svg" alt="" class="align-middle q-mr-sm"><span class="align-middle">12 Nov 2020</span></p>
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
                                        <p class="q-mb-none">Jasa Pemasaran Ice Cream 2021 SAR RSM IC 14 - 31 Mar 2011</p>
                                        <p class="q-mb-none">OPSO ID 210019928817721662121</p>
                                        <p><img src="~assets/icon/calendar_blue.svg" alt="" class="align-middle q-mr-sm"> <span class="align-middle">12 November 2020 - 20 Desember 2021</span></p>
                                    </div>
                                    <div class="col-3 fs-12 text-right" style="margin: auto;">
                                        Rp 980.000.000
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
                                                Rp 1.000.000.000
                                            </div>
                                        </div>
                                        <div class="row q-my-sm">
                                            <div class="col-4">
                                                PPN
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp 1.000.000
                                            </div>
                                        </div>
                                        <div class="row q-my-sm">
                                            <div class="col-4">
                                                PPN
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp 1.000.000
                                            </div>
                                        </div>
                                         <div class="row q-my-sm">
                                            <div class="col-4">
                                                Total
                                            </div>
                                            <div class="col-8 text-right">
                                                Rp 1.002.000.000
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
                                        PT. Pakmu Mandiri Utama
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Status
                                    </div>
                                    <div class="col-6 text-right">
                                        Submit
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Code ULI
                                    </div>
                                    <div class="col-6 text-right">
                                        10219919299991000129
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Tanggal
                                    </div>
                                    <div class="col-6 text-right">
                                        15 Nov 2011
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Jenis Kegiatan
                                    </div>
                                    <div class="col-6 text-right">
                                        10 - TPR Barang
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total
                                    </div>
                                    <div class="col-6 text-right">
                                        250.000
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total PPN
                                    </div>
                                    <div class="col-6 text-right">
                                        25.000
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total PPh
                                    </div>
                                    <div class="col-6 text-right">
                                        0,00
                                    </div>
                                </div>
                                <div class="row q-my-sm fs-12">
                                    <div class="col-6">
                                        Total Net
                                    </div>
                                    <div class="col-6 text-right">
                                        275.000
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
                                <div class="row wrapper-child q-my-sm t-primary">
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
                                        <textarea name="" id="" cols="30" rows="2" placeholder="Masukan alasan penolakan..." class="input-textarea fs-12"></textarea>
                                    </div>
                                </div>
                                <div class="row q-my-md">
                                    <div class="col-6 fs-14">
                                        <q-btn color="secondary" outline  no-caps unelevated>
                                            Reject
                                        </q-btn>
                                    </div>
                                    <div class="col-6 text-right text-primary">
                                        <q-btn color="secondary"  no-caps unelevated>
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
import { defineAsyncComponent,ref,watch } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'
import { useService } from 'src/composeables/useService'

export default {
    data() {
        return {
            dialogDetail: true,
            isInvoice: false
        }
    },
    setup(){
        const { formatRibuan } = usePratesis()
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