<template>
<breadcrumb  :upload="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" style="color:#00000073;"/>
    </template>
    <template v-slot:rightside-content >
        <q-btn color="secondary"  no-caps class="btn-one" style="padding-left:10px!important;" unelevated @click="modalPromo = !modalPromo" v-if="['GA','DI'].indexOf(role) < 0">
            <q-icon name="add" />
            Add New
        </q-btn>
        
    </template>
</breadcrumb>

    <div class="row q-pa-lg">
        <filter-promo class="col-12" v-model:role="role" @onFilter="onFilter"/>
        <q-card class="own-card col-12" flat>
            <filter-status v-model:role="role" @onStatus="onStatus" @onSpend="onSpend" v-if="role !== 'DI'"/>

            <q-card-section class="q-pt-none">
            <div class="row justify-center q-mt-lg" v-if="loading">
                <q-spinner-grid class="col-4 text-primary"/>
                <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
            </div>
            <div v-else>
                <div v-if="itemPromo.length > 0">
                    <item-promo v-for="item in itemPromo" :key="item" :item="item" v-model:role="role" class="q-mt-md"/>
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

    <add-edit-promo v-model:modalPromo="modalPromo" v-if="modalPromo"/>

</template>

<script>
import { defineAsyncComponent,ref,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'

export default {
    setup(){
        const modalPromo = ref(false)

        const status = ref('')
        function onStatus(statusKey){
            status.value = statusKey
            gotoPage()
        }

        const spend_type = ref('')
        function onSpend(spendKey){
            spend_type.value = spendKey
            gotoPage()
        }

        const filter = ref({})
        function onFilter(filterKey){
            filter.value = {...filterKey}
            gotoPage()
        }

        const loading = ref(false)
        const { getData } = useService()

        const { pagination,pagesNumber,role } = usePratesis()
        const itemPromo = ref([])
        const url = ref('')

        onMounted(()=>{
            if (['AD','HO'].indexOf(role.value) >= 0) {
                url.value = 'promo'
            }

            if (role.value === 'DI') {
                url.value = 'promo-distributor'
            }

            if(role.value === 'GA'){
                url.value = 'promo-depot'
            }
            getPromo()
        })

        function getPromo(page = ''){
            loading.value = true
            let key = ''
            if (filter.value.nama) {
                key += `&nama=${filter.value.nama}`
            }
            if (filter.value.opso_id) {
                key += `&opso_id=${filter.value.opso_id}`
            }
            if (filter.value.area_id) {
                key += `&area_id=${filter.value.area_id}`
            }
            if (filter.value.start_date) {
                key += `&start_date=${filter.value.start_date}`
            }
            if (filter.value.end_date) {
                key += `&end_date=${filter.value.end_date}`
            }
            if(['All',''].indexOf(spend_type.value) < 0){
                key += `&spend_type=${spend_type.value.toLowerCase()}`
            }
            if(['All',''].indexOf(status.value) < 0){
                key += `&status=${status.value.replace(/ /g,"_").toLowerCase()}`
            }

            let pages = page ? `&page=${page}` : ''
            let limit = `?limit=5`
            getData(url.value + limit + key + pages)
            .then(res=>{
                loading.value = false
                let result = res.data.data
                if (role.value == 'DI') {
                    itemPromo.value = result.data
                    console.log('itemPromo',itemPromo.value)
                }else{
                    itemPromo.value = result.data.filter(item=> item.status)
                }
                pagination.value.page = result.current_page
                pagination.value.rowsPerPage = result.per_page
                pagination.value.rowsNumber = result.total
            })
            .catch(err=>{
                console.log('error,',err)
            })
        }

        const gotoPage = page => {
            getPromo(page)
        }

        return {
            modalPromo,loading,role,
            spend_type,status,filter,itemPromo,
            pagination,pagesNumber,
            onFilter,onStatus,onSpend,gotoPage
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'add-edit-promo' : defineAsyncComponent(()=> import('./AddEditPromo')),
        'filter-promo': defineAsyncComponent(()=> import('./core/FilterPromo')),
        'filter-status' : defineAsyncComponent(()=> import('./core/FilterStatus')),
        'item-promo' : defineAsyncComponent(()=> import('./core/ItemPromo')),
    },
}
</script>

<style>

</style>