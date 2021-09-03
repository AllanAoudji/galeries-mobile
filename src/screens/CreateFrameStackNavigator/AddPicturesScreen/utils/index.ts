import { Dimensions } from 'react-native';

import convertPixelToNum from '#helpers/convertPixelToNum';
import theme from '#helpers/theme';

type Order = number;
interface Positions {
    [id: string]: Order;
}

const { width } = Dimensions.get('window');

const COL = 3;
const MARGIN = convertPixelToNum(theme.spacings.smallest);
const SIZE = (width - convertPixelToNum(theme.spacings.small) * 2) / 3 - MARGIN;

const getOrder = (x: number, y: number) => {
    'worklet';

    const col = Math.round(x / SIZE);
    const row = Math.round(y / SIZE);

    return row * COL + col;
};
const getPosition = (order: number) => {
    'worklet';

    return {
        x: (order % COL) * SIZE,
        y: Math.floor(order / COL) * SIZE,
    };
};

export { MARGIN, COL, SIZE, Positions, getPosition, getOrder };
