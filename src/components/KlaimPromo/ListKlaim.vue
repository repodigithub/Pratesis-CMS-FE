<template>
    <core-table :columns="columns" :url="url" v-model:requesting="request" customDetail @openCustomDetail="openDetail" :option="option">
        <template v-slot:toptable>
            <div class="row">
                <div class="col-6">
                        <div class="font-medium">Klaim</div>
                </div>
                <div class="col-6 text-right">
                    <q-btn color="primary"  class="btn-one q-mr-md txt-capitalize"  unelevated @click="modalAdd = true" v-if="role == 'DI'">
                        <img  src="~assets/icon/plus.svg" alt="" class="q-mr-sm"> New
                    </q-btn>
                    <q-btn color="primary"  class="btn-one q-mr-md" no-caps label="Refresh"  unelevated @click="onRefresh" />
                </div>
            </div>
        </template>
        <template v-slot:body-cell-status="props">
            <q-td key="status" :props="props">
                <div class="row items-center q-gutter-sm">
                    <q-badge outline :label="statusPromo(props.row.status)" :class="active ? colorStatusPromo(props.row.status) : ''"
                    style="padding-top:5px;padding-bottom:5px;" />
                    <img :src="require(`assets/icon/${props.row.status.includes('submit') ? 'check-circle.svg' : 'sync-alt.svg'}`)" alt="">
                </div>
            </q-td>
        </template>
    </core-table>
    <add-klaim v-model:modalAdd="modalAdd" @reloadTable="onReload" ref="modalAddKlaim"/>
    <detail-klaim v-if="modalDetail" v-model:modalDetail="modalDetail" v-model:dataDetail="dataDetail" @reloadTable="onReload"/>
</template>

<script>
import { defineAsyncComponent,ref,onMounted } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'
import {  useRoute } from 'vue-router'
export default {
    components:{
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
        'add-klaim' : defineAsyncComponent(()=> import('./AddKlaim')),
        'detail-klaim' : defineAsyncComponent(()=> import('./DetailKlaim'))
    },
    setup(){
        const { role,formatRibuan } = usePratesis()
        const { GeneralFormatDate,statusPromo } = useCustom()
        const { getData } = useService()
        const colorStatusPromo = value => {
            if(['draft','reject'].indexOf(value) >= 0){
                return 'reject'
            }else if(['submit'].indexOf(value) >= 0){
                return 'approve'
            }else{
                return ''
            }
        }
        const active = ref(true)
        const columns = [
            { name: 'kode_distributor', label: 'Kode Distributor', align: 'left', field: 'kode_distributor' },
            { name: 'nama_distributor',  align: 'left',label: 'Nama Distributor', field: 'nama_distributor'},
            { name: 'kode_uli',  align: 'left',label: 'Coding ULI', field: 'kode_uli'},
            { name: 'created_at', label: 'Tanggal', align: 'left', field: row => `${GeneralFormatDate(row.created_at,'DD MMM YYYY')}`},
            { name: 'jenis_kegiatan',  align: 'left',label: 'Jenis Kegiatan', field: 'jenis_kegiatan'},
            { name: 'claim',  align: 'left',label: 'Rp. Klaim', field: row => `${formatRibuan(row.claim)}`},
            { name: 'amount',  align: 'left',label: 'Rp Dibayar', field: row => `${formatRibuan(row.amount)}`},
            { name: 'status',align:'left',label:'Status',field:'status'}
        ]
        
        const url = ref('claim')
        const option = ref('')
        option.value = role.value == 'GA' ? {level:'?level=depot' } : ''

        const modalAdd = ref(false)
        const request = ref({})
        function onReload(value){
            request.value = value
        }
        
        const route = useRoute()
        const modalAddKlaim = ref('')
        const modalDetail = ref(false)
        const dataDetail = ref({})
        onMounted(()=>{
            if(route.query.opsoId){
                getData(`promo-distributor?opso_id=${route.query.opsoId}`)
                .then(res=>{
                    let val = res.data.data.data[0]
                    modalAddKlaim.value.onSelected(val)
                    modalAddKlaim.value.opsoId = route.query.opsoId
                    modalAdd.value = true
                })
            }
            if(route.query.id){
                dataDetail.value = {
                    id : route.query.id
                }
                modalDetail.value = true
            }
        })

        function openDetail(value){
            dataDetail.value = value
            modalDetail.value = true
        }
        function onRefresh(){
            request.value = {
                pagination:{
                    page:1
                }
            }
        }
        return {
            columns,url,role,active,colorStatusPromo,statusPromo,modalAdd,request,onReload,
            openDetail,modalDetail,dataDetail,option,modalAddKlaim,
            onRefresh
        }
    }
}
</script>

<style>

</style>