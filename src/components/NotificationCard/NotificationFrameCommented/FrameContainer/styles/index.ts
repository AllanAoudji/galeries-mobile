import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

const ImageStyled = styled.Image`
    border-radius: ${() =>
        `${GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_BORDER_RADIUS}px`};
    height: ${() => `${GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE}px`};
    margin-right: ${({ theme }) => theme.spacings.smallest};
    width: ${() => `${GLOBAL_STYLE.NOTIFICATION_CARD_IMAGE_SIZE}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { ImageStyled };
