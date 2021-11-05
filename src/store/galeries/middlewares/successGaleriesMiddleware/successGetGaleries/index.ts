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
import { combineGaleriesAllIds } from '#store/combineAllIds';
import { getGalerieUsers } from '#store/users';

const successGetGaleries = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (typeof action.payload.data !== 'object') return;

    const allIds: string[] = [];
    const byId: { [key: string]: Store.Models.Galerie } = {};
    const { galerie, galeries } = action.payload.data;
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

    const name = action.meta.query ? action.meta.query.name : undefined;
    const previousFrameId =
        allIds.length > 0 ? allIds[allIds.length - 1] : undefined;
    const previous = previousFrameId
        ? byId[previousFrameId].hiddenName
        : undefined;

    if (name !== undefined) {
        if (galerie === undefined) {
            let oldsAllIds: string[];
            if (action.meta.refresh) oldsAllIds = [];
            else oldsAllIds = getState().galeries.allIds[name] || [];
            const newAllIds = combineGaleriesAllIds(
                getState,
                oldsAllIds,
                allIds
            );

            dispatch(setGaleriesAllIds(newAllIds, name));
            dispatch(updateGaleriesEnd(allIds.length < 20, name));
            if (previous) dispatch(updateGaleriesPrevious(previous, name));
        }

        dispatch(updateGaleriesStatusName('SUCCESS', name));
    }

    allIds.forEach((id) => {
        dispatch(updateGaleriesStatusId('SUCCESS', id));

        const coverPictureStatus =
            getState().galeriePictures.status[id] || 'PENDING';
        if (coverPictureStatus === 'PENDING')
            dispatch(getGalerieCurrentCoverPicture(id));

        const usersStatus = getState().users.status[id] || 'PENDING';
        if (usersStatus === 'PENDING') dispatch(getGalerieUsers(id));
    });
};

export default successGetGaleries;
