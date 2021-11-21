import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    backgroundColor: keyof Style.Colors;
};

const Container = styled(Animated.View)<ContainerProps>`
    background-color: ${({ backgroundColor, theme }) =>
        theme.colors[backgroundColor]};
    flex: 1;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
