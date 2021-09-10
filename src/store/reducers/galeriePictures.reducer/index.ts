import { GALERIE_PICTURES_SET } from '#store/actions';

const initialState: {
    byId: { [key: string]: Store.Models.GaleriePicture };
} = {
    byId: {},
};

export default (state = initialState, action: Store.Action) => {
    switch (action.type) {
        case GALERIE_PICTURES_SET: {
            const byId = {
                ...state.byId,
                ...(action.payload.data.byId || {}),
            };
            return {
                ...state,
                byId,
            };
        }
        default:
            return state;
    }
};
