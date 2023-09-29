import { CHANGE_IMAGE_FORM_INPUT, 
    CHANGE_IMAGE_URL, 
    CHANGE_FACE_BOX, 
    CHANGE_PAGE_ROUTE, 
    CHANGE_IS_SIGNED} from './redux-constants';

export const actionImageFormInput = (text) => ({
    type: CHANGE_IMAGE_FORM_INPUT,
    payload: text
});