import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

const Body = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-top-left-radius: 50px;
    height: auto;
    padding: ${({ theme }) =>
        `${theme.spacings.normal} ${theme.spacings.normal} ${theme.spacings.small}`};
    width: 100%;
`;
const Container = styled(LinearGradient)`
    flex: 1;
    justify-content: space-between;
`;
const TextContainer = styled.View`
    padding-bottom: ${({ theme }) => theme.spacings.small};
`;

export { Body, Container, TextContainer };
