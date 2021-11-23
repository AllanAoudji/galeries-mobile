import styled from 'styled-components/native';

const ButtonContainer = styled.View`
    flex-direction: row;
    justify-content: flex-end;
`;
const Container = styled.View`
    margin: ${({ theme }) => theme.spacings.normal};
`;
const TextContainer = styled.View`
    margin-bottom: ${({ theme }) => theme.spacings.large};
`;
const TitleContainer = styled.View`
    margin-bottom: ${({ theme }) => theme.spacings.smallest};
`;

export { ButtonContainer, Container, TextContainer, TitleContainer };
