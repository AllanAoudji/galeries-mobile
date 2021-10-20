const uniqueArray: <T>(array: T[]) => T[] = (array: any[]) => {
    return [...new Set(array)];
};

export default uniqueArray;
