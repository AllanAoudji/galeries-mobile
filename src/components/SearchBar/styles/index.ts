import styled from 'styled-components/native';

type PropsContainer = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const Container = styled.Pressable<PropsContainer>`
    border-color: ${({ theme }) => theme.colors.black};
    border-radius: 4px;
    border-width: 2px;
    flex-direction: row;
    height: 34px;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
`;
const PictogramContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 0 10px;
    opacity: 0.3;
`;
const TextInputStyled = styled.TextInput`
    flex: 1;
`;

export { Container, PictogramContainer, TextInputStyled };
