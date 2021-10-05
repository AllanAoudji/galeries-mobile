import {
    GALERIE_PICTURES_ID_RESET,
    GALERIE_PICTURES_ID_UPDATE,
} from '#store/galeriePictures/actionTypes';

const initialState: { [key: string]: string } = {};
const galeriePicturesIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_PICTURES_ID_RESET:
            return initialState;
        case GALERIE_PICTURES_ID_UPDATE:
            if (
                !action.meta.query ||
                !action.meta.query.galerieId ||
                typeof action.payload !== 'string'
            )
                return state;
            return {
                ...state,
                [action.meta.query.galerieId]: action.payload,
            };
        default:
            return state;
    }
};

export default galeriePicturesIdReducer;
