import React, { useState, useEffect } from 'react';
import { Download, X, WifiOff, Sparkles } from 'lucide-react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export const PwaPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBanner, setShowInstallBanner] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [installed, setInstalled] = useState<boolean>(false);

  // Register service worker with auto-update
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log('SW Registered:', r);
    },
    onRegisterError(error) {
      console.log('SW registration error:', error);
    },
  });

  useEffect(() => {
    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBanner(true);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setShowInstallBanner(false);
      setDeferredPrompt(null);
    };

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBanner(false);
    }
    setDeferredPrompt(null);
  };

  return (
    <>
      {/* Offline Status Alert Banner */}
      {!isOnline && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            background: 'linear-gradient(90deg, #e11d48 0%, #b91c1c 100%)',
            color: '#fff',
            padding: '0.5rem 1rem',
            textAlign: 'center',
            fontSize: '0.85rem',
            fontWeight: 600,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          }}
        >
          <WifiOff size={16} />
          You are currently offline. TinyCats PWA is running in offline cached mode.
        </div>
      )}

      {/* SW Update Available Reload Prompt */}
      {needRefresh && (
        <div
          className="glass-panel"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            right: '1.5rem',
            zIndex: 9998,
            padding: '1.25rem',
            maxWidth: '360px',
            borderColor: 'rgba(139, 92, 246, 0.5)',
            boxShadow: 'var(--shadow-accent-glow)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
            <Sparkles size={24} color="#c084fc" />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>New Version Available!</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
                A new update for TinyCats PWA is ready.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-accent" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => updateServiceWorker(true)}>
                  Update Now
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => setNeedRefresh(false)}>
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PWA Install Banner */}
      {showInstallBanner && !installed && (
        <div
          className="glass-panel pulse-glow"
          style={{
            position: 'fixed',
            bottom: '1.5rem',
            left: '1.5rem',
            zIndex: 9998,
            padding: '1.25rem',
            maxWidth: '400px',
            borderColor: 'rgba(244, 63, 94, 0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem' }}>
            <div style={{ background: 'var(--primary-gradient)', padding: '0.65rem', borderRadius: '12px', display: 'flex' }}>
              <Download size={22} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <h4 style={{ fontSize: '1.05rem' }}>Install TinyCats App</h4>
                <button
                  className="btn btn-secondary btn-icon"
                  style={{ width: '24px', height: '24px', padding: 0 }}
                  onClick={() => setShowInstallBanner(false)}
                >
                  <X size={14} />
                </button>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.85rem', lineHeight: '1.4' }}>
                Install TinyCats as a standalone desktop / mobile app for instant access and offline capabilities.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-primary" style={{ padding: '0.45rem 1rem', fontSize: '0.825rem' }} onClick={handleInstallClick}>
                  <Download size={14} /> Install PWA
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.45rem 0.85rem', fontSize: '0.825rem' }} onClick={() => setShowInstallBanner(false)}>
                  Maybe Later
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
