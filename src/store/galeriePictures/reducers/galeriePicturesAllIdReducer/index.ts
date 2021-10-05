import { checkIfAllIds } from '#store/checkers';
import {
    GALERIE_PICTURES_ALL_ID_RESET,
    GALERIE_PICTURES_ALL_ID_UPDATE,
} from '#store/galeriePictures/actionTypes';

const initialState: { [key: string]: string[] } = {};
const galeriePicturesAllIdsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_PICTURES_ALL_ID_RESET:
            return initialState;
        case GALERIE_PICTURES_ALL_ID_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.frameId ||
                !checkIfAllIds(action.payload)
            )
                return state;
            return {
                ...state,
                [action.meta.query.frameId]: action.payload,
            };
        default:
            return state;
    }
};

export default galeriePicturesAllIdsReducer;
