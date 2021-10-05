import {
    GALERIES_PICTURES_BY_ID_RESET,
    GALERIE_PICTURES_BY_ID_SET,
    GALERIE_PICTURES_BY_ID_UPDATE,
} from '#store/galeriePictures/actionTypes';

const initialState: { [key: string]: Store.Models.GaleriePicture } = {};
const galeriePicturesByIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_PICTURES_BY_ID_RESET:
            return initialState;
        case GALERIE_PICTURES_BY_ID_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        case GALERIE_PICTURES_BY_ID_UPDATE:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                [action.payload.id]: action.payload,
            };
        default:
            return state;
    }
};

export default galeriePicturesByIdReducer;
