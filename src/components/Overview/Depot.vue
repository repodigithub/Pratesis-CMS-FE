<template>
    <div class="row q-px-lg q-pb-lg" style="margin-top:-30px;">
        <div class="col-12">
            <core-table
                url="dashboard/tidak-layak-bayar?page=1&limit=5&level=depot"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="columns2">
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
                            :label="props.row.status.replaceAll('_', '')"
                            class="q-mr-md"
                            :class="props.row.status == 'layak_bayar' ? 'approve' : 'reject'"
                            style="padding-top:5px;padding-bottom:5px;text-transform:capitalize;" />
                            <!-- <q-avatar size="20px" font-size="18px" icon="check" color="positive" text-color="white"/> -->
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
                <template v-slot:body-cell-status_claim="props">
                    <q-td key="status_claim" :props="props">
                        <q-badge
                            outline
                            :label="props.row.status_claim.replaceAll('_', ' ')"
                            class="q-mr-md"
                            :class="props.row.status_claim == 'layak_bayar' ? 'approve' : 'reject'"
                            style="padding-top:5px;padding-bottom:5px;text-transform:capitalize;" />
                            <q-avatar v-if="props.row.status_claim == 'layak_bayar'" size="20px" font-size="18px" icon="check" color="positive" text-color="white"/>
                    </q-td>
                </template>
            </core-table>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
export default {
    setup(){
        const { formatRibuan } = usePratesis()
        const { formatTglPromo } = useCustom()
        const columns = [
            { name: 'kode_distributor', align: 'left', label: 'Kode Distributor', field: 'kode_distributor', style:'width:5%' },
            { name: 'nama_distributor', align: 'left', label: 'Nama Distributor', field: 'nama_distributor', style:'width:5%' },
            { name: 'kode_uli', align: 'left',label: 'Coding ULI ', field: 'kode_uli'},
            { name: 'created_at', align: 'left',label: 'Tanggal', field: row => `${formatTglPromo(row.created_at)}`},
            { name: 'jenis_kegiatan', align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'claim', align: 'left',label: 'Rp Klaim', field: row => `${formatRibuan(row.claim)}`},
            { name: 'amount', align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.amount)}`},
            { name: 'status_claim',  align: 'left',label: 'Status', field: 'status_claim'},
        ]

        const columns2 = [
            { name: 'kode_distributor', align: 'left', label: 'Kode Distributor', field: 'kode_distributor', style:'width:5%' },
            { name: 'nama_distributor', align: 'left', label: 'Nama Distributor', field: 'nama_distributor', style:'width:5%' },
            { name: 'kode_uli', align: 'left',label: 'Coding ULI ', field: 'kode_uli'},
            { name: 'created_at', align: 'left',label: 'Tanggal', ield: row => `${formatTglPromo(row.created_at)}`},
            { name: 'jenis_kegiatan', align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'claim', align: 'left',label: 'Rp Klaim', field: row => `${formatRibuan(row.claim)}`},
            { name: 'amount', align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.amount)}`},
            { name: 'status',  align: 'left',label: 'Status', field: 'status'},
        ]

        return{
            formatTglPromo,
            formatRibuan,
            columns2,
            columns
        }
    },
    components:{
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
    },
}
</script>
