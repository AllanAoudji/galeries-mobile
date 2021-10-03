import * as React from 'react';

import { Pictogram, Typography } from '#components';

import { Container, TitleContainer } from './style';

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
            <Pictogram
                customSize={customSize}
                color="primary"
                pr="small"
                variant={pictogram}
            />
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
