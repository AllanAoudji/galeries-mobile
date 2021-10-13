import { Dispatch } from 'redux';

import {
    setGaleriesAllIds,
    setGaleriesById,
    updateGaleriesEnd,
    updateGaleriesPrevious,
    updateGaleriesStatusId,
    updateGaleriesStatusName,
} from '#store/galeries/actionCreators';
import { getGalerieCurrentCoverPicture } from '#store/galeriePictures/actionCreators';

const successGetGaleries = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Galerie } = {};
    const { galerie, galeries } = action.payload.data;
    const name = action.meta.query ? action.meta.query.name : undefined;
    if (galeries && Array.isArray(galeries))
        galeries.forEach((g: Store.Models.Galerie) => {
            allIds.push(g.id);
            byId[g.id] = g;
        });
    else if (galerie && typeof galerie === 'object') {
        allIds.push(galerie.id);
        byId[galerie.id] = galerie;
    }
    dispatch(setGaleriesById(byId));
    if (name && allIds.length) {
        const previousGalerieId = allIds[allIds.length - 1];
        const previous = byId[previousGalerieId].hiddenName || '';
        dispatch(setGaleriesAllIds({ allIds }, name));
        dispatch(updateGaleriesEnd(allIds.length < 20, name));
        dispatch(updateGaleriesPrevious(previous, name));
        dispatch(updateGaleriesStatusName('SUCCESS', name));
    }
    allIds.forEach((id) => {
        dispatch(updateGaleriesStatusId('SUCCESS', id));

        const status = getState().galeriePictures.status[id] || 'PENDING';
        if (status === 'PENDING') dispatch(getGalerieCurrentCoverPicture(id));
    });
};

export default successGetGaleries;