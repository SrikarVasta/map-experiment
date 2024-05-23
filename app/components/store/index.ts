import create from 'zustand';

const useMapStore = create((set) => ({
  map: null,
  setMap: (map) => set({ map }),
  isPanelOpen: false,
  togglePanel: () => set((state) => ({ isPanelOpen: !state.isPanelOpen })),
  drawType: 'None',
  setDrawType: (type) => set({ drawType: type }),
}));

export default useMapStore;