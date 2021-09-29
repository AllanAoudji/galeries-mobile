import * as React from 'react';
import { Image } from 'react-native';
import * as FileSystem from 'expo-file-system';

type Props = {
    height: number;
    id: string;
    uri: string;
    width: number;
};

const CachedImage = ({ height, id, uri, width }: Props) => {
    const [source, setSource] = React.useState<string | null>(null);

    React.useEffect(() => {
        let mounted = true;
        const onMount = async () => {
            const path = `${FileSystem.cacheDirectory}${id}`;
            const image = await FileSystem.getInfoAsync(path);
            if (image.exists && mounted) {
                setSource(image.uri);
            } else {
                const newImage = await FileSystem.downloadAsync(uri, path);
                if (mounted) setSource(newImage.uri);
            }
        };
        onMount();
        return () => {
            mounted = false;
        };
    }, []);

    if (!source) return null;

    return <Image style={{ height, width }} source={{ uri: source }} />;
};

export default CachedImage;
