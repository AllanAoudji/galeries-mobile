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
    const { galerie } = action.payload.data;
    if (
        galerie &&
        typeof galerie === 'object' &&
        typeof galerie.id === 'string'
    ) {
        const currentGalerie = getState().galeries.byId[galerie.id];
        if (!currentGalerie) return;

        dispatch(
            updateGaleriesById({
                ...currentGalerie,
                ...galerie,
            })
        );
    }
    dispatch(updateGaleriesLoadingPut('SUCCESS'));
};

export default successPutGalerie;
