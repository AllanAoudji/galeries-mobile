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
    const { galerie, allowNotification } = action.payload.data;

    const galerieId = action.meta.query
        ? action.meta.query.galerieId
        : undefined;

    if (!galerieId) {
        dispatch(updateGaleriesLoadingPut('SUCCESS'));
        return;
    }
    const currentGalerie = getState().galeries.byId[galerieId];
    if (!currentGalerie) {
        dispatch(updateGaleriesLoadingPut('SUCCESS'));
        return;
    }

    if (galerie && typeof galerie === 'object') {
        dispatch(
            updateGaleriesById({
                ...currentGalerie,
                ...galerie,
            })
        );
    } else if (typeof allowNotification === 'boolean') {
        dispatch(
            updateGaleriesById({
                ...currentGalerie,
                allowNotification,
            })
        );
    }
    dispatch(updateGaleriesLoadingPut('SUCCESS'));
};

export default successPutGalerie;
