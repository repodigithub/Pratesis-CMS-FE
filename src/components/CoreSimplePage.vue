<template>
    <q-page>
        <breadcrumb  :url="filetemplate" @openModal="openUpload" />
        <div class="row q-pa-lg">
            <div class="col-12">
                <filter-table :option="filteroption" :placeholder="placeholder" @onFiltering="onFilter" @onReseting="onResetFilter"/>
                <core-table :url="$route.path.substr(1)" :option="urloption" v-model:filter="filter" :columns="columns" v-model:requesting="reload" :canEdit="canEdit" :optionsDetail="optionsDetail">
                    <template v-for="(_, slot) in $slots" v-slot:[slot]="props">
                        <slot :name="slot" v-bind="props" />
                    </template>
                </core-table>
            </div>
        </div>
        <upload-file v-model:upload="modalUpload" v-if="modalUpload" :menu="$route.path.substr(1)" @onUploadSuccess="reloadTable"/>
    </q-page>
</template>

<script>
import { defineAsyncComponent} from 'vue'
import { usePratesis } from 'src/composeables/usePratesis'

export default {
    name:'core-simple-page',
    props:['columns','urloption','placeholder','filteroption','filetemplate','canEdit','optionsDetail'],
    setup(){
        const { onFilter,filter,onResetFilter,modalUpload,openUpload,reload,reloadTable} = usePratesis()
        return {
            filter, //for filtering
            onFilter,
            onResetFilter,

            modalUpload,//for upload modal,reload table
            openUpload,
            reloadTable,
            reload,
        }
    },
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'upload-file': defineAsyncComponent(() => import('components/Modal/UploadFile')),
        'core-table': defineAsyncComponent(() => import('components/CoreTable')),
        'filter-table': defineAsyncComponent(() => import('components/FilterTable')),
    },
}
</script>