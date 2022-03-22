<template>
<div class="col-12">
    <filter-promo @onFilter="filterPromo"/>
</div>
<div class="col-12">
    <q-card class="own-card">
        <q-card-section>
            <div style="float:left;" class="q-mr-md">
                <div class="font-normal q-mb-sm">Spend Type :</div>
                <q-btn-group outline>
                    <q-btn :outline="spend_type === 'All' ? false : true " no-caps color="primary" label="All" unelevated @click="filterSpend('All')" :class="spend_type === 'All' ? '' : 'bg-primary4'"/>
                    <q-btn :outline="spend_type === 'RA' ? false : true " color="primary" label="RA" unelevated @click="filterSpend('RA')" :class="spend_type === 'RA' ? '' : 'bg-primary4'"/>
                    <q-btn :outline="spend_type === 'FO' ? false : true " color="primary" label="FO" unelevated @click="filterSpend('FO')" :class="spend_type === 'FO' ? '' : 'bg-primary4'"/>
                    <q-btn :outline="spend_type === 'OA' ? false : true " color="primary" label="OA" unelevated @click="filterSpend('OA')" :class="spend_type === 'OA' ? '' : 'bg-primary4'"/>
                    <q-btn :outline="spend_type === 'PA' ? false : true " color="primary" label="PA" unelevated @click="filterSpend('PA')" :class="spend_type === 'PA' ? '' : 'bg-primary4'"/>
                </q-btn-group>
            </div>
            <div class="font-normal q-mb-sm">Status :</div>
            <q-btn-group outline>
                <q-btn :outline="status === 'All' ? false : true " color="primary" label="All" unelevated @click="filterStatus('All')" :class="status === 'All' ? '' : 'bg-primary4'" no-caps/>
                <q-btn :outline="status === 'Approve' ? false : true " color="primary" label="Approve" unelevated @click="filterStatus('Approve')" :class="status === 'Approve' ? '' : 'bg-primary4'" no-caps/>
                <q-btn :outline="status === 'Need Approval' ? false : true " color="primary" label="Need Approval" unelevated @click="filterStatus('Need Approval')" :class="status === 'Need Approval' ? '' : 'bg-primary4'" no-caps/>
                <q-btn :outline="status === 'Reject' ? false : true " color="primary" label="Reject" unelevated @click="filterStatus('Reject')" :class="status === 'Reject' ? '' : 'bg-primary4'" no-caps/>
                <q-btn :outline="status === 'Draft' ? false : true " color="primary" label="Draft" unelevated @click="filterStatus('Draft')" :class="status === 'Draft' ? '' : 'bg-primary4'" no-caps/>
            </q-btn-group>
        </q-card-section>
        <q-card-section class="q-pt-none">
            <div class="row justify-center q-mt-lg" v-if="loading">
                <q-spinner-grid class="col-4 text-primary"/>
                <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
            </div>
            <div v-else>
                <div v-if="itemPromo.length > 0">
                    <item-promo v-for="item in itemPromo" :key="item" :item="item"/>
                </div>
                <div class="row item-promo items-center" v-else>
                    <div class="col-12 text-center text-h6">
                        Tidak Ada Data
                    </div>
                </div>
            </div>
        </q-card-section>
        <!-- <q-card-section class="q-pt-none">
                <q-table
                title=""
                :rows="rows"
                :columns="columns"
                row-key="name"
                :selection="request ? 'multiple' : 'none'"
                v-model:selected="selected"
                :filter="filter"
                grid
                hide-header
                >

                <template v-slot:item="props">
                    
                    <div
                    class="q-pa-xs col-12 grid-style-transition"
                    :style="props.selected ? 'transform: scale(0.98);' : ''"
                    
                    >
                    <q-card :class="props.selected ? 'bg-grey-2' : ''" flat>
                        <q-card-section>
                            <div class="row">
                                <q-checkbox dense v-model="props.selected" label=" " v-if="request"/>
                                <q-img
                                    src="~assets/dummy/dummypromo.png"
                                    spinner-color="primary"
                                    spinner-size="82px"
                                    width="80px"
                                    height="80px"
                                />
                                <div class="q-ml-md">
                                    <div class="font-medium text-bold">Jasa Pemasaran Ice Cream 2021 SAR RSM IC 14 - 31 Mar 2011</div>
                                    <div style="font-weight:500;" class="q-mb-sm">10124343</div>
                                    <div class="row">
                                        <q-badge outline label="RA" class="text-primary q-mr-md"/>
                                        <div class="row items-center q-mr-md">
                                            <q-img
                                                src="~assets/icon/calendar-star.svg"
                                                spinner-color="primary"
                                                spinner-size="5px"
                                                width="16px"
                                                height="18px"
                                            />
                                            <div class="font-normal q-ml-sm ">14 Mar 2021</div>
                                        </div>
                                        <div class="row items-center">
                                            <q-img
                                                src="~assets/icon/calendar-check.svg"
                                                spinner-color="primary"
                                                spinner-size="5px"
                                                width="16px"
                                                height="18px"
                                            />
                                            <div class="font-normal q-ml-sm">16 Mar 2021</div>
                                        </div>
                                    </div>
                                </div>
                                <q-space />
                                <div class="status-promo">
                                    <q-badge outline label="Approved" class="text-primary q-mr-md"/>
                                </div>

                            </div>
                        </q-card-section>
                        
                    </q-card>
                    </div>
                </template>

                </q-table>
        </q-card-section> -->
    </q-card>
    
</div>

</template>

<script>
import { ref, defineAsyncComponent } from 'vue'
import { columns,rows } from 'src/common/dummy'
import { useService } from 'src/composeables/useService'
export default {
    setup(){
        const spend_type = ref('All')
        const status = ref('All')
        const loading = ref(true)
        const filterStatus = statusPromo => {
            itemPromo.value = []
            status.value = statusPromo
            loading.value = true
            if(statusPromo == 'All'){
                let url = `promo`
                if(spend_type.value !== 'All'){
                    url += `?spend_type=${spend_type.value.toLowerCase()}`
                }
                getData(url)
                .then(res=>{
                    itemPromo.value = res.data.data.data
                    loading.value = false
                })
            }else{
                let url = `promo?status=${statusPromo.replace(/ /g,"_").toLowerCase()}`
                if(spend_type.value !== 'All'){
                    url += `&spend_type=${spend_type.value.toLowerCase()}`
                }
                getData(url)
                .then(res=>{
                    itemPromo.value = res.data.data.data
                    loading.value = false
                })
            }
        }

        const request = ref(false)

        const promo = ref({})
        const cekpromo = ref(false)

        const filterSpend = spendtype => {
            itemPromo.value = []
            spend_type.value = spendtype
            loading.value = true
            if(spendtype == 'All'){
                let url = `promo`
                if(status.value !== 'All'){
                    url += `?status=${status.value.replace(/ /g,"_").toLowerCase()}`
                }
                getData(url)
                .then(res=>{
                    itemPromo.value = res.data.data.data
                    loading.value = false
                })
            }else{
                let url =`promo?spend_type=${spendtype.toLowerCase()}`
                if(status.value !== 'All'){
                    url += `&status=${status.value.replace(/ /g,"_").toLowerCase()}`
                }
                getData(url)
                .then(res=>{
                    itemPromo.value = res.data.data.data
                    loading.value = false
                })
            }
        }

        const { getData,postData } = useService()
        const itemPromo = ref([])
        getData('promo')
        .then(res=>{
            itemPromo.value = res.data.data.data
            loading.value = false
            console.log('response promo,',res)
        })
        .catch(err=>{
            console.log('error,',err)
        })

        function filterPromo(value){
            console.log('filterpromo',value)
        }


        return {
            spend_type,filterSpend,
            status,filterStatus,
            columns,rows,filter: ref(''),selected: ref([]),
            request,
            promo,cekpromo,itemPromo,loading,
            filterPromo
            
        }
    },
    components:{
        'item-promo' : defineAsyncComponent(()=> import('./admin/ItemPromo')),
        'filter-promo': defineAsyncComponent(()=> import('./admin/FilterPromo'))
    }
}
</script>

<style lang="scss">
.grid-style-transition{
    transition: transform .28s, background-color .28s;
    border:1px solid $grey3;
    border-radius:5px;
    margin-bottom:10px;
}
.item-promo{
    border:1px solid $grey3;
    border-radius:5px;
    margin-bottom:10px;
    padding-top:15px;
    padding-bottom:15px;
}
</style>