<template>
<breadcrumb  :upload="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
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
        <q-btn color="secondary" no-caps unelevated class="btn-one" v-if="role == 'DI' && is_claimed" @click="$router.push({name : 'Klaim Promo',query:{opsoId : opso_id}})">
            <div class="row items-end">
            <q-img
                src="~assets/icon/file-check.svg"
                spinner-color="primary"
                spinner-size="5px"
                width="14px"
                height="18px"
                class="q-mr-sm"
                style="filter: brightness(0) invert(1);"
            />
            <div style="line-height:18px;">Add Claim</div>
            </div>
        </q-btn>
    </template>
</breadcrumb>
<item-detail ref="itemsDetail" v-model:roles="role" v-model:isDrafter="isDraft" v-model:statusDetail="status_promo" v-model:isClaimed="is_claimed" v-model:opsoId="opso_id"/>
</template>

<script>
import { defineAsyncComponent,ref} from 'vue'
export default {
    setup(){
        const role = ref('undefined')
        const isDraft = ref(false)
        const itemsDetail = ref('')
        const status_promo = ref('undefined')
        const is_claimed = ref('undefined')
        const opso_id = ref('undefined')
        function onSubmit(){
            itemsDetail.value.onPromoSubmit()
        }
        return {
            role,isDraft,status_promo,is_claimed,opso_id,
            itemsDetail,onSubmit
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'item-detail' : defineAsyncComponent(()=>import('./core/ItemDetail'))
    },
}
</script>

<style>

</style>