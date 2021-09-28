const checkIfStatus = (payload: any) => {
    if (typeof payload !== 'string') return false;
    if (
        payload === 'ERROR' ||
        payload === 'INITIAL_LOADING' ||
        payload === 'LOADING' ||
        payload === 'PENDING' ||
        payload === 'SUCCESS'
    )
        return true;
    return false;
};

export default checkIfStatus;
