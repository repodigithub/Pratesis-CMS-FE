<template>
    <core-table :url="`promo/${$route.params.id}/area`" :columns="area" :canOpenDetail="false" v-model:requesting="request" :canSelect="isDraft" v-model:resultSelect="selected">
        <template v-slot:toptable>
            <div class="row justify-between">
                <div class="font-medium">Budget Area</div>
                <div class="row" v-if="isDraft">
    <core-table :url="`promo/${$route.params.id}/area`" :columns="userRole != 'GA' ? area : areaDepo" :canOpenDetail="false" v-model:requesting="request" :canSelect="true" v-model:resultSelect="selected">
        <template v-slot:toptable>
            <div class="row justify-between">
                <div class="font-medium" v-if="userRole != 'GA'">Budget Area</div>
                <div class="font-medium" v-else>Budget Distributor</div>
                <div class="row">
                    <q-btn color="secondary"  no-caps class="btn-one q-mr-sm" unelevated @click="batchDelete" v-if="selected.length > 0">
                        <q-icon name="close"  />
                        Delete
                    </q-btn>
                    <q-btn color="secondary"  no-caps class="btn-one" unelevated @click="openAdd">
                        <q-icon name="add" />
                        <span>{{userRole != 'GA' ? 'Add Area' : 'Area Distributor'}}</span>
                    </q-btn>
                </div>
            </div>
        </template>
        <template v-slot:body-cell-actions="props" v-if="isDraft">
            <q-td key="action" :props="props">
                <q-btn color="primary" round flat icon="edit" no-caps @click.stop="openEdit(props.row)" unelevated class=" btn-two"/>
                <q-btn round color="secondary" flat unelevated @click.stop="oneDelete(props.row.id)">
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
    <add-data v-model:modalAdd="modalAdd" v-if="modalAdd" :normal="false" :titleNormal="false" @onSubmitAdd="onSubmitAdd">
    
        <template v-slot:title-content>
            <div class="text-h6"> 
                <span v-if="edit">Edit </span> 
                <span v-else>Add New </span>Budget <span> {{userRole == 'GA' ? 'Distributor' : 'Area'  }}</span>
            </div>
        </template>

        <template v-slot:add-content>
            <div class="text-grey1">Budget Limit</div>
            <div class="text-h6">Rp {{formatRibuan(budgetlimits)}}</div>
            <div class="row q-col-gutter-sm q-mt-sm">
                <select-dropdown url="area" :isNormal="false" :islogin="false" v-model:selected="kode_area" class="q-mb-md col" :nameLabel="userRole == 'GA' ? 'Kode Distributor' : 'Kode Area'" />
                <div class="col">
                    <label for="Nama Area">{{userRole == 'GA' ? 'Nama Distributor' : 'Nama Area'}}</label>
                    <q-input v-model="nama_area" type="text" disable id="Nama Area" dense bg-color="grey4" filled style="border:1px solid #B7C4D6;border-radius:4px;"/>
                </div>
            </div>
            <label for="Region">Region</label>
            <q-input v-model="nama_region" type="text" disable id="Region" bg-color="grey4" filled dense class="q-mb-md" style="border:1px solid #B7C4D6;border-radius:4px;"/>
            <label for="Alamat">Alamat</label>
            <q-input v-model="alamat" type="text" disable id="Alamat" bg-color="grey4" filled dense class="q-mb-md" style="border:1px solid #B7C4D6;border-radius:4px;"/>
            <label for="Budget">Budget</label>
            <q-input v-model="budget" type="text"  id="Budget" outlined dense />
        </template>

    </add-data>
</template>

<script>
import { defineAsyncComponent,ref,watch,computed,onMounted } from 'vue'
import { useQuasar } from 'quasar'
import { useService } from 'src/composeables/useService'
import { useCustom  } from 'src/composeables/useCustom'
import { useRoute} from 'vue-router'
import { usePratesis } from 'src/composeables/usePratesis'

export default {
    name:'budget-area',
    props:['budgetlimit','isDraft'],
    setup(props,{ emit }){
        const { showLoading,hideLoading,successNotif } = useCustom()
        const { postData,getData,putData,deleteData } = useService()
        const { formatRibuan } = usePratesis()
        const route = useRoute()
        const area = [
            { name: 'kode', label: 'Kode Area', align: 'left', field: 'kode_area' },
            { name: 'nama_area',  align: 'left',label: 'Nama', field: 'nama_area'},
            { name: 'region',  align: 'left',label: 'Region', field: 'region'},
            { name: 'alamat',  align: 'left',label: 'Alamat', field: 'alamat'},
            { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget)}`},
            
        ]
        onMounted(()=>{
            if (props.isDraft) {
                area.push({ name:'actions',align:'left',label:'',field:'kode_area'})
            }
        })
        watch(()=>props.isDraft,val=>{
            if(val){
                area.push({ name:'actions',align:'left',label:'',field:'kode_area'})
            }
        })
        const areaDepo = [
            { name: 'kode', label: 'Kode Distributor', align: 'left', field: 'kode_area' },
            { name: 'nama_area',  align: 'left',label: 'Nama Distributor', field: 'nama_area'},
            { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget)}`},
            { name:'actions',align:'left',label:'',field:'kode_area'}
        ]

        const modalAdd = ref(false)
        const edit = ref(false)
        const kode_area = ref('')
        const nama_area = ref('undefined')
        const nama_region = ref('undefined')
        const alamat = ref('undefined')
        const budget = ref('')
        const areaid = ref('')
        const budgetalt = ref('')
        function openAdd(){
            edit.value = false
            modalAdd.value = true
            kode_area.value = ''
            nama_area.value = 'undefined'
            nama_region.value = 'undefined'
            alamat.value = 'undefined'
            budget.value = ''
        }
        function openEdit(area){
            modalAdd.value = true
            edit.value = true
            kode_area.value = area.kode_area
            budget.value = area.budget
            budgetalt.value = area.budget
            areaid.value = area.id
            
        }
        watch(()=> kode_area.value,val=>{
            if([null,''].indexOf(val) < 0 ){
                getData(`area?kode_area=${val}`)
                .then(res=>{
                    nama_area.value = res.data.data.data[0].nama_area
                    nama_region.value = res.data.data.data[0].nama_region
                    alamat.value = res.data.data.data[0].alamat_depo
                })
            }else{
                nama_area.value = 'undefined'
                nama_region.value = 'undefined'
                alamat.value = 'undefined'
            }
        })
        
        const budgetlimits = computed(()=>{
            let result = props.budgetlimit
            return edit.value ? result + parseInt(budgetalt.value) : result
        })

        function onSubmitAdd(){
            showLoading()
            if (edit.value) {
                putData(`promo/${route.params.id}/area/${areaid.value}`,{
                    kode_area : kode_area.value,
                    budget : budget.value
                })
                .then(res=>{
                    hideLoading()
                    modalAdd.value = false
                    successNotif('Budget Area Berhasil diupdate')
                    request.value = {
                        pagination : {
                                        page : 1
                                    }
                    }
                    emit('updateArea')
                })
            }else{
                postData(`promo/${route.params.id}/area`,{
                    kode_area : kode_area.value,
                    budget : budget.value
                })
                .then(res=>{
                    hideLoading()
                    modalAdd.value = false
                    successNotif('Budget Area Berhasil ditambahkan')
                    request.value = {
                        pagination : {
                            page : 1
                        }
                    }
                    emit('updateArea')
                })
                .catch(err=>{
                    console.log('error',err)
                })
            }
        }

        const request = ref(null)
        const selected = ref([])
        
        const quasar = useQuasar()
        function oneDelete(id){
            quasar.dialog({
                title: 'Konfirmasi',
                message: 'Apakah Anda Yakin ingin Menghapus Data ini?',
                cancel: true,
            }).onOk(() => {
                showLoading()
                deleteData(`promo/${route.params.id}/area/${id}`)
                .then(()=>{
                    hideLoading()
                    successNotif('Budget Area Berhasil dihapus')
                    request.value = {
                        pagination : {
                                        page : 1
                                    }
                    }
                    emit('updateArea')
                })
                .catch(err=>{
                    console.log('error',err)
                })
            })
        }
        function batchDelete(){
            let del = []
            if (selected.value.length > 0) {
                selected.value.forEach(item=>{
                    del.push(item.id)
                })
            }
            quasar.dialog({
                title: 'Konfirmasi',
                message: 'Apakah Anda Yakin ingin Menghapus Data ini?',
                cancel: true,
            }).onOk(() => {
                showLoading()
                postData(`promo/${route.params.id}/area/delete`,{
                    ids : del
                })
                .then(()=>{
                    hideLoading()
                    successNotif('Budget Area Berhasil dihapus')
                    request.value = {
                        pagination : {
                                        page : 1
                                    }
                    }
                    selected.value = []
                    emit('updateArea')
                })
                .catch(err=>{
                    console.log('error',err)
                })
            })
        }
        return{
            area,
            areaDepo,
            modalAdd,openAdd,openEdit,edit,
            kode_area,nama_area,nama_region,alamat,budget,areaid,
            showLoading,hideLoading,successNotif,
            request,selected,batchDelete,oneDelete,
            onSubmitAdd,
            formatRibuan,budgetlimits,budgetalt
        }
    },
    components:{
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
        'add-data' : defineAsyncComponent(()=> import('../../Modal/AddData')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown'))
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