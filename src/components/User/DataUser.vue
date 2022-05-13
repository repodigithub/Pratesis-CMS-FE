<template>
    <q-table
            class="my-sticky-header-table q-mt-md btn-radius col-12"
            title=""
            :rows="rows"
            :columns="columns"
            row-key="id"
            flat
            bordered
            v-model:pagination="pagination"
            @request="onRequest"
            :loading="loading"
            :filter="filter"
            binary-state-sort
            hide-pagination
            @row-click="openDetail"
        >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
    </q-table>
    <div class="col-12 row justify-end q-mt-md">
      <q-pagination
            v-model="pagination.page"
            color="black"
            active-color="secondary"
            active-text-color="secondary"
            :max="pagesNumber"
            size="md"
            direction-links
            outline
            class="table-pagination"
            @update:model-value="gotoPage"
            :max-pages="4"
            :boundary-numbers="false"
        />
    </div>
    <user-detail v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" @reloadTable="onRequest" :options="{ include : 'usergroup;area;distributor'}" />
</template>

<script>
const columns = [
  { name: 'kode',  align: 'left',label: 'Kode Group', field: 'kode_group',style:'width:196px'},
  { name: 'name', align: 'left', label: 'Nama', field: 'full_name', style:'width:196px' },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', },
]
import { usePratesis } from 'src/composeables/usePratesis'
import { defineAsyncComponent,inject } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
export default {
    components:{
        'user-detail': defineAsyncComponent(() => import('./UserDetail')),
        // 'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
    },
    setup(){
        const { pagination,rows,loading,init,onRequest,pagesNumber,modalDetail,openDetail,dataDetail } = usePratesis()
        const { formatTgl } = useCustom()

        init('user',{
            status: 'approve'
        })
        const filter = inject('filter')
        function gotoPage(page){
            let request = {}
            request.pagination = {
                page : page
            }
            if(filter){
                request.filter = filter
            }
            onRequest(request)
        }  
        return {
            columns,
            rows,
            loading,
            onRequest,
            pagination,pagesNumber,gotoPage,
            modalDetail,openDetail,dataDetail,

            formatTgl,
            filter
        }
    },
    // inject:['filter'],
}
</script>

<style>

</style>