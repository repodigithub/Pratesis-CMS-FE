<template>
    <core-table :url="urlTable" :columns="columns" :canOpenDetail="false" v-model:requesting="request" :canSelect="isDraft" v-model:resultSelect="selected" v-if="initTable">
        <template v-slot:toptable>
            <div class="row justify-between">
                <div class="font-medium" v-if="role != 'GA'">Budget Area</div>
                <div class="font-medium" v-else>Budget Distributor</div>
                <div class="row" v-if="isDraft">
                    <q-btn color="secondary"  no-caps class="btn-one q-mr-sm" unelevated @click="batchDelete" v-if="selected.length > 0">
                        <q-icon name="close"  />
                        Delete
                    </q-btn>
                    <q-btn color="secondary"  no-caps class="btn-one" unelevated @click="openAdd" >
                        <q-icon name="add" />
                        <span>{{role != 'GA' ? 'Add Area' : 'Add Distributor'}}</span>
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
                <span v-else>Add New </span>Budget <span> {{role == 'GA' ? 'Distributor' : 'Area'  }}</span>
            </div>
        </template>

        <template v-slot:add-content>
            <div class="text-grey1">Budget Limit</div>
            <div class="text-h6">Rp {{formatRibuan(budgetlimits)}}</div>
            <div class="row q-col-gutter-sm q-mt-sm" v-if="role == 'GA'">
                <select-dropdown url="distributor" :isNormal="false" :islogin="false" v-model:selected="kode_distributor" class="q-mb-md col" nameLabel="Kode Distributor" />
                <div class="col">
                    <label for="Nama Area">Nama Distributor</label>
                    <q-input v-model="nama_distributor" type="text" disable id="Nama Area" dense bg-color="grey4" filled style="border:1px solid #B7C4D6;border-radius:4px;"/>
                </div>
            </div>
            <div class="row q-col-gutter-sm q-mt-sm" v-else>
                <select-dropdown url="area" :isNormal="false" :islogin="false" v-model:selected="kode_area" class="q-mb-md col" nameLabel="Kode Area" />
                <div class="col">
                    <label for="Nama Area">Nama Area</label>
                    <q-input v-model="nama_area" type="text" disable id="Nama Area" dense bg-color="grey4" filled style="border:1px solid #B7C4D6;border-radius:4px;"/>
                </div>
            </div>
            <div v-if="role == 'GA'">
                <label for="distributor_group">Distributor Group</label>
                <q-input v-model="distributor_group" type="text" disable id="distributor_group" bg-color="grey4" filled dense class="q-mb-md" style="border:1px solid #B7C4D6;border-radius:4px;"/>
            </div>
            <div v-else>
                <label for="Region">Region</label>
                <q-input v-model="nama_region" type="text" disable id="Region" bg-color="grey4" filled dense class="q-mb-md" style="border:1px solid #B7C4D6;border-radius:4px;"/>
                <label for="Alamat">Alamat</label>
                <q-input v-model="alamat" type="text" disable id="Alamat" bg-color="grey4" filled dense class="q-mb-md" style="border:1px solid #B7C4D6;border-radius:4px;"/>
            </div>
            <label for="Budget">Budget</label>
            <input-budget v-model:budget="budget"/>
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
    props:['budgetlimit','isDraft','role'],
    setup(props,{ emit }){
        const { showLoading,hideLoading,successNotif } = useCustom()
        const { postData,getData,putData,deleteData } = useService()
        const { formatRibuan } = usePratesis()

        const route = useRoute()
        const urlTable = ref('')
        const initTable = ref(false)
        const columns = ref([])
        onMounted(()=>{
            if (['HO','AD'].indexOf(props.role) >= 0) {
                urlTable.value = `promo/${route.params.id}/area`
                columns.value.push(
                    { name: 'kode', label: 'Kode Area', align: 'left', field: 'kode_area' },
                    { name: 'nama_area',  align: 'left',label: 'Nama', field: 'nama_area'},
                    { name: 'region',  align: 'left',label: 'Region', field: 'region'},
                    { name: 'alamat',  align: 'left',label: 'Alamat', field: 'alamat'},
                    { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
                    { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget)}`},
                )
                if (props.isDraft) {
                    columns.value.push({ name:'actions',align:'left',label:'',field:'kode_area'})
                }
            }else{
                urlTable.value = `promo-depot/${route.params.id}/distributor`
                columns.value.push(
                    { name: 'kode', label: 'Kode Distributor', align: 'left', field: 'kode_distributor' },
                    { name: 'nama_distributor',  align: 'left',label: 'Nama Distributor', field: 'nama_distributor'},
                    { name: 'nama_distributor_group',  align: 'left',label: 'Distributor Group', field: 'distributor_group'},
                    { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
                    { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget)}`},
                )
                if (props.isDraft) {
                    columns.value.push({ name:'actions',align:'left',label:'',field:'kode_distributor'})
                }
            }
            initTable.value = true
        })
        watch(()=>props.isDraft,val=>{
            if(val && ['HO','AD'].indexOf(props.role) >= 0){
                columns.value.push({ name:'actions',align:'left',label:'',field:'kode_area'})
            }
            if(val && ['GA'].indexOf(props.role) >= 0){
                columns.value.push({ name:'actions',align:'left',label:'',field:'kode_distributor'})
            }
        })
        const modalAdd = ref(false)
        const edit = ref(false)
        const kode_area = ref('')
        const nama_area = ref('undefined')
        const nama_region = ref('undefined')
        const alamat = ref('undefined')
        const budget = ref('')
        const idTable = ref('')
        const budgetalt = ref('')

        const kode_distributor = ref('')
        const nama_distributor = ref('undefined')
        const distributor_group =  ref('undefined')

        function openAdd(){
            edit.value = false
            modalAdd.value = true

            kode_area.value = ''
            nama_area.value = 'undefined'
            nama_region.value = 'undefined'
            alamat.value = 'undefined'
            budget.value = ''

            kode_distributor.value = ''
            nama_distributor.value = 'undefined'
            distributor_group.value = 'undefined'
        }

        function openEdit(area){
            modalAdd.value = true
            edit.value = true
            if (props.role == 'GA') {
                kode_distributor.value = area.kode_distributor
            }else{
                kode_area.value = area.kode_area
            }
            budget.value = formatRibuan(String(area.budget).replaceAll('.', ''))
            budgetalt.value = area.budget
            idTable.value = area.id
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

        watch(()=> kode_distributor.value,val=>{
            if([null,''].indexOf(val) < 0 ){
                getData(`distributor?kode_distributor=${val}`)
                .then(res=>{
                    nama_distributor.value = res.data.data.data[0].nama_distributor
                    distributor_group.value = res.data.data.data[0].nama_distributor_group
                })
            }else{
                nama_distributor.value = 'undefined'
                distributor_group.value = 'undefined'
            }
        })
        
        const budgetlimits = computed(()=>{
            let result = props.budgetlimit
            return edit.value ? result + parseInt(budgetalt.value) : result
        })
        function onAdd(url,data,isArea = true){
            postData(url,data)
            .then(()=>{
                hideLoading()
                modalAdd.value = false
                if (isArea) {
                    successNotif('Budget Area Berhasil ditambahkan')
                }else{
                    successNotif('Budget Distributor Berhasil ditambahkan')
                }
                emit('updateAreaDistributor')
                request.value = {
                    pagination : {
                        page : 1
                    }
                }
                
            })
            .catch(err=>{
                console.log('error',err)
            })
        }

        function onEdit(url,data,isArea = true){
            putData(url,data)
            .then(()=>{
                hideLoading()
                modalAdd.value = false
                if (isArea) {
                    successNotif('Budget Area Berhasil diupdate')
                }else{
                    successNotif('Budget Distributor Berhasil diupdate')
                }
                request.value = {
                    pagination : {
                                    page : 1
                                }
                }
                emit('updateAreaDistributor')
            })
        }
        function onSubmitAdd(){
            showLoading()
            if (edit.value) {
                if (props.role == 'GA') { //depot
                    onEdit(`promo-depot/${route.params.id}/distributor/${idTable.value}`,{
                        kode_distributor : kode_distributor.value,
                        budget : budget.value.replaceAll('.', '')
                    })
                }else{
                    onEdit(`promo/${route.params.id}/area/${idTable.value}`,{
                    kode_area : kode_area.value,
                    budget : budget.value.replaceAll('.', '')
                    })
                }
            }else{
                if (props.role == 'GA') {
                    onAdd(`promo-depot/${route.params.id}/distributor`,{
                        kode_distributor : kode_distributor.value,
                        budget : budget.value.replaceAll('.', '')
                    },false)
                }else{
                    onAdd(`promo/${route.params.id}/area`,{
                        kode_area : kode_area.value,
                        budget : budget.value.replaceAll('.', '')
                    })
                }
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
                let url = ''
                if (props.role == 'GA') {
                    url = `promo-depot/${route.params.id}/distributor/${id}`
                }else{
                    url = `promo/${route.params.id}/area/${id}`
                }
                deleteData(url)
                .then(()=>{
                    hideLoading()
                    if (props.role == 'GA') {
                        successNotif('Budget Distributor Berhasil dihapus')
                    }else{
                        successNotif('Budget Area Berhasil dihapus')
                    }
                    request.value = {
                        pagination : {
                                        page : 1
                                    }
                    }
                    emit('updateAreaDistributor')
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
                let url = ''
                if (props.role == 'GA') {
                    url = `promo-depot/${route.params.id}/distributor/delete`
                }else{
                    url = `promo/${route.params.id}/area/delete`
                }
                postData(url,{
                    ids : del
                })
                .then(()=>{
                    hideLoading()
                    if (props.role == 'GA') {
                        successNotif('Budget Distributor Berhasil dihapus')
                    }else{
                        successNotif('Budget Area Berhasil dihapus')
                    }
                    request.value = {
                        pagination : {
                                        page : 1
                                    }
                    }
                    selected.value = []
                    emit('updateAreaDistributor')
                })
                .catch(err=>{
                    console.log('error',err)
                })
            })
        }
        return{
            modalAdd,openAdd,openEdit,edit,
            kode_area,nama_area,nama_region,alamat,budget,idTable,
            showLoading,hideLoading,successNotif,
            request,selected,batchDelete,oneDelete,
            onSubmitAdd,
            formatRibuan,budgetlimits,budgetalt,

            kode_distributor,nama_distributor,distributor_group,

            urlTable,columns,initTable,
        }
    },
    components:{
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
        'add-data' : defineAsyncComponent(()=> import('../../Modal/AddData')),
        'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
        'input-budget': defineAsyncComponent(()=> import('components/Promo/InputBudget'))
    },
}
</script>

<style>

</style>