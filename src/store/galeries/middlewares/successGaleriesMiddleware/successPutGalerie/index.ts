import { Dispatch } from 'redux';
import {
    updateGaleriesById,
    updateGaleriesLoadingPut,
} from '#store/galeries/actionCreators';

const successPutGalerie = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    const { allowNotification, description, hasNewFrames, name } =
        action.payload.data;

    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (!galerieId) {
        dispatch(updateGaleriesLoadingPut('ERROR'));
        return;
    }
    const currentGalerie = getState().galeries.byId[galerieId];
    if (!currentGalerie) {
        dispatch(updateGaleriesLoadingPut('ERROR'));
        return;
    }

    if (typeof description === 'string' && typeof name === 'string') {
        dispatch(
            updateGaleriesById({
                ...currentGalerie,
                description,
                name,
            })
        );
    } else if (typeof allowNotification === 'boolean') {
        dispatch(
            updateGaleriesById({
                ...currentGalerie,
                allowNotification,
            })
        );
    } else if (typeof hasNewFrames === 'boolean') {
        dispatch(
            updateGaleriesById({
                ...currentGalerie,
                hasNewFrames,
            })
        );
    }
    dispatch(updateGaleriesLoadingPut('SUCCESS'));
};

export default successPutGalerie;
