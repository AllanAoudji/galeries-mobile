import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';

type ContainerProps = {
    colors: string;
};
type LinearGradiantImageContainerProps = {
    height: number;
};
type ViewImageContainerProps = {
    color?: string;
    height: number;
};

const LinearGradiantImageContainer = styled(
    LinearGradient
)<LinearGradiantImageContainerProps>`
    height: ${({ height }) => `${height}px`};
    width: ${({ height }) => `${height}px`};
`;
const ViewImageContainer = styled.View<ViewImageContainerProps>`
    color: ${({ color, theme }) => color || theme.colors.primary};
    height: ${({ height }) => `${height}px`};
    width: 100%;
`;

const Container: React.FC<ContainerProps> = ({ children, colors }) => {
    const dimension = useWindowDimensions();

    const imageContainer = React.useMemo(() => {
        const cols = colors.split(',');
        if (cols.length === 0)
            return (
                <ViewImageContainer height={dimension.width}>
                    {children}
                </ViewImageContainer>
            );
        if (cols.length === 1)
            return (
                <ViewImageContainer color={cols[0]} height={dimension.width}>
                    {children}
                </ViewImageContainer>
            );
        return (
            <LinearGradiantImageContainer
                colors={[cols[0], cols[1]]}
                height={dimension.width}
            >
                {children}
            </LinearGradiantImageContainer>
        );
    }, [dimension, colors]);

    return imageContainer;
};

export default Container;
