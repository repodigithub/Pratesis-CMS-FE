<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Sub Brand" :filteroption="option" filetemplate="MSTSUBBRAND.xlsx">
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Sub Brand</div>
                    <q-space />
                    <div >{{props.tampil.kode_sub_brand}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Sub Brand</div>
                    <q-space />
                    <div >{{props.tampil.nama_sub_brand}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode brand">Kode Sub Brand</label>
                <q-input v-model="props.send.kode_sub_brand" type="text" id="Kode brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode Sub brand tidak boleh kosong',
                ]"/>
                <label for="nama brand">Nama Sub Brand</label>
                <q-input v-model="props.send.nama_sub_brand" type="text" id="nama brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Nama Sub brand tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'

const columns = [
    { name: 'kode', label: 'Kode Sub Brand', align: 'left', field: 'kode_sub_brand' },
    { name: 'sub_brand',  align: 'left',label: 'Nama Sub Brand', field: 'nama_sub_brand'},
]
export default {
    setup(){
        const option = ref(['Kode Sub Brand','Nama Sub Brand'])
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