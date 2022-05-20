<template>
    <core-simple-page :columns="columns" placeholder="" :filteroption="option" filetemplate="MSTPAJAK.xlsx" ref="coresimple">
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
                    <div>Kode pajak</div>
                    <q-space />
                    <div >{{props.tampil.kode_pajak}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama pajak</div>
                    <q-space />
                    <div >{{props.tampil.nama_pajak}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Tipe pajak</div>
                    <q-space />
                    <div >{{props.tampil.tipe_pajak}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Presentase pajak</div>
                    <q-space />
                    <div >{{props.tampil.presentase_pajak}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Reference</div>
                    <q-space />
                    <div >{{props.tampil.reference_tax}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode brand">Kode pajak</label>
                <q-input v-model="props.send.kode_pajak" type="text" id="Kode brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode pajak tidak boleh kosong',
                ]"/>
                <label for="nama brand">Nama pajak</label>
                <q-input v-model="props.send.nama_pajak" type="text" id="nama brand" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'nama pajak tidak boleh kosong',
                ]"/>
                <label for="Tipe Pajak">Tipe Pajak</label>
                <q-select v-model="props.send.tipe_pajak" id="Tipe Pajak" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Tipe Pajak tidak boleh kosong',
                ]" placeholder=""
                :options="opttipe"
                />
                <label for="Presentase Pajak">Presentase Pajak</label>
                <q-input v-model="props.send.presentase_pajak"  id="Presentase Pajak" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Presentase Pajak tidak boleh kosong',
                ]" placeholder="" type="number"/>
                <label for="Reference">Reference</label>
                <q-input v-model="props.send.reference_tax" id="Reference" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Reference tidak boleh kosong',
                ]" placeholder=""/>
            </div>
        </template>
    </core-simple-page>
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" @reloadTable="reloadTable">
        <template v-slot:add-content="props">
            <div class="row justify-between">
                <div class="col-3">
                     <label class="font-normal" for="Kode Pajak">Kode Pajak</label>
                    <q-input v-model="props.send.kode_pajak"  id="Kode Pajak" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Kode Pajak tidak boleh kosong',
                    ]" placeholder="k"/>
                </div>
                <div class="col-8">
                    <label class="font-normal" for="Nama Pajak">Nama Pajak</label>
                    <q-input v-model="props.send.nama_pajak" id="Nama Pajak" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Nama Pajak tidak boleh kosong',
                    ]" placeholder=""/>
                </div>
                <div class="col-12">
                    <label class="font-normal" for="Tipe Pajak">Tipe Pajak</label>
                    <q-select v-model="props.send.tipe_pajak" id="Tipe Pajak" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Tipe Pajak tidak boleh kosong',
                    ]" placeholder=""
                    :options="opttipe"
                    />
                </div>
                <div class="col-3">
                     <label class="font-normal" for="Presentase Pajak">Presentase Pajak</label>
                    <q-input v-model="props.send.presentase_pajak"  id="Presentase Pajak" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Presentase Pajak tidak boleh kosong',
                    ]" placeholder="" type="number"/>
                </div>
                <div class="col-8">
                    <label class="font-normal" for="Reference">Reference</label>
                    <q-input v-model="props.send.reference_tax" id="Reference" outlined dense lazy-rules
                    :rules="[
                        val => val !== null && val !== '' || 'Reference tidak boleh kosong',
                    ]" placeholder=""/>
                </div>
            </div>
               
                
        </template>
    </add-data>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
const columns = [
    { name: 'kode', label: 'Kode pajak', align: 'left', field: 'kode_pajak' },
    { name: 'pajak',  align: 'left',label: 'Nama Pajak', field: 'nama_pajak'},
    { name: 'tipe_pajak',  align: 'left',label: 'Tipe Pajak', field: 'tipe_pajak'},
    { name: 'presentase_pajak',  align: 'left',label: 'Presentase Pajak', field: 'presentase_pajak'},
    { name: 'reference_pajak',  align: 'left',label: 'Reference Pajak(CBT)', field: 'reference_tax'},
]
export default {
    setup(){
        //MSTPAJAK
        const option = ref(['Kode pajak','Nama pajak','Tipe Pajak','Presentase Pajak','Reference Pajak(CBT)'])
        const coresimple = ref('')
        const opttipe = ref(['PPN','PPH'])

        const { modalAdd,openAdd } = usePratesis()

        function reloadTable(val) {
            coresimple.value.reloadTable(val)
        }
        return {
            option,
            columns,
            opttipe,
            
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