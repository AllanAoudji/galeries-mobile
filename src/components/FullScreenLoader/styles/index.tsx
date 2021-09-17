import styled from 'styled-components/native';

type ContainerProps = {
    color: keyof Style.Colors;
};

const Container = styled.View<ContainerProps>`
    align-items: center;
    background-color: ${({ color, theme }) => theme.colors[color]};
    bottom: 0;
    flex: 1;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
