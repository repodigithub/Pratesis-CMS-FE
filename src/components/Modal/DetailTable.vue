<template>
    <q-dialog :model-value="modalDetail" @click="$emit('update:modalDetail', $event.target.value)" @hide="$emit('update:modalDetail',false)" full-height position="right" class="dialog-detail">
        <q-card style="width:400px;height:100%;">
            <q-form
            @submit.prevent.stop="onSave" ref="form"
                style="width:400px;height:100%;">
            <div class="data-detail">
                <q-card-section class="row items-start q-pb-none">
                    <div class="text-h6">{{$route.name}} Detail</div>
                    <q-space />
                    <q-btn icon="close" flat round dense v-close-popup />
                </q-card-section>
                <q-scroll-area class="fit">
                    <q-card-section class="q-pb-none">
                        <slot name="detail-content" :tampil="dataModal" :send="dataModal" :edit="edit"/>
                    </q-card-section>
                </q-scroll-area>
                <q-card-section class="row items-center " v-if="canEdit">
                    <q-btn color="primary" icon="edit" label="Edit" no-caps unelevated class="q-px-sm btn-one" outline v-if="!edit" @click="onEdit" />
                    <q-btn color="primary" icon="save" label="Simpan" no-caps unelevated class="q-px-sm btn-one" outline v-else type="submit"/>
                </q-card-section>
            </div>
            </q-form>
        </q-card>
    </q-dialog>
</template>

<script>
import { onMounted,ref } from 'vue'
import {  useRoute } from 'vue-router'
import { useService } from 'src/composeables/useService'
import { useCustom } from 'src/composeables/useCustom'
export default {
    name:'detail-table',
    props:{
        modalDetail: {
            type: Boolean,
        },
        dataDetail: {
            type: Object,
        },
        canEdit:{
            type:Boolean,
            default:true
        }
    },
    setup(props, { emit }){
        const { putData } = useService()
        const { showLoading,hideLoading,successNotif } = useCustom()

        const form = ref(null)
        const dataModal = ref({})
        const route = useRoute()

        const edit = ref(false)

        function onEdit(){
            edit.value = true
        }
        
        function onSave(){
            form.value.validate()
            .then(valid=>{
                if(valid){
                    showLoading()
                    putData(`${route.path.substr(1)}/${dataModal.value.id}`,dataModal.value)
                    .then(()=>{
                        hideLoading()
                        successNotif(`Data ${route.name} berhasil diperbarui`)
                        emit('update:modalDetail',false)
                        emit('reloadTable',{
                            pagination : {
                                page : 1
                            }
                        })
                    })
                    .catch(()=>{
                        hideLoading()
                    })
                }
            })
        }

        onMounted(()=>{
            dataModal.value = {
                ...props.dataDetail
            }
            console.log("dataModal",dataModal.value)
        })

        return {
            edit,
            dataModal,
            form,

            onEdit,
            onSave,
            successNotif
        }
    },
}
</script>

<style>

</style>