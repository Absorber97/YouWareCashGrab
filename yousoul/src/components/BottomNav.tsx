import { motion } from 'framer-motion';
import { Calendar, LayoutGrid, Settings, Plus } from 'lucide-react';
import { useCapture } from '../contexts/capture-context';
import type { NavItem } from '../contexts/tab-transition-context';

interface BottomNavProps {
  activeItem: NavItem;
  onNavigate: (item: NavItem) => void;
}

const navItems: { id: NavItem; icon: typeof Calendar; label: string }[] = [
  { id: 'calendar', icon: Calendar, label: 'Calendar' },
  { id: 'board', icon: LayoutGrid, label: 'Board' },
  { id: 'settings', icon: Settings, label: 'Settings' }
];

export default function BottomNav({ activeItem, onNavigate }: BottomNavProps) {
  const { openCapture } = useCapture();

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.4 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent pointer-events-none" />
      
      <div className="relative max-w-md mx-auto px-6 pb-6 pt-4">
        <div className="flex items-center justify-around bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-2">
          {/* Calendar */}
          <NavButton
            item={navItems[0]}
            isActive={activeItem === 'calendar'}
            onClick={() => onNavigate('calendar')}
          />

          {/* Add Task Button (Center) */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => openCapture()}
            className="relative flex items-center justify-center w-14 h-14 -mt-6 rounded-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 shadow-lg shadow-pink-500/30"
          >
            <Plus size={24} className="text-white" />
          </motion.button>

          {/* Board */}
          <NavButton
            item={navItems[1]}
            isActive={activeItem === 'board'}
            onClick={() => onNavigate('board')}
          />

          {/* Settings - pushed to far right */}
          <NavButton
            item={navItems[2]}
            isActive={activeItem === 'settings'}
            onClick={() => onNavigate('settings')}
          />
        </div>
      </div>
    </motion.nav>
  );
}

interface NavButtonProps {
  item: { id: NavItem; icon: typeof Calendar; label: string };
  isActive: boolean;
  onClick: () => void;
}

function NavButton({ item, isActive, onClick }: NavButtonProps) {
  const Icon = item.icon;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        relative flex flex-col items-center gap-1 px-4 py-3 rounded-xl
        transition-all duration-200
        ${isActive 
          ? 'text-white' 
          : 'text-white/40 hover:text-white/60'}
      `}
    >
      {/* Active indicator with spring animation */}
      {isActive && (
        <motion.div
          layoutId="nav-indicator"
          className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-xl"
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
        />
      )}
      
      <Icon size={22} className="relative z-10" />
      <span className="relative z-10 text-xs font-medium">{item.label}</span>
    </motion.button>
  );
}
