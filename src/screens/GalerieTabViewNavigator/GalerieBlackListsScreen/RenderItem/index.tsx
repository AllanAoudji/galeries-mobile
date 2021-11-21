import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Pressable } from 'react-native';
import {
    selectGalerieBlackList,
    updateGalerieBlackListsCurrent,
} from '#store/galerieBlackLists';
import { UserCard } from '#components';
import { selectUser } from '#store/users';

type Props = {
    index: number;
    item: string;
};

const RenderItem = ({ index, item }: Props) => {
    const dispatch = useDispatch();
    const navigation =
        useNavigation<Screen.DesktopBottomTab.GalerieNavigationProp>();

    const galerieBlackListSelector = React.useMemo(
        () => selectGalerieBlackList(item),
        [item]
    );
    const galerieBlackList = useSelector(galerieBlackListSelector);

    const userSelector = React.useMemo(
        () =>
            selectUser(galerieBlackList ? galerieBlackList.userId : undefined),
        [galerieBlackList]
    );
    const user = useSelector(userSelector);

    const handlePress = React.useCallback(() => {
        dispatch(updateGalerieBlackListsCurrent(item));
        navigation.navigate('UserGalerieBlackList');
    }, [item, navigation]);

    if (!user) return null;

    return (
        <Pressable onPress={handlePress}>
            <UserCard
                color={index % 2 ? 'secondary' : 'secondary-light'}
                galerieBlackList={galerieBlackList}
                user={user}
            />
        </Pressable>
    );
};

export default React.memo(RenderItem);
