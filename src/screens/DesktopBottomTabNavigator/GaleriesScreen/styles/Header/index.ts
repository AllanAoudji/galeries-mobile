import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const Header = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    position: absolute;
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
    width: 100%;
    z-index: 10;
`;

export default Header;
