import * as React from 'react';

import Pictogram from '#components/Pictogram';
import Typography from '#components/Typography';

import { Container, PictogramContainer, TitleContainer } from './styles';

type Props = {
    customSize: {
        height: number;
        width: number;
    };
    onPress: () => void;
    pictogram: Style.Pictograms;
    subTitle?: string;
    title: string;
};

const NavigationButton = ({
    customSize,
    onPress,
    pictogram,
    subTitle,
    title,
}: Props) => {
    return (
        <Container onPress={onPress}>
            <PictogramContainer>
                <Pictogram
                    customSize={customSize}
                    color="primary"
                    variant={pictogram}
                />
            </PictogramContainer>
            <TitleContainer>
                {subTitle && (
                    <Typography fontFamily="light" fontSize={12}>
                        {subTitle}
                    </Typography>
                )}
                <Typography fontSize={18}>{title}</Typography>
            </TitleContainer>
        </Container>
    );
};

export default NavigationButton;
