import { useQuasar,date } from 'quasar'
export const useCustom = () => {
    const $q = useQuasar()
    const showLoading = () => {
        $q.loading.show({
            message: 'Data sedang diproses, Mohon tunggu...',
            boxClass: 'bg-grey-2 text-grey-9',
            spinnerColor: 'primary'
        })
    }
    
    const hideLoading = () => {
        $q.loading.hide()
    }

    const successNotif = msg => {
        $q.notify({
            message: msg,
            icon:'check',
            type: 'positive',
            position: 'top-right',
            progress: true
        })
    }
    const errorNotif = msg => {
        $q.notify({
            message: msg,
            icon:'close',
            type: 'negative',
            position: 'top-right',
            progress: true
        })
    }

    const formatTgl = tgl => {
        return date.formatDate(tgl,'DD/MM/YY')
    }

    return {
        showLoading,
        hideLoading,
        successNotif,
        errorNotif,
        formatTgl
    }
}