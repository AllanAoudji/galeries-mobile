import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

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

const Track = styled(Animated.View)`
    border-radius: 7px;
    height: 14px;
    width: 38px;
    margin: 4px 0;
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
const Thumb = styled(Animated.View)`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 12px;
    height: 22px;
    width: 22px;
    position: absolute;
    top: -4px;
`;

// eslint-disable-next-line import/prefer-default-export
export { Container, Thumb, Track };
