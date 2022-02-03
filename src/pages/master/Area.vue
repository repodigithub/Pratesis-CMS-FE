<template>
<q-page>
      <Breadcrumb>
        <template v-slot:leftside>
            <q-breadcrumbs-el label="Area" style="color:#00000073;"  />
        </template>
        <template v-slot:rightside>
            <q-btn color="secondary" outline no-caps unelevated class="btn-one q-mr-lg" >
                <q-icon name="download" style="font-size:15px;"  class="q-mr-sm"/>
                <div>Download Template</div>
            </q-btn>
            <q-btn color="secondary" no-caps unelevated class="btn-one" @click="uploadFile" >
                <q-icon name="upload_file" style="font-size:14px;" class="q-mr-sm"/>
                <div>Upload</div>
            </q-btn>
        </template>
    </Breadcrumb >
    <div class="row q-pa-lg">
        <div class="col-12">
            <q-card class="own-card q-mb-lg" flat>
                <q-card-section>
                    <div class="row items-end">
                        <div class="col-10">
                            <div class="font-normal">Pencarian :</div>
                            <div class="row">
                                    <q-select v-model="kode" :options="optkode" dense outlined bg-color="primary" dropdown-icon="expand_more" class="option-one col-3" />
                                    <q-input v-model="search" placeholder="Ex: ASM Medan" dense outlined class="option-two col-9">
                                        <template v-slot:append>
                                            <q-icon
                                                name="search"
                                                class="grey2"
                                            />
                                        </template>
                                    </q-input>
                            </div>
                        </div>
                        <q-space />
                        <q-btn color="primary" label="Search" no-caps unelevated class="btn-one" @click="uploadFile"/>
                    </div>
                    <!-- <q-btn :color="reset ? 'negative' :'primary'" :label="reset ? 'Reset' : 'Apply'" no-caps unelevated class="btn-one" @click="onFilter"/> -->
                </q-card-section>
            </q-card>
            <q-card class="own-card" flat>
                <q-card-section>
                  <q-table
                            class="my-sticky-header-table q-mt-md btn-radius col-12"
                            title=""
                            :rows="rows"
                            :columns="columns"
                            row-key="id"
                            flat
                            bordered
                            :loading="loading"
                            :filter="filter"
                            v-model:pagination="pagination"
                            @request="onRequest"
                            hide-pagination
                            binary-state-sort
                        >
                        <template v-slot:loading>
                        <q-inner-loading showing color="primary" />
                        </template>
                    </q-table>
                    <div class="row justify-end q-mt-md">
                        <q-pagination
                            v-model="pagination.page"
                            color="black"
                            active-color="secondary"
                            active-text-color="secondary"
                            :max="pagination.rowsNumber"
                            size="md"
                            direction-links
                            outline
                           
                            class="table-pagination"
                        />
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
    <UploadFile v-model:upload="upload" v-if="upload"/>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import UploadFile from 'components/Modal/UploadFile'
const columns = [
  {
    name: 'kode',
    required: true,
    label: 'Kode Area',
    align: 'left',
    field: 'kode_area',
    sortable: true,
    style:'width:80px'
  },
  { name: 'nama_area', align: 'left', label: 'Nama ', field: 'nama_area', sortable: true,style:'width:49px' },
  { name: 'alamat_depo',  align: 'left',label: 'Alamat ', field: 'alamat_depo', sortable: true,style:'max-width:450px',classes: 'ellipsis', },
  { name: 'region',  align: 'left',label: 'Region', field: 'region', sortable: true },
]
import { useStore } from 'vuex'
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    setup(){
        const { pagination,rows,loading,init,onRequest } = usePratesis()
        const store = useStore()
        init('area',{
            token: store.state.auth.token
        })
        const kode = ref('Kode Area')
        const search = ref('')
        const filter = ref('')

        const upload = ref(false)
        function uploadFile(){
            upload.value = true
        }
        return {
            kode,
            search,
            optkode:['Kode Area',1,2,3,4,5],
            filter,
            columns,
            rows,
            pagination,
            loading,
            onRequest,
            upload,
            uploadFile
        }
    },
    components:{
        Breadcrumb: defineAsyncComponent(() => import('components/Breadcrumb')),
        UploadFile
    },
    
}
</script>

<style>

</style>