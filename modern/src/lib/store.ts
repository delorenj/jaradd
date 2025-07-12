import { create } from 'zustand';

export type SceneType = 'home' | 'work' | 'music';

export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  image: string;
  category: 'web' | 'mobile' | 'campaign';
  technologies: string[];
  year: number;
}

interface AppState {
  // Scene management
  currentScene: SceneType;
  isTransitioning: boolean;
  
  // Audio system
  isAudioEnabled: boolean;
  currentTrack: string | null;
  
  // Portfolio data
  portfolioItems: PortfolioItem[];
  
  // UI state
  isMenuOpen: boolean;
  isLoading: boolean;
  
  // Interactive elements
  mousePosition: { x: number; y: number };
  isInteracting: boolean;
}

interface AppActions {
  // Scene actions
  setCurrentScene: (scene: SceneType) => void;
  setTransitioning: (transitioning: boolean) => void;
  
  // Audio actions
  toggleAudio: () => void;
  setCurrentTrack: (track: string | null) => void;
  
  // Portfolio actions
  setPortfolioItems: (items: PortfolioItem[]) => void;
  
  // UI actions
  toggleMenu: () => void;
  setLoading: (loading: boolean) => void;
  
  // Interactive actions
  setMousePosition: (position: { x: number; y: number }) => void;
  setInteracting: (interacting: boolean) => void;
}

export const useAppStore = create<AppState & AppActions>((set, get) => ({
  // Initial state
  currentScene: 'home',
  isTransitioning: false,
  isAudioEnabled: false,
  currentTrack: null,
  portfolioItems: [],
  isMenuOpen: false,
  isLoading: true,
  mousePosition: { x: 0, y: 0 },
  isInteracting: false,
  
  // Actions
  setCurrentScene: (scene) => {
    set({ isTransitioning: true });
    setTimeout(() => {
      set({ currentScene: scene, isTransitioning: false });
    }, 300);
  },
  
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  
  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
  
  setCurrentTrack: (track) => set({ currentTrack: track }),
  
  setPortfolioItems: (items) => set({ portfolioItems: items }),
  
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setMousePosition: (position) => set({ mousePosition: position }),
  
  setInteracting: (interacting) => set({ isInteracting: interacting }),
}));

// Portfolio data - migrated from legacy site
export const portfolioData: PortfolioItem[] = [
  {
    id: 'sobe',
    title: 'SoBe Try A New Look',
    description: 'Interactive kiosk and iPhone app for SoBe brand experience',
    image: '/img/sobe_tryeverything.jpg',
    category: 'mobile',
    technologies: ['iOS', 'Objective-C', 'Interactive Kiosk'],
    year: 2011
  },
  {
    id: 'orbit',
    title: 'Orbit Gum Campaign',
    description: 'Digital campaign site for Orbit Gum brand',
    image: '/img/orbitgum.jpg',
    category: 'web',
    technologies: ['Flash', 'ActionScript', 'PHP'],
    year: 2010
  },
  {
    id: 'eclipse',
    title: 'Eclipse Gum / Twilight Promo',
    description: 'Promotional website for Eclipse Gum Twilight tie-in',
    image: '/img/Twilight_Eclipse_01.jpg',
    category: 'campaign',
    technologies: ['Flash', 'ActionScript', 'Video Integration'],
    year: 2010
  },
  {
    id: 'coachella',
    title: 'Coachella 5gum Promo',
    description: 'Interactive promotional site for 5gum at Coachella',
    image: '/img/coachella_5gum_01.jpg',
    category: 'campaign',
    technologies: ['Flash', 'Social Integration', 'Live Streaming'],
    year: 2011
  },
  {
    id: 'sonic',
    title: 'Sonic Burgers Contest',
    description: 'Contest platform for Sonic Drive-In promotions',
    image: '/img/sonic01.png',
    category: 'web',
    technologies: ['PHP', 'MySQL', 'Contest Management'],
    year: 2009
  },
  {
    id: 'dentsu',
    title: 'Dentsu Network',
    description: 'Corporate website and internal CMS for Dentsu advertising network',
    image: '/img/dentsu01.png',
    category: 'web',
    technologies: ['PHP', 'CMS', 'Corporate Portal'],
    year: 2008
  }
];
