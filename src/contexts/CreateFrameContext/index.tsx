import * as React from 'react';
import Animated, {
    runOnJS,
    useSharedValue,
    useAnimatedReaction,
} from 'react-native-reanimated';

export const CreateFrameContext = React.createContext<{
    addPictures: (uri: string, callBack?: () => void) => void;
    picturesUri: string[];
    positions: Animated.SharedValue<DragAndDrop.Positions>;
    removePictures: (uri: string, callback?: () => void) => void;
    switchPosition: (id: string, oldOrder: number, newOrder: number) => void;
}>({
    addPictures: () => {},
    picturesUri: [],
    positions: { value: {} },
    removePictures: () => {},
    switchPosition: () => {},
});

export const CreateFrameProvider: React.FC<{}> = ({ children }) => {
    const [picturesUri, setPicturesUri] = React.useState<string[]>([]);

    const positions = useSharedValue<DragAndDrop.Positions>({});

    const addPictures = React.useCallback(
        (uri: string, callBack?: () => void) => {
            if (Object.keys(positions.value).length < 6) {
                positions.value = {
                    ...positions.value,
                    [uri]: Object.keys(positions.value).length,
                };
            }
            if (callBack) callBack();
        },
        []
    );
    const removePictures = React.useCallback(
        (uri: string, callback?: () => void) => {
            const newPicturesUri = Object.keys(positions.value).filter(
                (pictureUri) => pictureUri !== uri
            );
            positions.value = Object.assign(
                {},
                ...newPicturesUri.map((picture, index) => ({
                    [picture]: index,
                }))
            );
            if (callback) callback();
        },
        []
    );
    const switchPosition = React.useCallback(
        (id: string, oldOrder: number, newOrder: number) => {
            'worklet';

            if (oldOrder !== newOrder) {
                const idToSwap = Object.keys(positions.value).find(
                    (key) => positions.value[key] === newOrder
                );
                if (idToSwap) {
                    const newPositions = JSON.parse(
                        JSON.stringify(positions.value)
                    );
                    newPositions[id] = newOrder;
                    newPositions[idToSwap] = oldOrder;
                    positions.value = newPositions;
                }
            }
        },
        []
    );

    useAnimatedReaction(
        () => positions.value,
        (newPositions) =>
            runOnJS(setPicturesUri)(
                Object.entries(newPositions)
                    .sort((a, b) => (a[1] > b[1] ? 1 : -1))
                    .map((item) => item[0])
            ),
        []
    );

    return (
        <CreateFrameContext.Provider
            value={{
                addPictures,
                picturesUri,
                positions,
                removePictures,
                switchPosition,
            }}
        >
            {children}
        </CreateFrameContext.Provider>
    );
};
