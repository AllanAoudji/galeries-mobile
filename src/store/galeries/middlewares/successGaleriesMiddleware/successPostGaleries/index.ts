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

const successPostGaleries = (
    dispatch: Dispatch<Store.Action>,
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
};

export default successPostGaleries;
