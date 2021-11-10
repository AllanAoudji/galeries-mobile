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
    large: 40,
    normal: 20,
    small: 14,
};

const TicketFill = ({
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
        <Svg fill="none" height={height} viewBox="0 0 20 22" width={width}>
            <Path
                d="M0 15.5375C0.0111111 15.8125 0.127778 16.0765 0.322222 16.2745L5.78333 21.681C5.98889 21.8845 6.26667 22 6.55556 22V15.5375H0ZM18.3333 0H1.66667C0.744444 0 0 0.737 0 1.65V13.7775H6.66667C7.58889 13.7775 8.33333 14.5145 8.33333 15.4275V22H18.3333C19.2556 22 20 21.263 20 20.35V1.65C20 0.737 19.2556 0 18.3333 0ZM15.2556 14.553C15.1056 14.7015 14.8944 14.795 14.6667 14.795H10.9444C10.4833 14.795 10.1111 14.4265 10.1111 13.97C10.1111 13.7445 10.2056 13.5355 10.3556 13.387C10.5056 13.2385 10.7167 13.145 10.9444 13.145H14.6667C15.1278 13.145 15.5 13.5135 15.5 13.97C15.5 14.1955 15.4056 14.4045 15.2556 14.553ZM15.2556 10.263C15.1056 10.4115 14.8944 10.505 14.6667 10.505H5.33333C4.87222 10.505 4.5 10.1365 4.5 9.68C4.5 9.4545 4.59444 9.2455 4.74444 9.097C4.89444 8.9485 5.10556 8.855 5.33333 8.855H14.6667C15.1278 8.855 15.5 9.2235 15.5 9.68C15.5 9.9055 15.4056 10.1145 15.2556 10.263ZM15.2556 5.973C15.1056 6.1215 14.8944 6.215 14.6667 6.215H5.33333C4.87222 6.215 4.5 5.8465 4.5 5.39C4.5 5.1645 4.59444 4.9555 4.74444 4.807C4.89444 4.6585 5.10556 4.565 5.33333 4.565H14.6667C15.1278 4.565 15.5 4.9335 15.5 5.39C15.5 5.6155 15.4056 5.8245 15.2556 5.973Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(TicketFill);
