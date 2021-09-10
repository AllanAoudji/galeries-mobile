import styled from 'styled-components/native';

type OverlayProps = {
    height: number;
};

const ButtonContainer = styled.View`
    width: 50%;
`;
const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;
const Modal = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: 15px;
    justify-content: space-between;
    min-height: 188px;
    padding: ${({ theme }) => theme.spacings.small};
    width: 340px;
`;
const Overlay = styled.Pressable<OverlayProps>`
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
    bottom: 0;
    height: ${({ height }) => `${height}px`};
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

export { ButtonContainer, ButtonsContainer, Modal, Overlay };
