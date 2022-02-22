<template>
    <q-card class="own-card q-mb-lg" flat>
        <q-card-section>
            <div class="row items-end">
                <div :class="resetFilter ? 'col-9' :'col-10'">
                    <div class="font-normal">Pencarian :</div>
                    <div class="row">
                            <q-select v-model="kode" :options="option" dense outlined bg-color="primary" dropdown-icon="expand_more" class="option-one col-3"/>                          
                            <q-input v-model="search" :placeholder="placeholder" dense outlined class="option-two col-9">
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
                <q-btn color="primary" label="Search" no-caps unelevated class="btn-one q-mr-sm" @click="filtering"/>
                <q-btn color="negative" label="Reset" no-caps unelevated class="btn-one" @click="reseting" v-if="resetFilter"/>
            </div>
        </q-card-section>
    </q-card>
</template>

<script>
import { watch,ref } from 'vue'
export default {
    name:'filter-table',
    props:['option','placeholder'],
    setup(props,{ emit }){
        const kode = ref(null)
        const search = ref('')
        const dataFilter = ref({})
        const resetFilter = ref(false)
        let optionDuplicate = []
        optionDuplicate = [...props.option]
        kode.value = optionDuplicate[0]
        
        watch(search, val => {
            dataFilter.value = {
                searchKey : val 
            }
        })

        function filtering(){
            emit('onFiltering',dataFilter.value)
            resetFilter.value = true
        }

        function reseting(){
            emit('onReseting')
            dataFilter.value = null
            search.value = null
            kode.value = optionDuplicate[0]
            resetFilter.value = false
        }

        return {
            kode,
            search,
            dataFilter,
            resetFilter,
            filtering,
            reseting
        }
    }
}
</script>

<style>

</style>