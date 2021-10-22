import * as React from 'react';

import { CheckBox, Typography } from '#components';

import { Container } from './styles';

const CreateInvitationScreen = () => {
    const [checked, setChecked] = React.useState<boolean>(false);

    const handlePress = React.useCallback(
        () => setChecked((prevState) => !prevState),
        []
    );

    return (
        <Container>
            <Typography>create invitation screen</Typography>
            <CheckBox checked={checked} onPress={handlePress} />
        </Container>
    );
};

export default CreateInvitationScreen;
