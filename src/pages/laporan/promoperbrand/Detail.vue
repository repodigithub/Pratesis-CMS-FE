<template>
    <q-page>
        <breadcrumb  :rightside="false" :leftside="false">
            <template v-slot:breadcrumb-content>
                <q-breadcrumbs-el label="Promo Per Brand" class="text-primary" :to="{name: 'Promo Per Brand'}"/>
                <q-breadcrumbs-el label="Detail Promo Per Brand" style="color:#00000073;"/>
            </template>
        </breadcrumb>
        <q-card class="own-card q-ma-lg" flat v-if="loading">
            <q-card-section class="row justify-center">
                <div class="col-4">
                    <q-spinner-grid class="text-primary q-mr-sm"/>
                    <span class="col-12 text-primary font-medium text-center q-mt-lg q-mb-md">Memuat Data</span>
                </div>
            </q-card-section>
        </q-card>
        <div class="row q-pa-lg" v-else>
            <q-card class="own-card col-12" flat>
                <q-card-section>
                    <div class="row item-promo">
                        <q-img
                            :src="item.thumbnail ? item.thumbnail : require('assets/icon/image-polaroid.svg')"
                            spinner-color="primary"
                            spinner-size="20px"
                            width="80px"
                            height="80px"
                            class="q-ml-md"
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
                        <div class="row">
                            <div class="status-promo col-12 text-right">
                                <q-badge outline :label="statusPromo(item.status)" class="q-mr-md" :class="active ? colorStatusPromo(item.status) : ''"
                                style="padding-top:5px;padding-bottom:5px;" />
                            </div>
                            <div class="row justify-between items-center col-12">
                                <div class="row items-center">
                                    <div
                                        style="border-radius:10px;width:36px;height:36px;background: #2ECE8C;margin-right:15px;"
                                        class="row items-center justify-center"
                                        >
                                        <q-img
                                            src="~assets/icon/money-bill-alt.svg"
                                            spinner-color="primary"
                                            spinner-size="3px"
                                            width="27px"
                                            height="24px"
                                        />
                                    </div>
                                    <div class="font-16">Budget</div>
                                </div>
                                <div class="text-primary font-16 q-mr-md"><span style="opacity:0.4;">Rp</span> {{formatRibuan(item.budget)}}</div>
                            </div>
                        </div>
                    </div>
                </q-card-section>
            </q-card>

            <div class="col-12 q-mt-lg">
                <core-table
                    :columns="columns"
                    :url="`promo/${$route.params.id}/product?limit=5`"
                    customDetail @openCustomDetail="openDetail"
                    ref="Coretable"
                    >                    
                </core-table>
            </div>
        </div>
    </q-page>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useService } from 'src/composeables/useService'
import {  useRoute,useRouter } from 'vue-router'
import { useCustom } from 'src/composeables/useCustom'
export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
    setup(){
        const { formatRibuan } = usePratesis()
        const { getData } = useService()
        const route = useRoute()
        const item = ref({})
        const loading = ref(true)
        getData(`promo/${route.params.id}`)
        .then(res=>{
            let result = res.data.data
            item.value = result
            loading.value = false
        })
        const { promoTgl,colorStatusPromo,statusPromo,colorStatusSpend } = useCustom()
        const columns = [
            { name: 'nama_brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
            { name: 'persentase',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'budget',  align: 'left',label: 'Budget', field: row => `Rp ${formatRibuan(row.budget_brand)}`},
        ]

        const router = useRouter()
        function openDetail(value){
        router.push({name:'Detail Produk Promo Per Brand',params:{id:route.params.id,produk:value.id}})
        }
        return {
            active: true,
            colorStatusSpend,promoTgl,colorStatusPromo,statusPromo,
            item,formatRibuan,loading,columns,
            openDetail
        }
    }
}
</script>

<style>

</style>