export function setLogin(state,data){
    state.token = data.token
}

export function setLogout(state){
    state.token = ''
}
