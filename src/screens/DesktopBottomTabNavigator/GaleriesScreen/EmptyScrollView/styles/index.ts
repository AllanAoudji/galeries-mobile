import { ScrollView } from 'react-native';
import styled from 'styled-components/native';

type InnerContainerProp = {
    height: number;
};

const InnerContainer = styled.View<InnerContainerProp>`
    height: ${({ height }) => `${height}px`};
`;
const StyledScrollView = styled(ScrollView)`
    flex: 1;
`;

export { InnerContainer, StyledScrollView };
