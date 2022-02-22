<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Brand" :filteroption="option" filetemplate="MSTBRAND.xlsx" ref="coresimple">
        <template v-slot:toptable>
            <div class="row justify-end">
                <q-btn color="secondary"  no-caps class="btn-one" unelevated @click="openAdd">
                    <q-icon name="add" />
                    Add New
                </q-btn>
            </div>
        </template>
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Brand</div>
                    <q-space />
                    <div >{{props.tampil.kode_brand}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Brand</div>
                    <q-space />
                    <div >{{props.tampil.nama_brand}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode brand">Kode Brand</label>
                <q-input v-model="props.send.kode_brand" type="text" id="Kode brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode brand tidak boleh kosong',
                ]"/>
                <label for="nama brand">Nama Brand</label>
                <q-input v-model="props.send.nama_brand" type="text" id="nama brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Nama brand tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" @reloadTable="reloadTable">
        <template v-slot:add-content="props">
            <div class="row justify-between">
                <div class="col-5">
                     <label for="Kode Brand">Kode Brand</label>
                    <q-input v-model="props.send.kode_brand"  id="Kode Brand" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Kode Brand tidak boleh kosong',
                    ]" placeholder="Kode Brand"/>
                </div>
                <div class="col-6">
                    <label for="Nama Brand">Nama Brand</label>
                    <q-input v-model="props.send.nama_brand" id="Nama Brand" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Nama Brand tidak boleh kosong',
                    ]" placeholder="Nama Brand"/>
                </div>
            </div>
        </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'

const columns = [
    { name: 'kode', label: 'Kode Brand', align: 'left', field: 'kode_brand' },
    { name: 'brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
]
export default {
    setup(){
        const option = ref(['Kode brand','Nama Brand'])
        const coresimple = ref('')

        const { modalAdd,openAdd } = usePratesis()

        function reloadTable(val) {
            coresimple.value.reloadTable(val)
        }
        return {
            option,
            columns,

            modalAdd,
            openAdd,

            reloadTable,

            coresimple
        }
    },
    components:{
        'core-simple-page': defineAsyncComponent(() => import('components/CoreSimplePage')),
        'add-data': defineAsyncComponent(() => import('components/Modal/AddData')),
    }
}
</script>

<style>

</style>