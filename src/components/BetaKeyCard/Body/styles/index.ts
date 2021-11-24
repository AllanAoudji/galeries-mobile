import styled from 'styled-components/native';

const CodeContainer = styled.View`
    flex-direction: row;
    justify-content: center;
    padding-bottom: ${({ theme }) => theme.spacings.smallest};
`;
const CodeInnerContainer = styled.Pressable`
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-radius: 5px;
    padding: ${({ theme }) => `6px ${theme.spacings.smallest}`};
`;
const Container = styled.View`
    padding-right: ${({ theme }) => theme.spacings.small};
`;

export { CodeContainer, CodeInnerContainer, Container };
