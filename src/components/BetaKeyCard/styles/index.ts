import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.Pressable`
    background-color: ${({ theme }) => theme.colors.secondary};
    height: ${() => `${GLOBAL_STYLE.BETA_KEY_CARD_HEIGHT}px`};
    padding: ${({ theme }) => `20px ${theme.spacings.small}`};
    margin-bottom: 5px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
