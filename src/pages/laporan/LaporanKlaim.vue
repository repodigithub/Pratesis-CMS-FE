<template>
    <q-page>
        <breadcrumb  :rightside="false"/>
        <div class="row q-pa-lg">
            <div class="col-12">
                <q-card class="own-card q-mb-lg" flat>
                <q-card-section>
                    <div class="row items-end">
                        <div class="col-3" v-if="role !== 'DI'">
                            <div class="q-pr-md">
                                <select-dropdown :url="`distributor?kode_area=${this.$store.state.auth.user.kode_area}`"  v-model:selected="kode_distributor" nameLabel="Distributor :"/>
                            </div>
                        </div>
                        <div class="col-3">
                            <div class="q-pl-md">
                                <label for="statusDrop">Status Klaim :</label>
                                <q-select
                                    v-model="status_claim"
                                    :options="options"
                                    outlined
                                    dense
                                    class="option-three"
                                    id="statusDrop"
                                    emit-value
                                    map-options
                                    dropdown-icon="expand_more" />
                            </div>
                        </div>
                        <div class="text-right" :class="role !== 'DI' ? 'col-6' : 'col-9'">
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
                    :option="optionTable"
                    :url="`laporan-claim`"
                    customDetail @openCustomDetail="openDetail"
                    ref="Coretable"
                    :requesting="requesting"
                    v-model:filter="filter"
                    >
                    <template v-slot:body-cell-status="props">
                        <q-td key="status" :props="props">
                            <q-badge outline :label="statusPromo(props.row.status_claim)"  :class="active ? colorStatusPromo(props.row.status_claim) : ''"
                style="padding-top:5px;padding-bottom:5px;" />
                        </q-td>
                    </template>
                    
                </core-table>
            </div>
        </div>
        <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" titleModal="Invoice (Tanpa Materai)" @onUploadSuccess="reloadBukti" typeFileUpload=".pdf"/>
        <detail-table v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" :canEdit="false">
        <template v-slot:detail-content="props">
            <div class="laporan-klaim">
            <q-scroll-area class="fit">
                    <div class="row q-my-sm">
                        <div class="col-12 wrapper-primary">
                            <p class="fs-10 q-mb-none">Keterangan :</p>
                            <span class="fs-12">{{props.tampil.description}}</span>
                        </div>
                    </div>
                    <div class="row items-center q-mt-md">
                            <div>Code ULI</div>
                            <q-space />
                            <div >{{props.tampil.kode_uli}}</div>
                    </div>
                    <div class="row items-center q-mt-md">
                            <div>Tanggal Kirim</div>
                            <q-space />
                            <div >{{GeneralFormatDate(props.tampil.created_at,'DD/MM/YYYY')}}</div>
                    </div>
            <div class="row items-center q-mt-md">
                    <div>Tanggal Terima</div>
                    <q-space />
                    <div >{{GeneralFormatDate(props.tampil.approved_date,'DD/MM/YYYY')}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Klaim</div>
                    <q-space />
                    <div>{{formatRibuan(props.tampil.amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Total PPN</div>
                    <q-space />
                    <div>{{formatRibuan(props.tampil.ppn_amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Total PPh</div>
                    <q-space />
                    <div >{{formatRibuan(props.tampil.pph_amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Dibayar</div>
                    <q-space />
                    <div>{{formatRibuan(props.tampil.total_amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Status</div>
                    <q-space />
                    <q-badge outline :label="statusPromo(props.tampil.status_claim)" :class="active ? colorStatusPromo(props.tampil.status_claim) : ''" style="padding-top:5px;padding-bottom:5px;" />
            </div>
            <div class="row items-center q-mt-md bg-primary4" style="border-radius: 8px;padding: 5px 10px;">
                <div>Bukti Bayar</div>
                <q-space />
                <q-btn color="primary" flat no-caps class="q-pr-none" v-if="buktibayar" type="a" @click.prevent="openFile(buktibayar)">
                    <div class="row fs-12">
                        <span class="q-mr-sm">
                            Lihat
                        </span>
                        <img src="~assets/icon/file-search.svg" alt="" class="align-middle">
                    </div>
                </q-btn>
                <q-btn color="primary" flat no-caps class="q-pr-none" v-if="props.tampil.bukti_bayar" type="a" @click.prevent="openFile(props.tampil.bukti_bayar)">
                    <div class="row fs-12">
                        <span class="q-mr-sm">
                            Lihat
                        </span>
                        <img src="~assets/icon/file-search.svg" alt="" class="align-middle">
                    </div>
                </q-btn>
                <q-btn color="secondary" flat no-caps class="q-pr-none" @click="openUpload" v-if="role == 'GA' && !buktibayar && !props.tampil.bukti_bayar">
                    <div class="row fs-12">
                        <span class="q-mr-sm">
                            Upload
                        </span>
                        <img src="~assets/icon/upload_docs.svg" alt="" class="align-middle">
                    </div>
                </q-btn>
            </div>
            </q-scroll-area>
            <div class="row justify-between q-pt-sm" v-if="role == 'GA' && !props.tampil.bukti_bayar">
                <q-btn color="secondary" label="Cancel" outline no-caps unelevated class="q-px-sm btn-one" v-close-popup />
                <q-btn color="secondary" label="Submit" no-caps unelevated class="q-px-sm btn-one" @click="submitLaporan(props.tampil.id)"/>
            </div>
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
import {  useRoute } from 'vue-router'

export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'select-dropdown' : defineAsyncComponent(()=> import('components/SelectDropdown')),
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        'detail-table': defineAsyncComponent(() => import('components/Modal/DetailTable')),
    },
    setup(){
        const { formatRibuan,role,modalUpload,openUpload } = usePratesis()
        const { GeneralFormatDate,colorStatusPromo,statusPromo,showLoading,hideLoading,successNotif,errorNotif } = useCustom()

        const modalDetail = ref(false)
        const dataDetail = ref({})

        const columns = [
            { name: 'kode', label: 'Coding ULI', align: 'left', field: 'kode_uli' },
            { name: 'keterangan',  align: 'left',label: 'Ket', field: 'description'},
            { name: 'tgl_kirim',  align: 'left',label: 'Tanggal Kirim', field: row => `${GeneralFormatDate(row.created_at,'DD/MM/YYYY')}`},
            { name: 'tgl_terima', label: 'Tanggal Terima', align: 'left', field:row => `${GeneralFormatDate(row.approved_date,'DD/MM/YYYY')}` },
            { name: 'rp_klaim',  align: 'left',label: 'Rp Klaim', field: row => `${formatRibuan(row.claim)}`},
            { name: 'ppn',  align: 'left',label: 'PPN', field: 'ppn_amount'},
            { name: 'pph',  align: 'left',label: 'PPH', field: 'pph_amount'},
            { name: 'rp_dibayar',  align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.amount)}`},
            { name: 'status',align:'left',label:'Status',field:'status_claim'}
        ]
        const optionTable = computed(()=>{
            let level = '?level='
            if (['AD','HO'].indexOf(role.value) >= 0) {
                level += 'ho'
                return { level: level }
            }else if(role.value == 'GA'){
                level += 'depot'
                return { level: level }
            }else if(role.value == 'DI'){
                level += 'distributor'
                return { level : level }
            }else {
                return null
            }
        })
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

        
        function openDetail(value){
            dataDetail.value = value
            modalDetail.value = true
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
            options,columns,role,optionTable,active,
            colorStatusPromo,statusPromo,formatRibuan,GeneralFormatDate,
            modalUpload,openUpload,reloadBukti,buktibayar,
            submitLaporan,Coretable,
            showLoading,hideLoading,successNotif,errorNotif,
            requesting,
            kode_distributor,status_claim,filter,onFilter,
            openFile,
            openDetail,modalDetail,dataDetail,
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