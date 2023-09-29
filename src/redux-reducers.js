import { CHANGE_IMAGE_FORM_INPUT } from "./redux-constants"


const initialStateImageFormInput = {
    imageFormInput: ''
}

export const reducerImageFormInput = (state=initialStateImageFormInput, action={}) => {
    switch(action.type) {
        case CHANGE_IMAGE_FORM_INPUT:
            return Object.assign({}, state, {imageFormInput: action.payload})
        default: 
            return state;
    }
}