<template>
    <core-simple-page :columns="columns" placeholder="" :filteroption="option" filetemplate="MSTTIPE_PROMO_HEADER.xlsx" :canEdit="false" :optionsDetail="{ include : 'spendTypes.investment;documents'}">
        <template v-slot:body-cell-spend_type="props" style="width:200px!important;">
            <q-td key="kode" :props="props" style="max-width:200px!important;">
                <div class="row" style="max-width:250px;">
                    <q-badge outline :label="spend.kode_spend_type" :class="active ? randomColor() : ''" v-for="spend in props.row.spend_types" :key="spend.id" class="q-mr-sm q-mb-sm"/>
                </div>
            </q-td>
        </template>
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Kegiatan</div>
                    <q-space />
                    <div >{{props.tampil.kode_kegiatan}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Kegiatan</div>
                    <q-space />
                    <div >{{props.tampil.nama_kegiatan}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Kode PPN</div>
                    <q-space />
                    <div >{{props.tampil.kode_ppn}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>PPN%</div>
                    <q-space />
                    <div >{{props.tampil.persentase_ppn}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Kode PPH</div>
                    <q-space />
                    <div >{{props.tampil.kode_pph}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>PPH%</div>
                    <q-space />
                    <div >{{props.tampil.persentase_pph}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div class="col-12">Deskripsi Kegiatan</div>
                    <div class="col-12 grey1">{{props.tampil.deskripsi_kegiatan}}</div>
                </div>
                <q-table
                class="my-sticky-header-table q-mt-md btn-radius col-12"
                :rows="props.tampil.spend_types"
                :columns="spend"
                row-key="id"
                flat
                bordered
                :pagination="{rowsPerPage:0}"
                hide-pagination
                binary-state-sort
                />
                <q-table
                class="my-sticky-header-table q-mt-md btn-radius col-12"
                :rows="props.tampil.documents"
                :columns="document"
                row-key="id"
                flat
                bordered
                :pagination="{rowsPerPage:0}"
                hide-pagination
                binary-state-sort
                />
            </div>
        </template>
    </core-simple-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'

const columns = [
    { name: 'kode', label: 'Kode', align: 'left', field: 'kode_kegiatan' },
    { name: 'nama_kegiatan',  align: 'left',label: 'Nama Kegiatan', field: 'nama_kegiatan'},
    { name: 'spend_type',  align: 'left',label: 'Spend Type', field: 'spend_types',style:'width:200px!important'},
    // { name: 'investment_code',  align: 'left',label: 'Investment Code', field: 'investment_code'},
    // { name: 'investment_name',  align: 'left',label: 'Investment Name', field: 'investment_name'},
    { name: 'kode_ppn',  align: 'left',label: 'Kode PPN', field: 'kode_ppn'},
    { name: 'ppn',  align: 'left',label: 'PPN%', field: 'persentase_ppn'},
    { name: 'kode_pph',  align: 'left',label: 'Kode PPH', field: 'kode_pph'},
    { name: 'pph',  align: 'left',label: 'PPH%', field: 'persentase_pph'},
]

const spend = [
    { name: 'kode', label: 'Spend Type', align: 'left', field: 'kode_spend_type' },
    { name: 'investment', label: 'Nama Investment', align: 'left', field:row=> row.investment.nama_investment },
]

const document = [
    { name: 'kode', label: 'Kode Dokumen', align: 'left', field: 'kode_dokumen' },
    { name: 'nama', label: 'Nama Dokumen', align: 'left', field: 'nama_dokumen' },
]
export default {
    setup(){
        const option = ref(['Kode','Nama Kegiatan','Spend Type','Kode PPN','PPN%','Kode PPH','PPH%'])
        // const option = ref(['Kode','Nama Kegiatan','Spend Type','Investment Code','Investment Name','Kode PPN','PPN%','Kode PPH','PPH%'])
        const active = ref(true)
        const { randomColor } = usePratesis()
        return {
            option,
            columns,
            active,
            randomColor,
            spend,
            document
        }
    },
    components:{
        'core-simple-page': defineAsyncComponent(() => import('components/CoreSimplePage')),
    }
}
</script>

<style>

</style>