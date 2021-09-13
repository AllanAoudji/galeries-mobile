import * as React from 'react';

import { Typography } from '#components';

import { Container } from './styles';

type Props = {
    onPress: () => void;
    title: string;
};

const FooterNavigation = ({ onPress, title }: Props) => {
    return (
        <Container onPress={onPress}>
            <Typography color="primary-dark" fontFamily="light" fontSize={12}>
                {title}{' '}
            </Typography>
            <Typography color="primary-dark" fontSize={12}>
                Click here.
            </Typography>
        </Container>
    );
};

export default React.memo(FooterNavigation);
