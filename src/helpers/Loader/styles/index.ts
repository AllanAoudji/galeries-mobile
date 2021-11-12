import styled from 'styled-components/native';

type ContainerProps = {
    height: number;
};

const Container = styled.View<ContainerProps>`
    min-height: ${({ height }) => `${Math.round(height)}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
