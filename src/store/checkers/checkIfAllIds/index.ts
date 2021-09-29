const checkIfAllIds = (payload: any) => {
    if (!Array.isArray(payload)) return false;
    let error = true;
    payload.forEach((item) => {
        if (typeof item !== 'string') {
            error = false;
        }
    });
    return error;
};

export default checkIfAllIds;
