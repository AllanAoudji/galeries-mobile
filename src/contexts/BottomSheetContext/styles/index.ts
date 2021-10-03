import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

const BORDER_RADIUS = '18px';

type BottomSheetContainerProps = {
    height: number;
};

const BottomSheetContainer = styled(Animated.View)<BottomSheetContainerProps>`
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 10;
    height: ${({ height }) => `${height}px`};
`;
const Container = styled(Animated.View)`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
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
const PressableWrapper = styled.Pressable`
    flex: 1;
    justify-content: flex-end;
`;

export {
    BottomSheetContainer,
    Container,
    Handle,
    HandleContainer,
    InnerContainer,
    PressableWrapper,
};
