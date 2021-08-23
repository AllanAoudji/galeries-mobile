import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type Props = {
    size: number;
};

const DefaultCoverPicture = styled(LinearGradient)<Props>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

export default DefaultCoverPicture;
