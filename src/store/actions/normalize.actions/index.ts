export const NORMALIZE = 'NORMALIZE';

type Data =
    | (Store.Models.Galerie & { id: string })
    | (Store.Models.Galerie & { id: string })[];

export const normalizeData: ({
    data,
    meta,
}: {
    data: Data;
    meta: Store.Meta;
}) => Store.Action = ({ data, meta }) => ({
    payload: {
        data,
        meta,
    },
    type: `${NORMALIZE} ${meta.entity || '[ENTITY NOT FOUND]'}`,
});
