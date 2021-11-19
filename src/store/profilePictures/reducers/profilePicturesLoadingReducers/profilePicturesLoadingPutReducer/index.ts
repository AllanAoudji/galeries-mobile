import { checkIfStatus } from '#store/checkers';
import {
    PROFILE_PICTURES_LOADING_PUT_RESET,
    PROFILE_PICTURES_LOADING_PUT_UPDATE,
} from '#store/profilePictures/actionTypes';

const initialState: Store.Status = 'PENDING';
const profilePicturesLoadingPutReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_LOADING_PUT_RESET:
            return initialState;
        case PROFILE_PICTURES_LOADING_PUT_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default profilePicturesLoadingPutReducer;
