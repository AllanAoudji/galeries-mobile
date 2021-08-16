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

const SettingsFill = ({
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
                d="M1.8205 11.374L0 10.2245L0.984499 6.3635L3.135 6.2315L3.7235 5.368L3.069 3.311L3.6795 2.871C4.5045 2.277 4.6365 2.1835 5.192 1.782L6.303 0.9845L8.03 2.277L9.031 1.9965L9.8505 0L13.816 0.3025L14.3165 2.398C14.6575 2.552 14.9215 2.673 15.2625 2.827L17.171 1.826L20.0145 4.6145L19.052 6.545L19.503 7.4855L21.6095 7.942L21.714 9.031C21.802 9.955 21.813 10.0265 21.923 11.154L22 11.9075L20.0255 12.7655C19.932 13.1285 19.8605 13.4145 19.767 13.7775L21.087 15.4825L20.6635 16.104C20.163 16.841 20.0255 17.0335 19.745 17.4515L18.843 18.7715L16.775 18.1665L15.928 18.7715L15.8455 20.9275L14.7785 21.2245C13.904 21.472 13.827 21.494 12.738 21.7965L12.012 22L10.824 20.2015C10.45 20.174 10.1585 20.152 9.7845 20.1245L8.338 21.7195L7.007 21.1145C6.457 20.867 6.2755 20.7845 5.401 20.383L4.719 20.0695L4.961 17.9245C4.6915 17.6605 4.4825 17.457 4.2185 17.193L2.0845 17.4845L0.363001 13.893L1.925 12.408L1.8205 11.374ZM11 14.465C12.9085 14.465 14.4595 12.914 14.4595 11C14.4595 9.086 12.9085 7.535 11 7.535C9.0915 7.535 7.5405 9.086 7.5405 11C7.5405 12.914 9.0915 14.465 11 14.465Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default SettingsFill;
