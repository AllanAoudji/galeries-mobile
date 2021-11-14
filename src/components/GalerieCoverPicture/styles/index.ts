import styled from 'styled-components/native';

type ContainerProps = {
    borderRadius?: number;
    height?: number;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    size: number;
    width?: number;
};

const Container = styled.View<ContainerProps>`
    border-radius: ${({ borderRadius }) => `${borderRadius || 0}px`};
    height: ${({ height, size }) => `${height || size}px`};
    justify-content: center;
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    overflow: hidden;
    width: ${({ size, width }) => `${width || size}px`};
`;

// eslint-disable-next-line import/prefer-default-export
export { Container };
