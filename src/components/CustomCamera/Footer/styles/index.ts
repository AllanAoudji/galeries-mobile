import styled from 'styled-components/native';

const ACTION_CONTAINER_SIZE = 82;
const TAKE_PICTURE_BUTTON_BORDER_SIZE = 5;
const INNER_TAKE_PICTURE_BUTTON_SIZE =
    ACTION_CONTAINER_SIZE - (2 * TAKE_PICTURE_BUTTON_BORDER_SIZE + 8);

const ActionsContainer = styled.View`
    height: ${() => `${ACTION_CONTAINER_SIZE}px`};
    width: ${() => `${ACTION_CONTAINER_SIZE}px`};
`;
const Container = styled.View`
    bottom: 0;
    flex-direction: row;
    height: 125px;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
`;
const InnerTakePictureButton = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${() => `${INNER_TAKE_PICTURE_BUTTON_SIZE / 2}px`};
    height: ${() => `${INNER_TAKE_PICTURE_BUTTON_SIZE}px`};
    opacity: 0.75;
    width: ${() => `${INNER_TAKE_PICTURE_BUTTON_SIZE}px`};
`;
const SavePicturesButton = styled.Pressable`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${() => `${ACTION_CONTAINER_SIZE / 2}px`};
    bottom: 0;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;
const SwitchTypeButtonContainer = styled.Pressable`
    bottom: 0;
    padding: ${({ theme }) => theme.spacings.small};
    position: absolute;
    right: 0;
`;
const TakePictureButton = styled.Pressable`
    align-items: center;
    border-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: ${() => `${ACTION_CONTAINER_SIZE / 2}px`};
    border-width: ${() => `${TAKE_PICTURE_BUTTON_BORDER_SIZE}px`};
    bottom: 0;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

export {
    ActionsContainer,
    Container,
    InnerTakePictureButton,
    SavePicturesButton,
    SwitchTypeButtonContainer,
    TakePictureButton,
};
