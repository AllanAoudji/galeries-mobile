import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const Container = styled.View<ContainerProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;
const DotsContainer = styled.View`
    align-items: center;
    flex-direction: row;
    height: 22px;
    justify-content: center;
`;

export { Container, DotsContainer };
