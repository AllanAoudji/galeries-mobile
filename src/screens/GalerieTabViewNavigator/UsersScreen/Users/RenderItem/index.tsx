import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pressable } from 'react-native';
import { UserCard } from '#components';
import { getUserId, selectUser, updateUserCurrent } from '#store/users';
import { selectCurrentGalerie } from '#store/galeries';
import { selectGalerieUserRole } from '#store/galerieRoles';

type Props = {
    index: number;
    item: string;
};

const RenderItem = ({ index, item }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const galerie = useSelector(selectCurrentGalerie);

    const userSelector = React.useMemo(() => selectUser(item), [item]);
    const user = useSelector(userSelector);

    const roleSelector = React.useMemo(
        () =>
            selectGalerieUserRole(
                galerie ? galerie.id : null,
                user ? user.id : null
            ),
        [galerie, user]
    );
    const role = useSelector(roleSelector);

    const [loading, setLoading] = React.useState<boolean>(false);

    const handlePress = React.useCallback(() => {
        dispatch(updateUserCurrent(item));
        navigation.navigate('UserScreen');
    }, [item]);

    React.useEffect(() => {
        if (!user && !loading) {
            setLoading(true);
            dispatch(getUserId(item));
        }
    }, [loading, user]);

    if (!user) return null;

    return (
        <Pressable onPress={handlePress}>
            <UserCard
                color={index % 2 ? 'secondary' : 'secondary-light'}
                galerie={galerie}
                role={role}
                user={user}
            />
        </Pressable>
    );
};

export default React.memo(RenderItem);
