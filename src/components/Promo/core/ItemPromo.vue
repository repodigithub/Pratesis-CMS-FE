<template>
    <div class="row item-promo cursor-pointer" @click="$router.push({ name:'Detail Promo',params:{ id : item.id } })">
        <q-img
            :src="item.thumbnail ? item.thumbnail : require('assets/icon/image-polaroid.svg')"
            spinner-color="primary"
            spinner-size="20px"
            width="80px"
            height="80px"
            class="q-ml-md"
        />
        <div class="q-ml-md">
            <div class="font-medium text-bold">{{item.nama_promo}} </div>
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
        <div class="status-promo" v-if="role == 'DI'">
            <div class="row">
                <div class="col-12 text-right q-mb-md">
                    <q-badge outline :label="statusPromo(item.status_promo)" class="q-mr-md" :class="active ? colorStatusPromo(item.status_promo) : ''"
                style="padding-top:5px;padding-bottom:5px;" />
                </div>
                <div class="col-12">
                    <q-btn :class="item.status_promo == 'claim' && item.is_claimed ? 'bg-secondary' : 'bg-grey3' " no-caps unelevated class="btn-one text-white" label="Claim"  @click.stop="$router.push({name : 'Klaim Promo',query:{opsoId : item.opso_id}})" :disable="item.status_promo == 'claim' && item.is_claimed ? false : true"/>
                </div>
            </div>
        </div>
        <div class="status-promo" v-else-if="['AD','HO','GA'].indexOf(role) >= 0">
            <q-badge outline :label="statusPromo(item.status)" class="q-mr-md" :class="active ? colorStatusPromo(item.status) : ''"
            style="padding-top:5px;padding-bottom:5px;" />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
export default {
    name:'item-promo',
    props:{
        item:{
            type:Object
        },
        role:{
            type:String
        }
    },
    setup(props,{emit}){
        const { promoTgl,colorStatusPromo,statusPromo,colorStatusSpend } = useCustom()
        const active = ref(true)
        return {
            promoTgl,
            active,
            colorStatusPromo,statusPromo,colorStatusSpend,
        }
    },
    
}
</script>