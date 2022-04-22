<template>
<q-page>
    <breadcrumb :rightside="false"/>
    <div class="row q-pa-lg">
        <div class="col-12">
            <list-klaim />
        </div>
    </div>
</q-page>
</template>
<script>
import { defineAsyncComponent } from 'vue'
export default {
    components:{
        'breadcrumb': defineAsyncComponent(() => import('components/Breadcrumb')),
        'list-klaim' : defineAsyncComponent(()=> import('components/KlaimPromo/ListKlaim')),
    },
}
</script>