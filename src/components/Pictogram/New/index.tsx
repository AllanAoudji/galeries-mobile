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
    large: 124,
    normal: 62,
    small: 42,
};

const New = ({ color = 'black', customSize, size = 'normal' }: Props) => {
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
        <Svg fill="none" height={height} viewBox="0 0 62 22" width={width}>
            <Path
                d="M52.9578 0L50.3454 6.19797L49.7254 0H43.191L40.3906 6.21891L40.0631 1.93338L39.9169 0H13.7654L12.804 5.54886L9.9827 0H3.91506L0 22H8.28989L9.29303 16.4093L12.1353 22H41.6863L43.7553 17.4004L44.229 22H52.087L62 0H52.9578ZM13.4171 19.9061L8.33865 9.90419L6.54135 19.9061H2.49393L5.6636 2.09391H8.7009L13.7863 12.0958L15.5279 2.09391H19.5753L16.4683 19.9061H13.4171ZM50.7355 19.9061H46.1169L45.051 9.45051L40.3348 19.9061H35.3957L34.2463 6.00952H25.1065L24.5771 8.98287H31.7315L32.0101 12.8008H23.9083L23.344 15.9835H32.2888L32.6371 19.9061H18.607L21.7488 2.09391H37.9802L38.9276 14.5596L44.5425 2.09391H47.8375L49.0845 14.5806L54.344 2.09391H58.7607L50.7355 19.9061Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default React.memo(New);
