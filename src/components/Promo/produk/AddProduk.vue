<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
        <q-breadcrumbs-el label="Detail Promo" class="text-primary" :to="{name: 'Detail Promo'}"/>
        <q-breadcrumbs-el :label="$route.query.edit ? 'Edit Produk' : 'Add New Produk'" style="color:#00000073;"/>
    </template>
</breadcrumb>
<div class="row justify-center" style="margin-top:65px;padding-bottom:40px;">
        <q-card class="col" style="max-width:818px;border-radius:10px !important;" flat>
            <q-card-section>
                <div class="font-big">{{ $route.query.edit ? 'Edit Product' : 'Add New Product' }}</div>
            </q-card-section>
            <q-card-section v-if="loaditem">
                <div class="row justify-center q-mt-lg" >
                    <div class="col-4">
                        <q-spinner-grid class="text-primary q-mr-sm"/>
                        <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                    </div>
                </div>
            </q-card-section>
            <q-card-section v-else>
                <div class="row items-end">
                    <div>
                        <div class="text-grey1" style="font-size:15px;">Budget Limit</div>
                        <div style="font-size:28px;">Rp {{formatRibuan($route.query.budget)}}</div>
                        <div class="row">
                            <div class="text-secondary" style="margin-right:46px;">Sisa Budget</div>
                            <div class="text-secondary">Rp {{formatRibuan(sisaBudget)}}</div>
                        </div>
                    </div>
                    <q-space />
                    <div style="width:268px;">
                        <label for="Budget">Budget Brand</label>
                        <input-budget
                                v-model:budget="budgetbrand"
                        />
                        <!-- <q-input
                          :model-value="budgetbrand"
                          @update:model-value="budgetFormat"
                          type="text"
                          id="Budget"
                          outlined
                          dense>
                            <template v-slot:prepend>
                                <div class="font-normal">Rp</div>
                            </template>
                        </q-input> -->
                    </div>
                </div>
                <q-separator spaced style="margin-top:30px;" />
                <div class="row q-mt-md q-col-gutter-sm" style="width:460px;">
                    <div class="col">
                        <select-dropdown url="brand" v-model:selected="kode_brand"  :master="true" nameLabel="Kode Brand : "/>
                    </div>
                    <div class="col">
                        <label for="Budget" class="font-normal">Nama Brand :</label>
                        <q-input v-model="brand" type="text"  id="Budget" outlined dense bg-color="grey4" class="input-disable" disable/>
                    </div>
                </div>
                <div class="row q-mt-lg">
                    <div class="q-mb-sm col-12">Atur Budget</div>
                    <q-list>
                    <q-item tag="label" v-ripple class="q-pa-none q-mb-sm"  >
                        <q-item-section>
                            <div class="row">
                                <q-radio v-model="otomatis" val="1" dense />
                                <div style="margin-left:10px;">
                                    <q-item-label>Otomatis</q-item-label>
                                    <q-item-label caption class="text-grey1">Budget otomatis terbagi berdasarkan budget brand</q-item-label>
                                </div>
                            </div>
                        </q-item-section>
                    </q-item>
                    <q-item tag="label" v-ripple class="q-pa-none"  >
                        <q-item-section>
                            <div class="row">
                                <q-radio v-model="otomatis" val="0" dense />
                                <div style="margin-left:10px;">
                                    <q-item-label>Manual</q-item-label>
                                    <q-item-label caption class="text-grey1">Budget dapat diubah melalui produk yang dipilih</q-item-label>
                                </div>
                            </div>
                        </q-item-section>
                    </q-item>
                    </q-list>
                </div>
                <div class="row" v-if="products.length > 0">
                    <div class="col-12 q-mt-md">Product</div>
                     <div class="col-12">
                        <q-scroll-area style="height: 380px;">
                        <div class="row q-mb-md" v-for="(product,index) in products" :key="product.id">
                            <q-checkbox
                              :modelValue="product.status"
                              @update:modelValue="updateStatus"
                              :label="product.nama_produk"
                              :id="index"
                              :name="products.id"
                               />
                            <q-space />
                            <input-budget
                                v-model:budget="product.budget"
                                v-model:status="product.status"
                                v-model:ismanual="isManual"
                            />
                        </div>
                        </q-scroll-area>
                    </div>
                </div>
                <div class="row justify-between" style="margin-bottom:30px;margin-top:56px;">
                    <q-btn color="secondary" label="Cancel"  no-caps unelevated outline @click="$router.push({name: 'Detail Promo'})" class="btn-one"/>
                    <q-btn color="secondary" label="Submit" no-caps unelevated class="btn-one" @click="onSubmit" />
                </div>
            </q-card-section>
        </q-card>
</div>
</template>

<script>
import { defineAsyncComponent,ref,watch,computed,onMounted } from 'vue'
import { useService } from 'src/composeables/useService'
import { useRoute,useRouter } from 'vue-router'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'select-dropdown':defineAsyncComponent(()=> import('components/SelectDropdown')),
        'input-budget': defineAsyncComponent(() => import('components/Promo/InputBudget'))
    },
    setup () {
        const { formatRibuan } = usePratesis()
        const budgetbrand = ref(0)
        const { getData,postData,putData } = useService()
        

        const kode_brand = ref('')
        const brand = ref('undefined')
        const products = ref([])

        const altproducts = ref([])
        const loaditem = ref(true)

        watch(()=>kode_brand.value,val=>{
            if(val !== null){
                getData(`brand?search=${val}`)
                .then(res=>{
                    brand.value = res.data.data.data[0].nama_brand
                })
                products.value = []
                
                getData(`product?kode_brand=${val}`)
                .then(res=>{
                    let produk = res.data.data.data
                    produk.forEach(val=>{
                        products.value.push({
                            kode_produk : val.kode_produk,
                            nama_produk : val.nama_produk,
                            budget: 0,
                            status:false
                        })
                    })
                    if (altproducts.value.length > 0) {
                        altproducts.value.forEach(alt=>{
                            products.value.forEach(product=>{
                                if (alt.kode_produk === product.kode_produk) {
                                    product.kode_produk = alt.kode_produk
                                    product.nama_produk = alt.nama_produk
                                    product.budget = formatRibuan(parseInt(alt.budget_produk))
                                    product.status  = alt.status
                                }
                            })
                        })
                    }
                    loaditem.value  = false
                })
            }else{
                brand.value = 'undefined'
            }
        })

        const otomatis = ref('0')
        const isManual = computed(()=>{
            return otomatis.value == '0' ? true  : false
        })

        //jika ganti otomatis ke manual / sebaliknya 
        watch(()=>otomatis.value,()=>{
            products.value.map(item=>{
                item.status = false
                item.budget = 0
            })
        })

        function updateStatus(value,evt){
            let index = evt.path[1].getAttribute('id')
            if (index) {
                products.value[index].status = value
            }
            if (otomatis.value == '1') {
                let statustrue = products.value.filter(item=>item.status).length
                let budgetRata = ''
                if (statustrue > 0) {
                    budgetRata = parseInt(String(budgetbrand.value).replaceAll('.', '')) / statustrue
                }
                products.value.map(item=>{
                    if(item.status){
                        item.budget = formatRibuan(parseInt(budgetRata))
                    }else{
                        item.budget = 0
                    }
                })
            }
        }
        const totalBudgetProduk = computed(()=>{
            let total = 0
            products.value.forEach(item=>{
                if (item.status) {
                    total += parseInt(String(item.budget).replaceAll('.',''))
                }
            })
            return total
        })

        const sisaBudget = computed(()=>{
            let result = parseInt(String(budgetbrand.value).replaceAll('.', '')) - totalBudgetProduk.value
            return result ? result : 0
        })

        watch(()=>budgetbrand.value,val=>{
            let statustrue = products.value.filter(item=>item.status).length
            let budgetRata = ''
            if (statustrue > 0) {
                budgetRata = parseInt(val.replaceAll(".",""),10) / statustrue
            }
            if (!isManual.value) {
                products.value.map(item=>{
                    if(item.status){
                        item.budget = formatRibuan(parseInt(budgetRata))
                    }
                })
            }
        })
        
    
        const senditemProduct = computed(()=>{
            let result = []
            products.value.forEach(item=>{
                result.push({
                    status : item.status ? 1 : 0,
                    kode_produk : item.kode_produk,
                    budget_produk: parseInt(String(item.budget).replaceAll('.',''))
                })
            })
            return result.length > 0 ? result : ''
        })
        const { showLoading,hideLoading,successNotif,errorNotif } = useCustom()
        const route = useRoute()
        const router = useRouter()
        function onSubmit(){
            if (sisaBudget.value <= 10 && parseInt(String(budgetbrand.value).replaceAll('.','')) > 0) {
                showLoading()
                if (route.query.edit) {
                    putData(`promo/${route.params.id}/product/${route.query.produk}`, {
                    kode_brand : kode_brand.value,
                    budget_brand: parseInt(String(budgetbrand.value).replaceAll('.','')),
                    products: senditemProduct.value,
                    method:otomatis.value == '1' ? 'otomatis' : 'manual'
                    })
                    .then(()=>{
                        hideLoading()
                        successNotif('Produk Berhasil Diupdate')
                        router.push({name: 'Detail Promo'})
                    })
                    .catch(err=>{
                        console.log('err',err)
                    })
                }else{
                    postData(`promo/${route.params.id}/product`, {
                        kode_brand : kode_brand.value,
                        budget_brand: parseInt(String(budgetbrand.value).replaceAll('.','')),
                        products: senditemProduct.value,
                        method:otomatis.value == '1' ? 'otomatis' : 'manual'
                    })
                    .then(()=>{
                        hideLoading()
                        successNotif('Produk Berhasil Ditambahkan')
                        router.push({name: 'Detail Promo'})
                    })
                    .catch(err=>{
                        console.log('err',err)
                    })
                }
            }else{
                errorNotif(`Sisa Budget harus 0`)
            }
        }

        onMounted(()=>{
            if (route.query.edit) {
                getData(`promo/${route.params.id}/product/${route.query.produk}`)
                .then(res=>{
                    let result = res.data.data
                    budgetbrand.value = formatRibuan(result.budget_brand)
                    otomatis.value =  result.method == 'otomatis' ? '1' : '0'
                    let produk = result.products
                    altproducts.value = produk
                    kode_brand.value = result.kode_brand
                })
                .catch(err=>{
                    console.log('err',err)
                })
            }else{
                loaditem.value = false
            }
        })
        return {
            budgetbrand,
            kode_brand,brand,products,
            otomatis,isManual,
            updateStatus,
            totalBudgetProduk,sisaBudget,
            onSubmit,showLoading,hideLoading,successNotif,errorNotif,
            thumbStyle: {
                right: '2px',
                borderRadius: '10px',
                backgroundColor: '#2684FF',
                width: '4px',
                opacity: 0.75
            },
            barStyle: {
                right: '2px',
                borderRadius: '10px',
                backgroundColor: '#027be3',
                width: '9px',
                opacity: 0.2
            },
            formatRibuan,
            loaditem
        }
    } 
}
</script>

<style>

</style>