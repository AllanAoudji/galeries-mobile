import styled from 'styled-components/native';

const Container = styled.Pressable`
    padding-right: ${({ theme }) => theme.spacings.normal};
    padding-top: ${({ theme }) => theme.spacings.small};
`;
const TitleContainer = styled.View`
    padding-bottom: 10px;
`;

export { Container, TitleContainer };
