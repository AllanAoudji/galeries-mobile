import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

import { CreateProfilePictureContext } from '#contexts/CreateProfilePictureContext';

import Item from './Item';

type Props = {
    item: MediaLibrary.Asset;
    numOfColumns: number;
};

const RenderItem = ({ item }: Props) => {
    const { setPicture, removePicture, pictureUri } = React.useContext(
        CreateProfilePictureContext
    );

    const isPicked = React.useMemo(
        () => item.uri === pictureUri,
        [item, pictureUri]
    );

    const handlePress = React.useCallback(() => {
        if (pictureUri === item.uri) {
            removePicture();
        } else setPicture(item.uri);
    }, [setPicture, item, pictureUri, removePicture]);

    return (
        <Item handlePress={handlePress} isPicked={isPicked} uri={item.uri} />
    );
};

export default React.memo(RenderItem);
