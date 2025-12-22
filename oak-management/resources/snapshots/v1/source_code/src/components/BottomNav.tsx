import { motion } from 'framer-motion';
import { Calendar, LayoutGrid, Settings } from 'lucide-react';

type NavItem = 'calendar' | 'board' | 'settings';

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
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;

            return (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate(item.id)}
                className={`
                  relative flex flex-col items-center gap-1 px-6 py-3 rounded-xl
                  transition-all duration-200
                  ${isActive 
                    ? 'text-white' 
                    : 'text-white/40 hover:text-white/60'}
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-pink-500/20 to-purple-500/20 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                
                <Icon size={22} className="relative z-10" />
                <span className="relative z-10 text-xs font-medium">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
