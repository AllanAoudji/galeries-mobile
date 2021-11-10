import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.Pressable`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    flex-direction: row;
    height: ${() => `${GLOBAL_STYLE.INVITATION_CARD_HEIGHT}px`};
    margin: ${({ theme }) => `20px ${theme.spacings.small} 0`};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.smallest} ${theme.spacings.smallest}`};
`;
const InnerContainer = styled.View`
    flex: 1;
`;

export { Container, InnerContainer };
