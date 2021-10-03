import * as React from 'react';
import { ImageSourcePropType } from 'react-native';

import { Container, ImageStyled, InnerContainer } from './styles';

type Props = {
    id: string;
    onLongPress: (id: string) => void;
    uri: string;
};

const Tile = ({ onLongPress, uri }: Props) => {
    const handleLongPress = React.useCallback(() => onLongPress(uri), [uri]);

    const source: ImageSourcePropType = React.useMemo(() => ({ uri }), [uri]);

    return (
        <Container onLongPress={handleLongPress}>
            <InnerContainer>
                <ImageStyled source={source} />
            </InnerContainer>
        </Container>
    );
};

export default Tile;
