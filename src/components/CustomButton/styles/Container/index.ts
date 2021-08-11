import styled from 'styled-components/native';

type Props = {
    disable?: boolean;
    small?: boolean;
    variant?: ButtonVariant;
};

const Container = styled.Pressable<Props>`
    align-items: center;
    background-color: ${(props) =>
        props.variant === 'stroke' ? '#fffff4' : '#414cb4'};
    border-color: #414cb4;
    border-radius: ${(props) => (props.small ? '5px' : '50px')};
    border-width: ${(props) => (props.variant === 'stroke' ? '2px' : '0px')};
    height: ${(props) => (props.small ? '35px' : '42px')};
    justify-content: center;
    opacity: ${(props) => (props.disable ? '0.5' : 1)};
`;

export default Container;
