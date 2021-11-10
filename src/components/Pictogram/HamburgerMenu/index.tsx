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
    large: 50,
    normal: 25,
    small: 17,
};

const HamburgerMenu = ({
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
        <Svg fill="none" height={height} viewBox="0 0 25 22" width={width}>
            <Path
                d="M0 2.222V2.2C0 0.9845 0.994444 0 2.22222 0H25V4.422H2.22222C0.994444 4.422 0 3.4375 0 2.222Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M1.66675 19.8V19.778C1.66675 18.5625 2.66119 17.578 3.88897 17.578H25.0001V22H3.88897C2.66119 22 1.66675 21.0155 1.66675 19.8Z"
                fill={theme.colors[color]}
            />
            <Path
                d="M4.44434 11.011V10.989C4.44434 9.7735 5.43878 8.789 6.66656 8.789H24.9999V13.211H6.66656C5.43878 13.211 4.44434 12.2265 4.44434 11.011Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(HamburgerMenu);
