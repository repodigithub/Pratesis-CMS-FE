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

    const promoTgl = tgl => {
        return date.formatDate(tgl,'DD MMM YYYY')
    }

    const formatTglPromo = tgl => {
        return date.formatDate(tgl,'DD MMM YYYY',{
                months: ['Januari', 'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
                monthsShort: ['Jan', 'Feb', 'Mar','Apr','Mei','Jun','Jul','Agus','Sept','Okt','Nov','Des'],
            })
    }


    return {
        showLoading,
        hideLoading,
        successNotif,
        errorNotif,
        formatTgl,
        promoTgl,
        formatTglPromo
    }
}