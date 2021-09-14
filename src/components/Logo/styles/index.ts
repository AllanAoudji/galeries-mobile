import styled, { css } from 'styled-components/native';

type baseContainerStyleProps = {
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
};

const baseContainerStyle = css<baseContainerStyleProps>`
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    padding-bottom: ${({ pb, theme }) => (pb ? theme.spacings[pb] : 0)};
    padding-left: ${({ pl, theme }) => (pl ? theme.spacings[pl] : 0)};
    padding-right: ${({ pr, theme }) => (pr ? theme.spacings[pr] : 0)};
    padding-top: ${({ pt, theme }) => (pt ? theme.spacings[pt] : 0)};
`;

const Container = styled.View`
    ${baseContainerStyle}
`;
const ContainerPressable = styled.Pressable`
    ${baseContainerStyle}
`;

export { Container, ContainerPressable };
