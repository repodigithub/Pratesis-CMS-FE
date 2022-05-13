<template>
    <q-card class="own-card q-mb-md" flat> 
        <q-card-section>
            <div class="row justify-between">
                <div class="content-title">
                    <div class="font-medium">Budget Produk</div>
                    <div class="text-primary" style="font-weight:500;font-size:16px;">Brand</div>
                </div>
                <div class="d" v-if="isDraft && ['AD','HO'].indexOf(role) >= 0">
                    <q-btn color="secondary"  no-caps class="btn-one" unelevated @click="$router.push({ name:'Add budget Produk',params:{id:$route.params.id},query:{budget:budget_update} })">
                        <q-icon name="add" />
                        Add Produk
                    </q-btn>
                </div>
            </div>
        </q-card-section>
        <q-card-section v-if="init" class="q-pt-none">
            <q-table
                class="my-sticky-header-table btn-radius col-12"
                :rows="rows"
                :columns="produk"
                row-key="id"
                flat
                bordered
                :loading="loading"
                v-model:pagination="pagination"
                @request="onRequest"
                hide-pagination
                binary-state-sort
                @row-click="openDetail"
            >
                <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                </template>
                <template v-slot:body-cell-actions="props" v-if="isDraft  && ['AD','HO'].indexOf(role) >= 0">
                    <q-td key="action" :props="props" >
                        <q-btn color="primary" round flat icon="edit" no-caps @click.stop="openEditProduk(props.row)" unelevated class=" btn-two"/>
                        <q-btn round color="secondary" flat unelevated @click.stop="oneDeleteProduk(props.row.id)">
                        <q-img
                            src="~assets/icon/trash-alt.svg"
                            spinner-color="primary"
                            spinner-size="5px"
                            width="20px"
                            height="20px"
                        />
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
            <div class="row justify-end q-mt-md" v-if="rows.length > 0">
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
        </q-card-section>
    </q-card>
</template>

<script>
import { defineAsyncComponent,ref,watch,onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useService } from 'src/composeables/useService'
import { useCustom  } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    name:'budget-produk',
    props:['budget_update','isDraft','role','budget'],
    setup(props,{emit}){
        const { formatRibuan,rows,loading,pagination,pagesNumber } = usePratesis()

        const produk = [
            { name: 'kode', label: 'Kode Brand', align: 'left', field: 'kode_brand' },
            { name: 'nama_brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
            { name: 'produk_aktif',  align: 'left',label: 'Jumlah Produk Aktif', field: 'produk_aktif'},
            { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${['AD','HO'].indexOf(props.role) >= 0 ? formatRibuan(row.budget_brand): row.budget}`},
            
        ]
        const url = ref('undefined')
        const route = useRoute()
        const init = ref(false)
        const { deleteData,getData } = useService()

        onMounted(()=>{
            if (props.isDraft  && ['AD','HO'].indexOf(props.role) >= 0) {
                produk.push({ name:'actions',align:'left',label:'',field:'kode_brand'})
            }
            if (['AD','HO'].indexOf(props.role) >= 0) {
                url.value = `promo`
            }else if(props.role === 'GA'){
                url.value = `promo-depot`
            }else{
                url.value = `promo-distributor`
            }
                url.value += `/${route.params.id}/product?limit=5`
                init.value = true
            getProduk()
            
        })
        const success = res =>{
            let result = res.data.data
            rows.value = result.data
            // if (['DI','GA'].indexOf(props.role) >= 0) {
            //     rows.value.map(item=>{
            //         item.budget_brand = (item.persentase/100)*props.budget
            //     })
            // }
            pagination.value.page = result.current_page
            pagination.value.rowsPerPage = result.per_page
            pagination.value.rowsNumber = result.total
            loading.value = false
        }

        const error = err => {
            console.log('error budget produk',err)
        }

        function getProduk(){
            loading.value = true
            getData(url.value)
            .then(res=>{
                success(res)
            })
            .catch(err=>error(err))
        }

        const gotoPage = page => {
            if(!loading.value){
                onRequest({
                pagination : {
                                page : page
                            }
                })
            } 
        }

        function onRequest(request){
            const { page, rowsPerPage }  = request.pagination
            loading.value = true
            getData(`${url.value}&page=${page}`)
            .then(res=>{
                success(res)
            })
            .catch(err=>error(err))
        }
        
        watch(()=>props.isDraft,val=>{
            if(val  && ['AD','HO'].indexOf(props.role) >= 0){
                produk.push({ name:'actions',align:'left',label:'',field:'kode_brand'})
            }
        })
        
        const { showLoading,hideLoading,successNotif } = useCustom()
        
        const quasar = useQuasar()
        
        function oneDeleteProduk(id){
            quasar.dialog({
                title: 'Konfirmasi',
                message: 'Apakah Anda Yakin ingin Menghapus Data ini?',
                cancel: true,
            }).onOk(() => {
                showLoading()
                deleteData(`promo/${route.params.id}/product/${id}`)
                .then(()=>{
                    hideLoading()
                    successNotif('Budget Produk Berhasil dihapus')
                    onRequest({
                        pagination : {
                                        page : 1
                                    }
                    })
                    emit('updateProduk')
                })
                .catch(err=>{
                    console.log('error',err)
                })
            })
        }
        const router = useRouter()
        function openEditProduk(produk){
            let id = produk.id
            let budget = props.budget_update + produk.budget_brand
            router.push({name:'Add budget Produk',params:{id:route.params.id},query:{budget:budget,produk:id,edit: true}})
        }
        function openDetail(evt,row){
            router.push({name:'Detail Produk',params:{id:route.params.id,produk:row.id}})
        }
        return {
            produk,
            showLoading,hideLoading,successNotif,
            oneDeleteProduk,openEditProduk,
            formatRibuan,openDetail,
            url,init,
            rows,loading,pagination,onRequest,gotoPage,pagesNumber
        }
    },
    components:{
        // 'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
}
</script>

<style>

</style>