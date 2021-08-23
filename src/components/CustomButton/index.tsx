import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components/native';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import { Container, PictogramContainer } from './styles';

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

    return (
        <Container
            disable={disable || loading}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            onPress={() => {
                if (onPress && !disable && !loading) onPress();
            }}
            small={small}
            variant={variant}
        >
            {pictogram && (
                <PictogramContainer small={small}>
                    <Pictogram
                        color={
                            variant === 'fill'
                                ? 'secondary-light'
                                : 'primary-dark'
                        }
                        variant={pictogram}
                        size={small ? 'small' : 'normal'}
                    />
                </PictogramContainer>
            )}
            <Typography
                color={variant === 'fill' ? 'secondary-light' : 'primary-dark'}
                fontFamily="bold"
                fontSize={small ? 14 : 18}
            >
                {loading ? (
                    <ActivityIndicator
                        size="small"
                        color={
                            variant === 'fill'
                                ? theme.colors['secondary-light']
                                : theme.colors['primary-dark']
                        }
                    />
                ) : (
                    title.toLowerCase()
                )}
            </Typography>
        </Container>
    );
};

export default CustomButton;
