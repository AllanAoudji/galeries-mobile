export default (value: number, lowerBound: number, upperBound: number) => {
    'worklet';

    return Math.min(Math.max(lowerBound, value), upperBound);
};
