import * as React from 'react';
import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    useWindowDimensions,
} from 'react-native';

export const CurrentGaleriePictureContext = React.createContext<{
    currentIndex: number;
    handleScroll: ({
        nativeEvent,
    }: NativeSyntheticEvent<NativeScrollEvent>) => void;
}>({
    currentIndex: 0,
    handleScroll: () => {},
});

export const CurrentGaleriePictureProvider: React.FC<{}> = ({ children }) => {
    const dimension = useWindowDimensions();
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    const handleScroll = React.useCallback(
        ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
            const index = Math.round(
                nativeEvent.contentOffset.x / dimension.width
            );
            if (index !== currentIndex) setCurrentIndex(index);
        },
        [currentIndex]
    );

    return (
        <CurrentGaleriePictureContext.Provider
            value={{ currentIndex, handleScroll }}
        >
            {children}
        </CurrentGaleriePictureContext.Provider>
    );
};
