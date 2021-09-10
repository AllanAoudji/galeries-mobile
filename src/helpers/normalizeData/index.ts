export default (data: any) => {
    const allIds: string[] = [];
    const byId: { [key: string]: any } = {};

    if (Array.isArray(data)) {
        data.forEach((model) => {
            if (typeof data === 'object') {
                const { id } = model;
                if (typeof id === 'string' && id !== '') {
                    allIds.push(id);
                    byId[id] = model;
                }
            }
        });
    } else if (typeof data === 'object') {
        const { id } = data;
        if (typeof id === 'string' && id !== '') {
            allIds.push(id);
            byId[id] = data;
        }
    }

    return { allIds, byId };
};
