import * as React from 'react';
import { useSelector } from 'react-redux';

import { Typography } from '#components';
import { DeleteFrameModalContext } from '#contexts/DeleteFrameModalContext';
import { selectGalerie } from '#store/galeries';

import { Button } from './styles';

type Props = {
    frame: Store.Models.Frame;
    me?: Store.Models.User;
};

const DeleteFrameButton = ({ frame, me }: Props) => {
    const { handleOpenModal } = React.useContext(DeleteFrameModalContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(frame.galerieId),
        [frame]
    );
    const galerie = useSelector(galerieSelector);

    const handlePress = React.useCallback(() => {
        handleOpenModal(frame.id);
    }, [frame]);

    if (!galerie || !me) return null;
    if (galerie.role === 'user') return null;
    if (frame.userId !== me.id) return null;

    return (
        <Button onPress={handlePress}>
            <Typography fontSize={18}>delete frame</Typography>
        </Button>
    );
};

export default React.memo(DeleteFrameButton);
