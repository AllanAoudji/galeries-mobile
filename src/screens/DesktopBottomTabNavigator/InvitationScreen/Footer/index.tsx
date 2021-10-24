import * as React from 'react';
import { useSelector } from 'react-redux';

import { CustomButton } from '#components';
import { DeleteInvitationModalContext } from '#contexts/DeleteInvitationModalContext';
import { selectGalerie } from '#store/galeries';
import { selectMe } from '#store/me';

import { Container, DeleteButtonPlaceholder } from './styles';

type Props = {
    invitation: Store.Models.Invitation;
};

const Footer = ({ invitation }: Props) => {
    const { handleOpenModal } = React.useContext(DeleteInvitationModalContext);

    const galerieSelector = React.useMemo(
        () => selectGalerie(invitation.galerieId),
        [invitation]
    );
    const galerie = useSelector(galerieSelector);
    const me = useSelector(selectMe);

    const showDeleteButton = React.useMemo(() => {
        if (!galerie || !me) return false;
        if (galerie.role === 'user') return false;
        if (invitation.userId !== me.id) return false;
        return true;
    }, [galerie, invitation, me]);

    const handlePress = React.useCallback(
        () => handleOpenModal(invitation.id),
        [invitation]
    );

    return (
        <Container>
            {showDeleteButton ? (
                <CustomButton onPress={handlePress} title="delete invitation" />
            ) : (
                <DeleteButtonPlaceholder />
            )}
        </Container>
    );
};

export default Footer;
