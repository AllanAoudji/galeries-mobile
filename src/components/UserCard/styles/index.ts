import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type ContainerStyle = {
    color: keyof Style.Colors;
};

const Container = styled.View<ContainerStyle>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.USER_CARD_HEIGHT}px`};
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;
const InfoContainer = styled.View`
    margin-left: ${({ theme }) => theme.spacings.smallest};
`;
const UserNameContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;

export { Container, InfoContainer, UserNameContainer };
