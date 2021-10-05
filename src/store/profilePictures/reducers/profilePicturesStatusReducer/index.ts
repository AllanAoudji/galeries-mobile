import { checkIfStatus } from '#store/checkers';
import {
    PROFILE_PICTURES_STATUS_RESET,
    PROFILE_PICTURES_STATUS_UPDATE,
} from '#store/profilePictures/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const profilePicturesStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case PROFILE_PICTURES_STATUS_RESET:
            return initialState;
        case PROFILE_PICTURES_STATUS_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.userId ||
                !checkIfStatus(action.payload)
            )
                return state;
            return {
                ...state,
                [action.meta.query.userId]: action.payload,
            };
        default:
            return state;
    }
};

export default profilePicturesStatusReducer;
