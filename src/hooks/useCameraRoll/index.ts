import * as React from 'react';
import * as MediaLibrary from 'expo-media-library';

const useCameraRoll = () => {
    const [after, setAfter] = React.useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [photos, setPhotos] = React.useState<MediaLibrary.Asset[]>([]);

    const getPhotos = React.useCallback(async () => {
        if (!loading) {
            setLoading(true);
            const response = await MediaLibrary.getAssetsAsync({
                first: 30,
                mediaType: ['photo'],
                ...(!!after && { after }),
            });
            if (after !== response.endCursor) {
                setAfter(response.endCursor);
                setHasNextPage(response.hasNextPage);
                setPhotos((prevState) => [...prevState, ...response.assets]);
            }
            setLoading(false);
        }
    }, [after, hasNextPage, loading]);

    return { getPhotos, loading, photos };
};

export default useCameraRoll;
