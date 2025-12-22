import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Aurora from './components/Aurora';
import Header from './components/Header';
import WelcomeHeader from './components/WelcomeHeader';
import CalendarView from './components/CalendarView';
import KanbanBoard from './components/KanbanBoard';
import SettingsPage from './components/SettingsPage';
import BottomNav from './components/BottomNav';
import FadeContent from './components/FadeContent';
import { LoginPage } from './pages/LoginPage';
import { getGreeting } from './data/mockData';
import { useAuthStore } from './store/authStore';
import { useTasksStore } from './store/tasksStore';
import { client } from './api/client';

type NavItem = 'calendar' | 'board' | 'settings';

function MainApp() {
  const [activeNav, setActiveNav] = useState<NavItem>('calendar');
  const { fetchTasks } = useTasksStore();

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden pb-24">
      {/* Ambient Aurora Background */}
      <div className="fixed inset-0 pointer-events-none">
        <Aurora
          colorStops={['#F97316', '#EC4899', '#8B5CF6']}
          amplitude={1.2}
          blend={0.6}
          speed={0.3}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Common Header */}
        <Header
          greeting={getGreeting()}
          subtitle={
            activeNav === 'calendar' 
              ? "Here's your energy forecast" 
              : activeNav === 'board'
              ? "Manage your tasks with intention"
              : "Make YouSoul yours"
          }
        />

        {/* Page Content */}
        <AnimatePresence mode="wait">
          {activeNav === 'calendar' && (
            <motion.div
              key="calendar"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <FadeContent blur duration={600}>
                <WelcomeHeader />
              </FadeContent>
              <FadeContent blur duration={600} delay={200}>
                <CalendarView />
              </FadeContent>
            </motion.div>
          )}

          {activeNav === 'board' && (
            <motion.div
              key="board"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <FadeContent blur duration={600}>
                <WelcomeHeader />
              </FadeContent>
              <FadeContent blur duration={600} delay={200}>
                <KanbanBoard />
              </FadeContent>
            </motion.div>
          )}

          {activeNav === 'settings' && (
            <motion.div
              key="settings"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <FadeContent blur duration={600}>
                <SettingsPage />
              </FadeContent>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeItem={activeNav} onNavigate={setActiveNav} />
    </div>
  );
}

function App() {
  const { user, isChecking, setUser, setChecking } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    // Skip network request if user exists locally
    if (useAuthStore.getState().user) {
      setChecking(false);
      return;
    }

    try {
      const session = await client.auth.getSession();
      if (session.data?.user) {
        setUser({
          id: session.data.user.id,
          email: session.data.user.email,
          name: session.data.user.name || '',
          image: session.data.user.image,
        });
      }
    } finally {
      setChecking(false);
    }
  }

  // Show loading while checking session
  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/60 animate-pulse text-lg">Loading YouSoul...</div>
      </div>
    );
  }

  // Show login if not authenticated
  if (!user) {
    return <LoginPage />;
  }

  // Show main app
  return <MainApp />;
}

export default App;
