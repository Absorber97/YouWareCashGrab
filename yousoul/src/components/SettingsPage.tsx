import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles, Sliders, LogOut, Check, User } from 'lucide-react';
import GlassCard from './GlassCard';
import { useAuthStore } from '../store/authStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { client } from '../api/client';

// Setting option component
interface SettingOptionProps<T extends string> {
  label: string;
  description?: string;
  options: { id: T; label: string; preview?: string }[];
  value: T;
  onChange: (value: T) => void;
}

function SettingOption<T extends string>({ label, description, options, value, onChange }: SettingOptionProps<T>) {
  return (
    <div className="py-4 border-b border-white/10 last:border-0">
      <div className="mb-3">
        <h3 className="text-white font-medium">{label}</h3>
        {description && <p className="text-white/40 text-sm mt-0.5">{description}</p>}
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map(option => (
          <motion.button
            key={option.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(option.id)}
            className={`
              relative flex items-center gap-2 px-4 py-2 rounded-xl
              transition-all duration-200
              ${value === option.id
                ? 'bg-white/15 ring-1 ring-white/30'
                : 'bg-white/5 hover:bg-white/10'}
            `}
          >
            {value === option.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center"
              >
                <Check size={10} className="text-white" />
              </motion.div>
            )}
            {option.preview && <span className="text-lg">{option.preview}</span>}
            <span className="text-white/80 text-sm">{option.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const { user, reset } = useAuthStore();
  const { preferences, fetchPreferences, updatePreferences } = usePreferencesStore();
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, [fetchPreferences]);

  const handleUpdatePreference = async (key: string, value: string) => {
    setIsSaving(true);
    await updatePreferences({ [key]: value });
    setIsSaving(false);
  };

  const handleSignOut = async () => {
    await client.auth.signOut();
    reset();
  };

  const currentPrefs = preferences || {
    emojiSet: 'default',
    colorPalette: 'vibrant',
    visualizationIntensity: 'balanced',
  };

  return (
    <div className="space-y-6">
      {/* Account Info */}
      <GlassCard className="p-6" delay={0}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-blue-500/20">
            <User size={20} className="text-blue-300" />
          </div>
          <h2 className="text-white/60 text-sm uppercase tracking-wider">Account</h2>
        </div>

        <div className="flex items-center gap-4 py-4">
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="w-16 h-16 rounded-full object-cover ring-2 ring-white/20"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
              <span className="text-2xl text-white font-medium">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <div>
            <h3 className="text-white font-medium text-lg">{user?.name || 'Anonymous'}</h3>
            <p className="text-white/50 text-sm">{user?.email}</p>
          </div>
        </div>
      </GlassCard>

      {/* Emoji Set */}
      <GlassCard className="p-6" delay={0.1}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-amber-500/20">
            <Sparkles size={20} className="text-amber-300" />
          </div>
          <h2 className="text-white/60 text-sm uppercase tracking-wider">Personalization</h2>
          {isSaving && <span className="text-white/40 text-xs ml-auto">Saving...</span>}
        </div>

        <SettingOption
          label="Emoji Set"
          description="Choose how your moods are displayed"
          options={[
            { id: 'default', label: 'Default', preview: '🔥' },
            { id: 'nature', label: 'Nature', preview: '🌸' },
            { id: 'expressive', label: 'Expressive', preview: '💪' },
            { id: 'minimal', label: 'Minimal', preview: '●' }
          ]}
          value={currentPrefs.emojiSet as 'default' | 'nature' | 'expressive' | 'minimal'}
          onChange={(v) => handleUpdatePreference('emojiSet', v)}
        />
      </GlassCard>

      {/* Color Palette */}
      <GlassCard className="p-6" delay={0.2}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-pink-500/20">
            <Palette size={20} className="text-pink-300" />
          </div>
          <h2 className="text-white/60 text-sm uppercase tracking-wider">Appearance</h2>
        </div>

        <SettingOption
          label="Color Palette"
          description="Set the mood of your interface"
          options={[
            { id: 'vibrant', label: 'Vibrant' },
            { id: 'pastel', label: 'Pastel' },
            { id: 'mono', label: 'Monochrome' }
          ]}
          value={currentPrefs.colorPalette as 'vibrant' | 'pastel' | 'mono'}
          onChange={(v) => handleUpdatePreference('colorPalette', v)}
        />

        <SettingOption
          label="Visualization Intensity"
          description="How prominent are mood indicators"
          options={[
            { id: 'full', label: 'Full' },
            { id: 'balanced', label: 'Balanced' },
            { id: 'subtle', label: 'Subtle' },
            { id: 'off', label: 'Off' }
          ]}
          value={currentPrefs.visualizationIntensity as 'full' | 'balanced' | 'subtle' | 'off'}
          onChange={(v) => handleUpdatePreference('visualizationIntensity', v)}
        />
      </GlassCard>

      {/* Sign Out Section */}
      <GlassCard className="p-6" delay={0.3}>
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/20">
            <Sliders size={20} className="text-purple-300" />
          </div>
          <h2 className="text-white/60 text-sm uppercase tracking-wider">Session</h2>
        </div>

        <div className="py-4">
          <p className="text-white/50 text-sm mb-4">
            Sign out of your account on this device.
          </p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSignOut}
            className="
              flex items-center gap-2 px-4 py-3 rounded-xl
              bg-red-500/10 hover:bg-red-500/20
              text-red-400 hover:text-red-300
              transition-all duration-200
            "
          >
            <LogOut size={18} />
            <span className="font-medium">Sign Out</span>
          </motion.button>
        </div>
      </GlassCard>

      {/* Version info */}
      <div className="text-center py-4">
        <p className="text-white/30 text-sm">YouSoul v1.0.0</p>
        <p className="text-white/20 text-xs mt-1">The soul of your schedule</p>
      </div>
    </div>
  );
}
