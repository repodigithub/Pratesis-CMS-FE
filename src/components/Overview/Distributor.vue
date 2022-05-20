<template>
    <div class="row q-px-lg q-pb-lg" style="margin-top:-30px;">
        <div class="col-12">
            <core-table
                url="dashboard/tidak-layak-bayar"
                :option="{level : '?level=distributor&limit=5'}"
                v-model:requesting="request"
                classStyle="br-20 own-card"
                @openCustomDetail="openDetail"
                customDetail
                :columns="columnFirst">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Klaim Tidak Layak Bayar</div>
                        <q-btn color="primary" label="Refresh" no-caps unelevated @click="onRefresh"/>
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <q-badge outline :label="statusPromo(props.row.status)" :class="active ? colorStatusPromo(props.row.status) : ''"
                    style="padding-top:5px;padding-bottom:5px;" />
                    </q-td>
                </template>
            </core-table>
        </div>
        <div class="col-12" style="margin-top:30px;">
                <core-table
                url="dashboard/menunggu-pembayaran"
                classStyle="br-20 own-card"
                @openCustomDetail="openDetailLaporan"
                customDetail
                v-model:requesting="request2"
                :columns="columnSecond">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Klaim Menunggu Pembayaran</div>
                        <q-btn color="primary" label="Refresh" no-caps unelevated @click="onRefresh2"/>
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <q-badge outline :label="statusPromo(props.row.status_claim)" :class="active ? colorStatusPromo(props.row.status_claim) : ''"
                    style="padding-top:5px;padding-bottom:5px;" />
                    </q-td>
                </template>
                </core-table>
        </div>
    </div>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'

export default {
    setup(){
        const { formatRibuan } = usePratesis()
        const { GeneralFormatDate,statusPromo,colorStatusPromo } = useCustom()
        const baseColumn = [
            { name: 'coding_uli', align: 'left',label: 'Coding ULI ', field: 'kode_uli'},
            { name: 'tanggal', align: 'left',label: 'Tanggal', field: row => GeneralFormatDate(row.created_at,'DD MMMM YYYY') },
            { name: 'jenis_kegiatan', align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'rp_klaim', align: 'left',label: 'Rp Klaim', field: row => formatRibuan(row.claim)},
            { name: 'rp_dibayar', align: 'left',label: 'Rp Dibayar', field:row => formatRibuan(row.amount)},
            { name: 'status',  align: 'left',label: 'Status', field: 'status'},
        ]
        const columnFirst = [
            ...baseColumn,
            { name: 'verifikasi_reason',  align: 'left',label: 'Verifikasi Reason', field: 'alasan'},
        ]
        const columnSecond = [
            ...baseColumn,
            { name: 'pending',  align: 'left',label: 'Pending Paid Reason', field: 'alasan'},
        ]
     
        const active = ref(true)
        const request = ref('')
        function onRefresh(){
            request.value = {
                pagination:{
                    page:1
                }
            }
        }
        const request2 = ref('')
        function onRefresh2(){
            request2.value = {
                pagination:{
                    page:1
                }
            }
        }

        function openDetail(value){
            router.push({name:'Klaim Promo',query:value})
        }
        function openDetailLaporan(value){
            router.push({name:'Laporan Klaim',query:value})
        }
        return{
            columnFirst,columnSecond,statusPromo,colorStatusPromo,active,
            request,onRefresh,
            request2,onRefresh2,
            openDetail,openDetailLaporan
        }
    },
    components:{
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
    },
}
</script>

<style>

</style>