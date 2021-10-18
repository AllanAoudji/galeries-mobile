import styled from 'styled-components/native';

type ContainerProps = {
    borderRadius?: number;
    size: number;
};

const Container = styled.View<ContainerProps>`
    border-radius: ${({ borderRadius }) => `${borderRadius || 0}px`};
    height: ${({ size }) => `${size}px`};
    overflow: hidden;
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
