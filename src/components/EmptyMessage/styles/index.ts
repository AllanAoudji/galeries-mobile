import styled from 'styled-components/native';

type ContainerProps = {
    pb?: number;
    pt?: number;
};

const Container = styled.View<ContainerProps>`
    align-items: center;
    flex: 1;
    justify-content: center;
    padding: ${({ pb, pt, theme }) =>
        `${pt || 0}px ${theme.spacings.normal} ${pb || 0}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
