import * as React from 'react';

import Pictogram from '#components/Pictogram';

import { Container } from './styles';

type Props = {
    checked: boolean;
    disable?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
};

const CheckBox = ({ checked, disable, mb, ml, mr, mt }: Props) => {
    return (
        <Container
            checked={checked}
            disable={disable}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
        >
            {checked && (
                <Pictogram
                    color="secondary-light"
                    size="small"
                    variant="valid"
                />
            )}
        </Container>
    );
};

export default CheckBox;
