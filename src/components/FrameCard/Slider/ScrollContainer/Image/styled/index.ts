import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type ImageStyledProps = {
    size: number;
};
type LinearGradientStyledProps = {
    size: number;
};

const ImageStyled = styled.Image<ImageStyledProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;
const LinearGradientStyled = styled(LinearGradient)<LinearGradientStyledProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

export { ImageStyled, LinearGradientStyled };
