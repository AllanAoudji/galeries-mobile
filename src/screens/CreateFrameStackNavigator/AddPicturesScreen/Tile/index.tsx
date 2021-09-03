import * as React from 'react';
import { Image } from 'react-native';

type Props = {
    onLongPress: () => void;
    id: string;
    uri: string;
};

const Tile = ({ uri }: Props) => {
    return <Image source={{ uri }} />;
};

export default Tile;
