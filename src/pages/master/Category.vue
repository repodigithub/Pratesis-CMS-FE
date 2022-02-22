<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Category" :filteroption="option" filetemplate="MSTCATEGORY.xlsx" ref="coresimple">
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
                    <div>Kode Kategori</div>
                    <q-space />
                    <div >{{props.tampil.kode_kategori}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Kategori</div>
                    <q-space />
                    <div >{{props.tampil.nama_kategori}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode kategori">Kode Kategori</label>
                <q-input v-model="props.send.kode_kategori" type="text" id="Kode kategori" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode kategori tidak boleh kosong',
                ]"/>
                <label for="nama kategori">Nama Kategori</label>
                <q-input v-model="props.send.nama_kategori" type="text" id="nama kategori" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Nama kategori tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" @reloadTable="reloadTable">
        <template v-slot:add-content="props">
            <div class="row justify-between">
                <div class="col-5">
                     <label for="Kode Category">Kode Category</label>
                    <q-input v-model="props.send.kode_kategori"  id="Kode Category" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Kode Category tidak boleh kosong',
                    ]" placeholder="Kode Category"/>
                </div>
                <div class="col-6">
                    <label for="Nama Category">Nama Category</label>
                    <q-input v-model="props.send.nama_kategori" id="Nama Category" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Nama Category tidak boleh kosong',
                    ]" placeholder="Nama Category"/>
                </div>
            </div>
        </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
const columns = [
    { name: 'kode',align: 'left', label: 'Kode Category', field: 'kode_kategori'},
    { name: 'nama_category', align: 'left', label: 'Nama Category', field: 'nama_kategori'},
]
export default {
    setup(){
        //MSTCATEGORY
        const option = ref(['Kode Category','Nama Category'])
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