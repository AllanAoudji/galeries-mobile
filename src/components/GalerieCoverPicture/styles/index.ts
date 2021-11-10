import styled from 'styled-components/native';

type ContainerProps = {
    borderRadius?: number;
    height?: number;
    size: number;
    width?: number;
};

const Container = styled.View<ContainerProps>`
    border-radius: ${({ borderRadius }) => `${borderRadius || 0}px`};
    height: ${({ height, size }) => `${height || size}px`};
    justify-content: center;
    overflow: hidden;
    width: ${({ size, width }) => `${width || size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
