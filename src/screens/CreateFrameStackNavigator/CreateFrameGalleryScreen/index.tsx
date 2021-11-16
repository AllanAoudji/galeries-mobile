import { useFocusEffect } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';
import { FlatList, ListRenderItem, useWindowDimensions } from 'react-native';

import { BottomLoader } from '#components';
import { useCameraRoll } from '#hooks';

import RenderItem from './RenderItem';

import { Container } from './styles';

const NUM_OF_COLUMNS = 3;

const renderItem: ListRenderItem<MediaLibrary.Asset> = ({ item }) => (
    <RenderItem item={item} numOfColumns={NUM_OF_COLUMNS} />
);

const CreateFrameGalleryScreen = () => {
    const dimension = useWindowDimensions();

    const { getPhotos, loading, photos } = useCameraRoll();

    const [firstLoad, setFirstLoad] = React.useState<boolean>(true);

    const showButtonLoader = React.useMemo(
        () => !firstLoad && loading,
        [firstLoad, loading]
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

    useFocusEffect(
        React.useCallback(() => {
            getPhotos();
        }, [])
    );
    useFocusEffect(
        React.useCallback(() => {
            if (!loading && photos.length) setFirstLoad(false);
        }, [loading, photos])
    );

    return (
        <Container>
            <FlatList
                data={photos}
                extraData={photos}
                getItemLayout={getItemLayout}
                initialNumToRender={25}
                keyExtractor={keyExtractor}
                maxToRenderPerBatch={25}
                numColumns={3}
                onEndReached={getPhotos}
                onEndReachedThreshold={0.2}
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

export default CreateFrameGalleryScreen;
