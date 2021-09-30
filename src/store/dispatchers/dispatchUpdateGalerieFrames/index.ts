import { Dispatch } from 'redux';

import { updateGaleriesById } from '#store/galeries/actionCreators';
import { combineFramesAllIds } from '#store/combineAllIds';

const dispatchUpdateGalerieFrames = (
    dispatch: Dispatch<Store.Action>,
    getState: () => Store.Reducer,
    galerie: Store.Models.Galerie,
    frames: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    const oldAllIds = galerie.frames ? galerie.frames.allIds : [];
    const newAllIds = frames.allIds || [];
    dispatch(
        updateGaleriesById({
            ...galerie,
            frames: {
                allIds: combineFramesAllIds(getState, oldAllIds, newAllIds),
                end:
                    frames.end || (galerie.frames ? galerie.frames.end : false),
                previous:
                    frames.previous ||
                    (galerie.frames ? galerie.frames.previous : undefined),
                status:
                    frames.status ||
                    (galerie.frames ? galerie.frames.status : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateGalerieFrames;
