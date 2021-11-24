import { Dispatch } from 'redux';

import {
    updateGaleriesStatusId,
    resetGaleries,
} from '#store/galeries/actionCreators';

const errorGetMethod = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const name = action.meta.query ? action.meta.query.name : undefined;
    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (name) dispatch(updateGaleriesStatusId('ERROR', name));
    if (galerieId) dispatch(resetGaleries());
};

export default errorGetMethod;
