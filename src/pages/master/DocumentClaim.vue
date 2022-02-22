<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Document Claim" :filteroption="option" filetemplate="MSTDOCUMENT_CLAIM.xlsx">
        <template v-slot:toptable>
            <div class="row justify-end">
                <q-btn color="secondary" label="Eksport to PDF" no-caps class="btn-one" unelevated/>
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