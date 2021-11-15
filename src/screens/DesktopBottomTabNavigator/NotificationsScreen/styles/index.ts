import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type HeaderProps = {
    width: number;
};

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const Header = styled(Animated.View)<HeaderProps>`
    position: absolute;
    width: ${({ width }) => `${width}px`};
    z-index: 10;
`;

export { Container, Header };
