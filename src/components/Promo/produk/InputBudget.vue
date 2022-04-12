<template>
    <div style="width:268px;">
        <label for="Budget">Budget Produk</label>
        <q-input
            :model-value="budget"
            @update:model-value="updateBudget"
            type="text"
            id="Budget"
            filled
            dense
            :bg-color="status && ismanual ? '':'grey4'" 
            :class="status && ismanual ? '' : 'input-disable'"
            :disable="status && ismanual ? false : true"
            >
            <template v-slot:prepend>
                <div class="font-normal">Rp</div>
            </template>
        </q-input>
    </div>
</template>

<script>
import { usePratesis } from 'src/composeables/usePratesis'
export default {
    props:['budget','status','ismanual'],
    setup(props,{ emit }){
        const { formatRibuan } = usePratesis()
        function updateBudget(value){
            let result = formatRibuan(String(value).replaceAll('.',''))
            emit('update:budget',result)
        }
        return {
            updateBudget
        }
    }
}
</script>

<style>

</style>