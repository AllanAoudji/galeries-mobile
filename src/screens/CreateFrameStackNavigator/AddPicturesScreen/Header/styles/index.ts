import styled from 'styled-components/native';

const Container = styled.View`
    align-items: flex-end;
    flex: 1;
    justify-content: center;
    margin: ${({ theme }) => ` 0 ${theme.spacings.large}`};
`;
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors['primary-light']};
    border-radius: 1px;
    height: 2px;
    margin-top: 10px;
    width: ${({ theme }) => theme.spacings.normal};
`;

export { Container, Separator };
