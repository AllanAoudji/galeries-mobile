import styled from 'styled-components/native';

const ForgotYourPasswordContainer = styled.Pressable`
    align-items: flex-end;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} 0 ${theme.spacings.smallest} ${theme.spacings.normal}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { ForgotYourPasswordContainer };
