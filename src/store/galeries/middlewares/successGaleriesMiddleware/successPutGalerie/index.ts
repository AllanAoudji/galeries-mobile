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
    const { allowNotification, description, name } = action.payload.data;
    console.log(action);

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
    }
    dispatch(updateGaleriesLoadingPut('SUCCESS'));
};

export default successPutGalerie;
