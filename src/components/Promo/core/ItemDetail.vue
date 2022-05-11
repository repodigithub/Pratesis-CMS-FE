<template>

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
                        <q-btn color="secondary" no-caps unelevated class="btn-one" @click="modalPromo = !modalPromo" v-if="isDraft && ['AD','HO'].indexOf(role) >= 0">
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
                            <div class="col-5">
                                <div class="chart-place">
                                    <pie-chart v-model:chartData="fixDataChart"/>
                                </div>
                            </div>
                            <div class="col-7">
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
                                <div class="row justify-between items-center" style="margin-bottom:10px;" v-if="['AD','HO'].indexOf(role) >=0">
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
                                <div class="row justify-between items-center" style="margin-bottom:10px;" v-if="['AD','HO'].indexOf(role) >=0">
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
                                <div class="row justify-between items-center" style="margin-bottom:12px;" v-if="['AD','HO','GA'].indexOf(role) >=0">
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
                                        <div class="font-16">Budget {{['AD','HO'].indexOf(role) >=0 ? 'Area' : 'Distributor'}}</div>
                                    </div>
                                    <div class="text-primary font-16" v-if="['AD','HO'].indexOf(role) >=0">
                                        <span v-if="loadbudgetarea">Loading...</span>
                                        <span v-else>
                                            <span>{{persentaseBudgetarea}} %</span>
                                            <!-- <span style="opacity:0.4;">Rp</span> {{formatRibuan(budget_area)}}
                                            ({{persentaseBudgetarea}} %) -->
                                        </span>
                                    </div>
                                    <div class="text-primary font-16" v-if="['GA'].indexOf(role) >=0">
                                        <span v-if="loadbudgetdistributor">Loading...</span>
                                        <span v-else>
                                            <span style="opacity:0.4;">Rp</span> {{formatRibuan(budget_distributor)}}
                                            ({{persentaseBudgetdistributor}} %)
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
                            <q-badge outline :label="statusPromo(status)" :class="active ? colorStatusPromo(status) : ''"
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
                            <q-btn color="primary" class="q-pr-none" no-caps flat type="a" :href="documentClaim" target="_blank" download v-if="documentClaim">
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
    <promo-image v-model:role="role" v-model:status="status"/>

    <div class="col-12 q-mb-md" v-if="produkShow">
        <budget-produk v-model:budget_update="budget_left" @updateProduk="getUpdateBudget" v-model:isDraft="isDraft" v-model:role="role" v-model:budget="budget"/>
    </div>
    <div class="col-12" v-if="areaShow && ['AD','HO','GA'].indexOf(role) >= 0 ">
        <budget-area v-model:budgetlimit="budgetlimitareadistributor" @updateAreaDistributor="updateAreaDistributor" v-model:isDraft="isDraft" v-model:role="role"/>
    </div>
</div>
<add-edit-promo v-model:modalPromo="modalPromo" v-if="modalPromo" edit @initData="initData"/>
</template>

<script>
import { defineAsyncComponent,ref,onMounted,computed } from 'vue'
import { useService } from 'src/composeables/useService'
import { useRoute } from 'vue-router'
import { useCustom  } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'

export default {
    props:['roles','isDrafter','statusDetail','promoId'],
    setup(props,{ emit }){
        const { getData,putData } = useService()
        const loadjudul = ref(false)
        const judul = ref({})
        const { showLoading,hideLoading,successNotif,formatTglPromo,colorStatusPromo,statusPromo,colorStatusSpend,errorNotif  } = useCustom()
        
        const { formatRibuan,role } = usePratesis()
        
        const route = useRoute()
        const budget = ref(0)
        const documentClaim = ref('')
        const status = ref('undefined')
        const produkShow = ref(false)

        const budget_area = ref(0)
        const budget_update = ref(0)
        const budget_left = ref(0)

        const budget_distributor = ref(0)

        const areaShow = ref(false)

        const chartInner = computed(()=>{
            let result = []
            result.push(persentaseBudgetclaim.value,persentaseBudgetoutstandingclaim.value)
            if (['AD','HO'].indexOf(role.value) >= 0) {
                result.push(persentaseBudgetLeft.value)
            }
            let sumPersen = result.reduce((prev,curr)=>prev+curr)
            if (sumPersen > 0) {
                let hasil = 300-sumPersen
                result.push(hasil)
            }else{
                result.push(0)
            }
            return result
        })

        const chartOutside = computed(()=>{
            let result = []
            if (['AD','HO'].indexOf(role.value) >= 0) {
                result.push(persentaseBudgetarea.value,100-persentaseBudgetarea.value)
            }else if(role.value === 'GA'){
                result.push(persentaseBudgetdistributor.value,100-persentaseBudgetdistributor.value)
            }
            return result
        })

        const chartLabels = computed(()=>{
            let result = []
            if (['AD','HO'].indexOf(role.value) >= 0) {
                result.push('Budget Area','Null')
            }else if(role.value === 'GA'){
                result.push('Budget Distributor','Null')
            }
            result.push('Claim', 'Outstanding Claim', 'Sisa Budget','Null')
            return result
        })

        const fixDataChart = computed(()=>{
            return {
                    labels:chartLabels.value,
                    datasets: [
                        {
                            backgroundColor: ['#2ECE8C','white'],
                            data: chartOutside.value
                        },
                        {
                            backgroundColor: ['#FFC977', '#A484FF','#FF7070','white'],
                            data:chartInner.value
                        },
                    ]
                }
        })

        function initData(url){
            loadjudul.value = true
            produkShow.value = false
            areaShow.value = false
            getData(`${url}/${route.params.id}`)
            .then(res=>{
                let result = res.data.data
                judul.value.nama_promo = result.nama_promo
                judul.value.opso_id = result.opso_id
                judul.value.waktu_claim = result.claim
                judul.value.start_date = result.start_date
                judul.value.end_date = result.end_date
                judul.value.kode_spend_type = result.kode_spend_type
                judul.value.claim = result.statistics.claim
                judul.value.outstanding_claim = result.statistics.outstanding_claim
                judul.value.kode_budget_holder = result.kode_budget_holder
                budget.value = result.budget

                budget_update.value = result.statistics.budget_update
                budget_left.value = result.statistics.budget_left
                budget_area.value = result.statistics.budget_area

                budget_distributor.value = result.statistics.budget_distributor

                documentClaim.value = result.document
                status.value = role.value == 'DI' ? result.status_promo : result.status
                loadjudul.value = false
                produkShow.value = true
                areaShow.value = true
                emit('update:roles',role.value)
                emit('update:isDrafter',isDraft.value)
                emit('update:statusDetail',status.value)
                emit('update:promoId',result.id)
            })
            .catch(err=>{
                console.log('error,',err)
            })
        }
        onMounted(()=>{
            if (['AD','HO'].indexOf(role.value) >= 0) {
                initData('promo')
            }else if(role.value === 'GA'){
                initData('promo-depot')
            }else{
                initData('promo-distributor')
            }
        })

        const persentaseBudgetclaim = computed(()=>{
            return (judul.value.claim/budget.value)*100
        })

        const persentaseBudgetoutstandingclaim = computed(()=>{
            return (judul.value.outstanding_claim/budget.value)*100
        })

        const persentaseBudgetLeft = computed(()=>{
            return (budget_left.value/budget.value)*100
        })

        const persentaseBudgetarea = computed(()=>{
            return (budget_area.value/budget.value)*100
        })
        const budgetlimitarea = computed(()=>{
            return budget.value - budget_area.value
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

        const persentaseBudgetdistributor = computed(()=>{
            return (budget_distributor.value/budget.value)*100
        })

        const budgetlimitdistributor = computed(()=>{
            return budget.value - budget_distributor.value
        })

        const loadbudgetdistributor = ref(false)
        function getBudgetdistributor(){
            loadbudgetdistributor.value = true
            getData(`promo-depot/${route.params.id}`)
            .then(res=>{
                loadbudgetdistributor.value = false
                let result = res.data.data
                budget_distributor.value = result.statistics.budget_distributor
            })
        }

        const budgetlimitareadistributor = computed(()=>{
            return role.value == 'GA' ? budgetlimitdistributor.value : budgetlimitarea.value
        })

        function updateAreaDistributor(){
            if (role.value == 'GA') {
                getBudgetdistributor()
            }else{
                getBudgetArea()
            }
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
            return ['draft','reject','new_promo'].indexOf(status.value) >= 0 ? true : false
        })
        function onSubmitHO(){
            if (budget_left.value !== 0 && budget_area.value === budget.value) { //baru bisa disubmit
                errorNotif('Sisa budget harus bernilai 0 rupiah')
            }else if(budget_left.value === 0 && budget_area.value !== budget.value){
                errorNotif('budget area harus bernilai 100%')
            } else if(budget_left.value !== 0 && budget_area.value !== budget.value){
                errorNotif('Sisa budget harus bernilai 0 rupiah dan budget area harus bernilai 100%')
            }else {
                showLoading()
                putData(`promo/${route.params.id}/status`,{
                    status: "need_approval"
                })
                .then(res=>{
                    initData('promo')
                    hideLoading()
                })
                .catch(err=>{
                    console.log('err',err)
                })
            }
        }
        function onSubmitDepot(){
            if (budget_distributor.value !== budget.value) { //baru bisa disubmit
                errorNotif('budget distributor harus bernilai 100%')
            }else {
                showLoading()
                putData(`promo-depot/${route.params.id}/status`,{
                    status: "need_approval"
                })
                .then(res=>{
                    initData('promo-depot')
                    hideLoading()
                })
                .catch(err=>{
                    console.log('err',err)
                })
            }
        }
        function onPromoSubmit(){
            if (['HO','AD'].indexOf(role.value) >= 0) {
                onSubmitHO()
            }else{
                onSubmitDepot()
            }
        }
        const active = ref(true)
        const modalPromo = ref(false)
        return {
            role,
            loadjudul,judul,budget,

            persentaseBudgetarea,budget_area,getBudgetArea,loadbudgetarea,budgetlimitarea,

            showLoading,hideLoading,successNotif,formatTglPromo,
            formatRibuan,

            getUpdateBudget,loadbudgetproduk,budget_update,budget_left,

            documentClaim,
            status,isDraft,
            onPromoSubmit,
            colorStatusPromo,statusPromo,colorStatusSpend,active,
            modalPromo,
            initData,errorNotif,areaShow,produkShow,

            budget_distributor,persentaseBudgetdistributor,budgetlimitdistributor,loadbudgetdistributor,getBudgetdistributor,
            budgetlimitareadistributor,updateAreaDistributor,

            chartLabels,chartInner,chartOutside,fixDataChart
        }
    },
    components:{
        'budget-area' : defineAsyncComponent(()=> import('../area/BudgetArea')),
        'budget-produk' : defineAsyncComponent(()=> import('../produk/BudgetProduk')),
        'promo-image' : defineAsyncComponent(()=> import('../Image/PromoImage')),
        'add-edit-promo' : defineAsyncComponent(()=> import('../AddEditPromo')),
        'pie-chart' : defineAsyncComponent(()=> import('./PieChart'))
    },
}
</script>

<style>
.chart-place{
    background: white;
    padding:10px;
    box-shadow: 0px 8px 14px rgba(102, 128, 197, 0.08), 0px 1px 1px rgba(184, 184, 184, 0.13);
    border-radius:50%;
    width:220px;
    height:220px;
}
</style>