<template>
    <div class="row item-promo cursor-pointer" @click="$router.push({ name:'Detail Promo',params:{ id : item.id } })">
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
</template>

<script>
import { ref } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
export default {
    name:'item-promo',
    props:{
        item:{
            type:Object
        }
    },
    setup(){
        const { promoTgl,colorStatusPromo,statusPromo,colorStatusSpend } = useCustom()
        const active = ref(true)

        return {
            promoTgl,
            active,
            colorStatusPromo,statusPromo,colorStatusSpend
        }
    },
    
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
    // &:hover{
    //     transform: scale(0.98);
    //     cursor:pointer;
    // }
}

</style>