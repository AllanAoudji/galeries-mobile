import * as React from 'react';
import { ScrollView, useWindowDimensions } from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';

import Image from './Image';
import {
    selectFrameGaleriePicturesAllIds,
    selectGalerieCoverPictureId,
} from '#store/galeriePictures';
import { selectGalerie } from '#store/galeries';
import { updateFramesCurrent } from '#store/frames';

import CoverPictureBookMark from '#components/CoverPictureBookMark';

import { BookMarkContainer, Container } from './styles';

type Props = {
    frame: Store.Models.Frame;
};

const ScrollContainer = ({ frame }: Props) => {
    const dimension = useWindowDimensions();
    const dispatch = useDispatch();
    const navigation = useNavigation<
        | Screen.DesktopBottomTab.FrameProp
        | Screen.DesktopBottomTab.HomeNavigationProp
    >();

    const { handleScroll } = React.useContext(CurrentGaleriePictureContext);

    const frameGaleriePicturesAllIdsSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frame.id),
        [frame]
    );
    const frameGaleriePicturesAllIds = useSelector(
        frameGaleriePicturesAllIdsSelector
    );
    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);
    const coverPictureIdSelector = React.useMemo(
        () => selectGalerieCoverPictureId(frame.galerieId),
        [frame]
    );
    const coverPictureId = useSelector(coverPictureIdSelector);

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('Frame');
    }, []);

    return (
        <ScrollView
            decelerationRate="fast"
            disableIntervalMomentum={true}
            horizontal
            onScroll={handleScroll}
            overScrollMode="never"
            snapToInterval={dimension.width}
        >
            {(frameGaleriePicturesAllIds || []).map((id) => (
                <Container
                    key={id}
                    onPress={handlePress}
                    size={dimension.width}
                >
                    <Image galeriePictureId={id} key={id} />
                    {galerie && galerie.role !== 'user' && (
                        <BookMarkContainer>
                            <CoverPictureBookMark
                                coverPictureId={coverPictureId}
                                frame={frame}
                                galeriePictureId={id}
                            />
                        </BookMarkContainer>
                    )}
                </Container>
            ))}
        </ScrollView>
    );
};

export default React.memo(ScrollContainer);
