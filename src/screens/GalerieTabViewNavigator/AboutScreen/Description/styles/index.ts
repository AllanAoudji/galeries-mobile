import styled from 'styled-components/native';

const Container = styled.View`
    padding-top: ${({ theme }) => theme.spacings.small};
`;
const TitleContainer = styled.View`
    padding-bottom: 10px;
`;

export { Container, TitleContainer };
