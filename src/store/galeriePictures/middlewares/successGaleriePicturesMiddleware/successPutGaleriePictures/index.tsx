import { Dispatch } from 'redux';
import {
    updateGaleriePicturesById,
    updateGaleriePicturesId,
    updateGaleriePicturesLoadingPut,
} from '#store/galeriePictures';

const successPutGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    action: Store.Action
) => {
    if (
        typeof action.payload !== 'object' &&
        typeof action.payload.data !== 'object'
    )
        return;
    const { galerieId, galeriePictureId, current } = action.payload.data;
    if (
        typeof galerieId !== 'string' ||
        typeof galeriePictureId !== 'string' ||
        typeof current !== 'boolean'
    )
        return;

    const galeriePicture = getState().galeriePictures.byId[galeriePictureId];

    if (galeriePicture) {
        dispatch(
            updateGaleriePicturesById({
                ...galeriePicture,
                current,
            })
        );
        dispatch(
            updateGaleriePicturesId(
                galerieId,
                current ? galeriePictureId : null
            )
        );
    }
    dispatch(updateGaleriePicturesLoadingPut('SUCCESS'));
};

export default successPutGaleriePictures;
