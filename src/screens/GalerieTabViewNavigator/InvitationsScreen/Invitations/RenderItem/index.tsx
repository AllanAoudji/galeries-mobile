import * as React from 'react';
import { useSelector } from 'react-redux';

import InvitationCard from '#components/InvitationCard';
import { selectInvitation } from '#store/invitations';

type Props = {
    item: string;
};

const RenderItem = ({ item }: Props) => {
    const invitationSelector = React.useMemo(
        () => selectInvitation(item),
        [item]
    );
    const invitation = useSelector(invitationSelector);

    return <InvitationCard />;
};

export default React.memo(RenderItem);
