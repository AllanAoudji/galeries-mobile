import styled from 'styled-components/native';

const Container = styled.Pressable`
    align-items: center;
    align-self: flex-start;
    flex-direction: row;
    padding: ${({ theme }) => ` 4px ${theme.spacings.smallest} 2px 0`};
`;
const TimeContainer = styled.View`
    margin-right: ${({ theme }) => theme.spacings.smallest};
    opacity: 0.8;
`;

export { Container, TimeContainer };
