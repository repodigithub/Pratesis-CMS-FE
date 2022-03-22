<template>
  <q-dialog :model-value="modalAdd" @hide="$emit('update:modalAdd',false)">
        <q-card style="width:460px;">
            <q-form
            @submit.prevent.stop="onSave" ref="form"
                style="width:460px;">
            <q-card-section class="row items-center q-pb-none">
                    <div class="text-h6" v-if="titleNormal">Add New {{$route.name}}</div>
                    <slot name="title-content" v-else/>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
            </q-card-section>

            <q-card-section class="q-pb-none">
                <slot name="add-content" :send="dataSend"/>
            </q-card-section>
            <!-- <q-card-section class="q-pb-none" v-for="(value,name) in dataForm" :key="name">
                <label>{{value}}</label>
                <q-input v-model="dataSend[name]" type="text" outlined dense :rules="generalRule" lazy-rules hide-bottom-space/>
            </q-card-section> -->

            <q-card-actions align="between" class="q-my-md q-mx-sm">
                <q-btn color="secondary" label="Batal"  no-caps unelevated outline v-close-popup class="btn-one"/>
                <q-btn color="secondary" label="Submit" no-caps unelevated class="btn-one" type="submit"/>
            </q-card-actions>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
// import { ref } from 'vue'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
import {  useRoute } from 'vue-router'
export default {
    name:'add-data',
    props:{
        modalAdd:{
            type:Boolean
        },
        normal:{
            type:Boolean,
            default:true
        },
        titleNormal:{
            type:Boolean,
            default:true
        }
    },
    setup(props,{ emit }){
        // const generalRule = ref([])
        // generalRule.value.push(
        //     val => isEmpty(val),
        // )
        // function isEmpty(val){
        //     return (val && val.length > 0) || 'Field tidak boleh kosong'
        // }

        const { showLoading,hideLoading,successNotif } = useCustom()
        const { postData,form,dataSend } =  useService()
        const route = useRoute()

        function onSave(){
            form.value.validate()
            .then(valid=>{
                if(valid){
                    if (props.normal) {
                        showLoading()
                        postData(route.path.substr(1),dataSend.value)
                        .then(()=>{
                            hideLoading()
                            successNotif(`Data ${route.name} berhasil ditambahkan`)
                            emit('update:modalAdd',false)
                            emit('reloadTable',{
                                pagination : {
                                    page : 1
                                }
                            })
                        })
                    }else{
                        emit('onSubmitAdd')
                    }
                }
            })
        }

        return {
            form,
            dataSend,
            onSave,
            
            successNotif,showLoading,hideLoading
            // generalRule,
            // isEmpty,

        }
    },
}
</script>

<style>

</style>