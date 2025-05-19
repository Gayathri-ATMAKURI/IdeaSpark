import { create } from 'zustand';

export interface SavedIdea {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
  savedAt: Date;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  category: string;
  color: string;
}

interface IdeaStore {
  savedIdeas: SavedIdea[];
  viewedIdeaIds: number[];
  addIdea: (idea: Idea) => void;
  removeIdea: (id: number) => void;
  clearIdeas: () => void;
  addViewedIdea: (id: number) => void;
  clearViewedIdeas: () => void;
}

const useIdeaStore = create<IdeaStore>((set) => ({
  savedIdeas: [],
  viewedIdeaIds: [],
  addIdea: (idea) => set((state) => ({
    savedIdeas: [...state.savedIdeas, { ...idea, savedAt: new Date() }]
  })),
  removeIdea: (id) => set((state) => ({
    savedIdeas: state.savedIdeas.filter((idea) => idea.id !== id)
  })),
  clearIdeas: () => set({ savedIdeas: [] }),
  addViewedIdea: (id) => set((state) => ({
    viewedIdeaIds: [...state.viewedIdeaIds, id]
  })),
  clearViewedIdeas: () => set({ viewedIdeaIds: [] })
}));

export default useIdeaStore; 