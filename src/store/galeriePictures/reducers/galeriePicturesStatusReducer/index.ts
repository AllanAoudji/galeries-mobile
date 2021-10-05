import { checkIfStatus } from '#store/checkers';
import {
    GALERIE_PICTURES_STATUS_RESET,
    GALERIE_PICTURES_STATUS_UPDATE,
} from '#store/galeriePictures/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const galeriePicturesStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_PICTURES_STATUS_RESET:
            return initialState;
        case GALERIE_PICTURES_STATUS_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.modelId ||
                !checkIfStatus(action.payload)
            )
                return state;
            return {
                ...state,
                [action.meta.query.modelId]: action.payload,
            };
        default:
            return state;
    }
};

export default galeriePicturesStatusReducer;
