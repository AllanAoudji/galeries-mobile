import styled from 'styled-components/native';

type ContainerProps = {
    size: number;
};

const Container = styled.Pressable<ContainerProps>`
    height: ${({ size }) => `${size}px`};
    width: ${({ size }) => `${size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
