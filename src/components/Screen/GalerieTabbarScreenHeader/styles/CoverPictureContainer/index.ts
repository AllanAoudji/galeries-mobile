import styled from 'styled-components/native';

import { GLOBAL_STYLE } from '#helpers/constants';

// TODO: Should be a LinearGradiant
const CoverPictureContainer = styled.View`
    border-bottom-right-radius: 45px;
    height: ${() => `${GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE}px`};
    overflow: hidden;
`;

export default CoverPictureContainer;
