import { useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Aurora from './components/Aurora';
import Header from './components/Header';
import WelcomeHeader from './components/WelcomeHeader';
import CalendarView from './components/CalendarView';
import KanbanBoard from './components/KanbanBoard';
import SettingsPage from './components/SettingsPage';
import BottomNav from './components/BottomNav';
import FadeContent from './components/FadeContent';
import CreateItemModal from './components/CreateItemModal';
import { LoginPage } from './pages/LoginPage';
import { getGreeting } from './data/mockData';
import { useAuthStore } from './store/authStore';
import { useTasksStore } from './store/tasksStore';
import { client } from './api/client';
import { TabTransitionProvider, useTabTransition, type NavItem } from './contexts/tab-transition-context';
import { CaptureProvider, useCapture } from './contexts/capture-context';

// Camera-pan transition variants (Clarity-style)
const cameraPanVariants = {
  enter: (direction: string) => ({
    x: direction === 'left' ? '100%' : direction === 'right' ? '-100%' : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: string) => ({
    x: direction === 'left' ? '-100%' : direction === 'right' ? '100%' : 0,
    opacity: 0,
  }),
};

const cameraPanTransition = {
  x: { type: 'spring', stiffness: 300, damping: 30 },
  opacity: { duration: 0.2 },
};

function MainAppContent() {
  const [activeNav, setActiveNav] = useState<NavItem>('calendar');
  const { fetchTasks } = useTasksStore();
  const { direction, setDirection, getDirectionForNavigation } = useTabTransition();
  const { showCapture, openCapture } = useCapture();

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Handle navigation with direction tracking
  const handleNavigate = useCallback((newNav: NavItem) => {
    if (newNav === activeNav) return;
    const dir = getDirectionForNavigation(activeNav, newNav);
    setDirection(dir);
    setActiveNav(newNav);
  }, [activeNav, getDirectionForNavigation, setDirection]);

  // Get subtitle based on active nav
  const getSubtitle = () => {
    switch (activeNav) {
      case 'calendar':
        return "Here's your energy forecast";
      case 'board':
        return "Manage your tasks with intention";
      case 'settings':
        return "Make YouSoul yours";
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden pb-24">
      {/* Ambient Aurora Background - Fixed, doesn't animate */}
      <div className="fixed inset-0 pointer-events-none">
        <Aurora
          colorStops={['#F97316', '#EC4899', '#8B5CF6']}
          amplitude={1.2}
          blend={0.6}
          speed={0.3}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </div>

      {/* Main Content - Animated with camera-pan */}
      <main className="relative z-10 max-w-6xl mx-auto px-6 py-8 overflow-hidden">
        {/* Common Header - Fixed, doesn't animate with pages */}
        <Header greeting={getGreeting()} subtitle={getSubtitle()} />

        {/* Page Content with Camera-Pan Transitions */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeNav}
            custom={direction}
            variants={cameraPanVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={cameraPanTransition}
            className="will-change-transform"
          >
            {activeNav === 'calendar' && (
              <>
                <FadeContent blur duration={600}>
                  <WelcomeHeader />
                </FadeContent>
                <FadeContent blur duration={600} delay={200}>
                  <CalendarView onTaskClick={(task) => openCapture(task)} />
                </FadeContent>
              </>
            )}

            {activeNav === 'board' && (
              <>
                <FadeContent blur duration={600}>
                  <WelcomeHeader />
                </FadeContent>
                <FadeContent blur duration={600} delay={200}>
                  <KanbanBoard />
                </FadeContent>
              </>
            )}

            {activeNav === 'settings' && (
              <FadeContent blur duration={600}>
                <SettingsPage />
              </FadeContent>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation - Fixed, doesn't animate */}
      <BottomNav activeItem={activeNav} onNavigate={handleNavigate} />

      {/* Create/Edit Task Modal */}
      <AnimatePresence>
        {showCapture && <CreateItemModal />}
      </AnimatePresence>
    </div>
  );
}

function MainApp() {
  return (
    <TabTransitionProvider>
      <CaptureProvider>
        <MainAppContent />
      </CaptureProvider>
    </TabTransitionProvider>
  );
}

function App() {
  const { user, isChecking, setUser, setChecking } = useAuthStore();

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
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

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/60 animate-pulse text-lg">Loading YouSoul...</div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  return <MainApp />;
}

export default App;
