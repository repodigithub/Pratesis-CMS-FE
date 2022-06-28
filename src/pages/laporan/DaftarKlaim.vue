<template>
    <q-page>
        <breadcrumb  :rightside="false"/>
        <div class="row q-pa-lg">
            <div class="col-12">
                <q-card class="own-card q-mb-lg" flat>
                <q-card-section>
                    <div class="row items-end q-col-gutter-md">
                        <div class="col">
                            <label for="statusDrop">Promo ID:</label>
                            <div class="row q-col-gutter-md">
                                <q-select
                                    v-model="status_claim"
                                    :options="options"
                                    outlined
                                    dense
                                    class="option-three col"
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
                                    class="option-three col"
                                    id="statusDrop"
                                    emit-value
                                    map-options
                                    label="Sampai promo ID" stack-label
                                    dropdown-icon="expand_more" />
                            </div>
                        </div>
                        <div class="col">
                                <label for="TglKlaim">Tanggal Klaim :</label>
                                <div class="row q-col-gutter-md">
                                    <q-input
                                v-model="filter.start_date"
                                type="date"
                                dense
                                outlined
                                class="option-two col"
                                label="Dari tanggal" stack-label
                                />
                                    <q-input
                                v-model="filter.start_date"
                                type="date"
                                dense
                                outlined
                                hide-bottom-space
                                label="Sampai tanggal" stack-label
                                class="option-two col" />
                                </div>
                        </div>
                        <div v-if="role === 'GA'" class="col">
                            <label for="statusDrop">Distributor :</label>
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
                        <div class="col-2">
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
                                    label="Dari promo ID" stack-label
                                    dropdown-icon="expand_more" />
                        </div>
                        <div class="col-2" v-if="role === 'DI'">
                            <q-btn color="primary"  no-caps class="btn-one q-mr-md" unelevated @click="onFilter" >
                                Search
                            </q-btn>
                        </div>
                    </div>
                    <div class="row q-mt-md" v-if="role === 'GA'">
                        <q-btn color="primary"  no-caps class="btn-one q-mr-md" unelevated @click="onFilter" >
                                Search
                            </q-btn>
                    </div>
                </q-card-section>
                </q-card>
            </div>
            <div class="col-12">
                <core-table
                    :columns="columns"
                    :option="optionTable"
                    :url="`laporan-claim`"
                    customDetail 
                    @openCustomDetail="openDetail"
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
                            <q-badge outline :label="statusPromo(props.row.status_claim)"  :class="active ? colorStatusPromo(props.row.status_claim) : ''"
                style="padding-top:5px;padding-bottom:5px;" />
                        </q-td>
                    </template>
                    
                </core-table>
            </div>
        </div>

        <detail-table v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" :canEdit="false" :customUrl="`laporan-claim/${dataDetail.id}`">
        <template v-slot:detail-content="props">
            <div class="laporan-klaim">
            <q-scroll-area class="fit">
                    <div class="row items-center q-mt-md">
                            <div>OPSO ID</div>
                            <q-space />
                            <div >{{props.tampil.opso_id}}</div>
                    </div>
                    <div class="row items-center q-mt-md">
                            <div>Code ULI</div>
                            <q-space />
                            <div >{{props.tampil.kode_uli}}</div>
                    </div>
                    <div class="row items-center q-mt-md">
                            <div>Jenis Kegiatan</div>
                            <q-space />
                            <div >{{props.tampil.jenis_kegiatan}}</div>
                    </div>
                    <div class="row items-center q-mt-md">
                            <div>Spend Type</div>
                            <q-space />
                            <div >undefined</div>
                    </div>
                    <div class="row items-center q-mt-md">
                            <div>Paid Aging</div>
                            <q-space />
                            <div >undefined</div>
                    </div>
            <div class="row items-center q-mt-md">
                    <div>Tanggal Klaim</div>
                    <q-space />
                    <div >{{GeneralFormatDate(props.tampil.approved_date,'DD/MM/YYYY')}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Nilai Klaim</div>
                    <q-space />
                    <div>{{formatRibuan(props.tampil.amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Nilai PPN</div>
                    <q-space />
                    <div>{{formatRibuan(props.tampil.ppn_amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Nilai PPh</div>
                    <q-space />
                    <div >{{formatRibuan(props.tampil.pph_amount)}}</div>
            </div>
            <div class="row items-center q-mt-md">
                    <div>Nilai Klaim Nett</div>
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
                <q-btn color="primary" flat no-caps class="q-pr-none" v-if="props.tampil.bukti_bayar" type="a" @click.prevent="openFile(props.tampil.bukti_bayar)">
                    <div class="row fs-12">
                        <span class="q-mr-sm">
                            Lihat
                        </span>
                        <img src="~assets/icon/file-search.svg" alt="" class="align-middle">
                    </div>
                </q-btn>
            </div>
            </q-scroll-area>
            </div>
        </template>
    </detail-table>
    </q-page>
</template>

<script>
import { defineAsyncComponent,ref,computed } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'

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

        const columns = []
        if(role.value == 'GA'){
            columns.push(
                { name: 'kode', label: 'Distributor', align: 'left', field: 'kode_uli' }
            )
        }
        columns.push(
            { name: 'kode', label: 'Coding ULI', align: 'left', field: 'kode_uli' },
            { name: 'tgl_kirim',  align: 'left',label: 'Tanggal Klaim', field: row => `${GeneralFormatDate(row.approved_date,'DD/MM/YYYY')}`},
            { name: 'status',align:'left',label:'Status Klaim',field:'status_claim'}
        )

        const optionTable = computed(()=>{
            let level = '?level='
            if(role.value == 'GA'){
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

        const buktibayar = ref(null)

        const Coretable = ref(null)
        const requesting = ref(null)

        const kode_distributor = ref('')
        const status_claim = ref(null)
        const options = ref([ 
        {
            label: '22050013',
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

        return {
            options,columns,role,optionTable,active,
            colorStatusPromo,statusPromo,formatRibuan,GeneralFormatDate,
            modalUpload,openUpload,buktibayar,
            Coretable,
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