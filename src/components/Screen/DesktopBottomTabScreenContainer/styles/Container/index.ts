import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type Props = {
    height: number;
};

const Container = styled(Animated.View)<Props>`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;

export default Container;
