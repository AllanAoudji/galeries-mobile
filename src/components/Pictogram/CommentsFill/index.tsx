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
                d="M20.35 0H1.65C0.737 0 0 0.737738 0 1.65165V14.452C0 15.3659 0.737 16.1036 1.65 16.1036H16.929L22 22V1.65165C22 0.737738 21.263 0 20.35 0ZM4.6585 4.96596C4.8675 4.75675 5.1535 4.63013 5.4725 4.63013H16.5275C17.1655 4.63013 17.6825 5.14765 17.6825 5.78629C17.6825 6.1056 17.556 6.39189 17.3415 6.6011C17.1325 6.81031 16.8465 6.94244 16.5275 6.94244H5.4725C4.8345 6.94244 4.3175 6.42492 4.3175 5.78629C4.3175 5.46697 4.444 5.17517 4.6585 4.96596ZM12.485 10.7578C12.276 10.967 11.99 11.0991 11.6655 11.0991H5.4725C4.8345 11.0991 4.3175 10.5816 4.3175 9.94294C4.3175 9.62362 4.444 9.33183 4.6585 9.12262C4.8675 8.91341 5.1535 8.78679 5.4725 8.78679H11.6655C12.3035 8.78679 12.8205 9.3043 12.8205 9.94294C12.8205 10.2623 12.694 10.5486 12.485 10.7578ZM16.3075 11.2918C15.5485 11.2918 14.9325 10.6752 14.9325 9.91541C14.9325 9.15565 15.5485 8.53904 16.3075 8.53904C17.0665 8.53904 17.6825 9.15565 17.6825 9.91541C17.6825 10.6752 17.0665 11.2918 16.3075 11.2918Z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
};

export default AddSubscribeFill;
