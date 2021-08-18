import * as React from 'react';
import { View } from 'react-native';

import { FormScreen, PageTransition } from '#components';

type Props = {
    navigation: Screen.DesktopBottomTab.CreateGalerieNavigationProp;
};

const CreateGalerieScreen = ({ navigation }: Props) => {
    const handlePressReturn = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, [navigation]);

    return (
        <PageTransition
            render={({ handleClose }) => (
                <FormScreen
                    body={<View></View>}
                    title="create galerie"
                    handleOnPressReturn={() => {
                        handleClose();
                        handlePressReturn();
                    }}
                />
            )}
        />
    );
};

export default CreateGalerieScreen;
