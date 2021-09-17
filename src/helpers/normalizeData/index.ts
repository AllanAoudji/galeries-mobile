const normalizeData = <
    T extends
        | Store.Models.Comments
        | Store.Models.Frame
        | Store.Models.Galerie
        | Store.Models.GaleriePicture
        | Store.Models.Image
        | Store.Models.Like
        | Store.Models.User
>(
    data: T[] | T
) => {
    const allIds: string[] = [];
    const byId: { [key: string]: T } = {};

    if (Array.isArray(data)) {
        data.forEach((model) => {
            if (typeof model === 'object') {
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

export default normalizeData;
