<template>
    <div class="row">
        <q-checkbox v-model="checklist" :label="product.nama_produk"  dense />
        <q-space />
        <div style="width:268px;">
            <label for="Budget">Budget Produk</label>
            <q-input v-model="budget" type="number"  id="Budget" :bg-color="checklist && manual ? '':'grey4'" :class="checklist && manual ? '' : 'input-disable'" filled dense :disable="checklist && manual ? false : true" >
                <template v-slot:prepend>
                    <div class="font-normal">Rp</div>
                </template>
            </q-input>
        </div>
    </div>
</template>

<script>
import { ref,watch } from 'vue'
export default {
    name:'item-produk',
    setup(props,{emit}){
        const checklist = ref(false)
        const manual = ref(true)

        const budget = ref(0)
        watch(()=>budget.value,val=>{ //update budgetProduk
            emit('update:itemProduct',parseInt(val))
        })
        watch(()=>checklist.value,val=>{ //jika tidak diceklist data budget akan nol
            if (!val) {
                emit('update:budgetProduk',parseInt(0))
                budget.value = 0
            }
            // if (props.aturan === '1') {
            //     emit('updateceklist',{
            //         status : val,
            //         kode_produk : props.product.kode_produk,
            //     })
            // }
        })

        if(props.aturan === '1'){
                manual.value = false
        }else{
            manual.value = true
        }
        watch(()=>props.aturan,val=>{
            if(val === '1'){
                manual.value = false
            }else{
                manual.value = true
            }
            budget.value = 0
        })

        watch(()=>props.product.budget,
        (val) =>{
            budget.value = val
        },
        { deep: true }
        )
        watch(()=>props.product.status,
        (val) =>{
            checklist.value = val
            console.log('status dari comp',val)
        },
        { deep: true }
        )
        
        
        return {
            checklist,
            budget,
            manual
        }
    },
    props:{
        product:{
            type:Object
        },
        itemProduct:{
            type:Number,
            default:0
        },
        aturan:{
            type:String
        },
        nilaiRata:{
            type:Array,
        },
    },
}
</script>

<style>

</style>