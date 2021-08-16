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

const TicketStroke = ({
    color = 'black',
    customSize,
    size = 'normal',
}: Props) => {
    const theme = useTheme();
    let height: number = defaultHeight[size];
    let width: number = defaultWidth[size];

    if (customSize) {
        height = customSize.height;
        width = customSize.width;
    }

    return (
        <Svg fill="none" height={height} viewBox="0 0 20 22" width={width}>
            <Path
                d="M18.3333 0H1.66667C0.744444 0 0 0.737 0 1.65V15.4935C0 15.785 0.116667 16.0655 0.327778 16.269L5.78889 21.6755C6 21.8845 6.27778 22 6.57222 22H18.3333C19.2556 22 20 21.263 20 20.35V1.65C20 0.737 19.2556 0 18.3333 0ZM2.33333 15.543L6.55556 15.5375V19.69H6.52222L2.33333 15.543ZM17.6667 19.69H8.33333V15.4275C8.33333 14.5145 7.58889 13.7775 6.66667 13.7775H2.33333V2.31H17.6667V19.69Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M14.6667 6.215H5.33333C4.87222 6.215 4.5 5.8465 4.5 5.39C4.5 4.9335 4.87222 4.565 5.33333 4.565H14.6667C15.1278 4.565 15.5 4.9335 15.5 5.39C15.5 5.8465 15.1278 6.215 14.6667 6.215Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M14.6667 10.505H5.33333C4.87222 10.505 4.5 10.1365 4.5 9.67998C4.5 9.22348 4.87222 8.85498 5.33333 8.85498H14.6667C15.1278 8.85498 15.5 9.22348 15.5 9.67998C15.5 10.1365 15.1278 10.505 14.6667 10.505Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M14.6666 14.795H10.9444C10.4833 14.795 10.1111 14.4265 10.1111 13.97C10.1111 13.5135 10.4833 13.145 10.9444 13.145H14.6666C15.1277 13.145 15.5 13.5135 15.5 13.97C15.5 14.4265 15.1277 14.795 14.6666 14.795Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default TicketStroke;
