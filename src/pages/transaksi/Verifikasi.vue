<template>
<q-page>
    <breadcrumb  :upload="false" :leftside="false" @openModal="openUpload">
        <template v-slot:breadcrumb-content>
            <q-breadcrumbs-el label="Verifikasi Klaim" style="color:#00000073;"/>
        </template>
    </breadcrumb>
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