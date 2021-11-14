import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type ContainerProps = {
    seen: boolean;
};

const Container = styled.Pressable<ContainerProps>`
    align-items: center;
    background-color: ${({ seen, theme }) =>
        `${seen ? theme.colors['secondary-light'] : theme.colors.secondary}`};
    border-bottom-color: ${({ theme, seen }) =>
        seen ? theme.colors.secondary : theme.colors['secondary-light']};
    border-bottom-width: 1px;
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.NOTIFICATION_CARD_HEIGHT}px`};
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
