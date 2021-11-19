import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography } from '#components';
import { updateFramesCurrent } from '#store/frames';
import { selectGalerie } from '#store/galeries';

import { Button } from './styles';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const ReportFrameButton = ({ frame, me }: Props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<Screen.DesktopBottomTab.FrameProp>();

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        dispatch(updateFramesCurrent(frame.id));
        navigation.navigate('ReportFrame');
    }, [frame, navigation]);

    if (!me || !galerie) return null;
    if (frame.userId === me.id) return null;
    if (galerie.role !== 'user') return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>report frame</Typography>
        </Button>
    );
};

export default React.memo(ReportFrameButton);
