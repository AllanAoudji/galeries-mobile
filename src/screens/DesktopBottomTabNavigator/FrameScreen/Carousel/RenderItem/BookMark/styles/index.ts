import styled from 'styled-components/native';

const Container = styled.View`
    bottom: ${({ theme }) => theme.spacings.smallest};
    left: ${({ theme }) => theme.spacings.smallest};
    position: absolute;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
