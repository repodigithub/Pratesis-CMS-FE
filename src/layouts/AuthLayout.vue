<template>
    <div class="row justify-center">
        <div class="col-6 bg-auth">
        <q-img
            src="~assets/auth/authbg.png"
            spinner-color="primary"
            spinner-size="82px"
            style="max-height:100vh;"
        />
        </div>
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