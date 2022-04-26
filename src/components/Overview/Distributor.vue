<template>
    <div class="row q-px-lg q-pb-lg" style="margin-top:-30px;">
        <div class="col-12">
            <core-table
                url="dashboard/tidak-layak-bayar?page=1&limit=5&level=distributor"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="columnFirst">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Klaim Tidak Layak Bayar</div>
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
                    </q-td>
                </template>
            </core-table>
        </div>
        <div class="col-12" style="margin-top:30px;">
                <core-table
                url="dashboard/menunggu-pembayaran?page=1&limit=5&level=distributor"
                classStyle="br-20 own-card"
                :canOpenDetail="false"
                :columns="columnSecond">
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
        const baseColumn = [
            { name: 'kode_uli', align: 'left',label: 'Coding ULI ', field: 'kode_uli'},
            { name: 'created_at', align: 'left',label: 'Tanggal', field: row => `${formatTglPromo(row.created_at)}`},
            { name: 'jenis_kegiatan', align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'claim', align: 'left',label: 'Rp Klaim', field: row => `${formatRibuan(row.claim)}`},
            { name: 'amount', align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.amount)}`},
            { name: 'status_claim',  align: 'left',label: 'Status', field: 'status_claim'},
        ]
        const columnFirst = [
            ...baseColumn,
            { name: 'verifikasi_reason',  align: 'left',label: 'Verifikasi Reason', field: 'kode_area'},
        ]
        const columnSecond = [
            ...baseColumn,
            { name: 'alasan',  align: 'left',label: 'Pending Paid Reason', field: 'alasan'},
        ]
        return{
            columnFirst,
            columnSecond,
            formatRibuan,
            formatTglPromo
        }
    },
    components:{
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
    },
}
</script>

<style>

</style>