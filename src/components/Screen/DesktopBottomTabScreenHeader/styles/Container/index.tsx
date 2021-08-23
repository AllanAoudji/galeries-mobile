import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.Pressable`
    align-items: stretch;
    flex-direction: row;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    height: ${() => `${GLOBAL_STYLE.HEADER_TAB_HEIGHT}px`};
`;

export default Container;
