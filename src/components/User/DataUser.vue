<template>
    <!-- <div class="font-medium">Tabel Data User</div> -->
    <q-table
            class="my-sticky-header-table q-mt-md btn-radius"
            title=""
            :rows="rows"
            :columns="columns"
            row-key="name"
            :filter="filter"
            flat
            bordered
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
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'name', align: 'left', label: 'Nama', field: 'name', sortable: true },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
]
const rows = [
  {
    kode:'AD',
    name: 'Adi',
    email: 'adi@gmail.com',
  },
]
import { ref } from 'vue'
export default {
    setup(){
        return {
            columns,
            rows,
            filter: ref(''),
        }
    }
}
</script>

<style>

</style>