<template>
  <q-dialog
    :model-value="modalDetail"
    @click="$emit('update:modalDetail', $event.target.value)"
    @hide="$emit('update:modalDetail', false)"
    full-height
    position="right"
    class="dialog-detail"
  >
    <q-card style="width: 400px; height: 100%">
      <q-form
        @submit.prevent.stop="onSave"
        ref="form"
        style="width: 400px; height: 100%"
      >
        <div class="data-detail">
          <q-card-section class="row items-start q-pb-none">
            <div class="text-h6">{{ $route.name }} Detail</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-scroll-area class="fit" v-if="valid">
            <q-card-section class="q-pb-none">
              <div v-if="!edit">
                <div class="row items-center">
                  <div>Request Date</div>
                  <q-space />
                  <div>
                    {{ GeneralFormatDate(dataModal.created_at, "DD/MM/YY") }}
                  </div>
                </div>
                <div class="row items-center q-mt-md">
                  <div>User ID</div>
                  <q-space />
                  <div>{{ dataModal.user_id }}</div>
                </div>
                <div class="row items-center q-mt-md">
                  <div>Full Name</div>
                  <q-space />
                  <div>{{ dataModal.full_name }}</div>
                </div>
                <div class="row items-center q-mt-md">
                  <div>Email</div>
                  <q-space />
                  <div>{{ dataModal.email }}</div>
                </div>
                <div class="row items-center q-mt-md">
                  <div>Username</div>
                  <q-space />
                  <div>{{ dataModal.username }}</div>
                </div>
                <div class="row items-center q-mt-md">
                  <div>User Level</div>
                  <q-space />
                  <div>{{ dataModal.nama_group }}</div>
                </div>
                <div class="row" v-if="dataModal.kode_area">
                    <div
                    class="row items-center q-mt-md col-12"
                    >
                    <div>Kode Depot</div>
                    <q-space />
                    <div>{{ dataModal.kode_area }}</div>
                    </div>

                    <div
                    class="row items-center q-mt-md col-12"
                    >
                    <div>Nama Depot</div>
                    <q-space />
                    <div>{{ dataModal.nama_area }}</div>
                    </div>
                </div>
                <div
                  class="row items-center q-mt-md"
                  v-if="dataModal.kode_distributor"
                >
                  <div>Kode Distributor</div>
                  <q-space />
                  <div>{{ dataModal.kode_distributor }}</div>
                </div>
                <div
                  class="row items-center q-mt-md"
                  v-if="dataModal.kode_distributor"
                >
                  <div>Nama Distributor</div>
                  <q-space />
                  <div>{{ dataModal.nama_distributor }}</div>
                </div>
                
                <div class="row items-center q-mt-md">
                  <div>Status</div>
                  <q-space />
                  <q-badge
                    outline
                    :label="statusPromo(dataModal.status)"
                    class="q-px-md q-py-sm btn-two"
                    :class="active ? colorStatusPromo(dataModal.status) : ''"
                  />
                </div>
              </div>
              <div v-show="edit">
                <div div class="row items-center">
                  <div>Request Date</div>
                  <q-space />
                  <div>
                    {{ GeneralFormatDate(dataModal.created_at, "DD/MM/YY") }}
                  </div>
                </div>
                <label for="User ID">User ID</label>
                <q-input
                  v-model="dataModal.user_id"
                  type="text"
                  id="User ID"
                  outlined
                  dense
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'User ID tidak boleh kosong',
                  ]"
                />
                <label for="Full Name">Full Name</label>
                <q-input
                  v-model="dataModal.full_name"
                  type="text"
                  id="Full Name"
                  outlined
                  dense
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Full Name tidak boleh kosong',
                  ]"
                />
                <label for="Email">Email</label>
                <q-input
                  v-model="dataModal.email"
                  type="text"
                  id="Email"
                  outlined
                  dense
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Email tidak boleh kosong',
                  ]"
                />
                <label for="Username">Username</label>
                <q-input
                  v-model="dataModal.username"
                  type="text"
                  id="Username"
                  outlined
                  dense
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val !== null && val !== '') ||
                      'Username tidak boleh kosong',
                  ]"
                />
                <select-dropdown
                  url="user-group"
                  v-model:selected="dataModal.kode_group"
                  :islogin="false"
                  :master="false"
                  class="q-mb-md"
                  nameLabel="User Level"
                />

                <div
                  v-show="
                    dataModal.kode_group.includes('DI') ||
                    dataModal.kode_group.includes('GA')
                  "
                >
                  <select-dropdown
                    url="area?sort=kode_area,asc"
                    v-model:selected="dataModal.kode_area"
                    :islogin="false"
                    :master="false"
                    class="q-mb-md"
                    ref="kodedepo"
                    nameLabel="Kode Depot"
                    :isSearchNormal="false"
                    :isPageNormal="false"
                  />
                  <label for="nama_depo" class="font-normal">Nama Depot</label>
                  <q-input v-model="nama_area"  dense outlined id="nama_depo" class="q-mb-md"
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
                <div v-if="showdistributor && dataModal.kode_group.includes('DI')">
                  <select-dropdown
                    :url="urldistributor"
                    v-model:selected="dataModal.kode_distributor"
                    :islogin="false"
                    :master="false"
                    class="q-mb-md"
                    ref="kodedistributor"
                    nameLabel="Kode Distributor"
                    :isSearchNormal="false"
                    :isPageNormal="false"
                  />
                  <label for="nama_distributor" class="font-normal"
                    >Nama Distributor</label
                  >
                  <q-input v-model="nama_distributor"  dense outlined id="nama_distributor" class="q-mb-md"
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
                <label for="password" class="font-normal">Password</label>
                <q-input v-model="dataModal.password"  dense outlined id="password" :type="visibility ? 'password' : 'text'" class="q-mb-md"
                hide-bottom-space
                >
                    <template v-slot:append>
                    <q-icon
                        :name="visibility ? 'visibility' : 'visibility_off'"
                        @click="visibility = !visibility"
                        class="cursor-pointer"
                    />
                    </template>
                </q-input>
              </div>
            </q-card-section>
          </q-scroll-area>
          <q-card-section class="row justify-center" v-else>
            <q-spinner-grid class="col-4 text-primary" />
            <span class="col-12 text-primary font-medium text-center"
              >Memuat Data</span
            >
          </q-card-section>
          <q-card-section class="row items-center" v-if="canEdit">
            <q-btn
              color="primary"
              icon="edit"
              label="Edit"
              no-caps
              unelevated
              class="q-px-sm btn-one"
              outline
              v-if="!edit"
              @click="onEdit"
            />
            <q-btn
              color="primary"
              icon="save"
              label="Simpan"
              no-caps
              unelevated
              class="q-px-sm btn-one"
              outline
              v-else
              type="submit"
            />
            <q-space />
            <div class="d" v-if="isRequest">
              <q-btn
                color="secondary"
                label="Reject"
                no-caps
                unelevated
                class="q-px-sm btn-one q-mr-sm"
                outline
                @click="onLoad(dataDetail.id, 'reject')"
              />
              <q-btn
                color="secondary"
                label="Approve"
                no-caps
                unelevated
                class="q-px-sm btn-one"
                @click="onLoad(dataDetail.id, 'approve')"
              />
            </div>
          </q-card-section>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import { useService } from "src/composeables/useService";
import { useCustom } from "src/composeables/useCustom";
export default {
  name: "user-detail",
  props: {
    modalDetail: {
      type: Boolean,
    },
    dataDetail: {
      type: Object,
    },
    canEdit: {
      type: Boolean,
      default: true,
    },
    options: {
      type: Object,
    },
    islogin: {
      type: Boolean,
      default: true,
    },
    isRequest: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { putData, getData } = useService();
    const { showLoading, hideLoading, successNotif, GeneralFormatDate, statusPromo,colorStatusPromo,errorNotif } =
      useCustom();
    
    const form = ref(null);
    const dataModal = ref({});
    const route = useRoute();

    const edit = ref(false);

    const valid = ref(false); // utk mengload data detail berdasarkan relasinya

    function onEdit() {
      edit.value = true;
    }

    const url = ref(null);
    url.value = `${route.path.substr(1)}/${props.dataDetail.id}`;

    if (props.options) {
      let x = { ...props.options };
      url.value += `?include=${x.include}`;
    }
    const nama_area = ref("undefined")
    const nama_distributor = ref("undefined")

    getData(url.value).then((res) => {
      let result =  res.data.data
      dataModal.value = {
        created_at : result.created_at,
        user_id : result.user_id,
        full_name : result.full_name,
        email : result.email,
        username : result.username,
        nama_group : result.usergroup.nama_group,
        kode_group : result.usergroup.kode_group,
        kode_area : result.area?.kode_area ?? null,
        nama_area : result.area?.nama_area ?? '',
        kode_distributor : result.distributor?.kode_distributor ?? null,
        nama_distributor : result.distributor?.nama_distributor ?? '',
        status : result.status,
        password: ''
      }
      valid.value = true;
    });
    const urldistributor = ref('')
    const showdistributor = ref(false)
    watch(
      () => dataModal.value.kode_area,
      (val) => {
        if (val !== null) {
          showdistributor.value = false
          setTimeout(() => {
              urldistributor.value = `distributor?kode_area=${val}&status_distributor=aktif&sort=kode_distributor,asc`
              showdistributor.value = true
          }, 100);
          if(edit.value) {
            dataModal.value.kode_distributor =  null
          }
          getData(`area?search=${val}`).then((res) => {
            nama_area.value = res.data.data.data.filter(area=> area.kode_area === val)[0].nama_area
          });
        } else {
          nama_area.value = "undefined";
        }
      }
    );
    
    
    watch(
      () => dataModal.value.kode_distributor,
      (val) => {
        if (val !== null) {
          getData(`distributor?search=${val}`).then((res) => {
            nama_distributor.value = res.data.data.data.filter(distributor=> distributor.kode_distributor === val)[0].nama_distributor;
          });
        } else {
          nama_distributor.value = "undefined";
        }
      }
    );

    watch(
      () => dataModal.value.kode_group,
      (val) => {
        if (val.includes("GA")) {
          dataModal.value.kode_distributor = null;
        } else if (!val.includes("DI")) {
          dataModal.value.kode_distributor = null;
          dataModal.value.kode_area = null;
        }
      }
    );

    function onSave() {
      form.value.validate().then((valid) => {
        if (valid) {
          showLoading();
          putData(url.value.split("?")[0], dataModal.value)
            .then(() => {
              hideLoading();
              successNotif(`Data ${route.name} berhasil diperbarui`);
              emit("update:modalDetail", false);
              emit("reloadTable", {
                pagination: {
                  page: 1,
                },
              });
            })
            .catch((error)=>{
                let result = Object.values(error?.response?.data?.data)
                let hasil = '<span>'
                for (let index = 0; index < result.length; index++) {
                  hasil += result[index] +"</span>" +"<br>" 
                }
                  errorNotif(`${hasil}`,true)
              hideLoading();
            });
        }
      });
    }
    const visibility = ref(true)
    return {
      edit,
      dataModal,
      form,

      onEdit,
      onSave,
      successNotif,
      getData,
      putData,

      valid,
      nama_area,
      nama_distributor,
      GeneralFormatDate,
      statusPromo,
      colorStatusPromo,
      active : true,
      visibility,urldistributor,
      showdistributor
    };
  },
  methods: {
    onLoad(index, action) {
      this.$parent.onClick(index, action);
    },
  },
  components:{
      'select-dropdown': defineAsyncComponent(() => import('components/SelectDropdown')),
  }
};
</script>

<style></style>
