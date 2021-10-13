import styled from 'styled-components/native';

const ActionNavigationContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const Container = styled.View`
    padding: ${({ theme }) => `5px ${theme.spacings.smallest} 0`};
`;

export { ActionNavigationContainer, Container };
