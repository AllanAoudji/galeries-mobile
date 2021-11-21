import styled from 'styled-components/native';

type PropsContainer = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const CONTAINER_HEIGHT = 34;

const Container = styled.Pressable<PropsContainer>`
    border-radius: ${() => `${CONTAINER_HEIGHT / 2}px`};
    flex: 1;
    flex-direction: row;
    height: ${() => `${CONTAINER_HEIGHT}px`};
    background-color: ${({ theme }) => theme.colors.secondary};
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
`;
const PictogramContainer = styled.View`
    align-items: center;
    justify-content: center;
    margin: 0 15px;
    opacity: 0.4;
`;
const QuitContainer = styled.Pressable`
    align-items: center;
    height: 32px;
    justify-content: center;
    width: 32px;
`;
const TextInputStyled = styled.TextInput`
    flex: 1;
`;

export { Container, PictogramContainer, QuitContainer, TextInputStyled };
