import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const ImageStyled = styled.Image<ContainerProps>`
    height: ${({ size }) => `${size}px`};
    opacity: 0.75;
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { ImageStyled };
