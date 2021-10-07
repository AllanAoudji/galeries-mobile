import styled from 'styled-components/native';

const ButtonsContainer = styled.View`
    bottom: 0;
    left: 0;
    margin-bottom: ${({ theme }) => theme.spacings.normal};
    position: absolute;
    right: 0;
`;
const Container = styled.View`
    margin-top: ${({ theme }) => theme.spacings.large};
`;

export { Container, ButtonsContainer };
