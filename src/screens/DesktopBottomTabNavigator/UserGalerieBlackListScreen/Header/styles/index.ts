import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

type ProfilePictureContainerProps = {
    width: number;
};

const Container = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    margin-bottom: 80px;
`;
const CoverPictureContainer = styled.View`
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    justify-content: center;
    overflow: hidden;
`;
const LinearGradientStyle = styled(LinearGradient)`
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
    z-index: 1;
`;
const ProfilePictureContainer = styled.View<ProfilePictureContainerProps>`
    align-items: center;
    bottom: -80px;
    position: absolute;
    width: 100%;
    z-index: 10;
`;

export {
    Container,
    CoverPictureContainer,
    LinearGradientStyle,
    ProfilePictureContainer,
};
