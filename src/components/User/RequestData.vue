<template>
    <div v-if="multiple">
      <q-btn color="secondary" no-caps @click.stop="onClick(selected,'reject')" unelevated class="q-mr-lg btn-two btn-approve">
          <q-icon name="close" size="16px"/>
          <div class="fs-12" style="line-height:16px;">Reject</div>
        </q-btn>
      <q-btn color="positive" no-caps @click.stop="onClick(selected,'approve')" unelevated class="btn-two btn-approve">
        <q-icon name="check" size="16px"/>
        <div class="fs-12" style="line-height:16px;">Approve</div>
      </q-btn>
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
            hide-pagination
            @request="onRequest"
            :loading="loading"
            binary-state-sort
            :selected-rows-label="getSelectedString"
            selection="multiple"
            v-model:selected="selected"
            @row-click="openDetail"
        >
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>
        <template v-slot:body-cell-action="props">
          <q-td key="action" :props="props">
              <q-btn color="secondary" no-caps @click.stop="onClick(props.row.id,'reject')" unelevated class="q-mr-lg btn-two btn-approve">
                <q-icon name="close" size="16px"/>
                <div class="fs-12" style="line-height:16px;">Reject</div>
              </q-btn>
              <q-btn color="positive"  no-caps @click.stop="onClick(props.row.id,'approve')" unelevated class="q-mr-lg btn-two btn-approve">
                <q-icon name="check" size="16px"/>
                <div class="fs-12" style="line-height:16px;">Approve</div>
              </q-btn>
          </q-td>
        </template>
        <!-- <template v-slot:body-cell-requestdate="props">
          <q-td key="requestdate" :props="props" >
                {{ formatTgl(props.row.created_at) }}
          </q-td>
        </template> -->
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
    <!-- <RequestDetail v-model:drequest="drequest" v-if="drequest" v-model:dataDetail="dataDetail" @reloadTable="onRequest"/> -->
    <RequestAction v-model:daction="daction" v-if="daction" v-model:dload="dload" v-model:ddisabled="ddisabled" :action="action" v-model:actionpersistent="actionpersistent"/>
     <user-detail v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" @reloadTable="onRequest" :options="{ include : 'usergroup;area;distributor'}" v-model:dataForm="dataForm" isRequest>
      <template v-slot:detail-content="props">
            <div v-if="!props.edit">
                <div class="row items-center">
                    <div>Request Date</div>
                    <q-space />
                    <div >{{formatTgl(props.tampil.created_at)}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>User ID</div>
                    <q-space />
                    <div >{{props.tampil.user_id}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Full Name</div>
                    <q-space />
                    <div >{{props.tampil.full_name}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Email</div>
                    <q-space />
                    <div >{{props.tampil.email}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Username</div>
                    <q-space />
                    <div >{{props.tampil.username}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>User Level</div>
                    <q-space />
                    <div>{{props.tampil.usergroup.nama_group}}</div>
                </div>
                <div class="row items-center q-mt-md" v-if="props.tampil.kode_area">
                    <div>Kode Depo</div>
                    <q-space />
                    <div >{{props.tampil.kode_area}}</div>
                </div>
                <div class="row items-center q-mt-md" v-if="props.tampil.kode_area">
                    <div>Nama Depo</div>
                    <q-space />
                    <div >{{props.tampil.area.nama_area}}</div>
                </div>
                <div class="row items-center q-mt-md" v-if="props.tampil.kode_distributor">
                    <div>Kode Distributor</div>
                    <q-space />
                    <div >{{props.tampil.kode_distributor}}</div>
                </div>
                <div class="row items-center q-mt-md" v-if="props.tampil.kode_distributor">
                    <div>Nama Distributor</div>
                    <q-space />
                    <div >{{props.tampil.distributor.nama_distributor}}</div>
                </div>
                <div class="row items-center q-mt-md">
                    <div>Status</div>
                    <q-space />
                    <q-badge outline  label="Waiting for Approval" class="alert3 alert1 q-px-md q-py-sm btn-two" />
                </div>
            </div>
            <div v-else>
              <!-- <edit-user v-model:dataForm="dataForm"/> -->
              <div class="row items-center">
                    <div>Request Date</div>
                    <q-space />
                    <div >{{formatTgl(props.send.created_at)}}</div>
                </div>
                <label for="User ID">User ID</label>
                <q-input v-model="props.send.user_id" type="text" id="User ID" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'User ID tidak boleh kosong',
                ]"/>
                <label for="Full Name">Full Name</label>
                <q-input v-model="props.send.full_name" type="text" id="Full Name" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Full Name tidak boleh kosong',
                ]"/>
                <label for="Email">Email</label>
                <q-input v-model="props.send.email" type="text" id="Email" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Email tidak boleh kosong',
                ]"/>
                <label for="Username">Username</label>
                <q-input v-model="props.send.username" type="text" id="Username" outlined dense lazy-rules
                :rules="[
                    val => val !== null && val !== '' || 'Username tidak boleh kosong',
                ]"/>
                <select-dropdown url="user-group" v-model:selected="props.send.kode_group" :islogin="false" :master="false" class="q-mb-md" nameLabel="User Level"/>

                <div v-if="props.send.kode_group.includes('DI') || props.send.kode_group.includes('SA')">
                    <select-dropdown url="area" v-model:selected="props.send.kode_area" :islogin="false" :master="false" class="q-mb-md" ref="kodedepo" nameLabel="Kode Depo"/>
                    <label for="nama_depo" class="font-normal">Nama Depo</label>
                    <q-input v-model="props.namaarea"  dense outlined id="nama_depo" class="q-mb-md"
                    hide-bottom-space
                    disable
                    >
                    <template v-slot:append>
                        <q-icon
                            name="person"
                        />
                        </template>
                    </q-input>
                </div>
                <div  v-if="props.send.kode_group.includes('DI')">
                    <select-dropdown url="distributor" v-model:selected="props.send.kode_distributor" :islogin="false" :master="false" class="q-mb-md" ref="kodedistributor" nameLabel="Kode Distributor"/> 
                    <label for="nama_distributor" class="font-normal">Nama Distributor</label>
                      <q-input v-model="dataForm.distributor.nama_distributor"  dense outlined id="nama_distributor" class="q-mb-md"
                      hide-bottom-space
                      disable
                      >
                          <template v-slot:append>
                          <q-icon
                              name="person"
                          />
                          </template>
                      </q-input>
                </div>
            </div>
        </template>
    </user-detail>
</template>

<script>

import { usePratesis } from 'src/composeables/usePratesis'
import RequestAction from './RequestAction.vue'
import { ref, defineAsyncComponent,watch } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
import { useService } from 'src/composeables/useService'
import UserDetail from './UserDetail.vue'

export default {
    components:{
      RequestAction,
      'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
      UserDetail
    },
    setup(){
      const { formatTgl,successNotif } = useCustom()
      const columns = [
        { name: 'requestdate', align: 'left', label: 'Request Date', field: row => formatTgl(row.created_at), style:'width:96px' },
        { name: 'userid',label: 'User ID',align: 'left',field: 'user_id'},
        { name: 'name', align: 'left', label: 'Name', field: 'full_name', },
        { name: 'email',  align: 'left',label: 'Email', field: 'email', },
        { name: 'action',  align: 'left',label: 'Actions', field: 'id'},
      ]
      const { postData } = useService()
      const { pagination,rows,loading,init,onRequest,pagesNumber,gotoPage,modalDetail,openDetail,dataDetail} = usePratesis()
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
          return `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${pagination.value.rowsNumber}`
        }
      }

      watch(()=>selected.value,val=>{
        if (val.length > 0) {
          multiple.value = true
        }else{
          multiple.value = false
        }
      })

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
          modalDetail.value = false
          selected.value = []
          successNotif(`User Berhasil di ${action.value}`)
        })
        .catch(err=>{
          dload.value = false
          ddisabled.value = false
          actionpersistent.value = false
          daction.value = false
          multiple.value = false
          modalDetail.value = false
          selected.value = []
        })
      }

      const isSelect = ref(false)
      return {
          columns,
          rows,
          loading,
          onRequest,
          pagination,pagesNumber,gotoPage,
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
          actionpersistent,
          successNotif,
          formatTgl,

          modalDetail,openDetail,dataDetail,
          isSelect
      }
    },
}
</script>

<style scoped>
tbody tr:hover{
  cursor:pointer;
}
</style>