import * as React from 'react';
import { ImageSourcePropType, useWindowDimensions } from 'react-native';

import { ImageContainer, ImageStyled, IndexPickerContainer } from './styles';

type Props = {
    handlePress: () => void;
    isPicked: boolean;
    uri: string;
};

const Item = ({ handlePress, isPicked, uri }: Props) => {
    const dimension = useWindowDimensions();
    const source: ImageSourcePropType = React.useMemo(() => ({ uri }), [uri]);

    return (
        <ImageContainer
            onPress={handlePress}
            picked={isPicked}
            size={dimension.width / 3}
        >
            <ImageStyled picked={isPicked} source={source} />
            {isPicked && <IndexPickerContainer />}
        </ImageContainer>
    );
};

export default React.memo(Item);
