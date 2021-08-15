import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    disable?: boolean;
    onPress?: () => void;
    loading?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
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
    small = false,
    title,
    variant = 'fill',
}: Props) => (
    <Container
        disable={disable || loading}
        onPress={() => {
            if (onPress && (!disable || !loading)) onPress();
        }}
        mb={mb}
        ml={ml}
        mr={mr}
        mt={mt}
        small={small}
        variant={variant}
    >
        <Typography
            color={variant === 'fill' ? 'secondary-light' : 'primary-dark'}
            fontFamily="bold"
            fontSize={small ? 14 : 24}
        >
            {loading ? 'loading' : title.toLowerCase()}
        </Typography>
    </Container>
);

export default CustomButton;
