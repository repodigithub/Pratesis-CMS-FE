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
                    <q-btn v-if="userRole != 'GA'" :outline="spend_type === 'All' ? false : true " no-caps color="primary" label="All" unelevated @click="filterSpend('All')" :class="spend_type === 'All' ? '' : 'bg-primary4'"/>
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
                <q-btn v-if="userRole != 'GA'" :outline="status === 'Draft' ? false : true " color="primary" label="Draft" unelevated @click="filterStatus('Draft')" :class="status === 'Draft' ? '' : 'bg-primary4'" no-caps/>
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
                    <div class="row justify-end q-mt-md col-12" v-if="itemPromo.length > 0">
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
                </div>
                <div class="row item-promo items-center" v-else>
                    <div class="col-12 text-center text-h6">
                        Tidak Ada Data
                    </div>
                </div>
            </div>
        </q-card-section>
        
    </q-card>
    
</div>

</template>

<script>
import { ref, defineAsyncComponent,watch,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    name: 'header-of-office',
    setup(){
        const spend_type = ref('All')
        const status = ref('All')
        const filterSearch = ref({})


        const loading = ref(false)
        const { getData,postData } = useService()

        const { pagination,pagesNumber } = usePratesis()
        const itemPromo = ref([])
        const url = ref('promo?limit=5')
        function getPromo(page = ''){
            loading.value = true
            let key = ''
            if (filterSearch.value.nama) {
                key += `&nama=${filterSearch.value.nama}`
            }
            if (filterSearch.value.opso_id) {
                key += `&opso_id=${filterSearch.value.opso_id}`
            }
            if (filterSearch.value.area_id) {
                key += `&area_id=${filterSearch.value.area_id}`
            }
            if (filterSearch.value.start_date) {
                key += `&start_date=${filterSearch.value.start_date}`
            }
            if (filterSearch.value.end_date) {
                key += `&end_date=${filterSearch.value.end_date}`
            }
            if(spend_type.value !== 'All'){
                key += `&spend_type=${spend_type.value.toLowerCase()}`
            }
            if(status.value !== 'All'){
                key += `&status=${status.value.replace(/ /g,"_").toLowerCase()}`
            }

            let pages = page ? `&page=${page}` : ''
            getData(url.value + key + pages)
            .then(res=>{
                loading.value = false
                let result = res.data.data
                itemPromo.value = result.data
                pagination.value.page = result.current_page
                pagination.value.rowsPerPage = result.per_page
                pagination.value.rowsNumber = result.total
            })
            .catch(err=>{
                console.log('error,',err)
            })
            getData('promo-depot')
            .then(res=>{
                console.log('promo depot',res)
            })
        }

        getPromo()

        function filterPromo(filter){
            filterSearch.value = { ...filter }
            getPromo()
        }

        const filterStatus = statusPromo => {
            status.value = statusPromo
            getPromo()
        }

        const filterSpend = spendtype => {
            spend_type.value = spendtype
            getPromo()
        }

        const gotoPage = page => {
            getPromo(page)
        }

        return {
            spend_type,filterSpend,
            status,filterStatus,
            itemPromo,loading,
            filterPromo,
            url,filterSearch,
            pagination,pagesNumber,gotoPage
        }
    },
    components:{
        'item-promo' : defineAsyncComponent(()=> import('./utama/ItemPromo')),
        'filter-promo': defineAsyncComponent(()=> import('./utama/FilterPromo'))
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