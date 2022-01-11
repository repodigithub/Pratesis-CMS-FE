<template>
    <div class="row justify-center">
        <q-img
            src="~assets/auth/authbg.png"
            spinner-color="primary"
            spinner-size="82px"
            class="col-6"
            style="max-height:100vh;"
        />
        <div class="row col-6 justify-center items-center">
            <router-view />
        </div>
    </div>
    
</template>

<script>
export default {

}
</script>

<style>

</style>