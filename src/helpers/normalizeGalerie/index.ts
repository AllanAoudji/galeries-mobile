export default (galerie: any) => ({
    ...galerie,
    frames: {
        end: false,
        status: 'PENDING',
    },
    users: {
        end: false,
        status: 'PENDING',
    },
});
