import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.Pressable`
    height: ${() => `${GLOBAL_STYLE.GALERIE_CARD_HEIGHT}px`};
    margin-bottom: 15px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
