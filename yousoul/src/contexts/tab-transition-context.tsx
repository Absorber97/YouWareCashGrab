import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

type Direction = 'left' | 'right' | 'none';
type NavItem = 'calendar' | 'board' | 'settings';

interface TabTransitionContextType {
  direction: Direction;
  setDirection: (dir: Direction) => void;
  getDirectionForNavigation: (from: NavItem, to: NavItem) => Direction;
}

const TabTransitionContext = createContext<TabTransitionContextType | null>(null);

const TAB_INDICES: Record<NavItem, number> = {
  calendar: 0,
  board: 1,
  settings: 2,
};

export function TabTransitionProvider({ children }: { children: ReactNode }) {
  const [direction, setDirection] = useState<Direction>('none');

  const getDirectionForNavigation = useCallback((from: NavItem, to: NavItem): Direction => {
    const fromIndex = TAB_INDICES[from];
    const toIndex = TAB_INDICES[to];
    if (toIndex > fromIndex) return 'left';
    if (toIndex < fromIndex) return 'right';
    return 'none';
  }, []);

  return (
    <TabTransitionContext.Provider value={{ direction, setDirection, getDirectionForNavigation }}>
      {children}
    </TabTransitionContext.Provider>
  );
}

export const useTabTransition = () => {
  const context = useContext(TabTransitionContext);
  if (!context) throw new Error('useTabTransition must be used within TabTransitionProvider');
  return context;
};

export { TAB_INDICES };
export type { NavItem, Direction };
