import styled from 'styled-components/native';

type InnerContainerProps = {
    height: number;
};

const InnerContainer = styled.View<InnerContainerProps>`
    height: ${({ height }) => `${height}px`};
`;
const StyledScrollView = styled.ScrollView`
    flex: 1;
`;

export { InnerContainer, StyledScrollView };
