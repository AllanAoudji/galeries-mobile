import {
    GALERIE_ROLES_BY_ID_RESET,
    GALERIE_ROLES_BY_ID_SET,
} from '#store/galerieRoles/actionTypes';

const initialState: { [key: string]: { [key: string]: string } } = {};
const galerieRolesByIdReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_ROLES_BY_ID_RESET:
            return initialState;
        case GALERIE_ROLES_BY_ID_SET:
            if (typeof action.payload !== 'object') return state;
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default galerieRolesByIdReducer;
