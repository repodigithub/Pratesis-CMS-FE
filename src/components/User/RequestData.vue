<template>
    <div v-if="multiple">
      <q-btn color="secondary" icon="close" label="Reject" no-caps @click.stop="onClick(selected,'reject')" unelevated class="q-mr-lg q-px-sm" />
      <q-btn color="positive" icon="check" label="Approve" no-caps @click.stop="onClick(selected,'approve')" unelevated class="q-px-sm"/>
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
            @row-click="onDetail"
        >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
              <q-btn color="secondary" icon="close" label="Reject" no-caps @click.stop="onClick(props.row.id,'reject')" unelevated class="q-mr-lg btn-two"/>
              <q-btn color="positive" icon="check" label="Approve" no-caps @click.stop="onClick(props.row.id,'approve')" unelevated class="q-mr-lg btn-two"/>
          </q-td>
        </template>
        <template v-slot:body-cell-requestdate="props">
          <q-td key="requestdate" :props="props" >
                {{ formatTgl(props.row.created_at) }}
          </q-td>
        </template>
    </q-table>
    <RequestDetail v-model:drequest="drequest" v-if="drequest" v-model:dataDetail="dataDetail" @reloadTable="onRequest"/>
    <RequestAction v-model:daction="daction" v-if="daction" v-model:dload="dload" v-model:ddisabled="ddisabled" :action="action" v-model:actionpersistent="actionpersistent"/>
</template>

<script>
const columns = [
  { name: 'requestdate', align: 'left', label: 'Request Date', field: 'created_at', sortable: true,style:'width:96px' },
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
import { usePratesis } from 'src/composeables/usePratesis'
import RequestDetail from './RequestDetail.vue'
import RequestAction from './RequestAction.vue'
import { ref} from 'vue'
import { api,header } from 'boot/axios'
import { useRequestDetail } from 'src/composeables/useRequestDetail'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'

export default {
    components:{
      RequestDetail,
      RequestAction
    },
    setup(){
      const { formatTgl,successNotif } = useCustom()
      const { postData } = useService()
      const { pagination,rows,loading,init,onRequest} = usePratesis()
      const { drequest,onDetail,dataDetail } = useRequestDetail()
      // const store = useStore()
      // const token = store.state.auth.token
      const actionpersistent = ref(false)
      init('user',{
        status: 'waiting_approval',
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
        if(Array.isArray(index)){
          index.forEach((item) => {
              id.push(item.id)
            
          })
        }else{
          id.push(index)
        }
        send.value.ids = id
        send.value.action = act
      }

      function onApproval(){
        dload.value = true
        ddisabled.value = true
        actionpersistent.value = true
        postData('user/action',send.value)
        .then(()=>{
          dload.value = false
          ddisabled.value = false
          actionpersistent.value = false
          daction.value = false
          init('user',{
            status: 'waiting_approval',
          })
          multiple.value = false
          drequest.value = false
          selected.value = []
          successNotif(`User Berhasil di ${action.value}`)
        })
        .catch(err=>{
          dload.value = false
          ddisabled.value = false
          actionpersistent.value = false
          daction.value = false
          multiple.value = false
          drequest.value = false
          selected.value = []
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
          multiple ,
          drequest,
          onDetail,
          dataDetail,
          actionpersistent,
          successNotif,
          formatTgl
      }
    },
   
}
</script>

<style scoped>
tbody tr:hover{
  cursor:pointer;
}
</style>