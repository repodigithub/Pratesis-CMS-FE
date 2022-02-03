export function setOpen(state,data){
    state.upload = true
    state.menu = data
}

export function setClose(state){
    state.upload = false
    state.menu = ''
}