import styled from 'styled-components/native';

type ContainerProps = {
    justifyContent: 'flex-start' | 'space-between';
};

const Container = styled.View<ContainerProps>`
    flex: 1;
    justify-content: ${({ justifyContent }) => justifyContent};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.normal}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
