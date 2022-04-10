export function setLogin(state,data){
    state.token = data.token
    state.user = {
        full_name : data.full_name,
        kode_group : data.kode_group,
        kode_area : data.kode_area,
        kode_distributor : data.kode_distributor
    }
}

export function setLogout(state){
    state.user = ''
    state.token = ''
}

export function saveUser(state,data){
    state.user = {
        full_name : data.full_name,
        kode_group : data.kode_group
    }
}

export function changeRole(state,data){
    state.role = data
}