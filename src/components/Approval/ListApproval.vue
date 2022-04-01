<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Approval Promo" style="color:#00000073;"/>
    </template>
</breadcrumb>

<div class="row q-pa-lg">
    <filter-promo class="col-12" v-model:role="role" @onFilter="onFilter"/>
    <q-card class="own-card col-12" flat>
        <filter-status v-model:role="role" @onStatus="onStatus" @onSpend="onSpend" v-if="role !== 'DI'" isApprove/>

        <q-card-section class="q-pt-none">
        <div class="row justify-center q-mt-lg" v-if="loading">
            <q-spinner-grid class="col-4 text-primary"/>
            <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
        </div>
        <div v-else>
            <div v-if="itemPromo.length > 0">
                <div class="row q-gutter-md q-mb-md">
                    <q-checkbox
                    :modelValue="itemscheckbox"
                    @update:modelValue="updateItemsChekbox"
                    label=" "
                    toggle-indeterminate
                        />
                    <q-btn :class="cekPromo > 0 ? 'bg-secondary' : 'bg-grey3' " no-caps  unelevated class="btn-two btn-approve text-white" @click="onApproval('Reject')" :disable="cekPromo > 0 ? false : true">
                        <q-icon name="close" size="16px"/>
                        <div class="fs-12" style="line-height:16px;">Reject</div>
                    </q-btn>
                    <q-btn :class="cekPromo > 0 ? 'bg-positive' : 'bg-grey3' "  no-caps  unelevated class="btn-two btn-approve text-white" @click="onApproval('Approve')" :disable="cekPromo > 0 ? false : true">
                        <q-icon name="check" size="16px"/>
                        <div class="fs-12" style="line-height:16px;">Approve</div>
                    </q-btn>
                </div>
                
                <div class="row item-promo cursor-pointer"  v-for="item in itemPromo" :key="item.id" @click="openDetail(item.id)">
                    <q-checkbox
                        v-model="item.checkbox"
                        label=" "
                        v-if="item.status === 'need_approval'"/>
                <q-img
                    src="~assets/dummy/dummypromo.png"
                    spinner-color="primary"
                    spinner-size="82px"
                    width="80px"
                    height="80px"
                    :class="status === 'Need Approval' ? '' : 'q-ml-md'"
                />
                <div class="q-ml-md">
                    <div class="font-medium text-bold">{{item.nama_promo}}</div>
                    <div style="font-weight:500;" class="q-mb-sm">{{item.opso_id}}</div>
                    <div class="row">
                        <q-badge outline :label="item.kode_spend_type" class="q-mr-md" :class="active ? colorStatusSpend(item.kode_spend_type) : ''"/>
                        <div class="row items-center q-mr-md">
                            <q-img
                                src="~assets/icon/calendar-star.svg"
                                spinner-color="primary"
                                spinner-size="5px"
                                width="16px"
                                height="18px"
                            />
                            <div class="font-normal q-ml-sm ">{{promoTgl(item.start_date)}}</div>
                        </div>
                        <div class="row items-center">
                            <q-img
                                src="~assets/icon/calendar-check.svg"
                                spinner-color="primary"
                                spinner-size="5px"
                                width="16px"
                                height="18px"
                            />
                            <div class="font-normal q-ml-sm">{{promoTgl(item.end_date)}}</div>
                        </div>
                    </div>
                </div>
                <q-space />
                <div class="status-promo">
                    <q-badge outline :label="statusPromo(item.status)" class="q-mr-md" :class="active ? colorStatusPromo(item.status) : ''"
                    style="padding-top:5px;padding-bottom:5px;"/>
                </div>
            </div>
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
<modal-detail-approval v-model:modalDetail="modalDetail" :idPromo="idPromo" v-if="modalDetail" @updateApproval="getPromo" v-model:role="role"/>
</template>

<script>
import { defineAsyncComponent,ref,onMounted,computed,watch } from 'vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import { useQuasar } from 'quasar'
export default {
    setup(){
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
        const { getData,postData  } = useService()

        const { pagination,pagesNumber,role} = usePratesis()
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
            getPromo(1,true)
        })

        function getPromo(page = '',isInit = false){
            loading.value = true
            itemPromo.value = []
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
            let urlInit = ''
            if (isInit) {
                urlInit = `${url.value}?status=approve,need_approval,reject`
            }else{
                urlInit = url.value + limit + key + pages
            }
            getData(urlInit)
            .then(res=>{
                loading.value = false
                let result = res.data.data
                let items = result.data.filter(item=> item.status)
                items.forEach((item)=>{
                    itemPromo.value.push({
                        nama_promo : item.nama_promo,
                        opso_id : item.opso_id,
                        kode_spend_type : item.kode_spend_type,
                        start_date : item.start_date,
                        end_date : item.end_date,
                        status : item.status,
                        id: item.id,
                        checkbox : false
                    })
                })
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

        const { promoTgl,colorStatusPromo,statusPromo,colorStatusSpend,successNotif,showLoading,hideLoading  } = useCustom()
        const active = ref(true)

        const itemscheckbox =ref(false)
        function updateItemsChekbox(value){
            if (value === null) {
                itemscheckbox.value = true
                itemPromo.value.map(item=>{
                    if (item.status == 'need_approval') {
                        item.checkbox = true
                    }
                })
            }else{
                itemscheckbox.value = value
                itemPromo.value.map(item=>{
                    if (item.status == 'need_approval') {
                        item.checkbox = false
                    }
                })
            }
        }
        const modalDetail = ref(false)
        const idPromo = ref ('')

        function openDetail(id){
            idPromo.value = id
            modalDetail.value = true
        }

        const cekPromo = computed(()=>{
            return itemPromo.value.filter(item=> item.checkbox && item.status == 'need_approval').length
        })

        watch(()=>cekPromo.value,val=>{
            if (val == 0) {
                itemscheckbox.value = false
            }else if(val < itemPromo.value.length){
                itemscheckbox.value = null
            }else{
                itemscheckbox.value = true
            }
            
        })

        const quasar = useQuasar()
        function onApproval(value) {
            quasar.dialog({
                title: `Konfirmasi ${value} Data`,
                message: `Anda yakin ingin ${value.toLowerCase()} data ini?`,
                cancel: true,
                persistent: false
            })
            .onOk(()=>{
                showLoading()
                let url = ''
                if (role.value === 'GA') {
                    url += 'promo-depot'
                }else{
                    url += 'promo'
                }
                url += `/status`
                let items = itemPromo.value.filter(item=>item.checkbox && item.status == 'need_approval')
                let ids = []
                items.forEach(item=>{
                    ids.push(item.id)
                })
                postData(url,{
                    status : value.toLowerCase(),
                    ids: ids
                })
                .then(()=>{
                    hideLoading()
                    successNotif(`Data Berhasil di ${value.toLowerCase()}`)
                    getPromo()
                })
                .catch(err=>{
                    console.log("error single approval",err)
                })
            })
        }


        return{
            loading,role,
            spend_type,status,filter,itemPromo,
            pagination,pagesNumber,
            onFilter,onStatus,onSpend,gotoPage,
            promoTgl,colorStatusPromo,statusPromo,colorStatusSpend,
            active,
            itemscheckbox,updateItemsChekbox,
            modalDetail,idPromo,openDetail,getPromo,
            cekPromo,successNotif,showLoading,hideLoading,onApproval 
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'filter-promo': defineAsyncComponent(()=> import('../Promo/core/FilterPromo')),
        'filter-status' : defineAsyncComponent(()=> import('../Promo/core/FilterStatus')),
        'modal-detail-approval' : defineAsyncComponent(()=> import('./ModalDetailApproval'))
        // 'item-promo' : defineAsyncComponent(()=> import('../Promo/core/ItemPromo')),
    },
}
</script>

<style>

</style>