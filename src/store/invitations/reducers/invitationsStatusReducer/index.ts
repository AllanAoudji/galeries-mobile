import { checkIfStatus } from '#store/checkers';
import {
    INVITATIONS_STATUS_RESET,
    INVITATIONS_STATUS_UPDATE,
} from '#store/invitations/actionTypes';

const initialState: { [key: string]: Store.Status } = {};
const invitationStatusReducer = (
    state = initialState,
    action: Store.Action
) => {
    switch (action.type) {
        case INVITATIONS_STATUS_RESET:
            return initialState;
        case INVITATIONS_STATUS_UPDATE:
            if (!checkIfStatus(action.payload)) return state;
            if (!action.meta.query || !action.meta.query.galerieId)
                return state;
            return {
                ...state,
                [action.meta.query.galerieId]: action.payload,
            };
        default:
            return state;
    }
};

export default invitationStatusReducer;
