import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    padding-top: 45px;
    flex: 1;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
