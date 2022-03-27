<template>
    <core-table
        :url="`promo/${$route.params.id}/product`"
        :columns="produk"
        :canOpenDetail="true"
        :detailLinked="true"
        v-model:requesting="request">
        <template v-slot:toptable>
            <div class="row justify-between">
                <div class="content-title">
                    <div class="font-medium">Budget Produk</div>
                    <div class="text-primary" style="font-weight:500;font-size:16px;">Brand</div>
                </div>
                <!-- v-if="userRole != 'GA'" -->
                <div class="d" >
                    <q-btn color="secondary"  no-caps class="btn-one" unelevated @click="$router.push({ name:'Add budget Produk',params:{id:$route.params.id},query:{budget:budget_update} })">
                        <q-icon name="add" />
                        Add Produk
                    </q-btn>
                </div>
            </div>
        </template>
        <template v-slot:body-cell-actions="props">
            <q-td key="action" :props="props">
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
    </core-table>
</template>

<script>
import { defineAsyncComponent,ref,watch,computed } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useService } from 'src/composeables/useService'
import { useCustom  } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    name:'budget-produk',
    props:['budget_update'],
    setup(props,{emit}){
        const { formatRibuan } = usePratesis()
        const produk = [
            { name: 'kode', label: 'Kode Brand', align: 'left', field: 'kode_brand' },
            { name: 'nama_brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
            { name: 'produk_aktif',  align: 'left',label: 'Jumlah Produk Aktif', field: 'produk_aktif'},
            { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget_brand)}`},
            { name:'actions',align:'left',label:'',field:'kode_brand'}
        ]
        const request = ref(null)
        const { showLoading,hideLoading,successNotif } = useCustom()
        const { deleteData } = useService()
        const quasar = useQuasar()
        const route = useRoute()
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
                    request.value = {
                        pagination : {
                                        page : 1
                                    }
                    }
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
            router.push({name:'Edit budget Produk',params:{id:route.params.id,produk:id},query:{budget:budget}})
        }
        return {
            produk,request,
            showLoading,hideLoading,successNotif,
            oneDeleteProduk,openEditProduk,
            formatRibuan
        }
    },
    components:{
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
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