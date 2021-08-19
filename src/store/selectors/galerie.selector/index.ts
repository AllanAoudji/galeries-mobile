const galerieSelector: (
    id: string
) => (state: Store.Reducer) => Store.Models.Galerie | undefined =
    (id) => (state) =>
        state.galeries.byId[id];

export default galerieSelector;
