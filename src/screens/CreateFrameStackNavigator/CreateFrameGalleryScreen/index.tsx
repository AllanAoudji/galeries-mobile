import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import { ListRenderItem, StyleProp, StyleSheet, ViewStyle } from 'react-native';

import {
    AnimatedFlatList,
    BottomLoader,
    CustomButton,
    DefaultHeader,
    Typography,
} from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useCameraRoll, useHideHeaderOnScroll } from '#hooks';

import {
    AddPicturesButtonContainer,
    ButtonContainer,
    Container,
    Header,
} from './styles';

import RenderItem from './RenderItem';

type Props = {
    navigation: Screen.CreateFrameStack.CreateFrameCameraNavigationProp;
};

const renderItem: ListRenderItem<MediaLibrary.Asset> = ({ item }) => (
    <RenderItem item={item} />
);

const CreateFrameGalleryScreen = ({ navigation }: Props) => {
    const { picturesUri } = React.useContext(CreateFrameContext);

    const { getPhotos, loading, photos } = useCameraRoll();
    const { containerStyle, headerStyle, scrollHandler } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT);

    const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

    const CustomButtonVariant = React.useMemo(
        () => (!picturesUri.length ? 'stroke' : 'fill'),
        [picturesUri]
    );
    const showButtonLoader = React.useMemo(
        () => !firstLoad && loading,
        [firstLoad, loading]
    );

    const handlePressAddPictures = React.useCallback(
        () => navigation.navigate('AddPictures'),
        [navigation]
    );
    const keyExtractor = React.useCallback(
        (item: MediaLibrary.Asset) => item.uri,
        []
    );

    React.useEffect(() => {
        getPhotos();
    }, []);
    React.useEffect(() => {
        if (!loading && photos.length) setFirstLoad(false);
    }, [loading, photos]);

    return (
        <Container>
            <Header style={containerStyle}>
                <DefaultHeader style={headerStyle} variant="secondary" />
                <AddPicturesButtonContainer>
                    <ButtonContainer>
                        <CustomButton
                            disable={!picturesUri.length}
                            onPress={handlePressAddPictures}
                            small
                            title="add pictures"
                            variant={CustomButtonVariant}
                        />
                    </ButtonContainer>
                    <Typography fontFamily="bold" fontSize={14}>
                        {picturesUri.length}/6 pictures selected
                    </Typography>
                </AddPicturesButtonContainer>
            </Header>
            <AnimatedFlatList
                contentContainerStyle={style().animatedFlatListContentContainer}
                data={photos}
                extraData={photos}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={30}
                numColumns={3}
                onEndReached={getPhotos}
                onEndReachedThreshold={0.2}
                onScroll={scrollHandler}
                removeClippedSubviews={true}
                renderItem={renderItem}
                scrollEventThrottle={4}
                showsVerticalScrollIndicator={false}
            />
            <BottomLoader show={showButtonLoader} />
        </Container>
    );
};

const style: () => {
    animatedFlatListContentContainer: StyleProp<ViewStyle>;
} = StyleSheet.create(() => ({
    animatedFlatListContentContainer: {
        paddingTop:
            GLOBAL_STYLE.HEADER_TAB_HEIGHT + GLOBAL_STYLE.FRAME_GALLERY_HEADER,
    },
}));

export default CreateFrameGalleryScreen;
