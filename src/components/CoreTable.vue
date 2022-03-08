<template>
    <q-card class="own-card" flat>
        <q-card-section>
            <slot name="toptable" />
            <q-table
                class="my-sticky-header-table q-mt-md btn-radius col-12"
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
                @row-click="openDetail"
            >
                <template v-slot:loading>
                    <q-inner-loading showing color="primary" />
                </template>
                <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
                    <slot :name="slot" v-bind="props" />
                </template>
            </q-table>
            <div class="row justify-end q-mt-md">
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
        </q-card-section>
    </q-card>
    <detail-table v-model:modalDetail="modalDetail" v-if="modalDetail" :dataDetail="dataDetail" @reloadTable="onRequest" :canEdit="canEdit" :options="optionsDetail">
        <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
            <slot :name="slot" v-bind="props" />
        </template>
    </detail-table>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
import { watch,defineAsyncComponent } from 'vue'
export default {
    name:'core-table',
    props: {
        url: {
            type: String,
        },
        option: {
            type: String,
        },
        columns: {
            type: Array,
        },
        filter: {
            type: String,
        },
        requesting: {
            type: String,
        },
        islogin: {
            type: Boolean,
            default: true
        },
        canEdit:{
            type:Boolean,
            default: true
        },
        optionsDetail:{
            type:Object
        },
    },
    setup(props, { emit }){
        const { pagination,rows,loading,init,onRequest,pagesNumber,modalDetail,openDetail,dataDetail } = usePratesis()
        init(props.url,props.option,props.islogin)

        function gotoPage(page){
            let request = {}
            request.pagination = {
                page : page
            }
            if(props.filter){
                request.filter = props.filter
            }
            onRequest(request)
        }        

        watch(()=> props.requesting, val =>{
            onRequest(val)
        })
        
        return {
            rows,
            pagination,
            loading,
            onRequest,
            gotoPage,
            pagesNumber,

            modalDetail,//data detail table
            openDetail,
            dataDetail,
        }
    },
    components:{
        'detail-table': defineAsyncComponent(() => import('./Modal/DetailTable')),
    }
}
</script>

<style>

</style>