import React, { useState } from 'react';
import { recommendByAi, testMcp } from '../services/api';
import type { AiRecommendData, McpTestResponse } from '../types/cat';
import { Sparkles, Baby, Home, Award, CheckCircle2, Terminal, AlertCircle, RefreshCw } from 'lucide-react';

export const AiMatchmaker: React.FC = () => {
  const [kidsFriendly, setKidsFriendly] = useState<boolean>(true);
  const [apartmentFriendly, setApartmentFriendly] = useState<boolean>(true);
  
  const [aiResult, setAiResult] = useState<AiRecommendData | null>(null);
  const [mcpResult, setMcpResult] = useState<McpTestResponse | null>(null);
  
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [loadingMcp, setLoadingMcp] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleRunAiRecommendation = async () => {
    setLoadingAi(true);
    setErrorMsg(null);
    try {
      const res = await recommendByAi(kidsFriendly, apartmentFriendly);
      setAiResult(res);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error generating AI recommendations');
    } finally {
      setLoadingAi(false);
    }
  };

  const handleRunMcpRecommendation = async () => {
    setLoadingMcp(true);
    setErrorMsg(null);
    try {
      const res = await testMcp(kidsFriendly, apartmentFriendly);
      setMcpResult(res);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error calling MCP server tool via stdio transport');
    } finally {
      setLoadingMcp(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Wizard Header Panel */}
      <div className="glass-panel pulse-glow" style={{ padding: '2rem' }}>
        <div style={{ maxWidth: '800px' }}>
          <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
            <Sparkles size={13} /> Gemini 2.5 & MCP Tool Protocol Engine
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
            Find Your <span className="gradient-text">Purrfect Match</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>
            Select your lifestyle parameters below. Our AI recommendation agent analyzes pet data directly from MongoDB and evaluates compatible cat breeds for your household.
          </p>
        </div>

        {/* Preference Selector Controls */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', margin: '2rem 0' }}>
          {/* Kids Friendly Toggle */}
          <div
            className="glass-card"
            style={{
              padding: '1.25rem',
              cursor: 'pointer',
              borderColor: kidsFriendly ? 'rgba(16, 185, 129, 0.5)' : undefined,
              background: kidsFriendly ? 'rgba(16, 185, 129, 0.1)' : undefined
            }}
            onClick={() => setKidsFriendly(!kidsFriendly)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Baby size={22} color={kidsFriendly ? '#34d399' : 'var(--text-muted)'} />
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Kids Friendly</span>
              </div>
              <input
                type="checkbox"
                checked={kidsFriendly}
                onChange={() => {}}
                style={{ width: '20px', height: '20px', accentColor: '#10b981', cursor: 'pointer' }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {kidsFriendly ? 'Prioritize playful, patient cats suitable for children.' : 'Any temperaments allowed.'}
            </p>
          </div>

          {/* Apartment Friendly Toggle */}
          <div
            className="glass-card"
            style={{
              padding: '1.25rem',
              cursor: 'pointer',
              borderColor: apartmentFriendly ? 'rgba(6, 182, 212, 0.5)' : undefined,
              background: apartmentFriendly ? 'rgba(6, 182, 212, 0.1)' : undefined
            }}
            onClick={() => setApartmentFriendly(!apartmentFriendly)}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Home size={22} color={apartmentFriendly ? '#22d3ee' : 'var(--text-muted)'} />
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Apartment Friendly</span>
              </div>
              <input
                type="checkbox"
                checked={apartmentFriendly}
                onChange={() => {}}
                style={{ width: '20px', height: '20px', accentColor: '#06b6d4', cursor: 'pointer' }}
              />
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              {apartmentFriendly ? 'Prefers indoor-friendly cats with low-to-medium vocalization.' : 'Space requirements open.'}
            </p>
          </div>
        </div>

        {/* Action Triggers */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleRunAiRecommendation} disabled={loadingAi} style={{ padding: '0.85rem 1.5rem' }}>
            {loadingAi ? <RefreshCw className="animate-spin" size={18} /> : <Sparkles size={18} />}
            {loadingAi ? 'AI Engine Working...' : 'Run Gemini AI Matcher'}
          </button>

          <button className="btn btn-secondary" onClick={handleRunMcpRecommendation} disabled={loadingMcp} style={{ padding: '0.85rem 1.5rem', borderColor: 'rgba(6,182,212,0.4)', color: '#22d3ee' }}>
            {loadingMcp ? <RefreshCw className="animate-spin" size={18} /> : <Terminal size={18} />}
            {loadingMcp ? 'Executing Stdio Tool...' : 'Run Stdio MCP Server Tool'}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="glass-panel" style={{ padding: '1.25rem', borderColor: 'rgba(244, 63, 94, 0.5)', background: 'rgba(244, 63, 94, 0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <AlertCircle size={20} color="#fb7185" />
          <span style={{ color: '#fb7185', fontWeight: 600 }}>{errorMsg}</span>
        </div>
      )}

      {/* Gemini AI Recommendation Results */}
      {aiResult && (
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <Award size={28} color="var(--primary)" />
            <div>
              <h3 style={{ fontSize: '1.5rem' }}>Gemini AI Recommendation Report</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Direct pet advisor logic output</p>
            </div>
          </div>

          {/* Best Match Hero Card */}
          {aiResult.bestMatch && (
            <div className="glass-card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '1px solid rgba(244, 63, 94, 0.4)', background: 'linear-gradient(135deg, rgba(244,63,94,0.1) 0%, rgba(139,92,246,0.1) 100%)' }}>
              <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
                <Award size={13} /> #1 Top Recommended Choice
              </div>
              <h4 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '0.25rem' }}>
                {aiResult.bestMatch.name} <span style={{ color: 'var(--cyan)', fontSize: '1rem', fontWeight: 500 }}>({aiResult.bestMatch.breed})</span>
              </h4>
              <p style={{ color: 'var(--text-main)', marginTop: '0.5rem', lineHeight: '1.6', fontSize: '0.95rem' }}>
                {aiResult.bestMatch.reason}
              </p>
            </div>
          )}

          {/* Other Recommendations */}
          {aiResult.recommendations && aiResult.recommendations.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-muted)' }}>Additional Compatible Matches</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
                {aiResult.recommendations.map((rec, i) => (
                  <div key={i} className="glass-card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <CheckCircle2 size={16} color="#34d399" />
                      <strong style={{ fontSize: '1.1rem', color: '#fff' }}>{rec.name}</strong>
                      <span style={{ fontSize: '0.8rem', color: 'var(--cyan)' }}>({rec.breed})</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>{rec.reason}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {aiResult.summary && (
            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h5 style={{ color: 'var(--accent)', marginBottom: '0.35rem', fontSize: '0.9rem' }}>Expert Executive Summary</h5>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{aiResult.summary}</p>
            </div>
          )}
        </div>
      )}

      {/* MCP Tool Stdio Execution Output */}
      {mcpResult && (
        <div className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(6, 182, 212, 0.4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <Terminal size={26} color="#22d3ee" />
            <div>
              <h3 style={{ fontSize: '1.4rem' }}>Stdio MCP Tool Result</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Response returned through StdioClientTransport calling recommend_cats tool</p>
            </div>
          </div>

          <div style={{ background: '#090d16', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '0.9rem', whiteSpace: 'pre-wrap', color: '#e2e8f0', maxHeight: '350px', overflowY: 'auto' }}>
            {mcpResult.data}
          </div>
        </div>
      )}
    </div>
  );
};
