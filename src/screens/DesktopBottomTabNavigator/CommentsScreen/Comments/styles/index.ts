import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)`
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export { Container, Header };
