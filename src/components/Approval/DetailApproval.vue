<template>
<div class="detail-approve" v-if="statusDetail == 'need_approval'">
    <div>
        <q-scroll-area class="fit">
            <breadcrumb  :upload="false" :leftside="false">
                <template v-slot:breadcrumb-content>
                    <q-breadcrumbs-el label="Approval Promo" class="text-primary" :to="{name: 'Approval'}"/>
                    <q-breadcrumbs-el label="Detail Promo" style="color:#00000073;"/>
                </template>
                <template v-slot:rightside-content>
                    <q-btn color="secondary" outline no-caps class="btn-one" style="padding-left:10px!important;" unelevated @click="onSubmit" v-if="isDraft && ['GA','AD','HO'].indexOf(role) >= 0">
                        <q-img
                            src="~assets/icon/file-check.svg"
                            spinner-color="primary"
                            spinner-size="5px"
                            width="14px"
                            height="18px"
                            class="q-mr-sm"
                        />
                        Submit
                    </q-btn>
                </template>
            </breadcrumb>
            <item-detail ref="itemsDetail" v-model:roles="role" v-model:isDrafter="isDraft" v-model:promoId="promoId" v-model:statusDetail="statusDetail"/>

        </q-scroll-area>
    </div>
    <div >
        <div class="row justify-between q-pa-sm bg-white" >
            <q-btn color="secondary" label="Reject" no-caps unelevated class="q-px-sm btn-one q-mr-sm" outline @click="onApproval('Reject')" />
            <q-btn color="secondary" label="Approve" no-caps unelevated class="q-px-sm btn-one" @click="onApproval('Approve')"/>
        </div>
    </div>
</div>

<div v-else>
    <breadcrumb  :upload="false" :leftside="false">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Approval Promo" class="text-primary" :to="{name: 'Approval'}"/>
            <q-breadcrumbs-el label="Detail Promo" style="color:#00000073;"/>
        </template>
        <template v-slot:rightside-content>
            <q-btn color="secondary" outline no-caps class="btn-one" style="padding-left:10px!important;" unelevated @click="onSubmit" v-if="isDraft && ['GA','AD','HO'].indexOf(role) >= 0">
                <q-img
                    src="~assets/icon/file-check.svg"
                    spinner-color="primary"
                    spinner-size="5px"
                    width="14px"
                    height="18px"
                    class="q-mr-sm"
                />
                Submit
            </q-btn>
        </template>
    </breadcrumb>
    <item-detail ref="itemsDetail" v-model:roles="role" v-model:isDrafter="isDraft" v-model:promoId="promoId" v-model:statusDetail="statusDetail"/>
</div>

</template>

<script>
import { defineAsyncComponent,ref} from 'vue'
import { useQuasar } from 'quasar'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
export default {
    setup(){
        const role = ref('undefined')
        const isDraft = ref(false)
        const itemsDetail = ref('')
        const promoId = ref('undefined')
        const statusDetail = ref('undefined')
        function onSubmit(){
            itemsDetail.value.onPromoSubmit()
        }

        const { putData } = useService()
        const { successNotif,showLoading,hideLoading } = useCustom()
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
                let init = ''
                if (role.value === 'GA') {
                    url += 'promo-depot'
                    init = 'promo-depot'
                }else{
                    url += 'promo'
                    init = 'promo'
                }
                url += `/${promoId.value}/status`
                putData(url,{
                    status : value.toLowerCase()
                })
                .then(()=>{
                    hideLoading()
                    successNotif(`Data Berhasil di ${value.toLowerCase()}`)
                    itemsDetail.value.initData(init)
                })
                .catch(err=>{
                    console.log("error single approval",err)
                })
            })
        }
        return {
            role,isDraft,
            itemsDetail,onSubmit,
            successNotif,showLoading,hideLoading,
            onApproval,promoId,statusDetail
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'item-detail' : defineAsyncComponent(()=>import('components/Promo/core/ItemDetail'))
    },
}
</script>
<style>
.detail-approve{
    height: calc(100vh - 51px);
    display: grid;
    grid-template-rows: auto 55px;
}
</style>

