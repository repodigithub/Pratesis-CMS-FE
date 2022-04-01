<template>
<q-page>
    <div class="row q-pa-lg">
        <div class="col-12">
            <core-table
                :url="`promo/3/product`"
                :columns="klaim"
                :canOpenDetail="true"
                :detailLinked="true">
                <template v-slot:toptable>
                    <div class="row justify-between">
                        <div class="content-title">
                            <div class="font-medium">Klaim</div>
                        </div>
                        <div class="d" >
                            <q-btn color="primary" no-caps class="btn-one" unelevated @click="$router.push({ name:'Add budget Produk',params:{id:$route.params.id},query:{budget:budget_update} })">
                                Refresh
                            </q-btn>
                        </div>
                    </div>
                </template>
                <template v-slot:body-cell-actions="props">
                    <q-td key="action" :props="props">
                        <!-- <q-btn color="primary" flat unelevated/> -->
                        <q-btn color="positive" outline  no-caps class="btn-one q-mr-md" unelevated>
                            Submit
                        </q-btn>
                        <q-img
                            src="~assets/icon/check.svg"
                            spinner-color="primary"
                            spinner-size="5px"
                            width="20px"
                            height="20px"
                        />
                    </q-td>
                </template>
            </core-table>
        </div>
    </div>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref,watch } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
import { useCustom } from 'src/composeables/useCustom'
import {  useRouter } from 'vue-router'
import { useService } from 'src/composeables/useService'


export default {
    setup(){
        const { formatRibuan } = usePratesis()
        const klaim = [
            { name: 'kode', label: 'Kode Distributor', align: 'left', field: 'kode_brand' },
            { name: 'nama_brand',  align: 'left',label: 'Nama Distributor', field: 'nama_brand'},
            { name: 'produk_aktif',  align: 'left',label: 'Coding ULI', field: 'produk_aktif'},
            { name: 'kode', label: 'Tanggal', align: 'left', field: 'kode_brand' },
            { name: 'kode', label: 'Jenis Kegiatan', align: 'left', field: 'kode_brand' },
            { name: 'budget',  align: 'left',label: 'Rp Klaim', field: row => `Rp ${formatRibuan(row.budget_brand)}`},
            { name: 'budget',  align: 'left',label: 'Rp Dibayar', field: row => `Rp ${formatRibuan(row.budget_brand)}`},
            { name: 'actions',align:'left',label:'Status',field:'kode_brand'}
        ]
        return {
            formatRibuan,
            klaim
        }
    },
    components:{
        'core-table': defineAsyncComponent(()=> import('components/CoreTable')),
    },
    computed:{
        userRole(){
            let role = this.$store.state.auth.user.kode_group.substr(0,2)
            return ['SA','DI'].indexOf(role) >= 0 ? '' : role
        },
    },
}
</script>