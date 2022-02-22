<template>
    <breadcrumb  url="MSTSPENDTYPE" @openModal="openUpload" />
        <div class="row q-pa-lg">
            <div class="col-12">
                <filter-table :option="option" placeholder="ex: Investment Type" @onFiltering="onFilter" @onReseting="onResetFilter"/>
                <core-table :url="$route.path.substr(1)" v-model:filter="filter" :columns="columns" v-model:requesting="reload">
                    <template v-slot:toptable>
                        <div class="font-normal q-mb-sm">Spend Type :</div>
                        <q-btn-group outline>
                            <q-btn :outline="status === 'RA' ? false : true " color="primary" label="RA" unelevated @click="filterStatus('RA')" :class="status === 'RA' ? '' : 'bg-primary4'"/>
                            <q-btn :outline="status === 'FO' ? false : true " color="primary" label="FO" unelevated @click="filterStatus('FO')" :class="status === 'FO' ? '' : 'bg-primary4'"/>
                            <q-btn :outline="status === 'OA' ? false : true " color="primary" label="OA" unelevated @click="filterStatus('OA')" :class="status === 'OA' ? '' : 'bg-primary4'"/>
                            <q-btn :outline="status === 'PA' ? false : true " color="primary" label="PA" unelevated @click="filterStatus('PA')" :class="status === 'PA' ? '' : 'bg-primary4'"/>
                        </q-btn-group>
                    </template>
                    <template v-slot:body-cell-kode="props">
                        <q-td key="kode" :props="props">
                            <q-badge outline :label="props.row.kode_spend_type" :class="active ? randomColor() : ''"/>
                        </q-td>
                    </template>
                    <template v-slot:detail-content="props">
                        <div v-if="!props.edit">
                            <div class="row items-center">
                                <div>Kode Spend Type</div>
                                <q-space />
                                <div >{{props.tampil.kode_spend_type}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Investment Type</div>
                                <q-space />
                                <div >{{props.tampil.kode_investment}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Fund Type</div>
                                <q-space />
                                <div >{{props.tampil.fund_type}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Reference Pajak (CBT)</div>
                                <q-space />
                                <div >{{props.tampil.reference_tax}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Condition Type</div>
                                <q-space />
                                <div >{{props.tampil.condition_type}}</div>
                            </div>
                        </div>
                        <div v-else>
                            <label for="Kode spend_type">Kode Spend Type</label>
                            <q-input v-model="props.send.kode_spend_type" type="text" id="Kode spend_type" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Kode spend_type tidak boleh kosong',
                            ]"/>
                            <label for="Investment Type">Investment Type</label>
                            <select-dropdown url="investment" v-model:selected="props.send.kode_investment" class="q-mb-md" :master="false"/>
                            <label for="Fund Type">Fund Type</label>
                            <q-input v-model="props.send.fund_type" type="text" id="Fund Type" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Fund Type tidak boleh kosong',
                            ]"/>
                            <label for="Reference Pajak (CBT)">Reference Pajak (CBT)</label>
                            <q-input v-model="props.send.reference_tax" type="text" id="Reference Pajak (CBT)" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Reference Pajak (CBT) tidak boleh kosong',
                            ]"/>
                            <label for="Condition Type">Condition Type</label>
                            <q-input v-model="props.send.condition_type" type="text" id="Condition Type" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Condition Type tidak boleh kosong',
                            ]"/>
                        </div>
                    </template>
                </core-table>
            </div>
        </div>
        <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" @onUploadSuccess="reloadTable"/>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
const columns = [
    { name: 'kode', label: 'Kode', align: 'left', field: 'kode_spend_type' },
    { name: 'investment_type',  align: 'left',label: 'Investment Type', field: 'kode_investment'},
    { name: 'fund_type',  align: 'left',label: 'Fund Type', field: 'fund_type'},
    { name: 'reference',  align: 'left',label: 'Reference', field: 'reference_tax'},
    { name: 'condition_type',  align: 'left',label: 'Condition Type', field: 'condition_type'},
]
export default {
    setup(){
        //MSTSPENDTYPE
        const option = ref(['Kode','Investment Type','Fund Type','Reference','Condition Type'])
        const { onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable,randomColor} = usePratesis()
        const status = ref('RA')
        function filterStatus(key){
            status.value = key
            filter.value = {
                "kode_spend_type" : key
            }
        }

        const active = ref(true)
    
        return {
            status,
            filterStatus,

            option,
            columns,
            onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable,

            randomColor,
            active
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
        'filter-table': defineAsyncComponent(() => import('components/FilterTable')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown'))
    },
}
</script>

<style>

</style>