import * as React from 'react';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import { Container } from './styles';

type Props = {
    mb?: keyof Style.Spacings;
    mt?: keyof Style.Spacings;
    onPress: () => void;
    pictogram?: Style.Pictograms;
    title: string;
};

const ModerationNavigationButton = ({
    mb,
    mt,
    onPress,
    pictogram,
    title,
}: Props) => {
    return (
        <Container mb={mb} mt={mt} onPress={onPress}>
            {!!pictogram && (
                <Pictogram color="primary" mb="smallest" variant={pictogram} />
            )}
            <Typography color="primary" fontFamily="bold" fontSize={18}>
                {title.toUpperCase()}
            </Typography>
        </Container>
    );
};

export default React.memo(ModerationNavigationButton);
