import * as React from 'react';
import Animated, {
    runOnJS,
    useSharedValue,
    useAnimatedReaction,
} from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { postFrame, selectFramesLoadingPost } from '#store/frames';
import CheckImageExtension from '#helpers/CheckImageExtension';

export const CreateFrameContext = React.createContext<{
    addPictures: (uri: string, callBack?: () => void) => void;
    picturesUri: string[];
    positions: Animated.SharedValue<DragAndDrop.Positions>;
    postGalerieFrame: (
        currentGalerieId: string,
        values: {
            description: string;
        }
    ) => void;
    removePictures: (uri: string, callback?: () => void) => void;
    repost: () => void;
    resetPictures: () => void;
    switchPosition: (id: string, oldOrder: number, newOrder: number) => void;
}>({
    addPictures: () => {},
    picturesUri: [],
    positions: { value: {} },
    postGalerieFrame: () => {},
    removePictures: () => {},
    repost: () => {},
    resetPictures: () => {},
    switchPosition: () => {},
});

export const CreateFrameProvider: React.FC<{}> = ({ children }) => {
    const dispatch = useDispatch();

    const [galerieId, setGalerieId] = React.useState<string | null>(null);
    const [description, setDescription] = React.useState<string | null>(null);
    const [picturesUri, setPicturesUri] = React.useState<string[]>([]);

    const positions = useSharedValue<DragAndDrop.Positions>({});

    const loading = useSelector(selectFramesLoadingPost);

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
    const postGalerieFrame = React.useCallback(
        (currentGalerieId: string, values: { description: string }) => {
            if (loading.includes('LOADING')) return;

            const formData = new FormData();
            picturesUri.forEach((pictureUri) => {
                const type = CheckImageExtension(pictureUri);
                if (type)
                    formData.append('image', {
                        // @ts-ignore
                        uri: pictureUri,
                        type,
                        name: pictureUri,
                    });
            });
            if (values.description !== '')
                formData.append('description', values.description);
            setDescription(values.description);
            setGalerieId(currentGalerieId);
            dispatch(postFrame(currentGalerieId, formData));
        },
        [loading, picturesUri]
    );
    const repost = React.useCallback(() => {
        if (picturesUri.length === 0) return;
        if (loading !== 'ERROR') return;
        if (!galerieId) return;
        const formData = new FormData();
        picturesUri.forEach((pictureUri) => {
            const type = CheckImageExtension(pictureUri);
            if (type)
                formData.append('image', {
                    // @ts-ignore
                    uri: pictureUri,
                    type,
                    name: pictureUri,
                });
        });
        if (description && description !== '')
            formData.append('description', description);
        dispatch(postFrame(galerieId, formData));
    }, [loading, picturesUri, galerieId, description]);
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
    const resetPictures = React.useCallback(() => {
        positions.value = {};
        setGalerieId(null);
        setDescription(null);
    }, []);
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
                postGalerieFrame,
                removePictures,
                repost,
                resetPictures,
                switchPosition,
            }}
        >
            {children}
        </CreateFrameContext.Provider>
    );
};
