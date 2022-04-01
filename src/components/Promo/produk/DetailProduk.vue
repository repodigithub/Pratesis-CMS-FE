<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
        <q-breadcrumbs-el label="Detail Promo" class="text-primary" :to="{name: 'Detail Promo',params:{id:$route.params.id}}"/>
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

                <q-table
                class="my-sticky-virtscroll-table q-mt-md btn-radius q-mb-xl"
                virtual-scroll
                v-model:pagination="pagination"
                :rows-per-page-options="[0]"
                :virtual-scroll-sticky-size-start="48"
                :rows="rowProduk"
                :columns="produk"
                flat
                bordered
                hide-pagination
                />
            </q-card-section>
            
        </q-card>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent,ref,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
import { useRoute } from 'vue-router'
import { format } from 'quasar'

export default {
    name:'detail-produk',
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
    },
    setup(){
        const { getData } = useService()
        const { formatRibuan,role } = usePratesis()
        const produk = [
            { name: 'kode', label: 'Kode Produk', align: 'left', field: 'kode_produk' },
            { name: 'nama_produk',  align: 'left',label: 'Nama Produk', field: 'nama_produk'},
            { name: 'presentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'budget_produk',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget_produk)}`},
        ]
        const route = useRoute()

        const loading = ref(false)
        const nama_brand = ref('undefined')
        const opso_id = ref('undefined')
        const budget_brand = ref('undefined')
        const method = ref('undefined')
        const { capitalize} = format
        const rowProduk = ref([])

        onMounted(()=>{
            if (['AD','HO'].indexOf(role.value) >= 0) {
                init(`promo`)
            }else if(role.value === 'GA'){
                init(`promo-depot`)
            }else{
                init(`promo-distributor`)
            }
        })

        function init(url){
            loading.value = true
            rowProduk.value = []
            getData(`${url}/${route.params.id}/product/${route.params.produk}`)
            .then(res=>{
                let result = res.data.data
                nama_brand.value = result.nama_brand
                opso_id.value = result.opso_id
                budget_brand.value = ['AD','HO'].indexOf(role.value) >= 0 ? result.budget_brand : result.budget
                method.value =capitalize(result.method)
                rowProduk.value = result.products.filter(item=>item.persentase > 0)
                if (['DI','GA'].indexOf(role.value) >= 0) {
                    rowProduk.value.map(item=>{
                        item.budget_produk = (item.persentase/100)*budget_brand.value
                    })
                }
                loading.value = false
            })
            .catch(err=>{
                console.log('error detail produk',err)
            })
        }

        const pagination = ref({
            rowsPerPage: 0
        })
        return {
            produk,role,
            loading,
            nama_brand,opso_id,budget_brand,method,rowProduk,
            formatRibuan,
            pagination,
        }
    }
}
</script>


<style lang="scss">
.my-sticky-virtscroll-table{
    height: 287px;
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th{
        background-color:$grey4;
    }
    th{
        color: rgba(74, 75, 104, 1);
    }
    thead tr th{
        position: sticky;
        z-index: 1;
    }
    thead tr:last-child th{
        top: 48px;
    }
    thead tr:first-child th{
        top: 0;
    }
}
</style>