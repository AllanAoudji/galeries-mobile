import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 10px;
    margin: ${({ theme }) => `0 ${theme.spacings.normal}`};
    padding: ${({ theme }) => `${theme.spacings.small} 0`};
`;
const InformationContainer = styled.View`
    align-items: center;
    flex: 1;
    height: 50px;
    justify-content: space-between;
`;
const InformationsContainer = styled.View`
    flex-direction: row;
    margin-top: ${({ theme }) => theme.spacings.large};
    width: 100%;
`;

export { Container, InformationContainer, InformationsContainer };
