import isValidHexColor from '#helpers/isValidHexColor';
import theme from '#helpers/theme';

export default (defaultCoverPicture: string) => {
    const splitString = defaultCoverPicture.split(',');
    if (splitString.length >= 6) {
        const colors = splitString
            .slice(4)
            .filter((color) => isValidHexColor(color));
        return {
            endX: +splitString[2],
            endY: +splitString[3],
            startX: +splitString[0],
            startY: +splitString[1],
            colors,
        };
    }
    return {
        endX: 0.8,
        endY: 1,
        startX: 0.2,
        startY: 0,
        colors: [theme.colors.primary, theme.colors.tertiary],
    };
};
