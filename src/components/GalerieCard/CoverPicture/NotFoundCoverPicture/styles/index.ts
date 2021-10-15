import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type LinearGradiantStyledProps = {
    width: number;
};

const LinearGradientStyled = styled(LinearGradient)<LinearGradiantStyledProps>`
    height: 140px;
    width: ${({ width }) => `${width}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { LinearGradientStyled };
