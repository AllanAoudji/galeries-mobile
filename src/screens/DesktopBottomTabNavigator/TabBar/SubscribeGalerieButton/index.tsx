import { BottomTabNavigationEventMap } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';
import * as React from 'react';
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';

import { BottomSheetButton } from '#components';
import { BottomSheetContext } from '#contexts/BottomSheetContext';
import { useKeyboard } from '#hooks';
import { resetGaleriesCurrent } from '#store/galeries';

type Props = {
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
};

const SubscribeGalerieButton = ({ navigation }: Props) => {
    const { keyboardShown } = useKeyboard();
    const dispatch = useDispatch();

    const { closeBottomSheet } = React.useContext(BottomSheetContext);

    const handlePress = React.useCallback(() => {
        if (keyboardShown) Keyboard.dismiss();
        else {
            closeBottomSheet();
            navigation.navigate('SubscribeGalerie');
            dispatch(resetGaleriesCurrent());
        }
    }, [keyboardShown]);

    return (
        <BottomSheetButton
            onPress={handlePress}
            title="Subscribe to a galerie"
        />
    );
};

export default React.memo(SubscribeGalerieButton);
