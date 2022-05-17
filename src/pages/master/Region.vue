<template>
    <core-simple-page :columns="columns" placeholder="" :filteroption="option" filetemplate="MSTREGION.xlsx">
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Region</div>
                    <q-space />
                    <div >{{props.tampil.kode_region}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Region</div>
                    <q-space />
                    <div >{{props.tampil.nama_region}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode region">Kode Region</label>
                <q-input v-model="props.send.kode_region" type="text" id="Kode region" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode region tidak boleh kosong',
                ]"/>
                <label for="nama region">Nama Region</label>
                <q-input v-model="props.send.nama_region" type="text" id="nama region" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'nama region tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'

const columns = [
    { name: 'kode', label: 'Kode Region', align: 'left', field: 'kode_region' },
    { name: 'region',  align: 'left',label: 'Region', field: 'nama_region'},
]
export default {
    setup(){
        const option = ref(['Kode Region','Nama Region'])
        return {
            option,
            columns
        }
    },
    components:{
        'core-simple-page': defineAsyncComponent(() => import('components/CoreSimplePage')),
    }
}
</script>

<style>

</style>