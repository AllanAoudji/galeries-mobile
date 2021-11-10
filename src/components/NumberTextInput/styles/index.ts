import styled from 'styled-components/native';

type ContainerProps = {
    disable?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const Container = styled.View<ContainerProps>`
    align-items: flex-end;
    flex-direction: row;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    opacity: ${(props) => (props.disable ? 0.5 : 1)};
`;
const TextInputStyled = styled.TextInput`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-bottom-color: ${({ theme }) => theme.colors.primary};
    border-bottom-width: 3px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    font-family: ${({ theme }) => theme.font.families.roman};
    font-size: ${({ theme }) => theme.font.sizes[24]};
    height: ${({ theme }) => theme.spacings.normal};
    margin-right: ${({ theme }) => theme.spacings.smallest};
    padding: 0 5px;
    text-align: right;
    width: 50px;
`;

export { Container, TextInputStyled };
