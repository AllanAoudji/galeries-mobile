import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;

export default Container;
