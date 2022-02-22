<template>
    <q-page>
        <breadcrumb  url="MSTAREA.xlsx" @openModal="openUpload" />
        <div class="row q-pa-lg">
            <div class="col-12">
                <filter-table :option="option" placeholder="Ex: ASM Medan" @onFiltering="onFilter" @onReseting="onResetFilter"/>
                <core-table :url="$route.path.substr(1)" :option="{include:'region'}" v-model:filter="filter" :columns="columns" v-model:requesting="reload" :islogin="false" >
                    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
                        <slot :name="slot" v-bind="props" />
                    </template>
                    <template v-slot:detail-content="props">
                        <div v-if="!props.edit">
                            <div class="row items-center">
                                <div>Kode Area</div>
                                <q-space />
                                <div >{{props.tampil.kode_area}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Nama Area</div>
                                <q-space />
                                <div >{{props.tampil.nama_area}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Alamat</div>
                                <q-space />
                                <div >{{props.tampil.alamat_depo}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Region</div>
                                <q-space />
                                <div >{{props.tampil.region.nama_region}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Titik Koordinat</div>
                                <q-space />
                                <div >{{props.tampil.titik_koordinat}}</div>
                            </div>
                        </div>
                        <div v-else>
                            <label for="Kode Area">Kode Area</label>
                            <q-input v-model="props.send.kode_area" type="text" id="Kode Area" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Kode Area tidak boleh kosong',
                            ]"/>
                            <label for="nama area">Nama Area</label>
                            <q-input v-model="props.send.nama_area" type="text" id="nama area" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'nama area tidak boleh kosong',
                            ]"/>
                            <label for="alamat">Alamat</label>
                            <q-input v-model="props.send.alamat_depo" type="text" id="alamat" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'alamat tidak boleh kosong',
                            ]"/>
                            <label for="region">Region</label>
                            <select-dropdown url="region" v-model:selected="props.send.kode_region" class="q-mb-md"/>
                            
                            <label for="Titik Koordinat" >Titik Koordinat</label>
                            <q-input v-model="props.send.titik_koordinat" type="text" id="Titik Koordinat" outlined dense/>
                        </div>
                    </template>
                </core-table>
            </div>
        </div>
        <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" @onUploadSuccess="reloadTable"/>
    </q-page>
</template>

<script>
import { defineAsyncComponent,ref} from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
const columns = [
    { name: 'kode', align: 'left', label: 'Kode Area', field: 'kode_area', style:'width:5%' },
    { name: 'nama_area', align: 'left', label: 'Nama ', field: 'nama_area', style:'width:5%' },
    { name: 'alamat_depo', align: 'left',label: 'Alamat ', field: 'alamat_depo', style:'max-width:450px',classes: 'ellipsis'},
    { name: 'region',  align: 'left',label: 'Region', field: row => row.region.nama_region},
]
export default {
    setup(){
        const { onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable} = usePratesis()
        const option = ref(['Kode Area','Nama Area','Alamat','Region'])
        return {
            onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable,

            option,
            columns,

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