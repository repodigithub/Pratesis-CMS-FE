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
        >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
    </q-table>
</template>

<script>
const columns = [
  {
    name: 'kode',
    required: true,
    label: 'Kode Group',
    align: 'left',
    field: 'kode_group',
    sortable: true,
    style:'width:196px'
  },
  { name: 'name', align: 'left', label: 'Nama', field: 'full_name', sortable: true,style:'width:196px' },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
]
import { useStore } from 'vuex'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    setup(){
      const { pagination,rows,loading,init,onRequest } = usePratesis()
      const store = useStore()
      init('user',{
        status: 'approve',
        token: store.state.auth.token
      })
      return {
          columns,
          rows,
          loading,
          onRequest,
          pagination,
      }
    },
    inject:['filter'],

}
</script>

<style>

</style>