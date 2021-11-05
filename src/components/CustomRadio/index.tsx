import * as React from 'react';

import { Active, Button, Container } from './styles';

type Props = {
    disabled?: boolean;
    mb?: keyof Style.Spacings;
    ml?: keyof Style.Spacings;
    mr?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onChange: () => void;
    pb?: keyof Style.Spacings;
    pl?: keyof Style.Spacings;
    pr?: keyof Style.Spacings;
    pt?: keyof Style.Spacings;
    value: boolean;
};

const CustomRadio = ({
    disabled,
    mb,
    ml,
    mr,
    mt,
    onChange,
    pb,
    pl,
    pr,
    pt,
    value,
}: Props) => {
    const handlePress = React.useCallback(() => {
        if (!disabled) onChange();
    }, [disabled, onChange]);

    return (
        <Container
            disabled={disabled}
            mb={mb}
            ml={ml}
            mr={mr}
            mt={mt}
            onPress={handlePress}
            pb={pb}
            pl={pl}
            pr={pr}
            pt={pt}
        >
            <Button>
                <Active value={value} />
            </Button>
        </Container>
    );
};

export default React.memo(CustomRadio);
