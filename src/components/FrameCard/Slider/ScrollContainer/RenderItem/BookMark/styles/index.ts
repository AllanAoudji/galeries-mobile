import styled from 'styled-components/native';

const Container = styled.View`
    bottom: ${({ theme }) => theme.spacings.smallest};
    position: absolute;
    right: ${({ theme }) => theme.spacings.smallest};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
