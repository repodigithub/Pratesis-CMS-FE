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
            binary-state-sort
        >
        
    </q-table>
</template>

<script>
const columns = [
  {
    name: 'kode',
    required: true,
    label: 'Kode Group',
    align: 'left',
    field: row => 'Ad',
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name', align: 'left', label: 'Nama', field: 'full_name', sortable: true },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
]
import { useStore } from 'vuex'
import { useApi } from 'src/composeables/useApi'
export default {
    setup(){
      const { pagination,rows,loading,init,onRequest } = useApi()
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
}
</script>

<style>

</style>