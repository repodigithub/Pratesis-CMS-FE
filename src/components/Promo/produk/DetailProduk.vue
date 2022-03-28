<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
        <q-breadcrumbs-el label="Detail Promo" class="text-primary" :to="{name: 'Detail Promo'}"/>
        <q-breadcrumbs-el label="Detail Produk" style="color:#00000073;"/>
    </template>
</breadcrumb>
<div class="row justify-center" style="margin-top:65px;padding-bottom:40px;">
    <div class="col" style="max-width:818px;">
        <q-card class="own-card" flat v-if="loading">
            <q-card-section>
                <div class="row justify-center q-mt-lg" >
                    <q-spinner-grid class="col-4 text-primary"/>
                    <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                </div>
            </q-card-section>
        </q-card>
        <q-card class="own-card" flat v-else>
            <q-card-section>
                <div class="row justify-between">
                    <div class="font-big">{{nama_brand}}</div>
                    <div class="font-big">{{opso_id}}</div>
                </div>
                <div class="text-grey1 font-15 q-mt-lg">Budget Brand</div>
                <div class="row items-end">
                    <div class="font-28">Rp {{formatRibuan(budget_brand)}}</div>
                    <q-space />
                    <div class="d">
                        <q-badge :label="method" class="q-pa-sm" style="background-color:#F6FFED;color:#52C41A;"/>
                    </div>
                </div>

                <!-- <q-table
                    class="my-sticky-header-table q-mt-md btn-radius col-12"
                    :rows="rows"
                    :columns="columns"
                    row-key="id"
                    flat
                    bordered
                    :loading="loading"
                    :filter="filter"
                    v-model:pagination="pagination"
                    @request="onRequest"
                    hide-pagination
                    binary-state-sort
                    @row-click="openDetail"
                    :selection="canSelect ? 'multiple' : 'none'"
                    :selected-rows-label="getSelectedString"
                    v-model:selected="selected"
                >
                    <template v-slot:loading>
                        <q-inner-loading showing color="primary" />
                    </template>
                </q-table> -->
            </q-card-section>
            
        </q-card>
        <!-- <core-table url="spend" :columns="produk" :canOpenDetail="false" v-else>
            <template v-slot:toptable>
                <div class="row justify-between">
                    <div class="font-big">{{nama_brand}}</div>
                    <div class="font-big">{{opso_id}}</div>
                </div>
                <div class="text-grey1 font-15 q-mt-lg">Budget Brand</div>
                <div class="row items-end">
                    <div class="font-28">Rp {{formatRibuan(budget_brand)}}</div>
                    <q-space />
                    <div class="d">
                        <q-badge :label="method" class="q-pa-sm" style="background-color:#F6FFED;color:#52C41A;"/>
                    </div>
                </div>
            </template>
        </core-table> -->
    </div>
</div>
</template>

<script>
const produk = [
    { name: 'kode', label: 'Kode Produk', align: 'left', field: 'kode_spend_type' },
    { name: 'investment_type',  align: 'left',label: 'Nama Produk', field: 'kode_investment'},
    { name: 'fund_type',  align: 'left',label: 'Presentase', field: 'fund_type'},
    { name: 'condition_type',  align: 'left',label: 'Budget', field: 'condition_type'},
]
import { defineAsyncComponent,ref } from 'vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
import { useRoute } from 'vue-router'
import { format } from 'quasar'
export default {
    name:'detail-produk',
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        // 'core-table' : defineAsyncComponent(()=> import('components/CoreTable')),
    },
    setup(){
        const { getData } = useService()
        const { formatRibuan } = usePratesis()
        const route = useRoute()

        const loading = ref(false)
        const nama_brand = ref('undefined')
        const opso_id = ref('undefined')
        const budget_brand = ref('undefined')
        const method = ref('undefined')
        const { capitalize} = format

        function init(){
            loading.value = true
            getData(`promo/${route.params.id}/product/${route.params.produk}`)
            .then(res=>{
                let result = res.data.data
                nama_brand.value = result.nama_brand
                opso_id.value = result.opso_id
                budget_brand.value = result.budget_brand
                method.value =capitalize(result.method)
                console.log('detail produk,',res)
                loading.value = false
            })
            .catch(err=>{
                console.log('error detail produk',err)
            })
        }

        init()
        return {
            produk,
            loading,
            nama_brand,opso_id,budget_brand,method,
            formatRibuan,
        }
    }
}
</script>

<style>

</style>