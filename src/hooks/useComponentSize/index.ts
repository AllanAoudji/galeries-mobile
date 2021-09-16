import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';

const useComponentSize = () => {
    const [size, setSize] = React.useState<{
        height: number;
        width: number;
    } | null>(null);

    const onLayout = React.useCallback((event: LayoutChangeEvent) => {
        const { height, width } = event.nativeEvent.layout;
        setSize({ height, width });
    }, []);

    return { onLayout, size };
};

export default useComponentSize;
