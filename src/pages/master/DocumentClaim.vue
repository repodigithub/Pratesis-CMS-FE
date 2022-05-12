<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Document Claim" :filteroption="option" filetemplate="MSTDOCUMENT_CLAIM.xlsx">
        <!-- <template v-slot:toptable>
            <div class="row justify-end">
                <q-btn color="secondary" label="Eksport to PDF" no-caps class="btn-one" unelevated/>
            </div>
        </template> -->
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Dokumen</div>
                    <q-space />
                    <div >{{props.tampil.kode_dokumen}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Dokumen</div>
                    <q-space />
                    <div >{{props.tampil.nama_dokumen}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Sumber Dokumen</div>
                    <q-space />
                    <div >{{props.tampil.sumber_dokumen}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode Dokumen">Kode Dokumen</label>
                <q-input v-model="props.send.kode_dokumen" type="text" id="Kode Dokumen" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'Kode Dokumen tidak boleh kosong',
                ]"/>
                <label for="nama dokumen">Nama Dokumen</label>
                <q-input v-model="props.send.nama_dokumen" type="text" id="nama dokumen" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'nama dokumen tidak boleh kosong',
                ]"/>
                <label for="sumber dokumen">Sumber Dokumen</label>
                <q-input v-model="props.send.sumber_dokumen" type="text" id="sumber dokumen" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'sumber dokumen tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
const columns = [
    { name: 'kode',align: 'left', label: 'Kode Document', field: 'kode_dokumen'},
    { name: 'nama_document_claim', align: 'left', label: 'Nama', field: 'nama_dokumen'},
]
export default {
    setup(){
        //MSTDOCUMENT_CLAIM
        const option = ref(['Kode Document','Nama'])
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