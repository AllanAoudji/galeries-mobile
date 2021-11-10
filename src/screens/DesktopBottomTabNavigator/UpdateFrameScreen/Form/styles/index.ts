import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;

export { Container, ButtonContainer, ScrollViewStyle };
