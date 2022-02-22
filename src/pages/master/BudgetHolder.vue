<template>
    <core-simple-page :columns="columns" placeholder="Ex: Nama Budget Holder" :filteroption="option" filetemplate="MSTBUDGET_HOLDER.xlsx" ref="coresimple">
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
                    <div>Kode Budget Holder</div>
                    <q-space />
                    <div >{{props.tampil.kode_budget_holder}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Budget Holder</div>
                    <q-space />
                    <div >{{props.tampil.nama_budget_holder}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode brand">Kode Budget Holder</label>
                <q-input v-model="props.send.kode_budget_holder" type="text" id="Kode brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode budget_holder tidak boleh kosong',
                ]"/>
                <label for="nama brand">Nama Budget Holder</label>
                <q-input v-model="props.send.nama_budget_holder" type="text" id="nama brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'nama budget_holder tidak boleh kosong',
                ]"/>
            </div>
        </template>
    </core-simple-page>
    <add-data v-model:modalAdd="modalAdd"  v-if="modalAdd" @reloadTable="reloadTable">
        <template v-slot:add-content="props">
            <div class="row justify-between">
                <div class="col-5">
                     <label for="Kode Budget Holder">Kode Budget Holder</label>
                    <q-input v-model="props.send.kode_budget_holder"  id="Kode Budget Holder" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Kode Budget Holder tidak boleh kosong',
                    ]" placeholder="Kode Budget Holder"/>
                </div>
                <div class="col-6">
                    <label for="Nama Budget Holder">Nama Budget Holder</label>
                    <q-input v-model="props.send.nama_budget_holder" id="Nama Budget Holder" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Nama Budget Holder tidak boleh kosong',
                    ]" placeholder="Nama Budget Holder"/>
                </div>
            </div>
               
                
        </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'

const columns = [
    { name: 'kode', label: 'Kode Budget Holder', align: 'left', field: 'kode_budget_holder' },
    { name: 'budget_holder',  align: 'left',label: 'Nama Budget Holder', field: 'nama_budget_holder'},
]
export default {
    setup(){
        const option = ref(['Kode Budget Holder','Nama Budget Holder'])
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