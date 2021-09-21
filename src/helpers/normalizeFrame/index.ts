import normalizeData from '#helpers/normalizeData';

export default (frames: any) => {
    const normalizedFrames: Store.Models.Frame[] = [];
    if (Array.isArray(frames)) {
        frames.forEach((frame) => {
            const normalizedFrame = {
                ...frame,
                comments: {
                    end: false,
                    status: 'PENDING',
                },
                likes: {
                    end: false,
                    status: 'PENDING',
                },
            };
            normalizedFrames.push(normalizedFrame);
        });
    } else if (typeof frames === 'object') {
        const normalizedFrame = {
            ...frames,
            comments: {
                end: false,
                status: 'PENDING',
            },
            galeriePictures: undefined,
            likes: {
                end: false,
                status: 'PENDING',
            },
        };
        normalizedFrames.push(normalizedFrame);
    }

    const normalize = normalizeData(normalizedFrames);

    return normalize;
};
