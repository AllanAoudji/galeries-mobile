import styled from 'styled-components/native';

type ContainerProps = {
    width: number;
};

const Container = styled.View<ContainerProps>`
    padding: ${({ theme }) => `${theme.spacings.smallest} 0`};
    width: ${({ width }) => `${width}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
