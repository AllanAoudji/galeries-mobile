import * as React from 'react';

import Typography from '#components/Typography';

import { Container } from './styles';

type Variant = 'fill' | 'stroke';
type Props = {
    disable?: boolean;
    onPress?: () => void;
    small?: boolean;
    title: string;
    variant?: Variant;
};

const CustomButton = ({
    disable = false,
    onPress,
    small = false,
    title,
    variant = 'fill',
}: Props) => (
    <Container
        disable={disable}
        onPress={() => {
            if (onPress) onPress();
        }}
        small={small}
        variant={variant}
    >
        <Typography
            color={variant === 'fill' ? 'secondary-light' : 'primary-dark'}
            fontFamily="bold"
            fontSize={small ? 14 : 24}
        >
            {title.toLowerCase()}
        </Typography>
    </Container>
);

export default CustomButton;
