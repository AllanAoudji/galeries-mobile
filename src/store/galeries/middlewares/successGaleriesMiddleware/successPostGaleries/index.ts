import { Dispatch } from 'redux';

import {
    resetGaleriesAllIds,
    resetGaleriesCurrent,
    resetGaleriesEnd,
    resetGaleriesFieldsError,
    resetGaleriesPrevious,
    resetGaleriesStatusName,
    setGaleriesById,
    updateGaleriesCurrent,
    updateGaleriesLoadingPost,
    updateGaleriesStatusId,
} from '#store/galeries/actionCreators';
import { getGalerieCurrentCoverPicture } from '#store/galeriePictures/actionCreators';
import { getUserId } from '#store/users/actionCreators';

const successPostGaleries = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { galerie } = action.payload.data;
    if (galerie && typeof galerie === 'object') {
        const byId = { [galerie.id]: galerie };
        dispatch(resetGaleriesAllIds());
        dispatch(resetGaleriesCurrent());
        dispatch(resetGaleriesEnd());
        dispatch(resetGaleriesFieldsError());
        dispatch(resetGaleriesPrevious());
        dispatch(resetGaleriesStatusName());
        dispatch(setGaleriesById(byId));
        dispatch(updateGaleriesCurrent(galerie.id));
        dispatch(updateGaleriesStatusId('SUCCESS', galerie.id));
    }
    dispatch(updateGaleriesLoadingPost('SUCCESS'));

    if (galerie) {
        const coverPicture = getState().galeriePictures.id[galerie.id];

        if (coverPicture === undefined)
            dispatch(getGalerieCurrentCoverPicture(galerie.id));

        if (galerie.adminId) {
            const adminId = getState().users.allIds[galerie.adminId];
            if (!adminId) dispatch(getUserId(adminId));
        }
    }
};

export default successPostGaleries;
