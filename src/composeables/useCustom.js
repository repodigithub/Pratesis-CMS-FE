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
        return $q.notify({
            message: msg,
            icon:'check',
            type: 'positive',
            position: 'top-right',
            progress: true,
            actions: [
                { label: 'close', color: 'white', handler: () => { /* ... */ } }
            ]
        })
    }
    const errorNotif = msg => {
        $q.notify({
            message: msg,
            icon:'close',
            type: 'negative',
            position: 'top-right',
            progress: true,
            actions: [
                { label: 'close', color: 'white', handler: () => { /* ... */ } }
            ]
        })
    }

    const GeneralFormatDate = (tgl,format) => {
        return date.formatDate(tgl,format,{
            months: ['Januari', 'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
            monthsShort: ['Jan', 'Feb', 'Mar','Apr','Mei','Jun','Jul','Agus','Sept','Okt','Nov','Des'],
        })
    }

    const formatTgl = tgl => {
        return date.formatDate(tgl,'DD/MM/YY')
    }
    const editTglPromo = tgl => {
        return date.formatDate(tgl,'YYYY-MM-DD')
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
    const formatTglPromo2 = tgl => {
        return date.formatDate(tgl,'DD MMMM YYYY',{
                months: ['Januari', 'Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
                monthsShort: ['Jan', 'Feb', 'Mar','Apr','Mei','Jun','Jul','Agus','Sept','Okt','Nov','Des'],
            })
    }

    const colorStatusPromo = value => {
            if(['draft','new_promo'].indexOf(value) >= 0){
                return 'draft'
            }else if(['reject','layak_bayar'].indexOf(value) >= 0){
                return 'reject'
            }else if(value == 'need_approval'){
                return 'need'
            }else if(['approve','claim','sudah_bayar'].indexOf(value) >= 0){
                return 'approve'
            }else if('waiting_approval'){
                return 'waiting'
            }else{
                return ''
            }
    }

    const statusPromo = value =>{
        return value ? value.replace(/_/g," ").replace(/(?:^|\s)\S/g,function(a){ return a.toUpperCase()}) : ''
    }

    const colorStatusSpend = value =>{
            if(value == 'RA'){
                return 'text-blue-7 bg-blue-2'
            }else if(value == 'FO'){
                return 'text-teal-7 bg-teal-2'
            }else if(value == 'OA'){
                return 'text-amber-7 bg-amber-2'
            }else if(value == 'PA'){
                return 'text-purple-7 bg-purple-2'
            }else{
                const arrayColor = ['text-red-7 bg-red-2','text-pink-7 bg-pink-2','text-purple-7 bg-purple-2','text-deep-purple-7 bg-deep-purple-2','text-indigo-7 bg-indigo-2','text-blue-7 bg-blue-2','text-light-blue-7 bg-light-blue-2','text-cyan-7 bg-cyan-2','text-teal-7 bg-teal-2','text-green-7 bg-green-2','text-light-green-7 bg-light-green-2','text-lime-7 bg-lime-2','text-yellow-7 bg-yellow-2','text-amber-7 bg-amber-2','text-orange-7 bg-orange-2','text-deep-orange-7 bg-deep-orange-2','text-brown-7 bg-brown']
                let random = Math.floor(Math.random() * 16)
                return arrayColor[random]
            }
    }


    return {
        showLoading,
        hideLoading,
        successNotif,
        errorNotif,
        formatTgl,
        promoTgl,
        formatTglPromo,formatTglPromo2,
        colorStatusPromo, //styling status promo
        statusPromo, //tulisan status promo
        colorStatusSpend, //styling status spend type
        editTglPromo,
        GeneralFormatDate
    }
}