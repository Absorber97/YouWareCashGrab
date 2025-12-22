import { motion } from 'framer-motion';
import { Sparkles, User } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

interface HeaderProps {
  greeting: string;
  subtitle?: string;
}

export default function Header({ greeting, subtitle }: HeaderProps) {
  const { user } = useAuthStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex items-center justify-between mb-8"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-light text-white tracking-tight"
        >
          {user?.name ? `${greeting}, ${user.name.split(' ')[0]}` : greeting}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 mt-2 text-lg"
          >
            {subtitle}
          </motion.p>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-3"
      >
        {/* User avatar or icon */}
        {user && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 backdrop-blur-sm">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <User size={18} className="text-white/60" />
            )}
            <span className="text-white/80 text-sm font-medium hidden sm:block">
              {user.name || user.email}
            </span>
          </div>
        )}

        {/* YouSoul badge */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm">
          <Sparkles size={18} className="text-amber-400" />
          <span className="text-white/80 text-sm font-medium">YouSoul</span>
        </div>
      </motion.div>
    </motion.header>
  );
}
