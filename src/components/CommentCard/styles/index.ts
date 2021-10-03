import styled from 'styled-components/native';

const BodyContainer = styled.View`
    flex: 1;
`;
const Container = styled.Pressable`
    flex-direction: row;
    margin: ${({ theme }) =>
        `0 ${theme.spacings.small} ${theme.spacings.smallest}`};
`;

export { BodyContainer, Container };
