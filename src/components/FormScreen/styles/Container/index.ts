import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

type Props = {
    height: number;
};

const Container = styled(LinearGradient)<Props>`
    flex: 1;
    height: ${(props) => `${props.height}px`};
    justify-content: space-between;
`;

export default Container;
