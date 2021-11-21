import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};
type StyledImageProps = {
    size: number;
};

const Container = styled.Pressable<ContainerProps>`
    align-items: center;
    height: ${({ size }) => `${size}px`};
    justify-content: center;
    width: ${({ size }) => `${size}px`};
`;

const StyledImage = styled.Image<StyledImageProps>`
    height: ${({ size }) => `${size - 5}px`};
    width: ${({ size }) => `${size - 5}px`};
`;

export { Container, StyledImage };
