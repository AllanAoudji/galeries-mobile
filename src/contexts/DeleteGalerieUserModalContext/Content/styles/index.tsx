import styled from 'styled-components/native';

const Container = styled.View`
    padding-top: ${({ theme }) => theme.spacings.small};
`;
const FormContainer = styled.View`
    align-items: center;
    flex-direction: row;
    padding-top: ${({ theme }) => theme.spacings.smallest};
`;

export { Container, FormContainer };
