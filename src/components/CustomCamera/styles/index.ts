import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

type BackButtonContainerProps = {
    paddingTop?: number;
};
type CameraStyledProps = {
    margins: number;
};
type ImageStyledProps = {
    margins: number;
};

const ACTION_CONTAINER_SIZE = 82;
const TAKE_PICTURE_BUTTON_BORDER_SIZE = 5;
const INNER_TAKE_PICTURE_BUTTON_SIZE =
    ACTION_CONTAINER_SIZE - (2 * TAKE_PICTURE_BUTTON_BORDER_SIZE + 8);

const ActionsContainer = styled.View`
    height: ${() => `${ACTION_CONTAINER_SIZE}px`};
    width: ${() => `${ACTION_CONTAINER_SIZE}px`};
`;
const BackButtonContainer = styled.Pressable<BackButtonContainerProps>`
    left: 0;
    padding-top: ${({ paddingTop }) => (paddingTop ? `${paddingTop}px` : 0)};
    position: absolute;
    top: 0;
`;
const BottomContainer = styled.View`
    bottom: 0;
    flex-direction: row;
    height: 125px;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
`;
const CameraStyled = styled(Camera)<CameraStyledProps>`
    flex: 1;
    margin: ${({ margins }) => `${margins}px 0`};
`;
const Container = styled.View`
    background-color: #000;
    flex: 1;
`;
const ImageStyled = styled.Image<ImageStyledProps>`
    bottom: 0;
    left: 0;
    margin: ${({ margins }) => `${margins}px 0`};
    position: absolute;
    right: 0;
    top: 0;
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
// TODO: Here need to center
const SwitchFlashModeButtonContainer = styled.Pressable`
    padding: ${({ theme }) => theme.spacings.small};
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

// eslint-disable-next-line import/prefer-default-export
export {
    ActionsContainer,
    BackButtonContainer,
    BottomContainer,
    CameraStyled,
    Container,
    ImageStyled,
    InnerTakePictureButton,
    SavePicturesButton,
    SwitchFlashModeButtonContainer,
    SwitchTypeButtonContainer,
    TakePictureButton,
};
