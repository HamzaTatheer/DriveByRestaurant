import {ADD_TO_CART,REMOVE_FROM_CART} from "../actions/cartAction";

const cartReducer = (state = [], action) => {


	switch(action.type){

        case ADD_TO_CART:{
            let exists = false;
            let newState = state;
            newState = newState.map((obj)=>{
                if(obj.id == action.payload){
                   exists = true; 
                   obj.quantity++;
                }
                return obj;
            });

            if(exists == false){
                newState.push({id:action.payload,quantity:1});
            }

            return newState;
        }

        case REMOVE_FROM_CART:{
            let newState = [];

            for (let i =0;i<state.length;i++){
                if( state[i].id != action.payload ){
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

            return newState;
        }

		default:{
            return state;
        }
	}
};

export default cartReducer;