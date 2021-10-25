import * as React from 'react';
import { Switch } from 'react-native';

import { Typography } from '#components';

type Props = {
    galerie: Store.Models.Galerie;
};

const AllowNotification = ({ galerie }: Props) => {
    const [value, setValue] = React.useState<boolean>(
        galerie.allowNotification
    );
    const handleChange = React.useCallback(() => {
        if (!galerie) return;
        setValue((prevState) => !prevState);
    }, [galerie]);

    return (
        <>
            <Switch value={value} onChange={handleChange} />
            <Typography>allow notification for this galerie</Typography>
        </>
    );
};

export default AllowNotification;
