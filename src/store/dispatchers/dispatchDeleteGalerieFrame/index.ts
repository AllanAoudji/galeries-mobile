import { Dispatch } from 'redux';

import { updateGaleriesById } from '#store/galeries/actionCreators';

const dispatchDeleteGalerieFrame: (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    frameId: string
) => void = (dispatch, galerie, frameId) => {
    const allIds = galerie.frames ? galerie.frames.allIds : [];
    if (allIds.length) {
        const defaultFrames: typeof galerie.frames = {
            allIds: [],
            end: false,
            status: 'PENDING',
        };
        const newAllIds = allIds.filter((id) => id !== frameId);
        dispatch(
            updateGaleriesById({
                ...galerie,
                frames: {
                    ...(galerie.frames || defaultFrames),
                    allIds: newAllIds,
                },
            })
        );
    }
};

export default dispatchDeleteGalerieFrame;
