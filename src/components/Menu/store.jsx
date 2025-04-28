// store.js
import { create } from 'zustand';

export const useMenuStore = create((set) => ({
  isMenuActive: false, 
  setIsMenuActive: (isActive) => set({ isMenuActive: isActive }),
}));

export const useCubeStore = create((set) => ({
  isCubeActive: false, 
  setIsCubeActive: (isActive) => set({ isCubeActive: isActive }),
}));

export const useButtonStore = create((set) => ({
  isButtonActive: false, 
  setIsButtonActive: (isActive) => set({ isButtonActive: isActive }),
}));


export const useHomeStore = create((set) => ({
  isHomeActive: false, 
  setIsHomeActive: (isActive) => set({ isHomeActive: isActive }),
}));

export const useServicesStore = create((set) => ({
  isServicesActive: false, 
  setIsServicesActive: (isActive) => set({ isServicesActive: isActive }),
}));

export const useAgencyStore = create((set) => ({
  isAgencyActive: false, 
  setIsAgencyActive: (isActive) => set({ isAgencyActive: isActive }),
}));

export const useWorkStore = create((set) => ({
  isWorkActive: false, 
  setIsWorkActive: (isActive) => set({ isWorkActive: isActive }),
}));

export const useContactStore = create((set) => ({
  isContactusActive: false, 
  setIsContactusActive: (isActive) => set({ isContactusActive: isActive }),
}));

export const useClickStore = create((set) => ({
  clickCount: 0,
  incrementClick: () => set((state) => ({ clickCount: state.clickCount + 1 })),
  resetClicks: () => set({ clickCount: 0 }),
}));

export const useProjectsStore = create((set) => ({
  isProjectsHovered: false,
  setIsProjectsHovered: (isHovered) => set({ isProjectsHovered: isHovered }),
}));

export const useServiceStore = create((set) => ({
  isServiceHovered: false,
  setIsServiceHovered: (isHovered) => set({ isServiceHovered: isHovered }),
}));

export const useAboutStore = create((set) => ({
  isAboutHovered: false,
  setIsAboutHovered: (isHovered) => set({ isAboutHovered: isHovered }),
}));


export const useRubixStore = create((set) => ({
  isRubixActive: null, 
  setIsRubixActive: (isActive) => set({ isRubixActive: isActive }),
}));

