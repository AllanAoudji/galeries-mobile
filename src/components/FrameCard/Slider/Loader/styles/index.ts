import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const Container = styled.View<ContainerProps>`
    align-items: center;
    height: ${({ size }) => `${size}px`};
    justify-content: center;
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
