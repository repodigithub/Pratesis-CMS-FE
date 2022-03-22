<template>
    <q-card class="own-card q-mb-lg" flat>
            <q-card-section>
                <div class="row items-end">
                    <div class="col-2 q-mr-md">
                        <div class="font-normal">Nama Promo :</div>
                        <q-input v-model="filter.nama" placeholder="ex: Promo Idul Fitri" dense outlined class="option-two col-9">
                            <template v-slot:append>
                                <q-icon
                                    name="search"
                                    class="grey2"
                                />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-2 q-mr-md">
                        <div class="font-normal">OPSO ID :</div>
                        <q-input v-model="filter.opso_id" placeholder="ex: 22030004" dense outlined class="option-two col-9">
                            <template v-slot:append>
                                <q-icon
                                    name="search"
                                    class="grey2"
                                />
                            </template>
                        </q-input>
                    </div>
                    <div class="col-3 q-mr-md">
                        <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="Area :"/>
                    </div>
                    <div class="col row items-end">
                        <div class="col-4 q-mr-sm">
                            <div class="font-normal">Start Date :</div>
                            <q-input
                            v-model="filter.start_date"
                            type="date"
                            dense
                            outlined
                                hide-bottom-space
                            class="option-two" />
                        </div>
                        <div class="col-4 q-mr-sm">
                            <div class="font-normal">End Date :</div>
                            <q-input
                            v-model="filter.end_date"
                            type="date"
                            dense
                            outlined
                                hide-bottom-space
                            class="option-two" />
                        </div>
                        <q-space />
                        <div class="col">
                            <q-btn color="primary" label="Search" no-caps unelevated class="btn-one " @click="filtering" :class="reset ? 'q-mb-sm' : ''"/>
                            <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="reseting" v-if="reset"/>
                        </div>
                    </div>
                </div>
            </q-card-section>
    </q-card>
</template>

<script>
import { defineAsyncComponent,ref } from 'vue'
export default {
    name:'filter-promo',
    components:{
        'select-dropdown' : defineAsyncComponent(()=> import('components/SelectDropdown'))
    },
    setup(props,{ emit }){
        const reset = ref(false)
        const filter = ref({})
        function filtering(){
            reset.value = true
            emit('onFilter',filter.value)
        }
        function reseting(){
            reset.value = false
            filter.value = {}
        }
        return {
            filter,filtering,reseting,reset
        }
    }
}
</script>

<style>

</style>