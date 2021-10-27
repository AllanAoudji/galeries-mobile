import styled from 'styled-components/native';

const Container = styled.View`
    flex: 1;
    justify-content: space-between;
    padding: ${({ theme }) => `${theme.spacings.small} 0`};
`;
const FieldsContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.small};
`;
const TypographyContainer = styled.View`
    margin-bottom: ${({ theme }) => theme.spacings.normal};
    margin-right: ${({ theme }) => theme.spacings.normal};
`;

export { Container, FieldsContainer, TypographyContainer };
