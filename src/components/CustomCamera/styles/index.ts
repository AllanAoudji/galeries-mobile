import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

type CameraStyledProps = {
    margins: number;
};
type ImageStyledProps = {
    margins: number;
};

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

export { CameraStyled, Container, ImageStyled };
