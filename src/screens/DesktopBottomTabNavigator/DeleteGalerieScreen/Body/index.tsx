import * as React from 'react';

import { FormContainer } from '#components';

import Form from './Form';
import Title from './Title';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
};

const Body = ({ galerie }: Props) => {
    return (
        <FormContainer>
            <Container>
                <Title galerie={galerie} />
                <Form galerie={galerie} />
            </Container>
        </FormContainer>
    );
};

export default Body;
