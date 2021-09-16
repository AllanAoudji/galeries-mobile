import * as React from 'react';
import { useWindowDimensions } from 'react-native';

import { LinearGradiantContainer, ViewContainer } from './styles';

type Props = {
    colors: string;
};

const Container: React.FC<Props> = ({ children, colors }) => {
    const dimension = useWindowDimensions();

    const imageContainer = React.useMemo(() => {
        const cols = colors.split(',');
        if (cols.length === 0)
            return (
                <ViewContainer height={dimension.width}>
                    {children}
                </ViewContainer>
            );
        if (cols.length === 1)
            return (
                <ViewContainer color={cols[0]} height={dimension.width}>
                    {children}
                </ViewContainer>
            );
        return (
            <LinearGradiantContainer
                colors={[cols[0], cols[1]]}
                height={dimension.width}
            >
                {children}
            </LinearGradiantContainer>
        );
    }, [colors, dimension]);

    return imageContainer;
};

export default Container;
