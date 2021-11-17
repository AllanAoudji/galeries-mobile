import { StatusBar } from 'react-native';

import { GLOBAL_STYLE } from '#helpers/constants';

export default GLOBAL_STYLE.PROFILE_TAB_BAR_INFOS -
    (StatusBar.currentHeight || 0) -
    GLOBAL_STYLE.TOP_LEFT_PICTOGRAM_HEIGHT;
