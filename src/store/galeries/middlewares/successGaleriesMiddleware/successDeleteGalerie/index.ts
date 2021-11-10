import { Dispatch } from 'redux';
import { resetFrames } from '#store/frames/actionCreators';
import {
    removeGaleriesById,
    resetGaleriesAllIds,
    resetGaleriesCurrent,
    resetGaleriesEnd,
    resetGaleriesFieldsError,
    resetGaleriesPrevious,
    resetGaleriesStatusId,
    resetGaleriesStatusName,
    updateGaleriesLoadingDelete,
} from '#store/galeries/actionCreators';

const successDeleteGalerie = (
    dispatch: Dispatch<Store.Action>,
    action: Store.Action
) => {
    const { galerieId } = action.payload.data;
    if (typeof galerieId === 'string') {
        dispatch(removeGaleriesById(galerieId));
        dispatch(resetGaleriesAllIds());
        dispatch(resetGaleriesCurrent());
        dispatch(resetGaleriesEnd());
        dispatch(resetGaleriesFieldsError());
        dispatch(resetGaleriesPrevious());
        dispatch(resetGaleriesStatusId());
        dispatch(resetGaleriesStatusName());
        dispatch(resetFrames());
    }
    dispatch(updateGaleriesLoadingDelete('SUCCESS'));
};

export default successDeleteGalerie;
