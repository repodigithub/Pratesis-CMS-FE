<template>
    <div class="row">
        <q-card flat class="col-12">
            <q-card-section class="q-py-sm">
                <div class="row justify-between items-center">
                    <q-breadcrumbs
                        separator=">"
                    >
                        <!-- <q-breadcrumbs-el icon="home" to="/" />
                        <q-breadcrumbs-el label="Docs" icon="widgets"  />
                        <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
                        <q-breadcrumbs-el :label="$route.name" style="color:#00000073;" v-if="leftside" />
                        <slot name="breadcrumb-content"></slot>
                    </q-breadcrumbs>
                    <div v-if="rightside">
                        <div v-if="upload">
                            <q-btn color="secondary" outline no-caps unelevated class="btn-one q-mr-lg" type="a" :href="'template/'+url" download >
                                <q-icon name="download" style="font-size:15px;"  class="q-mr-sm"/>
                                <div>Download Template</div>
                            </q-btn>
                            <q-btn color="secondary" no-caps unelevated class="btn-one" @click="openNow" >
                                <q-icon name="upload_file" style="font-size:14px;" class="q-mr-sm"/>
                                <div>Upload</div>
                            </q-btn>
                        </div>
                        <slot name="rightside-content"></slot>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    name:'breadcrumb',
    props: {
        rightside: {
            type: Boolean,
            default: true
        },
        url: {
            type: String,
            default: '#'
        },
        leftside:{
            type: Boolean,
            default: true
        },
        upload:{
            type:Boolean,
            default:true
        }
    },
    setup(props,{ emit }){

        function openNow(){
            emit('openModal')
        }
        return {
            openNow
        }
    }
}
</script>

<style>

</style>