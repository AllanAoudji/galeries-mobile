import { checkIfStatus } from '#store/checkers';
import {
    GALERIE_PICTURES_LOADING_PUT_RESET,
    GALERIE_PICTURES_LOADING_PUT_UPDATE,
} from '#store/galeriePictures/actionTypes';

const initialState: Store.Status = 'PENDING';

const galeriePicturesLoadingPutReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_PICTURES_LOADING_PUT_RESET:
            return initialState;
        case GALERIE_PICTURES_LOADING_PUT_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default galeriePicturesLoadingPutReducer;
