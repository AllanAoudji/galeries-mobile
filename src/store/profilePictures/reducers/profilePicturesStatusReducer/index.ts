import { checkIfStatus } from '#store/checkers';
import {
    PROFILE_PICTURES_STATUS_RESET,
    PROFILE_PICTURES_STATUS_UPDATE,
} from '#store/profilePictures/actionTypes';

const initialState: Store.Status = 'PENDING';
const profilePicturesStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_STATUS_RESET:
            return initialState;
        case PROFILE_PICTURES_STATUS_UPDATE:
            if (checkIfStatus(action.payload)) return action.payload;
            return state;
        default:
            return state;
    }
};

export default profilePicturesStatusReducer;
