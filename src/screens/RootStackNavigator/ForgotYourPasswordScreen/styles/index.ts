import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    padding: ${({ theme }) =>
        `0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;
const ForgotYourPasswordContainer = styled.Pressable`
    align-items: flex-end;
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
    ForgotYourPasswordContainer,
    ScrollViewStyle,
    TextContainer,
};
