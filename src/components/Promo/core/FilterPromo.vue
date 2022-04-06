<template>
    <q-card class="own-card q-mb-lg" flat>
            <q-card-section>
                <div class="row items-end">
                    <div class="col-2 q-mr-md" v-if="['HO','AD','GA'].indexOf(role) >= 0">
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
                    <div class="col-3 q-mr-md" v-if="['HO','AD'].indexOf(role) >= 0">
                        <select-dropdown url="area" v-model:selected="filter.area_id" :islogin="false" nameLabel="Area :"/>
                    </div>
                    <div class="col-3 q-mr-md" v-if="['GA'].indexOf(role) >= 0">
                        <select-dropdown url="distributor" v-model:selected="filter.distributor_id" :islogin="false" nameLabel="Distributor :"/>
                    </div>
                    <div class="col row items-end q-col-gutter-sm">
                        <div class="col">
                            <div class="font-normal">Start Date :</div>
                            <q-input
                            v-model="filter.start_date"
                            type="date"
                            dense
                            outlined
                                hide-bottom-space
                            class="option-two" />
                        </div>
                        <div class="col">
                            <div class="font-normal">End Date :</div>
                            <q-input
                            v-model="filter.end_date"
                            type="date"
                            dense
                            outlined
                                hide-bottom-space
                            class="option-two" />
                        </div>
                        <div class="col" v-if="['DI'].indexOf(role) >= 0">
                            <label for="selectdrop" class="font-normal">Spend Type:</label>
                            <q-select  outlined dense v-model="filter.spend_type" :options="optionspend" hide-bottom-space class="option-three"
                                dropdown-icon="expand_more"
                                id="selectdrop"
                                >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                        No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <div class="col" v-if="['DI'].indexOf(role) >= 0">
                            <label for="selectdrop2" class="font-normal">Status:</label>
                            <q-select  outlined dense v-model="filter.status" :options="optionstatus" hide-bottom-space class="option-three"
                                dropdown-icon="expand_more"
                                id="selectdrop2"
                                >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                        No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>
                        <q-space />
                        <div class="col">
                            <q-btn color="primary" label="Apply" no-caps unelevated class="btn-one q-mr-sm" @click="filtering" :class="reset  ? 'q-mb-sm' : ''"/>
                            <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="reseting" v-if="reset"/>
                        </div>
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
    props:['role'],
    components:{
        'select-dropdown' : defineAsyncComponent(()=> import('components/SelectDropdown'))
    },
    setup(props,{ emit }){
        const reset = ref(false)
        const filter = ref({})
        const optionspend = ['All','RA','FO','OA','PA']
        const optionstatus = ['All','Approve','Klaim','End']

        function filtering(){
            reset.value = true
            emit('onFilter',filter.value)
        }

        function reseting(){
            reset.value = false
            filter.value = {}
            emit('onFilter',filter.value)
        }
        
        return {
            filter,filtering,reseting,reset,optionspend,optionstatus
        }
    },

}
</script>

<style>

</style>