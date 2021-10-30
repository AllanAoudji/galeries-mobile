import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { useTheme } from 'styled-components/native';

import GalerieCoverPicture from '#components/GalerieCoverPicture';
import ReturnButton from '#components/ReturnButton';
import Typography from '#components/Typography';

import {
    Container,
    CoverPictureContainer,
    LinearGradientStyle,
    TitleContainer,
} from './styles';

type Props = {
    color?: keyof Style.Colors;
    galerie?: Store.Models.Galerie;
    subTitle: string;
    title: string;
};

const SubGalerieScreenHeader = ({
    color = 'black',
    galerie,
    subTitle,
    title,
}: Props) => {
    const dimension = useWindowDimensions();
    const theme = useTheme();

    const navigation =
        useNavigation<Screen.DesktopBottomTab.InvitationNavigationProp>();

    const handlePressReturn = React.useCallback(() => {
        if (navigation.canGoBack()) navigation.goBack();
        else navigation.navigate('Home');
    }, []);

    return (
        <Container>
            <ReturnButton onPress={handlePressReturn} />
            <LinearGradientStyle
                colors={['transparent', theme.colors['secondary-light']]}
            />
            <CoverPictureContainer>
                <GalerieCoverPicture galerie={galerie} />
            </CoverPictureContainer>
            <TitleContainer width={dimension.width}>
                <Typography color={color} fontSize={18}>
                    {subTitle}
                </Typography>
                <Typography color={color} fontSize={36}>
                    {title}
                </Typography>
            </TitleContainer>
        </Container>
    );
};

export default React.memo(SubGalerieScreenHeader);
