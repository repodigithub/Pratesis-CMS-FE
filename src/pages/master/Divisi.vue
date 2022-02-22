<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Divisi" :filteroption="option" filetemplate="MSTDIVISI.xlsx" ref="coresimple">
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
                    <div>Kode Divisi</div>
                    <q-space />
                    <div >{{props.tampil.kode_divisi}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Divisi</div>
                    <q-space />
                    <div >{{props.tampil.nama_divisi}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode divisi">Kode Divisi</label>
                <q-input v-model="props.send.kode_divisi" type="text" id="Kode divisi" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode Divisi tidak boleh kosong',
                ]"/>
                <label for="nama divisi">Nama Divisi</label>
                <q-input v-model="props.send.nama_divisi" type="text" id="nama divisi" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Nama Divisi tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" @reloadTable="reloadTable">
        <template v-slot:add-content="props">
            <div class="row justify-between">
                <div class="col-5">
                     <label for="Kode Divisi">Kode Divisi</label>
                    <q-input v-model="props.send.kode_divisi"  id="Kode Divisi" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Kode Divisi tidak boleh kosong',
                    ]" placeholder="Kode Divisi"/>
                </div>
                <div class="col-6">
                    <label for="Nama Divisi">Nama Divisi</label>
                    <q-input v-model="props.send.nama_divisi" id="Nama Divisi" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Nama Divisi tidak boleh kosong',
                    ]" placeholder="Nama Divisi"/>
                </div>
            </div>
        </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
const columns = [
    { name: 'kode',align: 'left', label: 'Kode Divisi', field: 'kode_divisi'},
    { name: 'nama_divisi', align: 'left', label: 'Nama Divisi', field: 'nama_divisi'},
]
export default {
    setup(){
        //MSTDIVISI
        const option = ref(['Kode Divisi','Nama Divisi'])
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