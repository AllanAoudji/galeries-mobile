import { Dispatch } from 'redux';

import { updateFramesById } from '#store/frames/actionCreators';

const dispatchUpdateFrameGaleriePictures = (
    dispatch: Dispatch<Store.Action>,
    frame: Store.Models.Frame,
    galeriePictures: {
        allIds?: string[];
        status?: Store.Status;
    }
) => {
    dispatch(
        updateFramesById({
            ...frame,
            galeriePictures: {
                allIds: [
                    ...(frame.galeriePictures
                        ? frame.galeriePictures.allIds
                        : []),
                    ...(galeriePictures.allIds || []),
                ],
                status:
                    galeriePictures.status ||
                    (frame.galeriePictures
                        ? frame.galeriePictures.status
                        : 'PENDING'),
            },
        })
    );
};

export default dispatchUpdateFrameGaleriePictures;
