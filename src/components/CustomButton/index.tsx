import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    disable?: boolean;
    loading?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onPress?: () => void;
    pictogram?: Style.Pictograms;
    small?: boolean;
    title: string;
    variant?: Style.Variant.Button;
};

const CustomButton = ({
    disable = false,
    loading = false,
    mb,
    ml,
    mr,
    mt,
    onPress,
    pictogram,
    small = false,
    title,
    variant = 'fill',
}: Props) => {
    const theme = useTheme();

    const activityIndicatorColor = React.useMemo(
        () =>
            variant === 'fill'
                ? theme.colors['secondary-light']
                : theme.colors['primary-dark'],
        [variant]
    );
    const disableButton = React.useMemo(
        () => disable || loading || !onPress,
        [disable, loading, onPress]
    );
    const pictogramColor = React.useMemo(
        () => (variant === 'fill' ? 'secondary-light' : 'primary-dark'),
        [variant]
    );
    const pictogramMR = React.useMemo(
        () => (small ? 'smallest' : 'small'),
        [small]
    );
    const pictogramSize = React.useMemo(
        () => (small ? 'small' : 'normal'),
        [small]
    );
    const typographyColor = React.useMemo(
        () => (variant === 'fill' ? 'secondary-light' : 'primary-dark'),
        [variant]
    );
    const typographyFontSize = React.useMemo(() => (small ? 14 : 18), [small]);

    const handlePress = React.useCallback(() => {
        if (!disable && !loading && onPress) onPress();
    }, [disable, loading, onPress]);

    return (
        <Container
            disable={disableButton}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            onPress={handlePress}
            small={small}
            variant={variant}
        >
            {pictogram && (
                <Pictogram
                    color={pictogramColor}
                    mr={pictogramMR}
                    size={pictogramSize}
                    variant={pictogram}
                />
            )}
            <Typography color={typographyColor} fontSize={typographyFontSize}>
                {loading ? (
                    <ActivityIndicator
                        color={activityIndicatorColor}
                        size="small"
                    />
                ) : (
                    title.toLowerCase()
                )}
            </Typography>
        </Container>
    );
};

export default React.memo(CustomButton);
