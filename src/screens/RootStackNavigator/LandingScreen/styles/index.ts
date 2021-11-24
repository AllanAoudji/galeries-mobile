import styled from 'styled-components/native';

const CatchPhraseContainer = styled.View`
    margin: ${({ theme }) =>
        `${theme.spacings.normal} ${theme.spacings.small} 0 ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    justify-content: space-between;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.large}`};
`;
const Header = styled.View`
    flex: 1;
    justify-content: center;
`;

export { CatchPhraseContainer, Container, Header };
