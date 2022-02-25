<template>
<q-page>
    <breadcrumb  url="MSTPRODUCT.xlsx" @openModal="openUpload" />
        <div class="row q-pa-lg">
            <div class="col-12">
                <q-card class="own-card q-mb-lg" flat>
                    <q-card-section>
                        <div class="row items-end justify-between">
                            <div class="col-2">
                                <div class="font-normal">Pencarian :</div>
                                <q-input v-model="search" placeholder="ex: Nama Produk" dense outlined class="option-two col-9">
                                    <template v-slot:append>
                                        <q-icon
                                            name="search"
                                            class="grey2"
                                        />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-2">
                                <div class="font-normal">Divisi :</div>
                                <select-dropdown url="divisi" v-model:selected="divisi" master="true"/>
                            </div>
                            <div class="col-2">
                                <div class="font-normal">Category :</div>
                                <select-dropdown url="category" v-model:selected="category" master="true"/>
                            </div>
                            <div class="col-2">
                                <div class="font-normal">Sub Brand :</div>
                                <select-dropdown url="sub-brand" v-model:selected="subbrand" master="true"/>
                            </div>
                            <div class="col-2">
                                <div class="font-normal">Product :</div>
                                <select-dropdown url="product" v-model:selected="product" master="true"/>
                            </div>
                            <div class="col-1">
                                <q-btn color="primary" label="Search" no-caps unelevated class="btn-one" :class="resetFilter ? 'q-mb-md' :''" @click="filtering"/>
                                <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="reseting" v-if="resetFilter"/>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
                <core-table :url="$route.path.substr(1)"  :columns="columns" v-model:requesting="reload" v-model:filter="filter">
                    <template v-slot:detail-content="props">
                        <div v-if="!props.edit">
                            <div class="row items-center">
                                <div>Kode Product</div>
                                <q-space />
                                <div >{{props.tampil.kode_produk}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Nama Product</div>
                                <q-space />
                                <div >{{props.tampil.nama_produk}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Sub Brand</div>
                                <q-space />
                                <div >{{props.tampil.kode_sub_brand}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Nama Sub Brand</div>
                                <q-space />
                                <div >{{props.tampil.nama_sub_brand}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Nama Brand</div>
                                <q-space />
                                <div >{{props.tampil.nama_brand}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Category</div>
                                <q-space />
                                <div >{{props.tampil.nama_kategori}}</div>
                            </div>
                            <div class="row items-center q-mt-md">
                                <div>Divisi</div>
                                <q-space />
                                <div >{{props.tampil.nama_divisi}}</div>
                            </div>
                        </div>
                        <div v-else>
                            <label for="Kode produk">Kode Product</label>
                            <q-input v-model="props.send.kode_produk" type="text" id="Kode produk" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'Kode produk tidak boleh kosong',
                            ]"/>
                            <label for="nama produk">Nama Product</label>
                            <q-input v-model="props.send.nama_produk" type="text" id="nama produk" outlined dense lazy-rules
                            :rules="[
                                val => val !== null && val !== '' || 'nama produk tidak boleh kosong',
                            ]"/>
                            <label for="nama produk">Sub Brand</label>
                            <select-dropdown url="sub-brand" v-model:selected="props.send.kode_sub_brand" :master="false" class="q-mb-md"/>

                            <label for="nama produk">Nama Sub Brand</label>
                            <select-dropdown url="sub-brand" v-model:selected="props.send.kode_sub_brand" :master="false" class="q-mb-md"/>

                            <label for="nama produk">Nama Brand</label>
                            <select-dropdown url="brand" v-model:selected="props.send.kode_brand" :master="false" class="q-mb-md"/>

                            <label for="nama produk">Category</label>
                            <select-dropdown url="category" v-model:selected="props.send.kode_kategori" :master="false" class="q-mb-md"/>

                            <label for="nama produk">Divisi</label>
                            <select-dropdown url="divisi" v-model:selected="props.send.kode_divisi" :master="false" class="q-mb-md"/>
                        </div>
                    </template>
                </core-table>
            </div>
        </div>
    <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" @onUploadSuccess="reloadTable"/>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref} from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'

const columns = [
    { name: 'kode', label: 'Kode Produk', align: 'left', field: 'kode_produk',style:'width:5%' },
    { name: 'nama',  align: 'left',label: 'Nama Produk', field: 'nama_produk'},
    { name: 'sub_brand',  align: 'left',label: 'Sub Brand', field: 'kode_sub_brand',style:'width:5%'},
    { name: 'nama_sub_brand',  align: 'left',label: 'Nama Sub Brand', field: 'nama_sub_brand'},
    { name: 'nama_brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
    { name: 'category',  align: 'left',label: 'Category', field: 'nama_kategori'},
    { name: 'divisi',  align: 'left',label: 'Divisi', field: 'nama_divisi'},
]

export default {
    setup(){
        const { onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable} = usePratesis()
        
        const search = ref('')
        const divisi = ref('')
        const category = ref('')
        const subbrand = ref('')
        const product = ref('')

        const resetFilter = ref(false)
        function filtering(){
            let send = {}
            if(product.value){
                send.searchKey = product.value
            }else{
                send.searchKey = search.value
            }

            onFilter({
                "kode_sub_brand" : subbrand.value,
                "kode_kategori" : category.value,
                "kode_divisi" : divisi.value,
                ...send
            })
            resetFilter.value = true
        }
        function reseting(){
            search.value = null
            category.value = null
            divisi.value = null
            subbrand.value = null
            product.value = null
            resetFilter.value = false
            onResetFilter()
        }
        return {
            columns,

            onFilter,filter,onResetFilter,//filter

            modalUpload,//for upload modal,reload table
            openUpload,
            reloadTable,
            reload,

            search,
            divisi,
            category,
            product,
            subbrand,

            filtering,
            reseting,
            resetFilter

        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown'))
    },
}
</script>

<style>

</style>