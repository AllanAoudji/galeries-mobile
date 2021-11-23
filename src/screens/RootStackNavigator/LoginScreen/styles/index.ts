import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const Container = styled.View`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    flex: 1;
`;
const ForgotYourPasswordContainer = styled.Pressable`
    align-items: flex-end;
    margin-left: ${({ theme }) => theme.spacings.large};
    margin-top: ${({ theme }) => theme.spacings.smallest}
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const ScrollViewStyle = styled.ScrollView`
    padding: ${({ theme }) => `0 ${theme.spacings.normal}`};
`;
const TextContainer = styled.View`
    margin-top: ${({ theme }) => theme.spacings.large};
`;

export {
    ButtonContainer,
    Container,
    ForgotYourPasswordContainer,
    ScrollViewStyle,
    TextContainer,
};
