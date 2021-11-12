import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import {
    FlatList,
    ListRenderItem,
    StyleProp,
    StyleSheet,
    useWindowDimensions,
    ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {
    BottomLoader,
    CustomButton,
    DefaultHeader,
    Typography,
} from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';
import { GLOBAL_STYLE } from '#helpers/constants';
import { useCameraRoll, useHideHeaderOnScroll } from '#hooks';

import RenderItem from './RenderItem';

import {
    AddPicturesButtonContainer,
    ButtonContainer,
    Container,
    Header,
} from './styles';

type Props = {
    navigation: Screen.CreateFrameStack.CreateFrameCameraNavigationProp;
};

const NUM_OF_COLUMNS = 3;

const AnimatedFlatList = Animated.createAnimatedComponent<any>(FlatList);
const renderItem: ListRenderItem<MediaLibrary.Asset> = ({ item }) => (
    <RenderItem item={item} numOfColumns={NUM_OF_COLUMNS} />
);

const CreateFrameGalleryScreen = ({ navigation }: Props) => {
    const dimension = useWindowDimensions();

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
    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: dimension.width / 3,
            offset: (dimension.width / 3) * index,
            index,
        }),
        []
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
                getItemLayout={getItemLayout}
                initialNumToRender={25}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={25}
                numColumns={3}
                onEndReached={getPhotos}
                onEndReachedThreshold={0.2}
                onScroll={scrollHandler}
                removeClippedSubviews={true}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                updateCellsBatchingPeriod={1}
                windowSize={31}
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
