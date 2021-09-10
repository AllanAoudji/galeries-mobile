import normalizeData from '#helpers/normalizeData';

export default (frames: any) => {
    const normalizedFrames: Store.Models.Frame[] = [];
    let galeriePicturesById: { [key: string]: Store.Models.GaleriePicture } =
        {};
    if (Array.isArray(frames)) {
        frames.forEach((frame) => {
            const { galeriePictures, ...rest } = frame;
            const { allIds, byId } = normalizeData(galeriePictures);
            const galeriePicturesAllIds = allIds.sort((a, b) => {
                if (!byId[a] || !byId[b]) return 0;
                return byId[a].index - byId[b].index;
            });
            const normalizedFrame = {
                ...rest,
                galeriePicturesId: galeriePicturesAllIds,
                galeriePictures: undefined,
            };
            normalizedFrames.push(normalizedFrame);
            galeriePicturesById = {
                ...galeriePicturesById,
                ...byId,
            };
        });
    } else if (typeof frames === 'object') {
        const { galeriePictures, ...rest } = frames;
        const { allIds, byId } = normalizeData(galeriePictures);
        const galeriePicturesAllIds = allIds.sort((a, b) => {
            if (!byId[a] || !byId[b]) return 0;
            return byId[a].index - byId[b].index;
        });
        const normalizedFrame = {
            ...rest,
            galeriePicturesId: galeriePicturesAllIds,
            galeriePictures: undefined,
        };
        normalizedFrames.push(normalizedFrame);
        galeriePicturesById = {
            ...galeriePicturesById,
            ...byId,
        };
    }

    return {
        normalizedFrames,
        galeriePicturesById,
    };
};
