import {SET_ORDER,REMOVE_ORDER} from "../actions/orderAction";

const intiialState = null;
const orderReducer = (state = intiialState, action) => {


	switch(action.type){

        case SET_ORDER:{
            let newState = action.payload;
            localStorage.setItem("se_user_order",JSON.stringify(newState));
            return newState;
        }

        case REMOVE_ORDER:{
            localStorage.setItem("se_user_order",JSON.stringify(intiialState));
            return intiialState;
        }


		default:{
            let loadedState = JSON.parse(localStorage.getItem("se_user_order"));
            
            if(loadedState === null){
                localStorage.setItem("se_user_order",JSON.stringify(intiialState));
                return intiialState;
            }
            else {
                return loadedState;
            }
        }
	}
};

export default orderReducer;