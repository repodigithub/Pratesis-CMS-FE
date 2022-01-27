<template>
    <div v-if="multiple">
      <q-btn color="secondary" icon="close" label="Reject" no-caps @click.stop="onMultiple(selected,'reject')" unelevated class="q-mr-lg q-px-sm" />
      <q-btn color="positive" icon="check" label="Approve" no-caps @click.stop="onMultiple(selected,'approve')" unelevated class="q-px-sm"/>
    </div>
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
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
            @row-click="drequest = true"
        >
        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
              <q-btn color="secondary" icon="close" label="Reject" no-caps @click.stop="onClick(props.row.id,'reject')" unelevated class="q-mr-lg q-px-sm" />
              <q-btn color="positive" icon="check" label="Approve" no-caps @click.stop="onClick(props.row.id,'approve')" unelevated class="q-mr-lg q-px-sm"/>
          </q-td>
        </template>
        <template v-slot:body-cell-requestdate="props">
          <q-td key="requestdate" :props="props" >
                {{ formatTgl(props.row.created_at) }}
          </q-td>
        </template>
    </q-table>
    <RequestDetail v-model:drequest="drequest" v-if="drequest" />
    <RequestAction v-model:daction="daction" v-if="daction" v-model:dload="dload" v-model:ddisabled="ddisabled" :action="action"/>
</template>

<script>
const columns = [
  { name: 'requestdate', align: 'left', label: 'Request Date', field: 'created_at', sortable: true },
  {
    name: 'userid',
    required: true,
    label: 'User ID',
    align: 'left',
    field: 'user_id',
    sortable: true
  },
  { name: 'name', align: 'left', label: 'Name', field: 'full_name', sortable: true },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', sortable: true },
  { name: 'action',  align: 'left',label: 'Actions', field: 'id'},
]
import { useStore } from 'vuex'
import { useApi } from 'src/composeables/useApi'
import RequestDetail from './RequestDetail.vue'
import RequestAction from './RequestAction.vue'
import { date } from 'quasar'
import { ref} from 'vue'
import { api,header } from 'boot/axios'
export default {
    components:{
      RequestDetail,
      RequestAction
    },
    setup(){
      const { pagination,rows,loading,init,onRequest} = useApi()
      const store = useStore()
      const token = store.state.auth.token
      init('user',{
        status: 'pending',
        token: token
      })
      

      const selected = ref([])
      const multiple = ref(false)
      function getSelectedString () {
        if(selected.value.length === 0){
          return ''
        }else {
          multiple.value = true
          return `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${pagination.value.rowsNumber}`
        }
        
      }
      function onMultiple(index,act){
        daction.value = true
        action.value = act
        let id = []
        index.forEach((item) => {
          id.push(item.id)
        })
        send.value.ids = id
        send.value.action = act
      }

      const daction = ref(false)
      const dload = ref(false)
      const ddisabled = ref(false)
      const action = ref('')
      const send = ref({
        ids:[],
        action:''
      })
      function onClick(index,act) {
        daction.value = true
        action.value = act
        let id = []
        id.push(index)
        send.value.ids = id
        send.value.action = act
      }

      function onApproval(){
        dload.value = true
        ddisabled.value = true
        api.post('user/action',send.value,header(token))
        .then(()=>{
          dload.value = false
          ddisabled.value = false
          daction.value = false
          onRequest({filter:undefined,pagination:pagination.value})
          multiple.value = false
        })
        .catch(err=>{
          dload.value = false
          ddisabled.value = false
          daction.value = false
        })
      }
      return {
          columns,
          rows,
          loading,
          onRequest,
          pagination,
          daction,
          action,
          send,
          onClick,
          dload,
          ddisabled,
          onApproval,
          selected,
          getSelectedString,
          onMultiple,
          multiple 
      }
    },
    data(){
      return{
        drequest:false,
      }
    },
    methods:{
      onLoading(){
        this.dload = true
        this.ddisabled = true
        setTimeout(() => {
          this.dload = false
          this.ddisabled = false
          console.log("send data",this.send)
        }, 2000);
      },
      onDetail(index){
        console.log("index",index)
        this.drequest = true
      },
      formatTgl(tgl){
        return date.formatDate(tgl,'DD/MM/YY')
      }
    },
}
</script>

<style scoped>
tbody tr:hover{
  cursor:pointer;
}
</style>