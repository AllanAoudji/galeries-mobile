import {
    GALERIES_ROLES_SET,
    GALERIE_ROLES_RESET,
} from '#store/galerieRoles/actionTypes';

const initialState: { [key: string]: { [key: string]: string } } = {};
const galerieRolesAllIdsReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_ROLES_RESET:
            return initialState;
        case GALERIES_ROLES_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default galerieRolesAllIdsReducer;
