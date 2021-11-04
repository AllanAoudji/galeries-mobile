import { StatusBar } from 'react-native';

import { GLOBAL_STYLE } from '#helpers/constants';

export default GLOBAL_STYLE.GALERIE_TAB_BAR_COVER_PICTURE -
    (StatusBar.currentHeight || 0) -
    GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT;
