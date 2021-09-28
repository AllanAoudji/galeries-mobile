import { Dispatch } from 'redux';
import { updateGaleriesById } from '#store/galeries';

const dispatchUpdateGalerieFrames = (
    dispatch: Dispatch<Store.Action>,
    galerie: Store.Models.Galerie,
    frames: {
        allIds?: string[];
        end?: boolean;
        previous?: string;
        status?: Store.Status;
    }
) => {
    dispatch(
        updateGaleriesById({
            ...galerie,
            frames: {
                allIds: [
                    ...(galerie.frames ? galerie.frames.allIds : []),
                    ...(frames.allIds || []),
                ],
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
