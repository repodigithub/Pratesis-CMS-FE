import { ref } from 'vue'
// import {toRefs, ref, reactive} from 'vue'
// import { api,header } from 'boot/axios'
// import { useApi } from './useApi'

export const useRequestDetail = () => {
    // const { pagination,rows,loading,init,onRequest} = useApi()
    const drequest = ref(false)
    const dataDetail = ref({})
    const onDetail = (evt,row,index) => {
        drequest.value = true
        let id = []
        id.push(index)
        dataDetail.value = row
    }
    return { drequest,dataDetail,onDetail }
}