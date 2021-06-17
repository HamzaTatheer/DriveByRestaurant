export const SET_ORDER = "SET_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";

export const setOrder = (id)=>{

    return {
        type: SET_ORDER,
        payload:id
    }
}


export const removeOrder = (item_id)=>{
    return {
        type:REMOVE_ORDER,
        payload:null,
    }
}