<template>
    <q-page>
        <breadcrumb  :rightside="false" :leftside="false">
            <template v-slot:breadcrumb-content>
                <q-breadcrumbs-el label="Promo Per Area" class="text-primary" :to="{name: 'Promo Per Area'}"/>
                <q-breadcrumbs-el label="Detail Promo Per Area" class="text-primary" :to="{name: 'Detail Promo Per Area'}"/>
                <q-breadcrumbs-el label="Detail Area" style="color:#00000073;"/>
            </template>
        </breadcrumb>
        <div class="row q-pa-lg" 
        >
            <div class="col-12 q-mt-lg">
                <core-table
                    :columns="columns"
                    :url="`promo-depot/${$route.params.area}/distributor`"
                    :canOpenDetail="false"
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
export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
    setup(){
        const { formatRibuan } = usePratesis()

        const columns = [
            { name: 'nama_area',  align: 'left',label: 'Distributor', field: 'nama_distributor'},
            { name: 'nama_area',  align: 'left',label: 'Persentase', field: row => `${row.persentase} %`},
            { name: 'nama_area',  align: 'left',label: 'Budget Distributor', field: row => `Rp ${formatRibuan(row.budget)}`},
        ]
        return {
            active: true,
            formatRibuan,columns
        }
    }
}
</script>

<style>

</style>