import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
`;
const Header = styled(Animated.View)`
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export { Container, Header };
