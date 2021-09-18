import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding: ${({ theme }) => `5px 0 5px ${theme.spacings.small}`};
`;
const InfoContainer = styled.View`
    align-items: center;
    flex-direction: row;
`;

export { Container, InfoContainer };
