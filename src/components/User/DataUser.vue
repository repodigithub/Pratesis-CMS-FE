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
    <user-detail v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" @reloadTable="onRequest" :options="{ include : 'usergroup;area;distributor'}" >
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
                    <q-badge outline  label="Approve" class="text-positive q-px-md q-py-sm btn-two" />
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
                      <q-input v-model="props.namadistributor"  dense outlined id="nama_distributor" class="q-mb-md"
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
const columns = [
  { name: 'kode',  align: 'left',label: 'Kode Group', field: 'kode_group',style:'width:196px'},
  { name: 'name', align: 'left', label: 'Nama', field: 'full_name', style:'width:196px' },
  { name: 'email',  align: 'left',label: 'Email', field: 'email', },
]
import { usePratesis } from 'src/composeables/usePratesis'
import { defineAsyncComponent } from 'vue'
import { useCustom } from 'src/composeables/useCustom'
export default {
    components:{
      'user-detail': defineAsyncComponent(() => import('./UserDetail')),
      'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
    },
    setup(){
      const { pagination,rows,loading,init,onRequest,pagesNumber,gotoPage,modalDetail,openDetail,dataDetail } = usePratesis()
      const { formatTgl } = useCustom()

      init('user',{
        status: 'approve'
      })
      
      return {
          columns,
          rows,
          loading,
          onRequest,
          pagination,pagesNumber,gotoPage,
          modalDetail,openDetail,dataDetail,

          formatTgl
      }
    },
    inject:['filter'],
}
</script>

<style>

</style>