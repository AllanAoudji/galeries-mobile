import * as React from 'react';

import request from '#helpers/request';
import { END_POINT } from '#helpers/constants';

const useFetchGaleriePictures = (frameId: string) => {
    const [fetching, setFetching] = React.useState<boolean>(false);
    const [galeriePictures, setGaleriePictures] = React.useState<
        Store.Models.GaleriePicture[] | undefined
    >(undefined);

    const fetch = React.useCallback(() => {
        request({
            body: {},
            method: 'GET',
            url: END_POINT.FRAMES_GALERIE_PICTURES(frameId),
        }).then((res) => {
            setGaleriePictures(res.data.data.galeriePictures);
        });
    }, []);

    React.useEffect(() => {
        if (!galeriePictures && !fetching) {
            setFetching(true);
            fetch();
        }
    }, [galeriePictures, fetching]);

    return { galeriePictures };
};

export default useFetchGaleriePictures;
