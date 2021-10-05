import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const ActivityIndicatorContainer = styled.View`
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
`;
const Container = styled.Pressable<ContainerProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;
const DotsContainer = styled.View`
    align-items: center;
    flex-direction: row;
    height: 22px;
    justify-content: center;
`;

export { ActivityIndicatorContainer, Container, DotsContainer };
