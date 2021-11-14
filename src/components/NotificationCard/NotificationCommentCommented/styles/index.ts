import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';
import convertPixelToNum from '#helpers/convertPixelToNum';

const Container = styled.View`
    padding-left: ${({ theme }) =>
        `${
            (GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE +
                convertPixelToNum(theme.spacings.smallest)) /
            2
        }px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
