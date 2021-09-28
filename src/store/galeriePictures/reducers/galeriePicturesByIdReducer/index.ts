import {
    GALERIES_PICTURES_BY_ID_RESET,
    GALERIE_PICTURES_BY_ID_SET,
} from '#store/galeriePictures';

const initialState: { [key: string]: Store.Models.GaleriePicture } = {};
const galeriePicturesByIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIES_PICTURES_BY_ID_RESET:
            return initialState;
        case GALERIE_PICTURES_BY_ID_SET:
            if (typeof action.payload === 'object')
                return {
                    ...state,
                    ...action.payload,
                };
            return state;
        default:
            return state;
    }
};

export default galeriePicturesByIdReducer;
