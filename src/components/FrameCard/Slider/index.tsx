import * as React from 'react';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components';
import { useSelector } from 'react-redux';
import {
    selectFrameGaleriePicturesAllIds,
    selectFrameGaleriePicturesStatus,
} from '#store/galeriePictures';
import { UserGalerieRoleContext } from '#contexts/UserGalerieRoleContext';

import Dots from './Dots';
import ScrollContainer from './ScrollContainer';

import { ActivityIndicatorContainer, Container, DotsContainer } from './styles';

type Props = {
    frame: Store.Models.Frame;
    onPressSlider: () => void;
};

const Slider = ({ frame, onPressSlider }: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const { getGalerie, role } = React.useContext(UserGalerieRoleContext);

    const frameGaleriePicturesAllIdsSelector = React.useCallback(
        () => selectFrameGaleriePicturesAllIds(frame.id),
        [frame]
    );
    const galeriePictures = useSelector(frameGaleriePicturesAllIdsSelector());
    const frameGaleriePicturesStatusSelector = React.useCallback(
        () => selectFrameGaleriePicturesStatus(frame.id),
        [frame]
    );
    const status = useSelector(frameGaleriePicturesStatusSelector());

    const galeriePicturesAreLoading = React.useMemo(
        () =>
            galeriePictures &&
            (!status || status === 'PENDING' || status.includes('LOADING')),
        [status]
    );

    React.useEffect(() => {
        if (!role) getGalerie(frame.galerieId);
    }, [frame, role]);

    return (
        <>
            <Container size={dimension.width}>
                {galeriePictures && !galeriePicturesAreLoading ? (
                    <ScrollContainer
                        allIds={galeriePictures}
                        frame={frame}
                        onPressSlider={onPressSlider}
                    />
                ) : (
                    <ActivityIndicatorContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            style={{ transform: [{ scale: 2 }] }}
                        />
                    </ActivityIndicatorContainer>
                )}
            </Container>
            <DotsContainer>
                {!!galeriePictures && <Dots allIds={galeriePictures} />}
            </DotsContainer>
        </>
    );
};

export default Slider;
