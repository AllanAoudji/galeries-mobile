import * as React from 'react';
import { LayoutChangeEvent } from 'react-native';

const useComponentSize = () => {
    const [size, setSize] = React.useState<{
        height: number;
        width: number;
    } | null>(null);

    const onLayout = React.useCallback((event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setSize({ width, height });
    }, []);

    return { onLayout, size };
};

export default useComponentSize;
