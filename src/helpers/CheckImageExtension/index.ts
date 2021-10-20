export default (name: string) => {
    const extArray = name.split('.');
    if (extArray.length <= 1) return false;
    const type = extArray[extArray.length - 1];
    if (type !== 'jpeg' && type !== 'jpg' && type !== 'png' && type !== 'webp')
        return false;
    return `imagge/${type}`;
};
