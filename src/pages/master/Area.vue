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
            <q-btn color="secondary" no-caps unelevated class="btn-one" @click="modalUpload = true" >
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
                        <div :class="resetFilter ? 'col-9' :'col-10'">
                            <div class="font-normal">Pencarian :</div>
                            <div class="row">
                                    <q-select v-model="kode" :options="option" dense outlined bg-color="primary" dropdown-icon="expand_more" class="option-one col-3" @filter="filterFn" emit-value  map-options :loading="selectloading"
      @virtual-scroll="onScroll"/>
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
                        <q-btn color="primary" label="Search" no-caps unelevated class="btn-one q-mr-sm" @click="onFilter(dataFilter)"/>
                        <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="onReset" v-if="resetFilter"/>
                    </div>
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
                        <template v-slot:body-cell-region="props">
                        <q-td key="region" :props="props" >
                                {{ props.row.region.nama_region }}
                        </q-td>
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
    <UploadFile v-model:upload="modalUpload" v-if="modalUpload" menu="area"/>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref, nextTick,watch } from 'vue'
const columns = [
  {
    name: 'kode',
    required: true,
    label: 'Kode Area',
    align: 'left',
    field: 'kode_area',
    style:'width:80px'
  },
  { name: 'nama_area', align: 'left', label: 'Nama ', field: 'nama_area', style:'width:49px' },
  { name: 'alamat_depo',  align: 'left',label: 'Alamat ', field: 'alamat_depo', style:'max-width:450px',classes: 'ellipsis', },
  { name: 'region',  align: 'left',label: 'Region', field: 'region'},
]
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    setup(){
        const { pagination,rows,loading,init,onRequest,gotoPage,pagesNumber,getData,onFilter,filter,resetFilter,
            onResetFilter,modalUpload} = usePratesis()
        init('area', {
            include:'region'
        })
        const kode = ref(null)
        const search = ref('')
        const dataFilter = ref({})

        const option = ref([
            {
                label:'Kode Area',
                value:null
            }
        ])
        const selectloading = ref(false)
        const selectpagination = ref({})
        function filterFn (val, update, abort) {
            if (option.value.length !== 1) {
                update()
                return
            }
            getData('area')
            .then(res=>{
                update( () => {
                    res.data.data.data.forEach((item)=>{
                        option.value.push({
                            label :item.kode_area,
                            value :item.kode_area,
                            nama_area:item.nama_area
                        })
                    })
                })
                selectpagination.value.page = res.data.data.current_page
                selectpagination.value.last_page = res.data.data.last_page
                selectpagination.value.next_page = res.data.data.current_page + 1
            })
            .catch(err=>{
                console.log("error",err)
            })
            
        }
        function onScroll ({ to, ref }) {
            const lastIndex = option.value.length - 1

            if (selectloading.value !== true && selectpagination.value.next_page <= selectpagination.value.last_page && to === lastIndex) {
            selectloading.value = true
                getData(`area?page=${selectpagination.value.next_page}`)
                .then(res=>{
                    nextTick( () => {
                        res.data.data.data.forEach((item)=>{
                            option.value.push({
                                label :item.kode_area,
                                value :item.kode_area,
                            })
                        })
                    })
                    selectpagination.value.page = res.data.data.current_page
                    selectpagination.value.last_page = res.data.data.last_page
                    selectpagination.value.next_page = res.data.data.current_page + 1
                    ref.refresh()
                    selectloading.value = false
                })
                .catch(err=>{
                    console.log("error",err)
                })
            }
        }
        watch(
            kode,(val) => {
                let result = option.value.find(opt => opt.value === val)
                search.value = result.nama_area
            },
            search,(val) => {
                dataFilter.value = {
                    searchKey : search.value
                }
            }
        )
        function onReset(){
            onResetFilter()
            dataFilter.value = null
            search.value = null
            kode.value = null
        }
        return {
            kode,
            search,
            filter,
            onFilter,
            dataFilter,
            onReset,
            resetFilter,

            option,
            filterFn,
            onScroll,
            selectpagination,
            selectloading,


            columns,
            rows,
            pagination,
            loading,
            onRequest,
            gotoPage,
            pagesNumber,

            modalUpload,
            
        }
    },
    components:{
        Breadcrumb: defineAsyncComponent(() => import('components/Breadcrumb')),
        UploadFile: defineAsyncComponent(() => import('components/Modal/UploadFile'))
    },
 
}
</script>

<style>

</style>