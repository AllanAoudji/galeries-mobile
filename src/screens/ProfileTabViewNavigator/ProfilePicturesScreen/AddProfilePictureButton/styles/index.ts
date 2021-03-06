import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled(Animated.View)`
    position: absolute;
    right: ${({ theme }) => theme.spacings.normal};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
