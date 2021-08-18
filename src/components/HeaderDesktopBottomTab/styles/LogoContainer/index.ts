import styled from 'styled-components/native';

const LogoContainer = styled.Pressable`
    align-self: center;
    padding: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest} ${theme.spacings.small}`};
`;

export default LogoContainer;
