import styled from 'styled-components/native';

type ActiveProps = {
    value: boolean;
};

type ContainerProps = {
    disabled?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
};

const Active = styled.View<ActiveProps>`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 6px;
    height: 12px;
    opacity: ${({ value }) => (value ? 1 : 0)};
    width: 12px;
`;
const Button = styled.View`
    align-items: center;
    background-color: ${({ theme }) => theme.colors['secondary-light']};
    border-color: ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
    border-width: 2px;
    height: 24px;
    justify-content: center;
    width: 24px;
`;
const Container = styled.Pressable<ContainerProps>`
    margin-bottom: ${({ mb, theme }) => (mb ? theme.spacings[mb] : 0)};
    margin-left: ${({ ml, theme }) => (ml ? theme.spacings[ml] : 0)};
    margin-right: ${({ mr, theme }) => (mr ? theme.spacings[mr] : 0)};
    margin-top: ${({ mt, theme }) => (mt ? theme.spacings[mt] : 0)};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    padding-bottom: ${({ pb, theme }) => (pb ? theme.spacings[pb] : 0)};
    padding-left: ${({ pl, theme }) => (pl ? theme.spacings[pl] : 0)};
    padding-right: ${({ pr, theme }) => (pr ? theme.spacings[pr] : 0)};
    padding-top: ${({ pt, theme }) => (pt ? theme.spacings[pt] : 0)};
`;

export { Active, Button, Container };
