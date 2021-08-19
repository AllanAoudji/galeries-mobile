export const NORMALIZE = 'NORMALIZE';

type Data =
    | (Store.Models.Galerie & { id: string })
    | (Store.Models.Galerie & { id: string })[];

export const normalizeData: (data: Data, entity: Store.Entity) => Store.Action =
    (data, entity) => ({
        payload: {
            data,
            meta: {
                entity,
            },
        },
        type: `${NORMALIZE} ${entity}`,
    });
