import styled from 'styled-components/native';

const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.large}`};
`;

export default Container;
