import styled from 'styled-components/native';

type ContainerProps = {
    color: keyof Style.Colors;
};

const Container = styled.Pressable<ContainerProps>`
    background-color: ${({ color, theme }) => theme.colors[color]};
    padding: ${({ theme }) =>
        `${theme.spacings.smallest} ${theme.spacings.normal}`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
