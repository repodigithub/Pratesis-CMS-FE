<template>
<q-page >
    <breadcrumb  :rightside="true"/>
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card class="own-card" flat>
                <div class="row q-py-md" style="height:500px">
                    <div class="col-4">
                        <div class="row">
                            <div class="col-12 q-px-sm" style="border-right: 1px solid #B7C4D6">
                                <label for="">Search :</label>
                                <q-input placeholder="Cari nama pengguna" dense outlined class="q-mb-md">
                                    <template v-slot:append>
                                        <q-icon
                                            name="search"
                                            class="grey2"
                                        />
                                    </template>
                                </q-input>
                                <div class="row q-py-sm" v-for="(user,ui) in userGroup" :key="ui" style="border-bottom: 1px solid #B7C4D6">
                                    <div class="col-7 m-auto">
                                        {{user.nama_group}}
                                    </div>
                                    <div class="col-5 m-auto text-right">
                                        <q-btn color="secondary" outline no-caps unelevated class="btn-one q-mr-lg" style="font-size:10px;">
                                            {{user.kode_group}}
                                        </q-btn>
                                        <img  src="~assets/icon/ellipsis.svg" alt="">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-8">
                        <div class="row">
                            <div class="col-12 q-px-md">
                                <q-table
                                    class="my-sticky-header-table btn-radius col-12"
                                    :rows="rowGroup"
                                    :columns="users"
                                    row-key="id"
                                    flat
                                    bordered
                                    v-model:pagination="pagination"
                                    hide-pagination
                                    binary-state-sort
                                ></q-table>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </q-card>
        </div>
    </div>
</q-page>
</template>

<script>
import RequestData from 'components/User/RequestData.vue'
import { useService } from 'src/composeables/useService'
import { usePratesis } from 'src/composeables/usePratesis'
import { provide,ref, defineAsyncComponent, onMounted } from 'vue'
export default {
    setup() {
        const rowGroup = ref([])
        const userGroup = ref([])
        const { getData } = useService()
        const { filter,onFilter,onResetFilter} = usePratesis()
        const users = [
            { name: 'kode', label: 'Features', align: 'left', field: 'kode_produk' },
            { name: 'nama_produk',  align: 'left',label: 'Create', field: 'nama_produk'},
            { name: 'nama_produk',  align: 'left',label: 'Update', field: 'nama_produk'},
            { name: 'nama_produk',  align: 'left',label: 'Delete', field: 'nama_produk'},
            { name: 'nama_produk',  align: 'left',label: 'View Only', field: 'nama_produk'},
        ]

        provide('filter',filter)

        // onMounted(()=>{
        function getDataUserGroup() {
            getData('/user-group')
            .then(res=>{
                userGroup.value = res.data.data.data
                
            })
        }
        //})
        return {
            rowGroup,
            users,
            userGroup,
            getDataUserGroup,
            filter,
            onFilter,
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
    },
    data(){
        return{

        }
    },
    mounted() {
        this.getDataUserGroup()
    }
}
</script>

<style lang="scss">
.my-custom-toggle{
    border: 1px solid $primary;
}
.btnMenu > .q-btn__content > .block{
    border-bottom:2px solid $primary;
}
</style>