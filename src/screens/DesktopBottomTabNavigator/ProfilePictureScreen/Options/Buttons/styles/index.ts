import styled from 'styled-components/native';

const Button = styled.Pressable`
    align-items: center;
    padding: ${({ theme }) => `${theme.spacings.smallest} 0`};
`;
const Container = styled.View`
    margin: ${({ theme }) =>
        `0 ${theme.spacings.normal} ${theme.spacings.small}`};
`;

export { Button, Container };
