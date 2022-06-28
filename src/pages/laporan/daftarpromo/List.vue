<template>
    <q-page>
        <breadcrumb  :rightside="false"/>
        <div class="row q-pa-lg">
            <div class="col-12">
                <q-card class="own-card q-mb-lg" flat>
                <q-card-section>
                    <div class="row q-col-gutter-md">
                        <div class="col">
                            <label for="statusDrop">Promo ID:</label>
                            <div class="row">
                                <q-select
                                    v-model="status_claim"
                                    :options="options"
                                    outlined
                                    dense
                                    class="option-three col-12"
                                    id="statusDrop"
                                    emit-value
                                    map-options
                                    label="Dari promo ID" stack-label
                                    dropdown-icon="expand_more" />
                                <q-select
                                    v-model="status_claim"
                                    :options="options"
                                    outlined
                                    dense
                                    class="option-three col-12 q-mt-md"
                                    id="statusDrop"
                                    emit-value
                                    map-options
                                    label="Sampai promo ID" stack-label
                                    dropdown-icon="expand_more" />
                            </div>
                        </div>
                        <div class="col">
                                <label for="TglKlaim">Tanggal Awal :</label>
                                <div class="row">
                                    <q-input
                                v-model="filter.start_date"
                                type="date"
                                dense
                                outlined
                                class="option-two col-12"
                                label="Dari tanggal" stack-label
                                />
                                    <q-input
                                v-model="filter.start_date"
                                type="date"
                                dense
                                outlined
                                hide-bottom-space
                                label="Sampai tanggal" stack-label
                                class="option-two col-12 q-mt-md" />
                                </div>
                        </div>
                        <div class="col">
                                <label for="TglKlaim">Tanggal Akhir :</label>
                                <div class="row">
                                    <q-input
                                v-model="filter.start_date"
                                type="date"
                                dense
                                outlined
                                class="option-two col-12"
                                label="Dari tanggal" stack-label
                                />
                                    <q-input
                                v-model="filter.start_date"
                                type="date"
                                dense
                                outlined
                                hide-bottom-space
                                label="Sampai tanggal" stack-label
                                class="option-two col-12 q-mt-md" />
                                </div>
                        </div>
                        <div class="col">
                            <label for="statusDrop">Status :</label>
                                <q-select
                                    v-model="status_claim"
                                    :options="options"
                                    outlined
                                    dense
                                    class="option-three"
                                    id="statusDrop"
                                    emit-value
                                    map-options
                                    label="Dari promo ID" stack-label
                                    dropdown-icon="expand_more" />
                        </div>
                        <div class="col q-mt-lg">
                          <q-btn color="primary"  no-caps class="btn-one q-mr-md" unelevated @click="onFilter" >
                                Search
                            </q-btn>
                        </div>
                    </div>
                </q-card-section>
                </q-card>
            </div>
            <div class="col-12">
                <core-table
                    :columns="columns"
                    :url="url"
                    customDetail @openCustomDetail="openDetail"
                    ref="Coretable"
                    :requesting="requesting"
                    v-model:filter="filter"
                    >
                    <template v-slot:toptable>
                        <div class="row justify-end">
                            <q-btn color="secondary"  no-caps class="btn-one" unelevated label="Export to Excel" />
                        </div>
                    </template>
                    <template v-slot:body-cell-status="props">
                        <q-td key="status" :props="props">
                            <q-badge outline :label="statusPromo(props.row.status)"  :class="active ? colorStatusPromo(props.row.status) : ''"
                style="padding-top:5px;padding-bottom:5px;" />
                        </q-td>
                    </template>
                    
                </core-table>
            </div>
        </div>
        <detail-table v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" :canEdit="false" :customUrl="`promo/${dataDetail.id}`">
        <template v-slot:detail-content="props">
            <div class="laporan-klaim">
            <q-scroll-area class="fit">
                <div class="row items-center q-mt-md">
                        <div>Opso ID</div>
                        <q-space />
                        <div>{{props.tampil.opso_id}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Nama Promo</div>
                        <q-space />
                        <div >{{props.tampil.nama_promo}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Budget</div>
                        <q-space />
                        <div >{{formatRibuan(props.tampil.budget)}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Tanggal Awal</div>
                        <q-space />
                        <div >{{GeneralFormatDate(props.tampil.start_date,'DD/MM/YYYY')}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Tanggal Akhir</div>
                        <q-space />
                        <div >{{GeneralFormatDate(props.tampil.end_date,'DD/MM/YYYY')}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Batas Waktu Claim</div>
                        <q-space />
                        <div>{{props.tampil.claim}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Budget holder</div>
                        <q-space />
                        <div>{{props.tampil.kode_budget_holder}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Spend Type</div>
                        <q-space />
                        <div>{{props.tampil.kode_spend_type}}</div>
                </div>
                <div class="row items-center q-mt-md">
                        <div>Status</div>
                        <q-space />
                        <q-badge outline :label="statusPromo(props.tampil.status)" :class="active ? colorStatusPromo(props.tampil.status) : ''" style="padding-top:5px;padding-bottom:5px;" />
                </div>
            </q-scroll-area>
            </div>
        </template>
    </detail-table>
    </q-page>
</template>

<script>
import { defineAsyncComponent,ref,computed,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRoute,useRouter } from 'vue-router'

export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
        'detail-table': defineAsyncComponent(() => import('components/Modal/DetailTable')),
    },
    setup(){
        const { formatRibuan,role,modalUpload,openUpload } = usePratesis()
        const { GeneralFormatDate,colorStatusPromo,statusPromo,showLoading,hideLoading,successNotif,errorNotif } = useCustom()

        const modalDetail = ref(false)
        const dataDetail = ref({})

        const columns = [
            { name: 'kode', label: 'Promotion ID', align: 'left', field: 'opso_id' },
            { name: 'nama_promo',  align: 'left',label: 'Nama Promo', field: 'nama_promo'},
            { name: 'status', label: 'Status ', align: 'left', field:'status' },
        ]

        const url = ref('')
        if (['AD','HO'].indexOf(role.value) >= 0) {
            url.value = 'promo'
        }

        if(role.value === 'GA'){
            url.value = 'promo-depot'
        }

        const active = ref(true)
        const { putData } = useService()

        const buktibayar = ref(null)
        const reloadBukti = result =>{
            buktibayar.value = result.data.data.data
        }
        const Coretable = ref(null)
        const requesting = ref(null)
        const submitLaporan = idKlaim => {
            if (buktibayar.value) {
                showLoading()
                putData(`laporan-claim/${idKlaim}`,{
                    bukti_bayar : buktibayar.value
                })
                .then(()=>{
                    hideLoading()
                    successNotif(`Klaim Berhasil di update`)
                    modalDetail.value = false
                    requesting.value = {
                        pagination : {
                            page : 1
                        }
                    } 
                    buktibayar.value = null
                })
                .catch(err=>{
                    console.log('error submit',err);
                    hideLoading()
                })
            }else{
                errorNotif('Upload Bukti Bayar terlebih dahulu')
            }
        }
        const kode_distributor = ref('')
        const status_claim = ref(null)
        const options = ref([ 
        {
            label: 'Semua',
            value: null
        },
        {
            label: 'Sudah Bayar',
            value: 'sudah_bayar'
        },
        {
            label: 'Layak Bayar',
            value: 'layak_bayar'
        }
        ])
        const filter = ref({})

        function onFilter() {
            filter.value.kode_distributor = kode_distributor.value ?? null
            filter.value.status_claim = status_claim.value ?? null
        }

        function openFile(value){
            window.open(value, "_blank");
        }
        const router = useRouter()
        function openDetail(value){
            if(role.value === 'GA') {
                router.push({name:'Detail Daftar Promo',params:{id:value.id}})
            }else {
                dataDetail.value = value
                modalDetail.value = true
            }
        }
        const route = useRoute()
        onMounted(()=>{
            if(route.query.id){
                dataDetail.value = {
                    id : route.query.id
                }
                modalDetail.value = true
            }
        })

        return {
            options,columns,role,active,
            colorStatusPromo,statusPromo,formatRibuan,GeneralFormatDate,
            modalUpload,openUpload,reloadBukti,buktibayar,
            submitLaporan,Coretable,
            showLoading,hideLoading,successNotif,errorNotif,
            requesting,
            kode_distributor,status_claim,filter,onFilter,
            openFile,
            openDetail,modalDetail,dataDetail,url
        }
    }
}
</script>
<style >
.laporan-klaim{
    height: calc(100vh - 110px);
    display: grid;
    grid-template-rows: auto 36px;
}
</style>