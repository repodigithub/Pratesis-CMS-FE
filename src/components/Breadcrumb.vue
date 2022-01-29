<template>
    <div class="row">
        <q-card flat class="col-12">
            <q-card-section class="q-py-sm">
                <div class="row justify-between">
                    <q-breadcrumbs>
                        <!-- <q-breadcrumbs-el icon="home" to="/" />
                        <q-breadcrumbs-el label="Docs" icon="widgets"  />
                        <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" /> -->
                        <slot name="leftside"></slot>
                    </q-breadcrumbs>
                    <div>
                        <slot name="rightside" ></slot>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>