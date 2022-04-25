<template>
    <q-dialog :model-value="modalDetail" @click="$emit('update:modalDetail', $event.target.value)" @hide="$emit('update:modalDetail',false)" full-height position="right" class="dialog-detail">
        <q-card style="width:400px;height:100%;">
            <div class="data-detail">
                <q-card-section class="row items-start q-pb-none">
                    <div class="text-h6">Request Data Detail </div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-scroll-area class="fit" v-if="valid">
                    <q-card-section class="q-pb-none" >
                        <div class="row items-center q-mb-md">
                            <div>OPSO ID</div>
                            <q-space />
                            <div class="text-primary">{{detailPromo.opso_id}}</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Nama Promo</div>
                            <q-space />
                            <div class="text-primary">{{detailPromo.nama_promo}}</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Budget</div>
                            <q-space />
                            <div class="text-primary">Rp {{formatRibuan(detailPromo.budget)}}</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Tanggal Awal</div>
                            <q-space />
                            <div class="text-primary">{{formatTglPromo2(detailPromo.start_date)}}</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Tanggal Akhir</div>
                            <q-space />
                            <div class="text-primary">{{formatTglPromo2(detailPromo.end_date)}}</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Batas Waktu Claim</div>
                            <q-space />
                            <div class="text-primary">{{detailPromo.claim}} Hari</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Spend Type</div>
                            <q-space />
                            <div class="text-primary">{{detailPromo.kode_spend_type}}</div>
                        </div>
                        <div class="row items-center q-mb-md">
                            <div>Budget Holder</div>
                            <q-space />
                            <div class="text-primary">{{detailPromo.kode_budget_holder}}</div>
                        </div>
                        <div class="row items-center q-mb-xl">
                            <div>Status</div>
                            <q-space />
                            <q-badge outline :label="statusPromo(detailPromo.status)" :class="active ? colorStatusPromo(detailPromo.status) : ''"
            style="padding-top:5px;padding-bottom:5px;"/>
                        </div>
                        <div class="row items-center">
                            <div>Budget Berdasarkan Brand</div>
                            <q-space />
                            <q-btn color="primary" flat no-caps dense @click="$router.push({ name:'Detail Approval Promo',params:{ id : idPromo } })">
                                <div class="d">Lihat Detail Promo</div>
                                <q-icon name="chevron_right" />
                            </q-btn>
                        </div>
                        <q-table
                            class="my-sticky-header-table q-mt-md btn-radius col-12"
                            :rows="products"
                            :columns="produk"
                            row-key="id"
                            flat
                            bordered
                            :pagination="{rowsPerPage:0}"
                            hide-pagination
                            binary-state-sort
                        />
                    </q-card-section>
                </q-scroll-area>
                <q-card-section class="row justify-center" v-else>
                    <q-spinner-grid class="col-4 text-primary"/>
                    <span class="col-12 text-primary font-medium text-center">Memuat Data</span>
                </q-card-section>
                <q-card-section class="row items-center justify-between" v-if="detailPromo.status === 'need_approval'">
                    <q-btn color="secondary" label="Reject" no-caps unelevated class="q-px-sm btn-one q-mr-sm" outline @click="onApproval('Reject')"/>
                    <q-btn color="secondary" label="Approve" no-caps unelevated class="q-px-sm btn-one" @click="onApproval('Approve')"/>
                </q-card-section>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
import { ref,onMounted } from 'vue'
import { useQuasar } from 'quasar'
export default {
    name:'modal-detail-approval',
    props:{
        modalDetail:{
            type:Boolean,
            default:false
        },
        idPromo:{
            type:String,
        },
        role:{
            type:String,
        }
    },
    setup(props,{emit}){
        const valid = ref(false)
        const { getData,putData } = useService()
        const { statusPromo,colorStatusPromo,formatTglPromo2,successNotif,showLoading,hideLoading } = useCustom()
        const { formatRibuan } = usePratesis()
        const detailPromo = ref({})

        const products = ref([])
        function initData(url){
            getData(`${url}/${props.idPromo}`)
            .then(res=>{
                detailPromo.value = res.data.data
                getData(`${url}/${props.idPromo}/product?limit=5`)
                .then(result=>{
                    products.value = result.data.data.data
                    if (['DI','GA'].indexOf(props.role) >= 0) {
                        products.value.map(item=>{
                            item.budget_brand = (item.persentase/100)*detailPromo.value.budget
                        })
                    }
                    valid.value = true
                    console.log('result',result.data.data.data)
                })
            })
        }

        onMounted(()=>{
            if (['AD','HO'].indexOf(props.role) >= 0) {
                initData('promo')
            }else if(props.role === 'GA'){
                initData('promo-depot')
            }
        })
        
        const active = ref(true)

        const produk = [
            { name: 'kode', label: 'Kode Brand', align: 'left', field: 'kode_brand' },
            { name: 'nama_brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
            { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget_brand)}`},
        ]
        const quasar = useQuasar()
        function onApproval(value) {
            quasar.dialog({
                title: `Konfirmasi ${value} Data`,
                message: `Anda yakin ingin ${value.toLowerCase()} data ini?`,
                cancel: true,
                persistent: false
            })
            .onOk(()=>{
                showLoading()
                let url = ''
                if (props.role === 'GA') {
                    url += 'promo-depot'
                }else{
                    url += 'promo'
                }
                url += `/${props.idPromo}/status`
                putData(url,{
                    status : value.toLowerCase()
                })
                .then(()=>{
                    hideLoading()
                    emit('update:modalDetail',false)
                    successNotif(`Data Berhasil di ${value.toLowerCase()}`)
                    emit('updateApproval',1)
                })
                .catch(err=>{
                    console.log("error single approval",err)
                })
            })
        }

        return {
            valid,detailPromo,statusPromo,colorStatusPromo,active,products,produk,
            formatTglPromo2,formatRibuan,onApproval,
            successNotif,showLoading,hideLoading
        }
    },
    components:{
    }
}
</script>

<style>

</style>