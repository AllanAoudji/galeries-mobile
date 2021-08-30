import * as React from 'react';
import { runOnJS, useSharedValue, withTiming } from 'react-native-reanimated';

import { View } from 'react-native';
import { ANIMATIONS } from '#helpers/constants';

type Modals = 'createGalerie' | 'createFrame';

export const ModalContext = React.createContext<{
    handleClose: (modal: Modals) => void;
    handleOpen: (modal: Modals) => void;
}>({
    handleClose: () => {},
    handleOpen: () => {},
});

// TODO:
// handleOpen
// switch createGalerie/createFrame
// handleClose

// Open selected modal with fadeIn Animation

export const ModalProvider: React.FC<{}> = ({ children }) => {
    const showCreateFrame = useSharedValue(0);
    const showCreateGalerie = useSharedValue(0);

    const [currentModalOpened, setCurrentModalOpened] =
        React.useState<Modals | null>(null);

    const renderModal = React.useMemo(() => {
        if (!currentModalOpened) return null;
        switch (currentModalOpened) {
            case 'createFrame':
                return <View></View>;
            case 'createGalerie':
                return <View></View>;
            default:
                return null;
        }
    }, [currentModalOpened]);

    const handleClose = React.useCallback((modal: Modals) => {
        switch (modal) {
            case 'createFrame':
                showCreateFrame.value = withTiming(
                    0,
                    ANIMATIONS.TIMING_CONFIG(),
                    (isFinished) => {
                        if (isFinished) runOnJS(setCurrentModalOpened)(null);
                    }
                );
                break;
            case 'createGalerie':
                showCreateGalerie.value = withTiming(
                    0,
                    ANIMATIONS.TIMING_CONFIG(),
                    (isFinished) => {
                        if (isFinished) runOnJS(setCurrentModalOpened)(null);
                    }
                );
                break;
            default:
                break;
        }
    }, []);
    const handleOpen = React.useCallback((modal: Modals) => {
        if (modal !== currentModalOpened) {
            if (currentModalOpened) {
                handleClose(currentModalOpened);
            }
            setCurrentModalOpened(modal);
            showModal(modal);
        }
    }, []);
    const showModal = React.useCallback((modal: Modals) => {
        switch (modal) {
            case 'createFrame':
                showCreateFrame.value = withTiming(
                    1,
                    ANIMATIONS.TIMING_CONFIG()
                );
                break;
            case 'createGalerie':
                showCreateGalerie.value = withTiming(
                    1,
                    ANIMATIONS.TIMING_CONFIG()
                );
                break;
            default:
                break;
        }
    }, []);

    return (
        <ModalContext.Provider
            value={{
                handleClose,
                handleOpen,
            }}
        >
            {children}
            {renderModal}
        </ModalContext.Provider>
    );
};
