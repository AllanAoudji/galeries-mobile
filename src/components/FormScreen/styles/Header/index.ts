import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const Header = styled(Animated.View)`
    align-items: flex-end;
    margin: ${({ theme }) =>
        `142px ${theme.spacings.large} 0 ${theme.spacings.large}`};
`;

export default Header;
