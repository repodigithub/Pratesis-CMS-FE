<template>
    <div class="row item-promo" @click="$router.push({ name:'Detail Promo',params:{ id : item.id } })">
        <!-- <q-checkbox v-model="cekpromo" label=" " /> -->
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
    </div>
</template>

<script>
import { ref } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
// import { usePratesis } from 'src/composeables/usePratesis'
export default {
    name:'item-promo',
    props:{
        item:{
            type:Object
        }
    },
    setup(){
        const cekpromo = ref(false)
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
            cekpromo,
            promoTgl,
            active,randomColor,colorStatus,status
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