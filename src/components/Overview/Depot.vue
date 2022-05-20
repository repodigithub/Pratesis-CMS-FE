<template>
    <div class="row q-px-lg q-pb-lg" style="margin-top:-30px;">
        <div class="col-12">
            <core-table
                url="dashboard/tidak-layak-bayar"
                classStyle="br-20 own-card"
                :option="{level : '?level=depot&limit=5'}"
                v-model:requesting="request"
                @openCustomDetail="openDetail"
                customDetail
                :columns="columns">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Dashboard</div>
                        <q-btn color="primary" label="Refresh" no-caps unelevated @click="onRefresh"/>
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <div class="row items-center q-gutter-sm">
                            <q-badge outline :label="statusPromo(props.row.status)" :class="active ? colorStatusPromo(props.row.status) : ''"
                            style="padding-top:5px;padding-bottom:5px;" />
                            <img :src="require(`assets/icon/${props.row.status.includes('submit') ? 'check-circle.svg' : 'sync-alt.svg'}`)" alt="">
                        </div>
                    </q-td>
                </template>
            </core-table>
        </div>
        <div class="col-12" style="margin-top:30px;">
            <core-table
                url="dashboard/menunggu-pembayaran"
                :option="{level : '?level=depot&limit=5'}"
                v-model:requesting="request2"
                classStyle="br-20 own-card"
                @openCustomDetail="openDetailLaporan"
                customDetail
                :columns="columns">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="fs-24">Klaim Menunggu Pembayaran</div>
                        <q-btn color="primary" label="Refresh" no-caps unelevated @click="onRefresh2"/>
                    </div>
                </template>
                <template v-slot:body-cell-status="props">
                    <q-td key="status" :props="props">
                        <div class="row items-center q-gutter-sm">
                            <q-badge outline :label="statusPromo(props.row.status_claim)" :class="active ? colorStatusPromo(props.row.status_claim) : ''"
                            style="padding-top:5px;padding-bottom:5px;" />
                        </div>
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
import { useRouter } from 'vue-router'

export default {
    setup(){
        const { formatRibuan } = usePratesis()
        const { GeneralFormatDate,statusPromo,colorStatusPromo } = useCustom()
        const columns = [
            { name: 'kode', align: 'left', label: 'Kode Distributor', field: 'kode_distributor', style:'width:5%' },
            { name: 'nama_distributor', align: 'left', label: 'Nama Distributor', field: 'nama_distributor', style:'width:5%' },
            { name: 'coding_uli', align: 'left',label: 'Coding ULI ', field: 'kode_uli'},
            { name: 'tanggal', align: 'left',label: 'Tanggal',field: row => GeneralFormatDate(row.created_at,'DD MMMM YYYY') },
            { name: 'jenis_kegiatan', align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'rp_klaim', align: 'left',label: 'Rp Klaim', field: row => formatRibuan(row.claim)},
            { name: 'rp_dibayar', align: 'left',label: 'Rp Dibayar', field: row => formatRibuan(row.amount)},
            { name: 'status',  align: 'left',label: 'Status', field: 'status'},
        ]
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
        const active = ref(true)
        const router = useRouter()

        function openDetail(value){
            router.push({name:'Verifikasi',query:value})
        }
        function openDetailLaporan(value){
            router.push({name:'Laporan Klaim',query:value})
        }

        return{
            columns,
            request,onRefresh,
            request2,onRefresh2,
            active,colorStatusPromo,statusPromo,
            openDetail,openDetailLaporan
        }
    },
    components:{
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
    },
}
</script>
