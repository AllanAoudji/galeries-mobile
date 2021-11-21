import { ScrollView } from 'react-native';
import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    height: number;
    pb?: number;
    pt?: number;
};

const AnimatedScrollView = Animated.createAnimatedComponent<any>(ScrollView);

const Container = styled.View<ContainerProps>`
    align-items: center;
    height: ${({ height }) => `${height}px`};
    justify-content: center;
    padding-bottom: ${({ pb }) => `${pb || 0}px`};
    padding-left: ${({ theme }) => theme.spacings.normal};
    padding-right: ${({ theme }) => theme.spacings.normal};
    padding-top: ${({ pt }) => `${pt || 0}px`};
`;
const StyledAnimatedScrollView = styled(AnimatedScrollView)`
    flex: 1;
`;

export { Container, StyledAnimatedScrollView };
