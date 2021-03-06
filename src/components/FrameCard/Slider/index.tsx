import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSelector } from 'react-redux';

import { selectFrameGaleriePicturesStatus } from '#store/galeriePictures';

import Dots from './Dots';
import Loader from './Loader';
import ScrollContainer from './ScrollContainer';

import { Container, DotsContainer } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const Slider = ({ frame }: Props) => {
    const dimension = useWindowDimensions();

    const frameGaleriePicturesStatusSelector = React.useCallback(
        () => selectFrameGaleriePicturesStatus(frame.id),
        [frame]
    );
    const status = useSelector(frameGaleriePicturesStatusSelector());

    // TODO:
    // Need content to reload if error

    return (
        <>
            <Container size={dimension.width}>
                {status && status === 'SUCCESS' ? (
                    <ScrollContainer frame={frame} />
                ) : (
                    <Loader />
                )}
            </Container>
            <DotsContainer>
                <Dots frame={frame} />
            </DotsContainer>
        </>
    );
};

export default Slider;
