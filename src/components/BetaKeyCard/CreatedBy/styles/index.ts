import styled from 'styled-components/native';

const Container = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;
const UserContainer = styled.View`
    flex-direction: row;
    align-items: center;
`;

export { Container, UserContainer };
