<template>
    <core-simple-page :columns="columns" placeholder="" :filteroption="option" filetemplate="MSTINVESTMENT.xlsx">
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode investment</div>
                    <q-space />
                    <div >{{props.tampil.kode_investment}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama investment</div>
                    <q-space />
                    <div >{{props.tampil.nama_investment}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode brand">Kode investment</label>
                <q-input v-model="props.send.kode_investment" type="text" id="Kode brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode investment tidak boleh kosong',
                ]"/>
                <label for="nama brand">Nama investment</label>
                <q-input v-model="props.send.nama_investment" type="text" id="nama brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'nama investment tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
const columns = [
    { name: 'kode',align: 'left', label: 'Kode Investment', field: 'kode_investment'},
    { name: 'nama_investment', align: 'left', label: 'Nama ', field: 'nama_investment'},
]
export default {
    setup(){
        //MSTINVESTMENT
        const option = ref(['Kode Investment','Nama '])
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