import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

import { CustomButton, OptionSlice } from '#components';

const DeleteAccount = () => {
    const navigation =
        useNavigation<Screen.SettingsStack.SettingsFieldsScreenNavigationProp>();

    const handlePress = React.useCallback(() => {
        navigation.navigate('DeleteAccount');
    }, [navigation]);

    return (
        <OptionSlice
            subTitle="Once you delete your account, there is no going back. Please be certain."
            title="delete account"
            titleColor="danger"
        >
            <CustomButton
                color="danger"
                mt="smallest"
                onPress={handlePress}
                title="delete account"
            />
        </OptionSlice>
    );
};

export default DeleteAccount;
