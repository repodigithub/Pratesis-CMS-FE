<template>
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
          <template v-slot:body="props">
            <q-tr :props="props" @click="onDetail(props.row.id)">
              <q-td key="requestdate" :props="props">
                {{ props.row.requestdate }}
              </q-td>
              <q-td key="userid" :props="props">
                {{ props.row.userid }}
              </q-td>
              <q-td key="requestedby" :props="props">
                {{ props.row.requestedby }}
              </q-td>
              <q-td key="email" :props="props">
                {{ props.row.email }}
              </q-td>
              <q-td key="action" :props="props">
                <div v-if="props.row.action.approve === null">
                  <q-btn color="secondary" icon="close" label="Reject" no-caps @click="onClick(props.row.action.id)" unelevated class="q-mr-lg q-px-sm" />
                  <q-btn color="positive" icon="check" label="Approve" no-caps @click="onClick(props.row.action.id)" unelevated class="q-mr-lg q-px-sm"/>
                </div>
                <q-badge outline color="positive" label="Approved" class="success3 q-px-md q-py-sm" v-if="props.row.action.approve === true"/>
                <q-badge outline color="secondary" label="Rejected" class="warning3 q-px-md q-py-sm" v-if="props.row.action.approve === false"/>
              </q-td>
            </q-tr>
          </template>
    </q-table>
    <RequestDetail v-model:drequest="drequest" v-if="drequest" />
</template>

<script>
const columns = [
  { name: 'requestdate', align: 'left', label: 'Request Date', field: 'requestdate', sortable: true },
  {
    name: 'userid',
    required: true,
    label: 'User ID',
    align: 'left',
    field: 'userid',
    sortable: true
  },
  { name: 'requestedby', align: 'left', label: 'Requested By', field: 'requestedby', sortable: true },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
  { name: 'action',  align: 'left',label: 'Actions', field: 'action'},
]
const rows = [
  {
    requestdate:'07/06/2022',
    userid:'08234',
    requestedby:'Susono',
    email: 'budi@gmail.com',
    action:{
      id:'1',
      approve:false
    },
    id:'1'
  },
  {
    requestdate:'07/06/2022',
    userid:'08234',
    requestedby:'Susono',
    email: 'cudi@gmail.com',
    action:{
      id:'2',
      approve:true
    },
    id:'2'
  },
  {
    requestdate:'07/06/2022',
    userid:'08234',
    requestedby:'Susono',
    email: 'dudi@gmail.com',
    action:{
      id:'3',
      approve:null
    },
    id:'3'
  },
]
import { ref } from 'vue'
import { defineAsyncComponent } from 'vue'
export default {
    components:{
      RequestDetail : defineAsyncComponent(()=> import('./RequestDetail.vue'))
    },
    setup(){
        return {
            columns,
            rows,
            filter: ref(''),
        }
    },
    data(){
      return{
        drequest:false
      }
    },
    methods:{
      onClick(index){
        console.log("testing",index)
      },
      onDetail(index){
        console.log("index",index)
        this.drequest = true
      }
    }
}
</script>

<style scoped>
.q-tr:hover{
  cursor:pointer;
}
</style>