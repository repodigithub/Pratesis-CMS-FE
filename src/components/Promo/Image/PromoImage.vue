<template>
    <div class="col-12 q-mb-md">
        <q-card class="own-card">
            <q-card-section class="q-pb-none" style="padding-left:20px;padding-right:20px;">
                <div class="text-h6">Image Promo</div>
                <div class="row" style="margin-top:20px;margin-bottom:54px;max-width:1500px;max-height:180px;overflow-x:auto;">
                    <div style="width:180px;height:180px;background: #F7FAFE;border: 1px solid #D4DEEC;margin-right:20px;" v-for="n in 10" :key="n" class="row items-center justify-center">
                        <div style="width:80px;height:80px;border: 1px dashed #B7C4D6;border-radius: 5px;" class="row items-center justify-center">
                            <q-img
                                src="~assets/icon/image-polaroid.svg"
                                spinner-color="primary"
                                spinner-size="5px"
                                width="24px"
                                height="24px"
                            />
                        </div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div>
</template>

<script>
export default {
    name:'promo-image',
}
</script>

<style>

</style>