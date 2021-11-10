import Animated from 'react-native-reanimated';
import styled from 'styled-components/native';

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
type ThumbProps = {
    size: number;
    trackHeight: number;
};
type TrackProps = {
    height: number;
    thumbSize: number;
    width: number;
};

const Track = styled(Animated.View)<TrackProps>`
    border-radius: ${({ height }) => `${height / 2}px`};
    height: ${({ height }) => `${height}px`};
    margin: ${({ height, thumbSize }) => `${(thumbSize - height) / 2}px 0`};
    width: ${({ width }) => `${width}px`};
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
const Thumb = styled(Animated.View)<ThumbProps>`
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: ${({ size }) => `${size / 2}px`};
    height: ${({ size }) => `${size}px`};
    position: absolute;
    top: ${({ size, trackHeight }) => `-${(size - trackHeight) / 2}px`};
    width: ${({ size }) => `${size}px`};
`;

export { Container, Thumb, Track };
