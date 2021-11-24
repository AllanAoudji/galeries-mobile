import * as React from 'react';

import Typography from '#components/Typography';

import {
    Container,
    Separator,
    SeparatorContainer,
    SubTitleContainer,
    TitleContainer,
} from './styles';

type Props = {
    mt?: keyof Style.Spacings;
    separaror?: boolean;
    subTitle?: string;
    title: string;
    titleColor?: keyof Style.Colors;
};

const OptionSlice: React.FC<Props> = ({
    children,
    mt,
    separaror = false,
    subTitle,
    title,
    titleColor = 'primary',
}) => {
    return (
        <Container mt={mt} separator={separaror}>
            <TitleContainer>
                <Typography
                    color={titleColor}
                    fontFamily="bold"
                    fontSize={18}
                    textAlign="right"
                >
                    {title.toUpperCase()}
                </Typography>
            </TitleContainer>
            {!!subTitle && (
                <SubTitleContainer>
                    <Typography>{subTitle}</Typography>
                </SubTitleContainer>
            )}
            {children}
            {separaror && (
                <SeparatorContainer>
                    <Separator />
                </SeparatorContainer>
            )}
        </Container>
    );
};

export default OptionSlice;
