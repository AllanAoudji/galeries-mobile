import styled from 'styled-components/native';

type ContainerProps = {
    checked: boolean;
    disable?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const CONTAINER_SIZE = 24;

const Container = styled.View<ContainerProps>`
    align-items: center;
    background-color: ${({ checked, theme }) =>
        checked ? theme.colors.primary : theme.colors['secondary-light']};
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 5px;
    border-width: ${({ checked }) => (checked ? '0px' : '2px')};
    height: ${() => `${CONTAINER_SIZE}px`};
    justify-content: center;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    opacity: ${(props) => (props.disable ? '0.5' : 1)};
    width: ${() => `${CONTAINER_SIZE}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
