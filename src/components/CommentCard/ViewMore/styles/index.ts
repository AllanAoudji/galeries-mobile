import styled from 'styled-components/native';

const Container = styled.Pressable`
    align-items: center;
    align-self: flex-start;
    flex-direction: row;
    opacity: 0.7;
    padding: ${({ theme }) => `3px ${theme.spacings.smallest} 0 0`};
`;
const Separator = styled.View`
    background-color: ${({ theme }) => theme.colors.primary};
    height: 1px;
    margin-right: 11px;
    width: 24px;
`;

export { Container, Separator };
