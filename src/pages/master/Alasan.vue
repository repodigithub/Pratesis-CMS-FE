<template>
    <core-simple-page :columns="columns" placeholder="Ex: Deskripsi Alasan" :filteroption="option" filetemplate="MSTALASAN.xlsx" ref="coresimple">
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
                    <div>Kode Alasan</div>
                    <q-space />
                    <div >{{props.tampil.kode_alasan}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Deskripsi Alasan</div>
                    <q-space />
                    <div >{{props.tampil.deskripsi_alasan}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode brand">Kode Alasan</label>
                <q-input v-model="props.send.kode_alasan" type="text" id="Kode brand" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'Kode Alasan tidak boleh kosong',
                ]"/>
                <label for="nama brand">Deskripsi Alasan</label>
                <q-input v-model="props.send.deskripsi_alasan" type="text" id="nama brand" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'deskripsi Alasan tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" @reloadTable="reloadTable">
        <template v-slot:add-content="props">
                <label for="Kode Alasan">Kode Alasan</label>
                <q-input v-model="props.send.kode_alasan" type="text" id="Kode Alasan" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'Kode Alasan tidak boleh kosong',
                ]" placeholder="Kode Alasan"/>
                <label for="deskripsi Alasan">deskripsi Alasan</label>
                <q-input v-model="props.send.deskripsi_alasan" type="textarea" id="deskripsi Alasan" outlined dense lazy-rules
                :rules="[
                    val => val && val.length > 0 || 'Deskripsi Alasan tidak boleh kosong',
                ]" placeholder="Deskripsi Alasan"/>
        </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'

const columns = [
    { name: 'kode', label: 'Kode Alasan', align: 'left', field: 'kode_alasan' },
    { name: 'alasan',  align: 'left',label: 'Deskripsi Alasan', field: 'deskripsi_alasan'},
]
export default {
    setup(){
        const option = ref(['Kode Alasan','Deskripsi Alasan'])
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