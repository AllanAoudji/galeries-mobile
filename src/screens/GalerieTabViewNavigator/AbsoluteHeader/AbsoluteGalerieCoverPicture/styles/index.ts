import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled(Animated.View)`
    align-items: center;
    bottom: 0;
    justify-content: center;
    left: 0;
    overflow: hidden;
    position: absolute;
    right: 0;
    top: 0;
`;
const TextContainer = styled.View`
    bottom: ${({ theme }) => theme.spacings.smallest};
    position: absolute;
    right: ${({ theme }) => theme.spacings.normal};
`;

export { Container, TextContainer };
