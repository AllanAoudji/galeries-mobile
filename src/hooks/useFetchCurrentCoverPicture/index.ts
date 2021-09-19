import * as React from 'react';
import { useDispatch } from 'react-redux';

import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { setGaleriePictures, setGaleries } from '#store/actions';

const useFetchCurrentCoverPicture = () => {
    const dispatch = useDispatch();

    const getCurrentCoverPicture = React.useCallback(
        (galerie: Store.Models.Galerie) => {
            if (galerie.currentCoverPicture === undefined) {
                request({
                    body: {},
                    method: 'GET',
                    url: END_POINT.GALERIE_COVER_PICTURE(galerie.id),
                }).then((res) => {
                    if (
                        res.data &&
                        res.data.data &&
                        res.data.data.coverPicture &&
                        typeof res.data.data.coverPicture === 'object'
                    ) {
                        const { id } = res.data.data.coverPicture;
                        dispatch(
                            setGaleries({
                                data: {
                                    byId: {
                                        [galerie.id]: {
                                            ...galerie,
                                            currentCoverPicture:
                                                res.data.data.coverPicture,
                                        },
                                    },
                                },
                            })
                        );
                        dispatch(
                            setGaleriePictures({
                                byId: { [id]: res.data.data.coverPicture },
                            })
                        );
                    }
                });
            }
        },
        []
    );

    return { getCurrentCoverPicture };
};

export default useFetchCurrentCoverPicture;
