import React, { useState, useRef, useEffect } from 'react';
import { askAi } from '../services/api';
import type { ChatMessage } from '../types/cat';
import { Send, Bot, User, RefreshCw, Lightbulb } from 'lucide-react';

interface CatGptChatProps {
  initialPrompt?: string;
}

export const CatGptChat: React.FC<CatGptChatProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Meow! I'm CatGPT, your AI feline expert. Ask me anything about cat breeds, care tips, nutrition, behavior, or pet compatibility!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputPrompt;
    if (!query.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setLoading(true);

    try {
      const responseText = await askAi(query);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: "Sorry, I couldn't process that request right now. Please check if the backend service is connected.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const suggestionPills = [
    "What cat breeds are hypoallergenic?",
    "How to make an apartment cat friendly?",
    " Siameses vs Persian cat traits?",
    "Best diet plan for active cats?",
  ];

  return (
    <div className="glass-panel" style={{ height: '700px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Chat Header */}
      <div style={{ padding: '1.25rem 1.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.6)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--primary-gradient)', width: '38px', height: '38px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Bot size={22} color="#fff" />
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', margin: 0 }}>CatGPT AI Assistant</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Powered by Gemini 2.5 Flash</p>
          </div>
        </div>
      </div>

      {/* Messages Scroll View */}
      <div style={{ flex: 1, padding: '1.5rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              {msg.sender === 'ai' ? (
                <>
                  <Bot size={14} color="var(--primary)" />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--primary)' }}>CatGPT</span>
                </>
              ) : (
                <>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--cyan)' }}>You</span>
                  <User size={14} color="var(--cyan)" />
                </>
              )}
              <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{msg.timestamp}</span>
            </div>

            <div
              style={{
                maxWidth: '80%',
                padding: '0.9rem 1.25rem',
                borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                background: msg.sender === 'user' ? 'var(--primary-gradient)' : 'rgba(30, 41, 59, 0.85)',
                color: '#fff',
                border: msg.sender === 'ai' ? '1px solid rgba(255,255,255,0.1)' : 'none',
                lineHeight: '1.6',
                fontSize: '0.95rem',
                boxShadow: msg.sender === 'user' ? '0 4px 14px rgba(244,63,94,0.3)' : '0 4px 14px rgba(0,0,0,0.2)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)' }}>
            <div style={{ background: 'rgba(30, 41, 59, 0.85)', padding: '0.75rem 1.25rem', borderRadius: '18px 18px 18px 2px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw className="animate-spin" size={16} color="var(--primary)" />
              <span style={{ fontSize: '0.85rem' }}>CatGPT is thinking...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Suggestion Pills */}
      <div style={{ padding: '0.5rem 1.5rem', background: 'rgba(15,23,42,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '0.25rem', whiteSpace: 'nowrap' }}>
          <Lightbulb size={12} /> Prompt Ideas:
        </span>
        {suggestionPills.map((pill, idx) => (
          <button
            key={idx}
            className="badge badge-purple"
            style={{ cursor: 'pointer', whiteSpace: 'nowrap', textTransform: 'none' }}
            onClick={() => handleSendMessage(pill)}
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '0.75rem', background: 'rgba(15,23,42,0.7)' }}
      >
        <input
          type="text"
          className="input-field"
          placeholder="Ask CatGPT about cat breeds, care tips, health, food..."
          value={inputPrompt}
          onChange={(e) => setInputPrompt(e.target.value)}
          disabled={loading}
        />
        <button type="submit" className="btn btn-primary" disabled={loading || !inputPrompt.trim()}>
          <Send size={18} />
        </button>
      </form>
    </div>
  );
};
