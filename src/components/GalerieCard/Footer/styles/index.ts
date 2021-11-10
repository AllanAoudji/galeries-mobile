import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.View`
    height: ${() =>
        `${
            GLOBAL_STYLE.GALERIE_CARD_HEIGHT -
            GLOBAL_STYLE.GALERIE_CARD_COVER_PICTURE_HEIGHT
        }px`};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} 0`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
