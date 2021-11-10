import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

import { CreateFrameContext } from '#contexts/CreateFrameContext';

import Item from './Item';

type Props = {
    item: MediaLibrary.Asset;
    numOfColumns: number;
};

const RenderItem = ({ item }: Props) => {
    const { addPictures, picturesUri, removePictures } =
        React.useContext(CreateFrameContext);

    const isPicked = React.useMemo(
        () => picturesUri.includes(item.uri),
        [picturesUri]
    );

    const handlePress = React.useCallback(() => {
        if (picturesUri.includes(item.uri)) removePictures(item.uri);
        else if (picturesUri.length < 6) addPictures(item.uri);
    }, [addPictures, item, picturesUri, removePictures]);

    return (
        <Item handlePress={handlePress} isPicked={isPicked} uri={item.uri} />
    );
};

export default React.memo(RenderItem);
