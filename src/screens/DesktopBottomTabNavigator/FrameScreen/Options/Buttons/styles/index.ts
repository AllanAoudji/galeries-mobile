import styled from 'styled-components/native';

const Button = styled.Pressable`
    align-items: center;
    padding: ${({ theme }) => `${theme.spacings.smallest} 0`};
`;
const Container = styled.View`
    margin: ${({ theme }) =>
        `0 ${theme.spacings.normal} ${theme.spacings.small}`};
`;
const Spacing = styled.View`
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 1px;
    height: 2px;
`;

export { Button, Container, Spacing };
