import * as React from 'react';
import { ListRenderItem, useWindowDimensions } from 'react-native';

import { useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { CurrentGaleriePictureContext } from '#contexts/CurrentGaleriePictureContext';

import RenderItem from './RenderItem';
import { selectFrameGaleriePicturesAllIds } from '#store/galeriePictures';

type Props = {
    frame: Store.Models.Frame;
};

const ScrollContainer = ({ frame }: Props) => {
    const dimension = useWindowDimensions();

    const { handleScroll } = React.useContext(CurrentGaleriePictureContext);

    const frameGaleriePicturesAllIdsSelector = React.useMemo(
        () => selectFrameGaleriePicturesAllIds(frame.id),
        [frame]
    );
    const frameGaleriePicturesAllIds = useSelector(
        frameGaleriePicturesAllIdsSelector
    );

    const getItemLayout = React.useCallback(
        (_, index) => ({
            length: dimension.width,
            offset: dimension.width * index,
            index,
        }),
        []
    );
    const keyExtractor = React.useCallback((item: string) => item, []);
    const renderItem: ListRenderItem<string> = React.useCallback(
        ({ item }) => <RenderItem galeriePictureId={item} frame={frame} />,
        []
    );

    return (
        <FlatList
            data={frameGaleriePicturesAllIds}
            decelerationRate="fast"
            disableIntervalMomentum
            extraData={frameGaleriePicturesAllIds}
            getItemLayout={getItemLayout}
            horizontal
            initialNumToRender={1}
            keyExtractor={keyExtractor}
            maxToRenderPerBatch={1}
            onScroll={handleScroll}
            overScrollMode="never"
            removeClippedSubviews
            showsHorizontalScrollIndicator={false}
            snapToInterval={dimension.width}
            windowSize={3}
            renderItem={renderItem}
        />
    );
};

export default React.memo(ScrollContainer);
