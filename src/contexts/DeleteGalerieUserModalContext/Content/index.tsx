import * as React from 'react';

import CustomRadio from '#components/CustomRadio';
import Typography from '#components/Typography';

import { Container, FormContainer } from './styles';

type Props = {
    onPress: () => void;
    value: boolean;
};

const Content = ({ onPress, value }: Props) => {
    return (
        <Container>
            <Typography fontFamily="bold">Black list user?</Typography>
            <FormContainer>
                <CustomRadio
                    onChange={onPress}
                    label="If you decide to black list this user, he is not gonna be able to subscribe to this galerie anymore"
                    pt="smallest"
                    pb="smallest"
                    pr="small"
                    value={value}
                />
            </FormContainer>
        </Container>
    );
};

export default React.memo(Content);
