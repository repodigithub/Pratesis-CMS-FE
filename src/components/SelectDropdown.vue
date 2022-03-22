<template>
    <div v-show="isValid">
        <label for="selectdrop" class="font-normal">{{nameLabel}}</label>
        <q-select  outlined dense :modelValue="selected"
            @update:modelValue="event => $emit('update:selected', event)" :options="options" hide-bottom-space :class="master ? 'option-three' : ''"
            emit-value
            map-options
            use-input
            hide-selected
            fill-input
            input-debounce="1000"
            @filter="onFilter"
            :loading="loading"
            dropdown-icon="expand_more"
            @virtual-scroll="onScroll"
            :virtual-scroll-slice-size="2"
            :virtual-scroll-item-size="30"
            id="selectdrop"
            >
            <template v-slot:no-option>
                <q-item>
                    <q-item-section class="text-grey">
                    No results
                    </q-item-section>
                </q-item>
            </template>
        </q-select>
    </div>
</template>

<script>
import { ref,nextTick } from 'vue'
import { useService } from 'src/composeables/useService'
export default {
    name:'select-dropdown',
    props: {
        url: {
            type: String,
        },
        selected: {
            type: String,
        },
        master: {
            type: Boolean,
            default:true
        },
        islogin: {
            type: Boolean,
            default: true
        },
        nameLabel:{
            type:String,
            default:''
        },
        isNormal:{
            type:Boolean,
            default:true
        }
    },
    setup(props){
        const loading = ref(false)
        const options = ref([])
        const { getData } = useService()
        const searchUrl = ref('')
        const searchKey = ref('')
        let response = ''
        const nextPage = ref(null)
        const lastPage = ref(null)
        const optalt = []
        const isValid = ref(false)
        getData(props.url,props.islogin)
        .then(res=>{
            res.data.data.data.forEach((item)=>{
                response = Object.values(item)
                if(props.isNormal){
                    optalt.push({
                        label:response[2],
                        value:response[1],
                    })
                }else{
                    optalt.push({
                        label:response[1],
                        value:response[1],
                    })
                }
            })
            isValid.value = true
            nextPage.value = res.data.data.current_page + 1
            lastPage.value = res.data.data.last_page
        })

        function onFilter(val,update,abort){
            if(val === ''){
                options.value = []
                searchKey.value = ''
                searchUrl.value = ''
                loading.value = true
                update(()=>{
                    options.value = optalt
                    loading.value = false
                })
            }else{
                loading.value = true
                searchKey.value = val.toLowerCase()
                options.value = []
                searchUrl.value = `?search=${searchKey.value}`
                getData(props.url+searchUrl.value,props.islogin)
                .then(res=>{
                    update(()=>{
                        res.data.data.data.forEach((item)=>{
                            response = Object.values(item)
                            if(props.isNormal){
                                options.value.push({
                                    label:response[2],
                                    value:response[1],
                                })
                            }else{
                                options.value.push({
                                    label:response[1],
                                    value:response[1],
                                })
                            }
                        })
                        nextPage.value = res.data.data.current_page + 1
                        lastPage.value = res.data.data.last_page
                        loading.value = false
                    })
                })
            }
        }

        function onScroll({ index,ref }){
            const lastIndex = options.value.length - 1
            if (loading.value !== true && nextPage.value <= lastPage.value && index === lastIndex) {
                loading.value = true
                let localurl = ''
                if(searchUrl.value){
                    localurl = `${props.url}${searchUrl.value}&page=${nextPage.value}`
                }else{
                    localurl = `${props.url}?page=${nextPage.value}`
                }
                getData(localurl,props.islogin)
                .then(res=>{
                    nextTick( () => {
                        res.data.data.data.forEach((item)=>{
                            response = Object.values(item)
                            if(props.isNormal){
                                options.value.push({
                                    label:response[2],
                                    value:response[1],
                                })
                            }else{
                                options.value.push({
                                    label:response[1],
                                    value:response[1],
                                })
                            }
                        })
                        lastPage.value= res.data.data.last_page
                        nextPage.value= res.data.data.current_page + 1
                        ref.refresh()
                        loading.value = false
                    })
                })
            }
        }

        return {
            isValid,
            options,
            loading,
            onFilter,
            onScroll
        }
    }

}
</script>

<style>

</style>