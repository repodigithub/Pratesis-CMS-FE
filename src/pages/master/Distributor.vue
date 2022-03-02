<template>
<q-page>
    <breadcrumb  url="MSTDISTRIBUTOR.xlsx" @openModal="openUpload" />
        <div class="row q-pa-lg">
            <div class="col-12">
                <q-card class="own-card q-mb-lg" flat>
                    <q-card-section>
                        <div class="row items-end justify-between">
                            <div class="col-2">
                                <div class="font-normal">Pencarian :</div>
                                <q-input v-model="search" placeholder="ex: D001" dense outlined class="option-two col-9">
                                    <template v-slot:append>
                                        <q-icon
                                            name="search"
                                            class="grey2"
                                        />
                                    </template>
                                </q-input>
                            </div>
                            <div class="col-2">
                                <select-dropdown url="region" v-model:selected="region" nameLabel="Region :" />
                            </div>
                            <div class="col-2">
                                <select-dropdown url="area" v-model:selected="area" :islogin="false" nameLabel="Area :"/>
                            </div>
                            <div class="col-2">
                                <select-dropdown url="distributor-group" v-model:selected="distributorgroup" nameLabel="Distributor Group :"/>
                            </div>
                            <div class="col-2">
                                <select-dropdown url="distributor" v-model:selected="distributor" :islogin="false" nameLabel="Distributor :"/>
                            </div>
                            <div class="col-1">
                                <q-btn color="primary" label="Search" no-caps unelevated class="btn-one" :class="resetFilter ? 'q-mb-md' :''" @click="filtering"/>
                                <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="reseting" v-if="resetFilter"/>
                            </div>
                        </div>
                    </q-card-section>
                </q-card>
                <q-card class="own-card" flat>
                    <q-card-section>
                        <div class="font-normal q-mb-sm">Search :</div>
                        <q-btn-group outline>
                            <q-btn :outline="status === 'All' ? false : true " color="primary" label="All" no-caps  unelevated style="padding:0 40px !important;" @click="filterStatus('All')" :class="status === 'All' ? '' : 'bg-primary4'"/>
                            <q-btn :outline="status === 'aktif' ? false : true " color="primary" label="Active" no-caps  unelevated style="padding:0 30px !important;" @click="filterStatus('aktif')" :class="status === 'aktif' ? '' : 'bg-primary4'"/>
                            <q-btn :outline="status === 'tidak-aktif' ? false : true " color="primary" label="Inactive" no-caps  unelevated style="padding:0 30px !important;" @click="filterStatus('tidak-aktif')" :class="status === 'tidak-aktif' ? '' : 'bg-primary4'"/>
                        </q-btn-group>
                    </q-card-section>
                    <q-card-section>
                        <q-table
                                class="my-sticky-header-table q-mt-md btn-radius col-12"
                                title=""
                                :rows="rows"
                                :columns="columns"
                                row-key="id"
                                flat
                                bordered
                                v-model:pagination="pagination"
                                @request="onRequest"
                                :loading="loading"
                                :filter="filter"
                                binary-state-sort
                                hide-pagination
                                @row-click="openDetail"
                            >
                            <template v-slot:loading>
                            <q-inner-loading showing color="primary" />
                            </template>
                            <template v-slot:body-cell-status="props">
                                <q-td key="status" :props="props">
                                    <q-badge outline :color="props.row.status_distributor === 'aktif' ? 'positive' : 'warning'" :label="props.row.status_distributor === 'aktif' ? 'Active' : 'Inactive'" :class="props.row.status_distributor === 'aktif' ? 'active' : 'inactive'" class="status-badge"/>
                                </q-td>
                            </template>
                        </q-table>
                        <div class="col-12 row justify-end q-mt-md">
                        <q-pagination
                                v-model="pagination.page"
                                color="black"
                                active-color="secondary"
                                active-text-color="secondary"
                                :max="pagesNumber"
                                size="md"
                                direction-links
                                outline
                                class="table-pagination"
                                @update:model-value="gotoPage"
                                :max-pages="4"
                                :boundary-numbers="false"
                            />
                        </div>
                    </q-card-section>
                </q-card>
            </div>
        </div>
    <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" @onUploadSuccess="reloadTable"/>
    <detail v-model:modalDetail="modalDetail" v-if="modalDetail" v-model:dataDetail="dataDetail" @reloadTable="onRequest">
        <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Kode Distributor</div>
                    <q-space />
                    <div >{{props.tampil.kode_distributor}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Nama Distributor</div>
                    <q-space />
                    <div >{{props.tampil.nama_distributor}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Distributor Group</div>
                    <q-space />
                    <div >{{props.tampil.nama_distributor_group}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Area</div>
                    <q-space />
                    <div >{{props.tampil.nama_area}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Alamat</div>
                    <q-space />
                    <div >{{props.tampil.alamat}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Status</div>
                    <q-space />
                    <div >{{props.tampil.status_distributor}}</div>
                </div>
            </div>
            <div v-else>
                <label for="Kode distributor">Kode distributor</label>
                <q-input v-model="props.send.kode_distributor" type="text" id="Kode distributor" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Kode distributor tidak boleh kosong',
                ]"/>
                <label for="nama distributor">Nama distributor</label>
                <q-input v-model="props.send.nama_distributor" type="text" id="nama distributor" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'nama distributor tidak boleh kosong',
                ]"/>
                <select-dropdown url="distributor-group" v-model:selected="props.send.kode_distributor_group" class="q-mb-md" nameLabel="Distributor Group" :master="false"/>
                <select-dropdown url="area" v-model:selected="props.send.kode_area" class="q-mb-md" :islogin="false" nameLabel="Area" :master="false"/>
                <label for="alamat">Alamat</label>
                <q-input v-model="props.send.alamat" type="text" id="alamat" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'alamat tidak boleh kosong',
                ]"/>
                <label for="status">status</label>
                <q-toggle v-model="statusEdit" id="status" />
            </div>
        </template>
    </detail>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref,watch} from 'vue'
import { useRoute } from 'vue-router'
import { usePratesis } from 'src/composeables/usePratesis'

const columns = [
    { name: 'kode', label: 'Kode Distributor', align: 'left', field: 'kode_distributor',style:'width:5%' },
    { name: 'nama',  align: 'left',label: 'Nama Distributor', field: 'nama_distributor'},
    { name: 'distributor_group',  align: 'left',label: 'Distributor Group', field: 'nama_distributor_group',style:'width:5%'},
    { name: 'area',  align: 'left',label: 'Area', field: 'nama_area'},
    { name: 'region',  align: 'left',label: 'Region', field: 'nama_region',style:'width:10%'},
    { name: 'status',  align: 'center',label: 'Status', field: 'status_distributor'},
]

export default {
    setup(){
        const { onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable,pagination,rows,loading,init,onRequest,pagesNumber,gotoPage,modalDetail,openDetail,dataDetail} = usePratesis()
        const route = useRoute()

        init(route.path.substring(1))

        const status = ref('All')
        function filterStatus(key){
            status.value = key
            if(key === 'All') {
                reload.value = {
                    pagination : {
                            page : 1
                    }
                }
            }else{
                filter.value = {
                    "status_distributor": key
                }
            }
        }
        watch(()=>reload.value,val=>{
            onRequest(val)
        })
        const statusEdit = ref(false)
        watch(()=>dataDetail.value,val=>{
            if(val.status_distributor === 'aktif'){
                statusEdit.value = true
            }else {
                statusEdit.value = false
            }
        })
        watch(()=>statusEdit.value,val=>{
            if(val){
                dataDetail.value.status_distributor = 'aktif'
            }else{
                dataDetail.value.status_distributor = 'tidak-aktif'
            }
        })

        const search = ref('')
        const region = ref('')
        const area = ref('')
        const distributorgroup = ref('')
        const distributor = ref('')

        const resetFilter = ref(false)
        function filtering(){
            onFilter({
                searchKey : distributor.value,
                "kode_distributor_group" : distributorgroup.value,
                "kode_area" : area.value
            })
            resetFilter.value = true
        }
        function reseting(){
            search.value = null
            area.value = null
            region.value = null
            distributorgroup.value = null
            distributor.value = null
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

            status,
            filterStatus,


            search,
            region,
            area,
            distributor,
            distributorgroup,

            filtering,
            reseting,
            resetFilter,
            statusEdit,

            pagination,rows,loading,init,onRequest,pagesNumber,gotoPage,modalDetail,openDetail,dataDetail
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
        'detail': defineAsyncComponent(()=> import('components/Distributor/Detail'))
    },
}
</script>

<style>

</style>