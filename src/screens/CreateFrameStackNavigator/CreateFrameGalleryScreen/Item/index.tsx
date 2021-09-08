import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import { Typography } from '#components';
import { CreateFrameContext } from '#contexts/CreateFrameContext';

import { ImageContainer, ImageStyled, IndexPickerContainer } from './styles';

type Props = {
    uri: string;
};

const Item = ({ uri }: Props) => {
    const dimension = useWindowDimensions();

    const { addPictures, picturesUri, removePictures } =
        React.useContext(CreateFrameContext);

    const isPicked = React.useMemo(
        () => picturesUri.includes(uri),
        [picturesUri]
    );

    const handlePress = React.useCallback(() => {
        if (picturesUri.includes(uri)) removePictures(uri);
        else if (picturesUri.length < 6) addPictures(uri);
    }, [addPictures, picturesUri, removePictures]);

    return (
        <ImageContainer
            onPress={handlePress}
            picked={picturesUri.includes(uri)}
            size={dimension.width / 3}
        >
            <ImageStyled picked={isPicked} source={{ uri }} />
            {isPicked && (
                <IndexPickerContainer>
                    <Typography>{picturesUri.indexOf(uri) + 1}</Typography>
                </IndexPickerContainer>
            )}
        </ImageContainer>
    );
};

export default React.memo(Item);
