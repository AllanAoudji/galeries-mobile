import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';
import { GLOBAL_STYLE } from '#helpers/constants';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    width: 100%;
    z-index: 10;
`;
const SearchBarContainer = styled.View`
    height: ${() => `${GLOBAL_STYLE.SEARCH_BAR_HEIGHT}px`};
    justify-content: flex-end;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest}`};
`;

export { Container, Header, SearchBarContainer };
