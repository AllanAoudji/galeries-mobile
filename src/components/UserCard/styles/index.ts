import styled from 'styled-components/native';

type ContainerStyle = {
    color: keyof Style.Colors;
};

const Container = styled.View<ContainerStyle>`
    align-items: center;
    flex-direction: row;
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.small}`};
    background-color: ${({ color, theme }) => theme.colors[color]};
`;
const InfoContainer = styled.View`
    margin-left: ${({ theme }) => theme.spacings.smallest};
`;

export { Container, InfoContainer };
