import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};
type StyledImageProps = {
    size: number;
};

const Container = styled.View<ContainerProps>`
    align-items: center;
    height: ${({ size }) => `${size}px`};
    justify-content: center;
    width: ${({ size }) => `${size}px`};
`;

const StyledImage = styled.Image<StyledImageProps>`
    height: ${({ size }) => `${size - 4}px`};
    width: ${({ size }) => `${size - 4}px`};
`;

export { Container, StyledImage };
