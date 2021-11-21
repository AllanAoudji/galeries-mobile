import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import Typography from '#components/Typography';
import convertPixelToNum from '#helpers/convertPixelToNum';

import {
    ActivityIndicatorContainer,
    ActivityIndicatorStyled,
    Container,
    ErrorContainer,
    ImageContainer,
    LoadingContainer,
    StyledImage,
} from './styles';

type Props = {
    containerOuterSize: number;
    containerStyle: {
        backgroundColor: string | number;
        bottom: number;
        opacity: number;
        transform: { scale: number }[];
        width: number;
    };
    errorText: string;
    imageContainerStyle: {
        transform: { rotate: string }[];
    };
    imageSize: number;
    loading: Store.Status;
    onPress: () => void;
    pictureUri?: string | null;
};

const ImageLoader = ({
    containerOuterSize,
    containerStyle,
    errorText,
    imageContainerStyle,
    imageSize,
    loading,
    onPress,
    pictureUri,
}: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const errorHeight = React.useMemo(
        () =>
            dimension.width -
            (convertPixelToNum(theme.spacings.normal) -
                containerOuterSize / 2) *
                2,
        [containerOuterSize, dimension, theme]
    );
    const source = React.useMemo(
        () => ({ uri: pictureUri || '' }),
        [pictureUri]
    );

    return (
        <Container
            containerOuterSize={containerOuterSize}
            imageSize={imageSize}
            style={containerStyle}
        >
            <LoadingContainer imageSize={imageSize}>
                <ImageContainer
                    imageSize={imageSize}
                    style={imageContainerStyle}
                >
                    {!!pictureUri && (
                        <StyledImage imageSize={imageSize} source={source} />
                    )}
                </ImageContainer>
                {loading !== 'ERROR' && (
                    <ActivityIndicatorContainer imageSize={imageSize}>
                        <ActivityIndicatorStyled
                            color={theme.colors['secondary-light']}
                        />
                    </ActivityIndicatorContainer>
                )}
            </LoadingContainer>
            {loading === 'ERROR' && (
                <ErrorContainer
                    imageSize={imageSize}
                    containerOuterSize={containerOuterSize}
                    errorHeight={errorHeight}
                    onPress={onPress}
                >
                    <Typography color="secondary-light" fontFamily="bold">
                        {errorText}
                    </Typography>
                </ErrorContainer>
            )}
        </Container>
    );
};

export default React.memo(ImageLoader);
