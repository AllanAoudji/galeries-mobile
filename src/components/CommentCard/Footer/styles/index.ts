import styled from 'styled-components/native';

const Container = styled.Pressable`
    align-items: center;
    align-self: flex-start;
    flex-direction: row;
    padding: ${({ theme }) => ` 4px ${theme.spacings.smallest} 2px 0`};
`;
const TimeContainer = styled.View`
    opacity: 0.8;
    margin-right: ${({ theme }) => theme.spacings.smallest};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, TimeContainer };
