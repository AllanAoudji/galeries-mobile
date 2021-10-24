import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: space-between;
    padding-bottom: ${({ theme }) => theme.spacings.normal};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
