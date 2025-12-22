import { useRef, useEffect, useState } from 'react';
import { client } from '../api/client';
import { useAuthStore } from '../store/authStore';
import Aurora from '../components/Aurora';

export function LoginPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const authRenderedRef = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const { setUser } = useAuthStore();

  // Double-check session (prevent race conditions)
  useEffect(() => {
    client.auth.getSession().then((session) => {
      if (session.data?.user) {
        setUser({
          id: session.data.user.id,
          email: session.data.user.email,
          name: session.data.user.name || '',
          image: session.data.user.image,
        });
      } else {
        setIsReady(true);
      }
    });
  }, [setUser]);

  // Render managed login UI (execute only once)
  useEffect(() => {
    if (!isReady || authRenderedRef.current || !containerRef.current) return;
    authRenderedRef.current = true;

    client.auth.renderAuthUI(containerRef.current, {
      redirectTo: '/',
      onLogin: (user) => {
        setUser({
          id: user.id,
          email: user.email,
          name: user.name || '',
          image: user.image,
        });
      },
    });
  }, [isReady, setUser]);

  if (!isReady) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-white/60 animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white flex flex-col">
      {/* Aurora Background */}
      <div className="fixed inset-0 pointer-events-none">
        <Aurora
          colorStops={['#F97316', '#EC4899', '#8B5CF6']}
          amplitude={1.2}
          blend={0.6}
          speed={0.3}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f]/60 via-[#0a0a0f]/80 to-[#0a0a0f]" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">
        {/* Logo & Tagline */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent mb-3">
            YouSoul
          </h1>
          <p className="text-white/60 text-lg">
            Emotional productivity, reimagined
          </p>
        </div>

        {/* Auth Container */}
        <div
          ref={containerRef}
          className="w-full max-w-[420px]"
          style={{ minHeight: 400 }}
        />
      </div>
    </div>
  );
}
