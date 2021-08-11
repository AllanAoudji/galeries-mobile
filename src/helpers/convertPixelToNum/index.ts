export default (pixel: string) => {
    const number = pixel.replace(/px/, '');
    if (typeof +number !== 'number') {
        throw new Error('Invilide pixel value');
    }
    return +number;
};
