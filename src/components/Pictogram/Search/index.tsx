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

const AddSubscribeFill = ({
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
                d="M21.6659 20.02L14.9284 13.277C17.3979 10.0375 17.1504 5.401 14.1914 2.4365C12.5689 0.814 10.4404 0 8.30642 0C6.18892 0 4.07142 0.803 2.44892 2.4145C-0.801584 5.6375 -0.812584 10.879 2.42692 14.1185C4.04942 15.741 6.17792 16.555 8.31192 16.555C10.0609 16.555 11.8099 16.005 13.2784 14.9105L20.0214 21.659C20.2469 21.8845 20.5494 22 20.8464 22C21.1434 22 21.4404 21.89 21.6659 21.6645C22.1169 21.208 22.1224 20.4765 21.6659 20.02ZM4.07692 12.4795C2.94942 11.352 2.33342 9.856 2.33342 8.2665C2.33892 6.677 2.96042 5.181 4.09342 4.059C5.22092 2.937 6.71692 2.321 8.31192 2.321C9.91242 2.321 11.4139 2.9425 12.5469 4.0755C13.6744 5.203 14.2904 6.699 14.2904 8.294C14.2849 9.8835 13.6634 11.3795 12.5304 12.5015C11.4029 13.6235 9.90692 14.2395 8.31192 14.2395C6.70592 14.234 5.20442 13.6125 4.07692 12.4795Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default AddSubscribeFill;
