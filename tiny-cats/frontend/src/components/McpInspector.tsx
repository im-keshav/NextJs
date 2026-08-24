import React, { useState } from 'react';
import { testMcp } from '../services/api';
import { Terminal, Cpu, ArrowRight, Play, Code2, RefreshCw, FileText } from 'lucide-react';

export const McpInspector: React.FC = () => {
  const [mcpKids, setMcpKids] = useState<boolean>(true);
  const [mcpApartment, setMcpApartment] = useState<boolean>(false);
  const [output, setOutput] = useState<string | null>(null);
  const [executing, setExecuting] = useState<boolean>(false);

  const handleTestTool = async () => {
    setExecuting(true);
    try {
      const res = await testMcp(mcpKids, mcpApartment);
      setOutput(JSON.stringify(res, null, 2));
    } catch (err: any) {
      setOutput(`Error executing MCP tool: ${err.message}`);
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Panel */}
      <div className="glass-panel" style={{ padding: '2rem', borderColor: 'rgba(6, 182, 212, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
            <Cpu size={32} color="#fff" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>
              MCP Server & <span className="cyan-gradient-text">Stdio Inspector</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
              Inspect Model Context Protocol tools registered in <code style={{ color: '#22d3ee' }}>mcp_server/src/index.ts</code>
            </p>
          </div>
        </div>

        {/* Architecture Flow Diagram */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', background: 'rgba(15,23,42,0.6)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.08)', alignItems: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <span className="badge badge-purple" style={{ marginBottom: '0.35rem' }}>Express Backend</span>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>StdioClientTransport</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ArrowRight color="var(--cyan)" size={24} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="badge badge-cyan" style={{ marginBottom: '0.35rem' }}>Stdio Subprocess</span>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>npx tsx mcp_server</div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ArrowRight color="var(--cyan)" size={24} />
          </div>

          <div style={{ textAlign: 'center' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '0.35rem' }}>MongoDB API</span>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Cat Database Queries</div>
          </div>
        </div>
      </div>

      {/* Registered Tools Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {/* Tool 1 Card */}
        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-cyan" style={{ textTransform: 'none' }}>
              <Code2 size={12} /> tool: recommend_cats
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JSON Schema</span>
          </div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>recommend_cats</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Recommends best cat breeds from database matching <code style={{ color: '#22d3ee' }}>kidsFriendly</code> and <code style={{ color: '#22d3ee' }}>apartmentFriendly</code> booleans.
          </p>
          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontFamily: 'monospace', color: '#94a3b8' }}>
            {`{ kidsFriendly: boolean, apartmentFriendly: boolean }`}
          </div>
        </div>

        {/* Tool 2 Card */}
        <div className="glass-card" style={{ padding: '1.5rem', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <span className="badge badge-purple" style={{ textTransform: 'none' }}>
              <Code2 size={12} /> tool: getAllCats
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JSON Schema</span>
          </div>
          <h4 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>getAllCats</h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
            Fetches all cat breeds from MongoDB backend endpoint.
          </p>
          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', fontSize: '0.8rem', fontFamily: 'monospace', color: '#94a3b8' }}>
            {`{}`}
          </div>
        </div>
      </div>

      {/* Live Tool Execution Sandbox */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={20} color="var(--cyan)" /> Live Tool Execution Tester
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div className="input-group">
            <label className="input-label">Argument: kidsFriendly</label>
            <select
              className="input-field"
              value={mcpKids ? 'true' : 'false'}
              onChange={(e) => setMcpKids(e.target.value === 'true')}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Argument: apartmentFriendly</label>
            <select
              className="input-field"
              value={mcpApartment ? 'true' : 'false'}
              onChange={(e) => setMcpApartment(e.target.value === 'true')}
            >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>
          </div>
        </div>

        <button className="btn btn-accent" onClick={handleTestTool} disabled={executing} style={{ marginBottom: '1.5rem' }}>
          {executing ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
          {executing ? 'Executing tool over Stdio...' : 'Execute recommend_cats Tool'}
        </button>

        {output && (
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <FileText size={14} /> Execution Result Output:
            </h4>
            <pre style={{ background: '#090d16', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.1)', fontFamily: 'monospace', fontSize: '0.85rem', color: '#38bdf8', overflowX: 'auto' }}>
              {output}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
