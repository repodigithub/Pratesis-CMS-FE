<template>
<q-page>
      <Breadcrumb>
        <template v-slot:leftside>
            <q-breadcrumbs-el label="Distributor Group" style="color:#00000073;"  />
        </template>
        <template v-slot:rightside>
            <q-btn color="secondary" outline no-caps unelevated class="btn-one q-mr-lg" >
                <q-icon name="download" style="font-size:15px;"  class="q-mr-sm"/>
                <div>Download Template</div>
            </q-btn>
            <q-btn color="secondary" no-caps unelevated class="btn-one" @click="modalUpload = true">
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
                        <q-btn color="primary" label="Search" no-caps unelevated class="btn-one" />
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
                    <div class="row justify-end q-mt-md" v-if="Object.keys(pagination).length > 0">
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
                        />
                    </div>
                </q-card-section>
            </q-card>
        </div>
    </div>
    <UploadFile v-model:upload="modalUpload" v-if="modalUpload" menu="distributor-group"/>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'
const columns = [
  {
    name: 'kode',
    required: true,
    label: 'Kode Distributor Group',
    align: 'left',
    field: 'kode_distributor_group',
    sortable: true
  },
  { name: 'nama_distributor_group', align: 'left', label: 'Nama Distributor Group', field: 'nama_distributor_group', sortable: true },
]

export default {
    setup(){
         const { pagination,rows,loading,init,onRequest,gotoPage,pagesNumber,getData,onFilter,filter,resetFilter,
            onResetFilter,modalUpload} = usePratesis()
            init('distributor-group')
        const kode = ref('Kode Area')
        const search = ref('')
        return {
            kode,
            search,
            optkode:['Kode Area',1,2,3,4,5],
            filter,


            columns, // start untuk table
            rows,
            pagination,
            loading,
            onRequest,
            gotoPage,
            pagesNumber,

            modalUpload
        }
    },
    components:{
        Breadcrumb: defineAsyncComponent(() => import('components/Breadcrumb')),
        UploadFile: defineAsyncComponent(() => import('components/Modal/UploadFile'))
    }
}
</script>

<style>

</style>