import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const LinearGradientStyled = styled(LinearGradient)<ContainerProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { LinearGradientStyled };
