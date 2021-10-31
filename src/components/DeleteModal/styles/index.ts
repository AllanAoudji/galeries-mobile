import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

type OverlayProps = {
    height: number;
};

const Background = styled.Pressable`
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;
const ButtonContainer = styled.View`
    width: 50%;
`;
const ButtonsContainer = styled.View`
    margin-top: ${({ theme }) => theme.spacings.normal};
    flex-direction: row;
    justify-content: space-between;
`;
const Modal = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: 8px;
    justify-content: space-between;
    min-height: 148px;
    padding: ${({ theme }) => theme.spacings.small};
    width: 340px;
`;
const Overlay = styled(Animated.View)<OverlayProps>`
    align-items: center;
    bottom: 0;
    height: ${({ height }) => `${height}px`};
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

export { Background, ButtonContainer, ButtonsContainer, Modal, Overlay };
