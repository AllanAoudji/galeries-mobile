import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
