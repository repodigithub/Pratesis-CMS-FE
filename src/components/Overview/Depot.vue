<template>
    <div class="row q-px-lg q-pb-lg" style="margin-top:-30px;">
        <div class="col-12">
            <core-table
                url="dashboard/tidak-layak-bayar?page=1&limit=5&level=depot"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="columns">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Dashboard</div>
                        <q-btn color="primary" label="Refresh" no-caps unelevated />
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <q-badge
                            outline
                            label="Submit"
                            class="q-mr-md approve"
                            style="padding-top:5px;padding-bottom:5px;" />
                            <q-avatar size="20px" font-size="18px" icon="check" color="positive" text-color="white"/>
                    </q-td>
                </template>
            </core-table>
        </div>
        <div class="col-12" style="margin-top:30px;">
            <core-table
                url="dashboard/menunggu-pembayaran?page=1&limit=5&level=depot"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="columns">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Klaim Menunggu Pembayaran</div>
                        <q-btn color="primary" label="Refresh" no-caps unelevated />
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <q-badge
                            outline
                            label="Submit"
                            class="q-mr-md approve"
                            style="padding-top:5px;padding-bottom:5px;" />
                            <q-avatar size="20px" font-size="18px" icon="check" color="positive" text-color="white"/>
                    </q-td>
                </template>
            </core-table>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const columns = [
    { name: 'kode', align: 'left', label: 'Kode Distributor', field: 'kode_area', style:'width:5%' },
    { name: 'nama_distributor', align: 'left', label: 'Nama Distributor', field: 'nama_area', style:'width:5%' },
    { name: 'coding_uli', align: 'left',label: 'Coding ULI ', field: 'alamat_depo'},
    { name: 'tanggal', align: 'left',label: 'Tanggal', field: 'alamat_depo'},
    { name: 'jenis_kegiatan', align: 'left',label: 'Jenis Kegiatan', field: 'alamat_depo'},
    { name: 'rp_klaim', align: 'left',label: 'Rp Klaim', field: 'alamat_depo'},
    { name: 'rp_dibayar', align: 'left',label: 'Rp Dibayar', field: 'alamat_depo'},
    { name: 'status',  align: 'left',label: 'Status', field: 'kode_area'},
]
export default {
    setup(){
        return{
            columns
        }
    },
    components:{
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
    },
}
</script>
