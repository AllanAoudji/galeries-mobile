import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type LinearGradientStyledProps = {
    size: number;
};

const LinearGradientStyled = styled(LinearGradient)<LinearGradientStyledProps>`
    height: ${({ size }) => `${size}px`};
    opacity: 0.75;
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { LinearGradientStyled };
