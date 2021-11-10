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
    large: 36,
    normal: 18,
    small: 12,
};

const LogoutLeft = ({
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
        <Svg fill="none" height={height} width={width} viewBox="0 0 22 22">
            <Path
                d="M6.5518 18.7935C6.38976 18.7935 6.22772 18.7825 6.06567 18.7605V20.625C6.06567 21.384 6.67063 22 7.41603 22H20.6496C21.395 22 21.9999 21.384 21.9999 20.625V1.375C21.9999 0.616 21.395 0 20.6496 0H7.41603C6.67063 0 6.06567 0.616 6.06567 1.375V3.267C6.22772 3.245 6.38436 3.234 6.5518 3.234C7.18917 3.234 7.80494 3.4155 8.33428 3.751V2.31H19.7313V19.69H8.33428V18.282C7.81034 18.612 7.18917 18.7935 6.5518 18.7935Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M0 11.0165L5.80654 5.83001C5.88757 5.75851 5.97939 5.69801 6.07121 5.65401C6.22246 5.58251 6.3899 5.54401 6.55734 5.54401C6.87063 5.54401 7.18931 5.67601 7.41077 5.94001C7.82128 6.41851 7.77807 7.15001 7.30274 7.56801L6.07121 8.66251L4.74246 9.84501H13.7413C14.3678 9.84501 14.8756 10.362 14.8756 11C14.8756 11.319 14.7459 11.605 14.5461 11.8195C14.3408 12.0285 14.0545 12.155 13.7413 12.155H4.71545L6.07121 13.365L7.30274 14.4595C7.77267 14.8775 7.82128 15.609 7.41077 16.0875C7.18931 16.3515 6.87063 16.4835 6.55734 16.4835C6.3899 16.4835 6.22786 16.445 6.07121 16.3735C5.97939 16.3295 5.88757 16.269 5.80654 16.1975L0 11.0165Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(LogoutLeft);
