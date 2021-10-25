import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CustomSwitch, Typography } from '#components';
import {
    putGalerieNotification,
    selectGaleriesLoadingPut,
} from '#store/galeries';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const AllowNotification = ({ galerie }: Props) => {
    const dispatch = useDispatch();

    const loading = useSelector(selectGaleriesLoadingPut);

    const [value, setValue] = React.useState<boolean>(
        galerie.allowNotification
    );
    const handleChange = React.useCallback(() => {
        if (!galerie || loading.includes('LOADING')) return;
        setValue((prevState) => !prevState);
        dispatch(putGalerieNotification(galerie.id));
    }, [galerie, loading]);

    React.useEffect(() => {
        setValue(galerie.allowNotification);
    }, [galerie]);

    return (
        <Container>
            <Typography>Allow notification for this galerie?</Typography>
            <CustomSwitch
                onChange={handleChange}
                pb="smallest"
                pr="small"
                pl="smallest"
                pt="smallest"
                value={value}
            />
        </Container>
    );
};

export default AllowNotification;
