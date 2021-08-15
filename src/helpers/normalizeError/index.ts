export default (error: string | undefined) => {
    if (!error) {
        return null;
    }
    const capitalizeError = error[0].toUpperCase() + error.slice(1);
    const capitalizeErrorWithDot = capitalizeError.endsWith('.')
        ? capitalizeError
        : `${capitalizeError}.`;
    return capitalizeErrorWithDot;
};
