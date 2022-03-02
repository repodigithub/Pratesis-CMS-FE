<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Distributor Group" :filteroption="option" filetemplate="MSTDISTRIBUTOR_GROUP.xlsx">
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Distributor Group</div>
                    <q-space />
                    <div >{{props.tampil.kode_distributor_group}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Distributor Group</div>
                    <q-space />
                    <div >{{props.tampil.nama_distributor_group}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode Distributor Group">Kode Distributor Group</label>
                <q-input v-model="props.send.kode_distributor_group" type="text" id="Kode Distributor Group" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode Distributor Group tidak boleh kosong',
                ]"/>
                <label for="nama Distributor Group">Nama Distributor Group</label>
                <q-input v-model="props.send.nama_distributor_group" type="text" id="nama Distributor Group" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'nama Distributor Group tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
const columns = [
    { name: 'kode',align: 'left', label: 'Kode Distributor Group', field: 'kode_distributor_group'},
    { name: 'nama_distributor_group', align: 'left', label: 'Nama Distributor Group', field: 'nama_distributor_group'},
]

export default {
    setup(){
        const option = ref(['Kode ','Nama '])
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