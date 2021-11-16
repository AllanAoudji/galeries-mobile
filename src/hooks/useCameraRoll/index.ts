import * as MediaLibrary from 'expo-media-library';
import * as React from 'react';

const useCameraRoll = () => {
    const [after, setAfter] = React.useState<string | null>(null);
    const [hasNextPage, setHasNextPage] = React.useState(true);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [photos, setPhotos] = React.useState<MediaLibrary.Asset[]>([]);

    const mounted = React.useRef(false);

    const getPhotos = React.useCallback(async () => {
        if (!loading) {
            setLoading(true);
            const response = await MediaLibrary.getAssetsAsync({
                first: 60,
                mediaType: ['photo'],
                ...(!!after && { after }),
            });
            if (mounted.current) {
                if (after !== response.endCursor) {
                    setAfter(response.endCursor);
                    setHasNextPage(response.hasNextPage);
                    setPhotos((prevState) => [
                        ...prevState,
                        ...response.assets,
                    ]);
                }
                setLoading(false);
            }
        }
    }, [after, hasNextPage, loading]);

    React.useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    return { getPhotos, loading, photos };
};

export default useCameraRoll;
