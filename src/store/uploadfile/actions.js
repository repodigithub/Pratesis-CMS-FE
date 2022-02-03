export function openModal(context,payload){
    context.commit('setOpen',payload)
}

export function closeModal(context){
    context.commit('setClose')
}