import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import { GLOBAL_STYLE } from '#helpers/constants';

const LinearGradientStyled = styled(LinearGradient)`
    height: ${() => `${GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE}px`};
    width: ${() => `${GLOBAL_STYLE.FRAME_COVER_PICTURE_SIZE}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { LinearGradientStyled };
