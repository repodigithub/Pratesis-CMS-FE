<template>
<breadcrumb  :rightside="false" :leftside="false">
    <template v-slot:breadcrumb-content>
        <q-breadcrumbs-el label="Promo" class="text-primary" :to="{name: 'Promo'}"/>
        <q-breadcrumbs-el label="Detail Promo" class="text-primary" :to="{name: 'Detail Promo'}"/>
        <q-breadcrumbs-el label="Detail Produk" style="color:#00000073;"/>
    </template>
</breadcrumb>
<div class="row justify-center" style="margin-top:65px;padding-bottom:40px;">
    <!-- <q-card class="col" style="max-width:818px;border-radius:10px !important;" flat>
        <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
        </q-card-section>
        <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
        </q-card-section>
    </q-card> -->
    <div class="col" style="max-width:818px;">
        <core-table url="spend" :columns="produk" :canOpenDetail="false">
            <template v-slot:toptable>
                <div class="row justify-between">
                    <div class="font-big">Sunsilk</div>
                    <div class="font-big">1200218</div>
                </div>
                <div class="text-grey1 font-15 q-mt-lg">Budget Limit</div>
                <div class="row items-end">
                    <div class="font-28">Rp 1.0000.0000.000</div>
                    <q-space />
                    <div class="d">
                        <q-badge outline label="Otomatis" class="text-primary q-mr-md"/>
                    </div>
                </div>
            </template>
        </core-table>
    </div>
</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
const produk = [
    { name: 'kode', label: 'Kode Produk', align: 'left', field: 'kode_spend_type' },
    { name: 'investment_type',  align: 'left',label: 'Nama Produk', field: 'kode_investment'},
    { name: 'fund_type',  align: 'left',label: 'Presentase', field: 'fund_type'},
    { name: 'condition_type',  align: 'left',label: 'Budget', field: 'condition_type'},
]
export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'core-table' : defineAsyncComponent(()=> import('../CoreTable'))
    },
    setup(){
        return {
            produk
        }
    }
}
</script>

<style>

</style>