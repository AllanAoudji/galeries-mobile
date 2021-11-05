import { checkIfStatus } from '#store/checkers';
import {
    GALERIE_ROLES_LOADING_PUT_RESET,
    GALERIE_ROLES_LOADING_PUT_UPDATE,
} from '#store/galerieRoles/actionTypes';

const initialState: Store.Status = 'PENDING';
const galerieRolesLoadingPutReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case GALERIE_ROLES_LOADING_PUT_RESET:
            return initialState;
        case GALERIE_ROLES_LOADING_PUT_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            return action.payload;
        default:
            return state;
    }
};

export default galerieRolesLoadingPutReducer;
