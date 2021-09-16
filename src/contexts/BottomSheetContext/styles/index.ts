import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type ContainerProps = {
    height: number;
};
type OverlayProps = {
    height: number;
};

const BORDER_RADIUS = '18px';

const Container = styled(Animated.View)<ContainerProps>`
    bottom: 0;
    height: ${({ height }) => `${height}px`};
    justify-content: flex-end;
    left: 0;
    position: absolute;
    right: 0;
    z-index: 1;
`;
const Handle = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-dark']};
    border-radius: 100px;
    height: 4px;
    width: 30px;
`;
const HandleContainer = styled.View`
    align-items: center;
    margin-bottom: ${({ theme }) => theme.spacings.small};
`;
const InnerContainer = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: ${() => `${BORDER_RADIUS}`};
    border-top-right-radius: ${() => `${BORDER_RADIUS}`};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small} ${theme.spacings.small}`};
`;
const Overlay = styled(Animated.View)<OverlayProps>`
    bottom: 0;
    display: none;
    height: ${({ height }) => `${height}px`};
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
`;
const PressableOutside = styled.Pressable`
    flex: 1;
`;

export {
    Container,
    Handle,
    HandleContainer,
    InnerContainer,
    Overlay,
    PressableOutside,
};
