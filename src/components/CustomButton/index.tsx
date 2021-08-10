import * as React from 'react';
import styled from 'styled-components/native';

import Typography from '../Typography';

type Variant = 'fill' | 'stroke';
type PropsComponent = {
    disable?: boolean;
    onPress?: () => void;
    small?: boolean;
    title: string;
    variant?: Variant;
};
type PropsContainer = {
    disable?: boolean;
    small?: boolean;
    variant?: Variant;
};

const Container = styled.Pressable<PropsContainer>`
    align-items: center;
    background-color: ${(props) =>
        props.variant === 'stroke' ? '#fffff4' : '#414cb4'};
    border-color: #414cb4;
    border-radius: ${(props) => (props.small ? '5px' : '50px')};
    border-width: ${(props) => (props.variant === 'stroke' ? '2px' : '0px')};
    height: ${(props) =>
        props.small
            ? `${props.variant === 'stroke' ? '31px' : '35px'}`
            : `${props.variant === 'stroke' ? '41px' : '45px'}`};
    justify-content: center;
    opacity: ${(props) => (props.disable ? '0.5' : 1)};
`;

const CustomButton = ({
    disable = false,
    onPress,
    small = false,
    title,
    variant = 'fill',
}: PropsComponent) => (
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
