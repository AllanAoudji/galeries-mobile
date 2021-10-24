import styled from 'styled-components/native';

const Container = styled.View`
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;
const DeleteButtonPlaceholder = styled.View`
    height: 36px;
`;

export { Container, DeleteButtonPlaceholder };
