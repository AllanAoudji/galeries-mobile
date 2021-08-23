import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

const Container = styled(Animated.View)`
    height: 249px;
    padding-bottom: ${({ theme }) => theme.spacings.small};
`;

export default Container;
