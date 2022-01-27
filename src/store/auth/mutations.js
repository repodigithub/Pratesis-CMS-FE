export function setLogin(state,data){
    state.token = data.token
    state.user = data
}

export function setLogout(state){
    state.user = ''
    state.token = ''
}