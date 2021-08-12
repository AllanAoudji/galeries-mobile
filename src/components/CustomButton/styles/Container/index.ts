import styled from 'styled-components/native';

type Props = {
    disable?: boolean;
    mb?: keyof Spacings;
    ml?: keyof Spacings;
    mr?: keyof Spacings;
    mt?: keyof Spacings;
    small?: boolean;
    variant?: Variant.Button;
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
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    opacity: ${(props) => (props.disable ? '0.5' : 1)};
`;

export default Container;
