import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import {
    AnimatedFlatList,
    BottomLoader,
    CustomButton,
    DefaultHeader,
    Typography,
} from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useCameraRoll, useComponentSize, useHideHeaderOnScroll } from '#hooks';

import {
    AddPicturesButtonContainer,
    ButtonContainer,
    Container,
    Header,
} from './styles';

import Item from './Item';

type Props = {
    navigation: Screen.CreateFrameStack.CreateFrameCameraNavigationProp;
};

const CreateFrameGalleryScreen = ({ navigation }: Props) => {
    const { picturesUri } = React.useContext(CreateFrameContext);

    const { getPhotos, loading, photos } = useCameraRoll();
    const { containerStyle, headerStyle, scrollHandler } =
        useHideHeaderOnScroll(GLOBAL_STYLE.HEADER_TAB_HEIGHT, true);
    const { onLayout, size } = useComponentSize();

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
    const renderItem = React.useCallback(
        ({ item }) => <Item uri={item.uri} />,
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
            <Header onLayout={onLayout} style={containerStyle}>
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
                contentContainerStyle={
                    style({ size }).animatedFlatListContentContainer
                }
                data={photos}
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

const style: ({
    size,
}: {
    size: {
        height: number;
        width: number;
    } | null;
}) => {
    animatedFlatListContentContainer: StyleProp<ViewStyle>;
} = StyleSheet.create(({ size }) => ({
    animatedFlatListContentContainer: {
        paddingTop: size ? size.height : 0,
    },
}));

export default CreateFrameGalleryScreen;
