import * as React from 'react';
import { Svg, Path } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

type Props = {
    color?: keyof Style.Colors;
    customSize?: {
        height: number;
        width: number;
    };
    size?: Style.Variant.Pictogram;
};

const defaultHeight = {
    large: 44,
    normal: 22,
    small: 15,
};
const defaultWidth = {
    large: 44,
    normal: 22,
    small: 15,
};

const GaleriesFill = ({
    color = 'black',
    customSize,
    size = 'normal',
}: Props) => {
    const theme = useTheme();
    const height = React.useMemo(() => {
        if (customSize) return customSize.height;
        return defaultHeight[size];
    }, [customSize, size]);
    const width = React.useMemo(() => {
        if (customSize) return customSize.width;
        return defaultWidth[size];
    }, [customSize, size]);

    return (
        <Svg fill="none" height={height} viewBox="0 0 22 22" width={width}>
            <Path
                d="M10.1752 0V9.262H0.000244141V4.147C0.000244141 1.859 1.84824 0 4.12524 0H10.1752Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M0.000244141 10.923H10.1752V20.185H4.12524C1.84824 20.185 0.000244141 18.326 0.000244141 16.038V10.923Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M22.0002 4.147V9.262H11.8252V0H17.8752C20.1522 0 22.0002 1.859 22.0002 4.147Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M21.4504 22H11.2754V20.603C11.2754 14.949 15.8294 10.373 21.4504 10.373V22Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default GaleriesFill;
