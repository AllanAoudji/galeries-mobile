import { Dispatch } from 'redux';

import {
    setGalerieRolesById,
    updateGalerieRolesLoadingPut,
} from '#store/galerieRoles/actionCreators';

const successPutGalerieRole = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;
    const { galerieId, role, userId } = action.payload.data;
    if (typeof galerieId !== 'string') return;
    if (typeof userId !== 'string') return;
    if (role !== 'user' && role !== 'admin' && role !== 'moderator') return;

    const galerieRole = getState().galerieRoles.byId[galerieId] || {};
    const newGalerieRole = { ...galerieRole, [userId]: role };

    dispatch(setGalerieRolesById(galerieId, newGalerieRole));
    dispatch(updateGalerieRolesLoadingPut('SUCCESS'));
};

export default successPutGalerieRole;
