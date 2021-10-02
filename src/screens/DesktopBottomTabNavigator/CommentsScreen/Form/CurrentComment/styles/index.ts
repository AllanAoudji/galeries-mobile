import styled from 'styled-components/native';

const Container = styled.Pressable`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-right: ${({ theme }) => theme.spacings.small};
    padding-top: ${({ theme }) => theme.spacings.smallest};
`;
const TypographyContainer = styled.View`
    opacity: 0.6;
    flex-direction: row;
`;

export { Container, TypographyContainer };
