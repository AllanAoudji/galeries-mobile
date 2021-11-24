const checkIfSigninFieldsError = (payload: any) => {
    if (typeof payload !== 'object') return false;
    if (typeof payload.betaKey !== 'string' && payload.betaKey !== undefined)
        return false;
    if (
        typeof payload.confirmPassword !== 'string' &&
        payload.confirmPassword !== undefined
    )
        return false;
    if (typeof payload.email !== 'string' && payload.email !== undefined)
        return false;
    if (typeof payload.password !== 'string' && payload.password !== undefined)
        return false;
    if (typeof payload.userName !== 'string' && payload.userName !== undefined)
        return false;
    return true;
};

export default checkIfSigninFieldsError;
