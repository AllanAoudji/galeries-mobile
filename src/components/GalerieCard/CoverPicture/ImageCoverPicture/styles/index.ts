import styled from 'styled-components/native';

type ContainerProps = {
    width: number;
};
type ImageStyledProps = {
    size: number;
};

const Container = styled.View<ContainerProps>`
    height: 140px;
    justify-content: center;
    overflow: hidden;
    width: ${({ width }) => `${width}px`};
`;
const ImageStyled = styled.Image<ImageStyledProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

export { Container, ImageStyled };
