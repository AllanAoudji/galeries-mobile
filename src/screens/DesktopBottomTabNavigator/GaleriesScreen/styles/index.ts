import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
    width: 100%;
    z-index: 10;
`;
const SearchBarContainer = styled.View`
    padding: ${({ theme }) => `0 ${theme.spacings.small}`};
`;

export { Container, Header, SearchBarContainer };
