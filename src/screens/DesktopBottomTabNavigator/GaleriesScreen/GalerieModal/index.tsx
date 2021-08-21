import * as React from 'react';
import styled from 'styled-components/native';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '#components';
import { END_POINT } from '#helpers/constants';
import request from '#helpers/request';
import { GALERIES, normalizeData } from '#store/actions';
import { galerieSelector } from '#store/selectors';

const Footer = styled.View`
    flex: 1;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;
const CoverPicture = styled.View`
    height: 180px;
    background-color: ${({ theme }) => theme.colors.primary};
`;
const Container = styled.Pressable`
    height: 249px;
    padding-bottom: ${({ theme }) => theme.spacings.small};
`;

type Props = {
    handlePress: () => void;
    id: string;
    removeGalerie: (id: string) => void;
};

const GalerieModal = ({ handlePress, id, removeGalerie }: Props) => {
    const dispatch = useDispatch();
    const galerie = useSelector(galerieSelector(id));

    React.useEffect(() => {
        if (!galerie) {
            request({
                body: {},
                method: 'GET',
                url: END_POINT.GALERIE(id),
            })
                .then((res) => {
                    if (res.data.data && res.data.data.galerie) {
                        dispatch(
                            normalizeData({
                                data: {
                                    ...res.data.data.galerie,
                                    frames: [],
                                    users: [],
                                },
                                meta: {
                                    entity: GALERIES,
                                },
                            })
                        );
                    } else {
                        removeGalerie(id);
                    }
                })
                .catch(() => removeGalerie(id));
        } else {
            // if (galerie.numOfUsers) {
            //     request({
            //         body: {},
            //         method: 'GET',
            //         url: END_POINT.GALERIE_USERS(id),
            //     }).then(() => {
            //         // TODO:
            //         // Set galeriesUser
            //     });
            // }
            // if (galerie.currentCoverPicture === undefined) {
            //     request({
            //         body: {},
            //         method: 'GET',
            //         url: END_POINT.GALERIE_COVER_PICTURE(id),
            //     }).then((res) => {
            //         if (
            //             res.data.data &&
            //             res.data.data.coverPicture !== undefined
            //         ) {
            //             dispatch(
            //                 normalizeData({
            //                     data: {
            //                         ...galerie,
            //                         id,
            //                         currentCoverPicture:
            //                             res.data.data.coverPicture,
            //                         frames: [
            //                             ...galerie.frames,
            //                             res.data.data.coverPicture || undefined,
            //                         ],
            //                     },
            //                     meta: {
            //                         entity: GALERIES,
            //                     },
            //                 })
            //             );
            //         }
            //     });
            // }
        }
    }, [galerie]);

    return (
        <Container onPress={handlePress}>
            <CoverPicture>
                <Typography>
                    {/* {galerie && galerie.currentCoverPicture !== undefined
                        ? 'cover picture loaded'
                        : 'loading coverPicture'} */}
                    {id}
                </Typography>
            </CoverPicture>
            <Footer>
                <Typography fontSize={18} textAlign="right">
                    {galerie ? galerie.name : 'galerie not found'}
                </Typography>
            </Footer>
        </Container>
    );
};

export default React.memo(GalerieModal);
