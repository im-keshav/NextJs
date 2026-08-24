import React, { useState } from 'react';
import { createCat } from '../services/api';
import type { Cat } from '../types/cat';
import { X, PlusCircle, Sparkles, AlertCircle, CheckCircle2 } from 'lucide-react';

interface AddCatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCatAdded: (newCat: Cat) => void;
}

export const AddCatModal: React.FC<AddCatModalProps> = ({ isOpen, onClose, onCatAdded }) => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  const [lifespan, setLifespan] = useState<number>(15);
  const [energyLevel, setEnergyLevel] = useState('High');
  const [color, setColor] = useState('Cream / Seal Point');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&auto=format&fit=crop');
  const [kidsFriendly, setKidsFriendly] = useState(true);
  const [apartmentFriendly, setApartmentFriendly] = useState(true);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFillPreset = (presetType: 'siamese' | 'persian' | 'bengal') => {
    if (presetType === 'siamese') {
      setName('Milo');
      setBreed('Siamese');
      setDescription('Vocal, highly intelligent, and social cat that thrives on companion attention.');
      setLifespan(16);
      setEnergyLevel('High');
      setColor('Seal Point');
      setImageUrl('https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=600&auto=format&fit=crop');
      setKidsFriendly(true);
      setApartmentFriendly(true);
    } else if (presetType === 'persian') {
      setName('Bella');
      setBreed('Persian');
      setDescription('Quiet, sweet-tempered cat with long fluffy fur and a calm indoor demeanor.');
      setLifespan(15);
      setEnergyLevel('Low');
      setColor('White / Silver');
      setImageUrl('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=600&auto=format&fit=crop');
      setKidsFriendly(true);
      setApartmentFriendly(true);
    } else if (presetType === 'bengal') {
      setName('Leo');
      setBreed('Bengal');
      setDescription('Wild-looking leopard print cat with remarkable athleticism and boundless curiosity.');
      setLifespan(14);
      setEnergyLevel('Very High');
      setColor('Spotted Rosette / Gold');
      setImageUrl('https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&auto=format&fit=crop');
      setKidsFriendly(false);
      setApartmentFriendly(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !breed.trim() || !description.trim()) {
      setErrorMsg('Please fill in all required fields (Name, Breed, Description)');
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    try {
      const created = await createCat({
        name,
        breed,
        description,
        lifespan: Number(lifespan),
        energyLevel,
        color,
        imageUrl,
        kidsFriendly,
        apartmentFriendly,
      });

      setSuccessMsg('Cat breed created successfully!');
      onCatAdded(created);
      setTimeout(() => {
        setSuccessMsg(null);
        onClose();
      }, 1200);
    } catch (err: any) {
      setErrorMsg(err?.message || 'Failed to create cat entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content glass-panel" style={{ padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <PlusCircle size={26} color="var(--primary)" />
            <h2 style={{ fontSize: '1.5rem' }}>Add New Cat Breed</h2>
          </div>
          <button className="btn btn-secondary btn-icon" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Presets Bar */}
        <div style={{ background: 'rgba(15,23,42,0.6)', padding: '0.85rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Sparkles size={13} color="var(--amber)" /> Auto-fill Presets:
          </span>
          <button className="badge badge-purple" style={{ cursor: 'pointer', textTransform: 'none' }} onClick={() => handleFillPreset('siamese')}>
            Siamese
          </button>
          <button className="badge badge-cyan" style={{ cursor: 'pointer', textTransform: 'none' }} onClick={() => handleFillPreset('persian')}>
            Persian
          </button>
          <button className="badge badge-emerald" style={{ cursor: 'pointer', textTransform: 'none' }} onClick={() => handleFillPreset('bengal')}>
            Bengal
          </button>
        </div>

        {errorMsg && (
          <div style={{ background: 'rgba(244, 63, 94, 0.15)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#fb7185', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {successMsg && (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.3)', color: '#34d399', padding: '0.75rem 1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem' }}>
            <CheckCircle2 size={16} /> {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Cat Name *</label>
              <input type="text" className="input-field" placeholder="e.g. Luna" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className="input-group">
              <label className="input-label">Breed *</label>
              <input type="text" className="input-field" placeholder="e.g. Maine Coon" value={breed} onChange={(e) => setBreed(e.target.value)} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Description *</label>
            <textarea className="input-field" style={{ minHeight: '80px', resize: 'vertical' }} placeholder="Describe cat personality, coat, behavior..." value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <div className="input-group">
              <label className="input-label">Lifespan (Years)</label>
              <input type="number" className="input-field" value={lifespan} onChange={(e) => setLifespan(Number(e.target.value))} />
            </div>

            <div className="input-group">
              <label className="input-label">Energy Level</label>
              <select className="input-field" value={energyLevel} onChange={(e) => setEnergyLevel(e.target.value)}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Very High">Very High</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Coat Color</label>
              <input type="text" className="input-field" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Image URL</label>
            <input type="url" className="input-field" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
          </div>

          <div style={{ display: 'flex', gap: '1.5rem', background: 'rgba(15,23,42,0.6)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={kidsFriendly} onChange={(e) => setKidsFriendly(e.target.checked)} style={{ accentColor: '#10b981', width: '18px', height: '18px' }} />
              Kids Friendly
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
              <input type="checkbox" checked={apartmentFriendly} onChange={(e) => setApartmentFriendly(e.target.checked)} style={{ accentColor: '#06b6d4', width: '18px', height: '18px' }} />
              Apartment Friendly
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose} disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Save Cat to Database'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
