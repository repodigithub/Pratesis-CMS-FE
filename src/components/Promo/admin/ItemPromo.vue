<template>
    <div class="row item-promo" @click="userAction">
        <q-checkbox v-model="cekpromo" label=" " />
        <q-img
            src="~assets/dummy/dummypromo.png"
            spinner-color="primary"
            spinner-size="82px"
            width="80px"
            height="80px"
        />
        <div class="q-ml-md">
            <div class="font-medium text-bold">{{item.nama_promo}}</div>
            <div style="font-weight:500;" class="q-mb-sm">{{item.opso_id}}</div>
            <div class="row">
                <q-badge outline :label="item.kode_spend_type" class="q-mr-md" :class="active ? randomColor(item.kode_spend_type) : ''"/>
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
            <q-badge outline :label="status(item.status)" class="q-mr-md" :class="active ? colorStatus(item.status) : ''"
            style="padding-top:5px;padding-bottom:5px;"/>
        </div>
        <q-dialog v-model="dialogDetail" position="right">
                <q-card style="width:560px;height:100%;">
                    <div  style="padding: 0 20px;">
                        <q-card-section class="row items-start q-pb-none q-pl-none" >
                            <div class="text-h6">{{$route.name}} Detail </div>
                            <q-space />
                            <q-btn icon="close" flat round dense v-close-popup />
                        </q-card-section>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                OPSO ID
                            </div>
                            <div class="col-6 text-right text-primary">
                                0983910
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Nama Promo
                            </div>
                            <div class="col-6 text-right text-primary">
                                Jasa Pemasaran Ice Cream 2021
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Budget
                            </div>
                            <div class="col-6 text-right text-primary">
                                Rp 10.000.000
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Tanggal Awal
                            </div>
                            <div class="col-6 text-right text-primary">
                                10 Januari 2021
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Tanggal Akhir
                            </div>
                            <div class="col-6 text-right text-primary">
                                09 Januari 2022
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Batas Waktu Claim
                            </div>
                            <div class="col-6 text-right text-primary">
                                60 Hari
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                Spend Type
                            </div>
                            <div class="col-6 text-right text-primary">
                                RA
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                <img src="~assets/icon/person.svg" alt="" class="q-mr-sm align-middle">
                                <span class="align-middle">Budget Handler</span>
                            </div>
                            <div class="col-6 text-right text-primary">
                                RA
                            </div>
                        </div>
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                <span class="align-middle">Status</span>
                            </div>
                            <div class="col-6 text-right text-primary">
                               <q-btn outline style="color: orange;" size="10px" label="Waiting for Approval" />
                            </div>
                        </div>
                        <core-table
                            :url="`promo/3/product`"
                            :columns="produk"
                            :canOpenDetail="true"
                            :detailLinked="true"
                            v-model:requesting="request">
                            <template v-slot:toptable>
                                <div class="row justify-between">
                                    <div class="content-title">
                                        <div class="fs-14">Budget Berdasarkan Brand</div>
                                        
                                    </div>
                                    <div class="d">
                                        <span class="text-primary">Lihat detail promo ></span>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:body-cell-actions="props">
                                <q-td key="action" :props="props">
                                    <q-btn color="primary" round flat icon="edit" no-caps  unelevated class=" btn-two"/>
                                    <q-btn round color="secondary" flat unelevated >
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
                        <div class="row q-my-md">
                            <div class="col-6 fs-14">
                                <q-btn color="secondary" outline  no-caps style="padding-left:10px!important;" unelevated>
                                    Reject
                                </q-btn>
                            </div>
                            <div class="col-6 text-right text-primary">
                                <q-btn color="secondary"  no-caps style="padding-left:10px!important;" unelevated>
                                    Approve
                                </q-btn>
                            </div>
                        </div>
                        
                    </div>
                </q-card>
        </q-dialog>
    </div>
</template>

<script>
import { defineAsyncComponent, ref, toRefs } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    name:'item-promo',
    data() {
        return {
            dialogDetail: false
        }
    },
    props:{
        item:{
            type:Object
        },
        sidebarModal: {
            type: Boolean,
            default: false
        }
    },
    setup(props){
         const produk = [
            { name: 'kode', label: 'Kode Brand', align: 'left', field: 'kode_brand' },
            { name: 'nama_brand',  align: 'left',label: 'Nama Brand', field: 'nama_brand'},
            { name: 'budget',  align: 'left',label: 'Budget', field: 'budget'},
        ]
        const request = ref(null)
        const { item } = toRefs(props)
        const cekpromo = ref(false)
        const isModal = ref(true)
        const { promoTgl } = useCustom()
        const active = ref(true)
        const randomColor = value =>{
            if(value == 'RA'){
                return 'text-blue-7 bg-blue-2'
            }else if(value == 'FO'){
                return 'text-teal-7 bg-teal-2'
            }else if(value == 'OA'){
                return 'text-amber-7 bg-amber-2'
            }else if(value == 'PA'){
                return 'text-purple-7 bg-purple-2'
            }else{
                const arrayColor = ['text-red-7 bg-red-2','text-pink-7 bg-pink-2','text-purple-7 bg-purple-2','text-deep-purple-7 bg-deep-purple-2','text-indigo-7 bg-indigo-2','text-blue-7 bg-blue-2','text-light-blue-7 bg-light-blue-2','text-cyan-7 bg-cyan-2','text-teal-7 bg-teal-2','text-green-7 bg-green-2','text-light-green-7 bg-light-green-2','text-lime-7 bg-lime-2','text-yellow-7 bg-yellow-2','text-amber-7 bg-amber-2','text-orange-7 bg-orange-2','text-deep-orange-7 bg-deep-orange-2','text-brown-7 bg-brown']
                let random = Math.floor(Math.random() * 16)
                return arrayColor[random]
            }

        }
        // @click="$router.push({ name:'Detail Promo',params:{ id : item.id } })"
        const colorStatus = value => {
            if(value == 'draft'){
                return 'draft'
            }else if(value == 'reject'){
                return 'reject'
            }else if(value == 'need_approval'){
                return 'need'
            }else if(value == 'approve'){
                return 'approve'
            }else{
                return ''
            }
        }
        const status = value =>{
            return value.replace(/_/g," ").replace(/(?:^|\s)\S/g,function(a){ return a.toUpperCase()})
        }
        return {
            request,
            produk,
            isModal,
            cekpromo,
            promoTgl,
            active,randomColor,colorStatus,status
        }
    },
    components:{
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
    methods: {
        userAction(){
            if(this.sidebarModal) {
                this.dialogDetail = true;
            } else {
                this.$router.push({ name:'Detail Promo',params:{ id : this.item.id } })
            }
        }
    }
    
}
</script>

<style lang="scss">
.item-promo{
    border:1px solid $grey3;
    border-radius:5px;
    margin-bottom:10px;
    padding-top:15px;
    padding-bottom:15px;
    transition: transform .28s, background-color .28s;
    &:hover{
        transform: scale(0.98);
        cursor:pointer;

    }
}
.approve {
    color:$success1;
    background:$success3;
}
.need{
    color:$grey;
    background:$grey4;
}
.reject{
    color:$warning1;
    background:$warning3;
}
.draft{
    color:$info1;
    background:$info3;
}
</style>