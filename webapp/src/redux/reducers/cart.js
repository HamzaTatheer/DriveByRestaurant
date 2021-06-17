import {ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART} from "../actions/cartAction";

const intiialState = [];
const cartReducer = (state = intiialState, action) => {


	switch(action.type){

        case ADD_TO_CART:{
            let exists = false;
            let newState = state;
            newState = newState.map((obj)=>{
                if(obj.id === action.payload){
                   exists = true; 
                   obj.quantity++;
                }
                return obj;
            });

            if(exists === false){
                newState.push({id:action.payload,quantity:1});
            }
            
            localStorage.setItem("se_user_cart",JSON.stringify(newState));
            return newState;
        }

        case REMOVE_FROM_CART:{
            let newState = [];

            for (let i =0;i<state.length;i++){
                if( state[i].id !== action.payload ){
                    newState.push(state[i]);
                }
                else{
                    if(state[i].quantity > 1){
                        let obj = state[i];
                        obj.quantity -= 1;
                        newState.push(obj);
                    }
                }
            }
            localStorage.setItem("se_user_cart",JSON.stringify(newState));
            return newState;
        }

        case CLEAR_CART:{
            localStorage.setItem("se_user_cart",JSON.stringify(intiialState));
            return intiialState;
        }

		default:{
            let loadedState = JSON.parse(localStorage.getItem("se_user_cart"));
            
            if(loadedState === null){
                localStorage.setItem("se_user_cart",JSON.stringify(intiialState));
                return intiialState;
            }
            else {
                return loadedState;
            }
        }
	}
};

export default cartReducer;