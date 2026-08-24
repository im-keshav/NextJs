import React from 'react';
import { Cat as CatIcon, Sparkles, MessageSquareText, Terminal, PlusCircle, Activity } from 'lucide-react';

interface NavbarProps {
  activeTab: 'gallery' | 'matchmaker' | 'chat' | 'mcp';
  setActiveTab: (tab: 'gallery' | 'matchmaker' | 'chat' | 'mcp') => void;
  onOpenAddModal: () => void;
  backendConnected: boolean | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenAddModal,
  backendConnected,
}) => {
  return (
    <header className="glass-panel" style={{ margin: '1.5rem 0 2rem 0', padding: '1rem 1.75rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', cursor: 'pointer' }} onClick={() => setActiveTab('gallery')}>
          <div style={{
            background: 'var(--primary-gradient)',
            width: '46px',
            height: '46px',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <CatIcon size={26} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.4rem', lineHeight: '1.2' }}>
              Tiny<span className="gradient-text">Cats</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              AI & MCP Powered Feline Hub
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(15, 23, 42, 0.6)', padding: '0.35rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            className={`btn ${activeTab === 'gallery' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('gallery')}
          >
            <CatIcon size={16} />
            Explorer
          </button>

          <button
            className={`btn ${activeTab === 'matchmaker' ? 'btn-accent' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('matchmaker')}
          >
            <Sparkles size={16} />
            AI Matchmaker
          </button>

          <button
            className={`btn ${activeTab === 'chat' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquareText size={16} />
            CatGPT
          </button>

          <button
            className={`btn ${activeTab === 'mcp' ? 'btn-secondary' : 'btn-secondary'}`}
            style={{
              padding: '0.5rem 1rem',
              fontSize: '0.85rem',
              background: activeTab === 'mcp' ? 'rgba(6, 182, 212, 0.2)' : undefined,
              borderColor: activeTab === 'mcp' ? 'rgba(6, 182, 212, 0.5)' : undefined,
              color: activeTab === 'mcp' ? '#22d3ee' : undefined
            }}
            onClick={() => setActiveTab('mcp')}
          >
            <Terminal size={16} />
            MCP Sandbox
          </button>
        </nav>

        {/* Action Controls & Backend Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Status Badge */}
          <div className={`badge ${backendConnected === true ? 'badge-emerald' : backendConnected === false ? 'badge-primary' : 'badge-cyan'}`} style={{ textTransform: 'none' }}>
            <Activity size={13} />
            {backendConnected === true ? 'Backend Online' : backendConnected === false ? 'Backend Offline' : 'Connecting...'}
          </div>

          <button className="btn btn-primary" onClick={onOpenAddModal} style={{ boxShadow: 'var(--shadow-glow)' }}>
            <PlusCircle size={18} />
            Add Cat
          </button>
        </div>
      </div>
    </header>
  );
};
