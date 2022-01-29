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
            <q-btn color="secondary" no-caps unelevated class="btn-one" >
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
                    <div class="text-h6">Our Changing Planet</div>
                    <div class="text-subtitle2">by John Doe</div>
                </q-card-section>
                <q-card-section>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </q-card-section>
            </q-card>
        </div>
    </div>
</q-page>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
export default {
    setup(){
        const kode = ref('Kode Area')
        const search = ref('')
        return {
            kode,
            search,
            optkode:['Kode Area',1,2,3,4,5]
        }
    },
    components:{
        Breadcrumb: defineAsyncComponent(() => import('components/Breadcrumb')),
    }
}
</script>

<style>

</style>