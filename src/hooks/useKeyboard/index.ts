import * as React from 'react';
import { Keyboard, KeyboardEventListener, ScreenRect } from 'react-native';

const emptyCoordinates = Object.freeze({
    height: 0,
    screenX: 0,
    screenY: 0,
    width: 0,
});
const initialValue = {
    start: emptyCoordinates,
    end: emptyCoordinates,
};

const useKeyboard = () => {
    const [coordinates, setCoordinates] = React.useState<{
        end: ScreenRect;
        start: ScreenRect | undefined;
    }>(initialValue);
    const [keyboardHeight, setKeyboardHeight] = React.useState<number>(0);
    const [shown, setShown] = React.useState(false);

    const handleKeyboardWillShow: KeyboardEventListener = React.useCallback(
        (e) =>
            setCoordinates({
                end: e.endCoordinates,
                start: e.startCoordinates,
            }),
        []
    );
    const handleKeyboardDidShow: KeyboardEventListener = React.useCallback(
        (e) => {
            setShown(true);
            setCoordinates({
                end: e.endCoordinates,
                start: e.startCoordinates,
            });
            setKeyboardHeight(e.endCoordinates.height);
        },
        []
    );
    const handleKeyboardWillHide: KeyboardEventListener = React.useCallback(
        (e) =>
            setCoordinates({
                end: e.endCoordinates,
                start: e.startCoordinates,
            }),
        []
    );
    const handleKeyboardDidHide: KeyboardEventListener = React.useCallback(
        (e) => {
            setShown(false);
            if (e) {
                setCoordinates({
                    end: e.endCoordinates,
                    start: e.startCoordinates,
                });
            } else {
                setCoordinates(initialValue);
                setKeyboardHeight(0);
            }
        },
        []
    );

    React.useEffect(() => {
        Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
        Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
        Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide);
        Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow);

        return () => {
            Keyboard.removeListener('keyboardDidHide', handleKeyboardDidHide);
            Keyboard.removeListener('keyboardDidShow', handleKeyboardDidShow);
            Keyboard.removeListener('keyboardWillHide', handleKeyboardWillHide);
            Keyboard.removeListener('keyboardWillShow', handleKeyboardWillShow);
        };
    }, []);

    return {
        coordinates,
        keyboardHeight,
        keyboardShown: shown,
    };
};

export default useKeyboard;
