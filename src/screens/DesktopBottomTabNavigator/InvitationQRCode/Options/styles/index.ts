import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    paddingTop?: number;
};

const Container = styled(Animated.View)<ContainerProps>`
    flex: 1;
    padding-top: ${({ paddingTop }) => `${paddingTop || 0}px`};
`;
const InnerContainer = styled.Pressable`
    flex: 1;
    flex-direction: row;
`;

export { Container, InnerContainer };
