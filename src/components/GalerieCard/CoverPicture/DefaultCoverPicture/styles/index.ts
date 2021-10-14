import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type ContainerProps = {
    width: number;
};
type LinearGradientStyledProps = {
    size: number;
};

const Container = styled.View<ContainerProps>`
    height: 140px;
    justify-content: center;
    overflow: hidden;
    width: ${({ width }) => `${width}px`};
`;
const LinearGradientStyled = styled(LinearGradient)<LinearGradientStyledProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

export { Container, LinearGradientStyled };
