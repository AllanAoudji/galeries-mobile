import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const Container = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors.secondary};
    flex: 1;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

export default Container;
