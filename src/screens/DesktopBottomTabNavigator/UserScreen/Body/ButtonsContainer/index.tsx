import * as React from 'react';
import { CustomButton } from '#components';

import { Container } from './styles';

type Props = {
    galerie: Store.Models.Galerie;
    role?: Store.Role;
};

const handlePress = () => {};

const ButtonsContainer = ({ galerie, role }: Props) => {
    if (galerie.role === 'user') return null;

    return (
        <Container>
            {galerie.role === 'admin' && !!role && (
                <CustomButton
                    onPress={handlePress}
                    mb="smallest"
                    title={`change role for ${
                        role === 'moderator' ? 'user' : 'moderator'
                    }`}
                />
            )}
            <CustomButton
                onPress={handlePress}
                title="delete/ban user"
                variant="stroke"
            />
        </Container>
    );
};

export default ButtonsContainer;
