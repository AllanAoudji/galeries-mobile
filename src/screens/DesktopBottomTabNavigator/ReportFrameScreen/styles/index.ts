import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
    padding-top: ${({ theme }) => theme.spacings.normal};
`;
const ReasonsContainer = styled.View`
    margin-top: ${({ theme }) => theme.spacings.small};
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;

export { ButtonContainer, Container, ReasonsContainer, ScrollViewStyle };
