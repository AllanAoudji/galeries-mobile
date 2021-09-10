export default (galerie: any) => ({
    ...galerie,
    frames: {
        allIds: [],
        end: false,
        status: 'PENDING',
    },
    users: {
        allIds: [],
        end: false,
        status: 'PENDING',
    },
});
