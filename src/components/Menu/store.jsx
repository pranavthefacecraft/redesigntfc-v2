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