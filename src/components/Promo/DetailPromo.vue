<template>
  <breadcrumb  :upload="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
        <q-breadcrumbs-el label="Detail Promo" style="color:#00000073;"/>
    </template>
    <template v-slot:rightside-content v-if="userRole && isDraft">
        <q-btn color="secondary" outline no-caps class="btn-one" style="padding-left:10px!important;" unelevated @click="onPromoSubmit">
            <q-img
                src="~assets/icon/file-check.svg"
                spinner-color="primary"
                spinner-size="5px"
                width="14px"
                height="18px"
                class="q-mr-sm"
            />
            Submit
        </q-btn>
    </template>
</breadcrumb>
<div class="row q-pa-lg">
    <div class="col-12 q-mb-md">
        <q-card class="own-card">
            <q-card-section>
                <div class="row justify-center q-mt-lg" v-if="loadjudul">
                    <q-spinner-grid class="col-4 text-primary"/>
                    <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                </div>
                <div class="row justify-between" v-else>
                    <div class="col-12 row ">
                        <div class="font-big">{{judul.nama_promo}}</div>
                        <q-space />
                        <q-btn color="secondary" no-caps unelevated class="btn-one">
                            <q-icon name="edit" style="font-size:18px;" class="q-mr-sm"/>
                            <div>Edit</div>
                        </q-btn>
                    </div>
                    <div class="col-12 row" style="margin-bottom:13px;">
                        <div class="col-8" style="padding-right:60px;">
                            <div class="text-h6">{{judul.opso_id}}</div>
                        </div>
                        <div class="col-4">
                            <div class="text-h6">Detail Promo</div>
                        </div>
                    </div>
                    <div class="col-8" style="padding-right:60px;">
                        <div class="row">
                            <div class="col-4">
                                Donut Chart
                            </div>
                            <div class="col-8">
                                <div class="row justify-between items-center" style="margin-bottom:10px;">
                                    <div class="row items-center">
                                        <div
                                            style="border-radius:10px;width:36px;height:36px;background: #FE9836;margin-right:15px;"
                                            class="row items-center justify-center"
                                            >
                                            <q-img
                                                src="~assets/icon/money-bill-alt.svg"
                                                spinner-color="primary"
                                                spinner-size="3px"
                                                width="27px"
                                                height="24px"
                                            />
                                        </div>
                                        <div class="font-16">Budget</div>
                                    </div>
                                    <div class="text-primary font-16"> <span style="opacity:0.4;">Rp</span> {{formatRibuan(budget)}}</div>
                                </div>
                                <div class="row justify-between items-center" style="margin-bottom:10px;">
                                    <div class="row items-center">
                                        <div
                                            style="border-radius:10px;width:36px;height:36px;background: #0065FF;margin-right:15px;"
                                            class="row items-center justify-center"
                                            >
                                            <q-img
                                                src="~assets/icon/money-bill-alt.svg"
                                                spinner-color="primary"
                                                spinner-size="3px"
                                                width="27px"
                                                height="24px"
                                            />
                                        </div>
                                        <div class="font-16">Budget Update</div>
                                    </div>
                                    <div class="text-primary font-16">
                                    <span v-if="loadbudgetproduk">Loading..</span>
                                    <span v-else>
                                        <span style="opacity:0.4;">Rp</span> 
                                        {{formatRibuan(budget_update)}}
                                    </span>
                                    </div>
                                </div>
                                <div class="row justify-between items-center" style="margin-bottom:10px;">
                                    <div class="row items-center">
                                        <div
                                            style="border-radius:10px;width:36px;height:36px;background: #FF7B7B;margin-right:15px;"
                                            class="row items-center justify-center"
                                            >
                                            <q-img
                                                src="~assets/icon/money-bill-alt.svg"
                                                spinner-color="primary"
                                                spinner-size="3px"
                                                width="27px"
                                                height="24px"
                                            />
                                        </div>
                                        <div class="font-16">Sisa Budget</div>
                                    </div>
                                    <div class="text-primary font-16">
                                    <span v-if="loadbudgetproduk">Loading..</span>
                                    <span v-else>
                                        <span style="opacity:0.4;">Rp</span> 
                                        {{formatRibuan(budget_left)}}
                                    </span>
                                    </div>
                                </div>
                                <div class="row justify-between items-center" style="margin-bottom:10px;">
                                    <div class="row items-center">
                                        <div
                                            style="border-radius:10px;width:36px;height:36px;background: #FFC977;margin-right:15px;"
                                            class="row items-center justify-center"
                                            >
                                            <q-img
                                                src="~assets/icon/money-bill-alt.svg"
                                                spinner-color="primary"
                                                spinner-size="3px"
                                                width="27px"
                                                height="24px"
                                            />
                                        </div>
                                        <div class="font-16">Claim</div>
                                    </div>
                                    <div class="text-primary font-16"><span style="opacity:0.4;">Rp</span> {{formatRibuan(judul.claim)}}</div>
                                </div>
                                <div class="row justify-between items-center" style="margin-bottom:10px;">
                                    <div class="row items-center">
                                        <div
                                            style="border-radius:10px;width:36px;height:36px;background: #A484FF;margin-right:15px;"
                                            class="row items-center justify-center"
                                            >
                                            <q-img
                                                src="~assets/icon/money-bill-alt.svg"
                                                spinner-color="primary"
                                                spinner-size="3px"
                                                width="27px"
                                                height="24px"
                                            />
                                        </div>
                                        <div class="font-16">Outstanding Claim</div>
                                    </div>
                                    <div class="text-primary font-16"><span style="opacity:0.4;">Rp</span> {{formatRibuan(judul.outstanding_claim)}}</div>
                                </div>
                                <div class="row justify-between items-center" style="margin-bottom:12px;">
                                    <div class="row items-center">
                                        <div
                                            style="border-radius:10px;width:36px;height:36px;background: #2ECE8C;margin-right:15px;"
                                            class="row items-center justify-center"
                                            >
                                            <q-img
                                                src="~assets/icon/money-bill-alt.svg"
                                                spinner-color="primary"
                                                spinner-size="3px"
                                                width="27px"
                                                height="24px"
                                            />
                                        </div>
                                        <div class="font-16">Budget Area</div>
                                    </div>
                                    <div class="text-primary font-16">
                                        <span v-if="loadbudgetarea">Loading...</span>
                                        <span v-else>
                                            <span style="opacity:0.4;">Rp</span> {{formatRibuan(budget_area)}}
                                            ({{persentaseBudgetarea}} %)
                                        </span>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="row items-center" style="height:32px;">
                            <div>Spend Type</div>
                            <q-space />
                            <q-badge outline :label="judul.kode_spend_type" :class="active ? colorStatusSpend(judul.kode_spend_type) : ''"/>
                        </div>
                        <div class="row items-center" style="height:32px;">
                            <div>Tanggal Awal</div>
                            <q-space />
                            <div class="d">{{formatTglPromo(judul.start_date)}}</div>
                        </div>
                        <div class="row items-center" style="height:32px;">
                            <div>Tanggal Akhir</div>
                            <q-space />
                            <div class="d">{{formatTglPromo(judul.end_date)}}</div>
                        </div>
                        <div class="row items-center" style="height:32px;">
                            <div>Budget Holder</div>
                            <q-space />
                            <div class="d">{{judul.kode_budget_holder}}</div>
                        </div>
                        <div class="row items-center" style="height:32px;">
                            <div>Status</div>
                            <q-space />
                            <q-badge outline :label="statusPromo(judul.status)" :class="active ? colorStatusPromo(judul.status) : ''"
            style="padding-top:5px;padding-bottom:5px;"/>
                            
                        </div>
                        <div class="row items-center" style="height:32px;">
                            <div>Batas Waktu Claim</div>
                            <q-space />
                            <div class="d">{{judul.waktu_claim}} Hari</div>
                        </div>
                        <div class="row items-center" style="height:32px;">
                            <div>Dokumen Pendukung</div>
                            <q-space />
                            <q-btn color="primary" class="q-pr-none" no-caps flat type="a" :href="documentClaim" target="_blank" download >
                                Download
                                <q-img
                                    src="~assets/icon/download.svg"
                                    spinner-color="primary"
                                    spinner-size="82px"
                                    width="16px"
                                    height="16px"
                                    style="margin-left:5px;"
                                />
                            </q-btn>
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
    <promo-image />
    <div class="col-12 q-mb-md">
        <budget-produk v-model:budget_update="budget_left" @updateProduk="getUpdateBudget" v-model:isDraft="isDraft"/>
    </div>
    <div class="col-12">
        <budget-area v-model:budgetlimit="budgetlimitarea" @updateArea="getBudgetArea" v-model:isDraft="isDraft"/>
    </div>
</div>

</template>

<script>
import { defineAsyncComponent,ref,watch,onMounted,computed } from 'vue'
import { useService } from 'src/composeables/useService'
import { useRoute } from 'vue-router'
import { useCustom  } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'

export default {
    setup(){
        
        const { getData,postData,putData,deleteData } = useService()
        const loadjudul = ref(true)
        const judul = ref({})
        const { showLoading,hideLoading,successNotif,formatTglPromo,colorStatusPromo,statusPromo,colorStatusSpend  } = useCustom()
        
        const { formatRibuan } = usePratesis()
        
        const route = useRoute()
        const budget_area = ref(0)
        const budget = ref(0)
        const budget_update = ref(0)
        const budget_left = ref(0)
        const documentClaim = ref(null)
        const status = ref(null)
        onMounted(()=>{
            getData(`promo/${route.params.id}`)
            .then(res=>{
                let result = res.data.data
                judul.value.nama_promo = result.nama_promo
                judul.value.opso_id = result.opso_id
                judul.value.waktu_claim = result.claim
                judul.value.start_date = result.start_date
                judul.value.end_date = result.end_date
                judul.value.status = result.status
                judul.value.kode_spend_type = result.kode_spend_type
                judul.value.claim = result.statistics.claim
                judul.value.outstanding_claim = result.statistics.outstanding_claim
                judul.value.kode_budget_holder = result.kode_budget_holder
                budget.value = result.budget
                budget_update.value = result.statistics.budget_update
                budget_left.value = result.statistics.budget_left
                budget_area.value = result.statistics.budget_area
                documentClaim.value = result.document
                status.value = result.status
                loadjudul.value = false
            })
            .catch(err=>{
                console.log('error,',err)
            })
        })
        const persentaseBudgetarea = computed(()=>{
            return (budget_area.value/budget.value)*100
        })

        const loadbudgetarea = ref(false)
        function getBudgetArea(){
            loadbudgetarea.value = true
            getData(`promo/${route.params.id}`)
            .then(res=>{
                loadbudgetarea.value = false
                let result = res.data.data
                budget_area.value = result.statistics.budget_area
            })
        }
        const loadbudgetproduk = ref(false)
        function getUpdateBudget(){
            loadbudgetproduk.value = true
            getData(`promo/${route.params.id}`)
            .then(res=>{
                loadbudgetproduk.value = false
                let result = res.data.data
                budget_left.value = result.statistics.budget_left
                budget_update.value = result.statistics.budget_update
            })
        }

        const isDraft = computed(()=>{
            return ['draft','reject'].indexOf(status.value) >= 0 ? true : false
        })

        function onPromoSubmit(){
            showLoading()
            setTimeout(() => {
                hideLoading()
            }, 5000);
        }
        const active = ref(true)
        return {
            loadjudul,judul,budget,
            persentaseBudgetarea,budget_area,getBudgetArea,loadbudgetarea,
            showLoading,hideLoading,successNotif,formatTglPromo,
            formatRibuan,
            getUpdateBudget,loadbudgetproduk,budget_update,budget_left,
            documentClaim,
            status,isDraft,
            onPromoSubmit,
            colorStatusPromo,statusPromo,colorStatusSpend,active 
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'budget-area' : defineAsyncComponent(()=> import('./area/BudgetArea')),
        'budget-produk' : defineAsyncComponent(()=> import('./produk/BudgetProduk')),
        'promo-image' : defineAsyncComponent(()=> import('./Image/PromoImage'))
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['SA','DI'].indexOf(role) >= 0 ? '' : role
        },
    },
}
</script>

<style>

</style>