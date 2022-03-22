<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
        <q-breadcrumbs-el label="Detail Promo" class="text-primary" :to="{name: 'Detail Promo'}"/>
        <q-breadcrumbs-el label="Add New Produk" style="color:#00000073;"/>
    </template>
</breadcrumb>
<div class="row justify-center" style="margin-top:65px;padding-bottom:40px;">
        <q-card class="col" style="max-width:818px;border-radius:10px !important;" flat>
            <q-card-section>
                <div class="font-big"> Add New Product </div>
            </q-card-section>
            <q-card-section>
                <div class="row items-end">
                    <div>
                        <div class="text-grey1" style="font-size:15px;">Budget Limit</div>
                        <div style="font-size:28px;">Rp {{$route.query.budget}}</div>
                        <div class="row">
                            <div class="text-secondary" style="margin-right:46px;">Sisa Budget</div>
                            <div class="text-secondary">Rp {{sisaBudget}}</div>
                        </div>
                    </div>
                    <q-space />
                    <div style="width:268px;">
                        <label for="Budget">Budget Brand</label>
                        <q-input v-model="budgetbrand" type="number"  id="Budget" outlined dense >
                            <template v-slot:prepend>
                                <div class="font-normal">Rp</div>
                            </template>
                        </q-input>
                    </div>
                </div>
                <q-separator spaced style="margin-top:30px;" />
                <div class="row q-mt-md q-col-gutter-sm" style="width:460px;">
                    <div class="col">
                        <select-dropdown url="brand" v-model:selected="kode_brand" :isNormal="false" master="true" nameLabel="Kode Brand : "/>
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
                                <q-radio v-model="aturan" val="1" dense />
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
                                <q-radio v-model="aturan" val="0" dense />
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
                    <div class="col-12 row" style="max-height:380px;overflow-y:auto;">
                        <ItemProduk
                          v-for="product in products"
                          :key="product"
                          :product="product"
                          v-model:itemProduct="itemProduct[product.kode_produk]"
                          v-model:aturan="aturan"
                          v-model:nilaiRata="nilaiRata"
                          @updateceklist="onCeklist"
                          class="col-12 q-mb-md" />
                    </div>
                </div>
                <!-- <q-scroll-area
                  style="height:380px;"
                  :thumb-style="thumbStyle"
                  v-if="produk > 0"
                  :bar-style="barStyle"> -->
                    <!-- <div class="q-mt-md">Product</div> -->
                    <!-- <div class="row" style="max-height:380px;overflow-y:auto;" v-if="produk > 0"> -->
                        <!-- <item-produk v-for="n in produk" :key="n" :n="n" class="col-12 q-mb-md" v-model:budgetProduk="budgetproduk[n]" v-model:aturan="aturan" v-model:nilaiRata="nilaiRata"/> -->
                        <!-- <div class="col-12 row q-mb-md" v-for="n in 50" :key="n">
                            <q-checkbox v-model="selection" :val="'teal' + n" :label="'Indomie Goreng Original' +n"  dense/>
                            <q-space />
                            <div style="width:268px;">
                                <label for="Budget">Budget Produk</label>
                                <q-input v-model="budget" type="text"  id="Budget" filled dense disable >
                                    <template v-slot:prepend>
                                        <div class="font-normal">Rp</div>
                                    </template>
                                </q-input>
                            </div>
                        </div> -->
                    <!-- </div> -->
                <!-- </q-scroll-area> -->
                <div class="row justify-between" style="margin-bottom:30px;margin-top:56px;">
                    <q-btn color="secondary" label="Cancel"  no-caps unelevated outline v-close-popup class="btn-one"/>
                    <q-btn color="secondary" label="Submit" no-caps unelevated class="btn-one" type="submit" @click="onSubmit"/>
                </div>
            </q-card-section>
        </q-card>
</div>
</template>

<script>
import { defineAsyncComponent,ref,watch,computed } from 'vue'
import { useService } from 'src/composeables/useService'
import ItemProduk from './produk/ItemProduk'
import { useRoute } from 'vue-router'
export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        // 'item-produk' : defineAsyncComponent(() => import('./ItemProduk')),
        // 'item-produk' : defineAsyncComponent(() => import('./produk/ItemProduk')),
        ItemProduk,
        'select-dropdown':defineAsyncComponent(()=> import('components/SelectDropdown'))
    },
    setup () {
        const budgetlimit = ref(30)
        const budgetbrand = ref(0)
        const option_brand = ref(['satu','dua','tiga'])
        const { getData,postData } = useService()
        const route = useRoute()

        const kode_brand = ref('')
        const brand = ref('undefined')
        const products = ref([])
        watch(()=>kode_brand.value,val=>{
            if(val !== null){
                getData(`brand?search=${val}`)
                .then(res=>{
                    brand.value = res.data.data.data[0].nama_brand
                })
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
                })
            }else{
                brand.value = 'undefined'
            }
        })

        const itemProduct = ref({})
        const senditemProduct = computed(()=>{
            let result = []
            Object.entries(itemProduct.value).forEach(([key,value])=>{
                result.push({
                    status : 1,
                    kode_produk : key,
                    budget_produk:value
                })
            })
            return result.length > 0 ? result : ''
        })
        const totalBudgetProduk = computed(()=>{
            return Object.keys(itemProduct.value).length > 0 ? Object.values(itemProduct.value).reduce((prev,curr)=> prev + curr) : 0
        })
        const sisaBudget = computed(()=>{
            return parseInt(budgetbrand.value) - totalBudgetProduk.value
        })
        const itemCeklist = ref([])
        const aturan = ref('0')
        const nilaiRata = ref([])
        function onCeklist(value){
            let findindex = null
            let budget = null
            if (aturan.value === '1') { // jika otomatis
                if (Object.values(value)[0]) { // jika diceklist true
                    if (itemCeklist.value.filter(i => i.kode_produk === Object.values(value)[1]).length == 0) {
                        itemCeklist.value.push(value)
                    }
                    budget = parseInt(budgetbrand.value) / itemCeklist.value.length
                    if(nilaiRata.value.filter(i => i.kode_produk === Object.values(value)[1]).length == 0){
                        nilaiRata.value.push({
                            kode_produk : Object.values(value)[1],
                            status : true,
                        })
                    }else{
                        findindex = nilaiRata.value.findIndex(i => i.kode_produk === Object.values(value)[1])
                        nilaiRata.value[findindex].status = true
                    }
                    nilaiRata.value.map((item)=>{
                        if (item.status) {
                            item.budget = budget
                        }
                    })
                    products.value.forEach(product=>{
                        if (nilaiRata.value.length > 0) {
                            nilaiRata.value.forEach(nilai=>{
                                if (nilai.kode_produk === product.kode_produk) {
                                    product.budget = nilai.budget
                                    product.status = nilai.status
                                }
                            })
                        }
                    })
                }else{ //jika tidak diceklist
                    findindex = itemCeklist.value.findIndex(i => i.kode_produk === Object.values(value)[1])
                    let nilaiindex = nilaiRata.value.findIndex(i => i.kode_produk === Object.values(value)[1])
                    itemCeklist.value.splice(findindex,1)
                    budget = parseInt(budgetbrand.value) / itemCeklist.value.length
                    nilaiRata.value[nilaiindex].status = false
                    nilaiRata.value[nilaiindex].budget = 0
                    nilaiRata.value.map((item,index)=>{
                        if (item.status && index !== nilaiindex) {
                            item.budget = budget
                        }
                    })
                    products.value.forEach(product=>{
                        if (nilaiRata.value.length > 0) {
                            nilaiRata.value.forEach(nilai=>{
                                if (nilai.kode_produk === product.kode_produk) {
                                    product.budget = nilai.budget
                                    product.status = nilai.status
                                }
                            })
                        }
                    })
                }
            }
            console.log('manual',value)
            console.log('itemceklist',itemCeklist.value)
            console.log('findindex', findindex)
            
            console.log('budget',budget)
            console.log('nilairata', nilaiRata.value)
            console.log('products', products.value)
        }
        
        // watch(()=>budgetbrand.value,budget=>{
        //     if(parseInt(budget) > 0){
        //         if (itemCeklist.value.length > 0 ) {
        //             if(aturan.value === '1'){
        //                 nilaiRata.value = parseInt(budget) / itemCeklist.value.length
        //             }else{
        //                 nilaiRata.value = 0
        //             }
        //         }
        //     }
        // })
        watch(()=>aturan.value,val=>{
            console.log('val aturan',val)
            products.value.map(item=>{
                item.status = false
                item.budget = 0
            })
                console.log('val dari products',products.value)
        })
        function onSubmit(){
            let dataFinal = {
                kode_brand : kode_brand.value,
                budget_brand: parseInt(budgetbrand.value),
                products: senditemProduct.value
            }
            postData(`promo/${route.params.id}/product`,dataFinal)
            .then(res=>{
                console.log('res',res)
            })
            .catch(err=>{
                console.log('err',err)
            })
            console.log("dataFinal yang dkirim ",dataFinal)
        }
        

        
        
        return {
            aturan,
            budget:ref(''),
            budgetbrand,
            budgetlimit,
            option_brand,
            kode_brand,brand,
            products,itemProduct,senditemProduct,onSubmit,itemCeklist,onCeklist,
            totalBudgetProduk,
            sisaBudget,
            nilaiRata,
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
            }
        }
    } 
}
</script>

<style>

</style>