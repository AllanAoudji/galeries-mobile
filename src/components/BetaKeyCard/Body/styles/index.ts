import styled from 'styled-components/native';

type ContainerProps = {
    justifyContent: 'flex-end' | 'space-between';
};

const Container = styled.View<ContainerProps>`
    flex: 1;
    justify-content: ${({ justifyContent }) => justifyContent};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
