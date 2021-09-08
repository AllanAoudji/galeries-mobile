import * as React from 'react';

import { Container, ImageStyled, InnerContainer } from './styles';

type Props = {
    id: string;
    onLongPress: (id: string) => void;
    uri: string;
};

const Tile = ({ onLongPress, uri }: Props) => {
    const handleLongPress = React.useCallback(() => onLongPress(uri), [uri]);

    return (
        <Container onLongPress={handleLongPress}>
            <InnerContainer>
                <ImageStyled source={{ uri }} />
            </InnerContainer>
        </Container>
    );
};

export default Tile;
