import React, { useState } from 'react';
import type { Cat } from '../types/cat';
import { Cat as CatIcon, Search, Baby, Home, Zap, Clock, Info, X, Sparkles } from 'lucide-react';

interface CatGalleryProps {
  cats: Cat[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectCat: (cat: Cat) => void;
  onOpenAddModal: () => void;
}

export const CatGallery: React.FC<CatGalleryProps> = ({
  cats,
  loading,
  searchQuery,
  setSearchQuery,
  onSelectCat,
  onOpenAddModal,
}) => {
  const [filterKids, setFilterKids] = useState<boolean | null>(null);
  const [filterApartment, setFilterApartment] = useState<boolean | null>(null);
  const [selectedCatModal, setSelectedCatModal] = useState<Cat | null>(null);

  const filteredCats = cats.filter((cat) => {
    if (filterKids !== null && cat.kidsFriendly !== filterKids) return false;
    if (filterApartment !== null && cat.apartmentFriendly !== filterApartment) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Search & Filter Header Bar */}
      <div className="glass-panel" style={{ padding: '1.5rem 1.75rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem' }}>
                Cat <span className="gradient-text">Directory</span>
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Discover feline breeds, traits, and friendly characteristics
              </p>
            </div>

            {/* Quick Filter Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <button
                className={`badge ${filterKids === true ? 'badge-emerald' : 'badge-primary'}`}
                style={{ cursor: 'pointer', padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
                onClick={() => setFilterKids(filterKids === true ? null : true)}
              >
                <Baby size={14} />
                Kids Friendly {filterKids === true && '✓'}
              </button>

              <button
                className={`badge ${filterApartment === true ? 'badge-cyan' : 'badge-primary'}`}
                style={{ cursor: 'pointer', padding: '0.5rem 0.85rem', fontSize: '0.8rem' }}
                onClick={() => setFilterApartment(filterApartment === true ? null : true)}
              >
                <Home size={14} />
                Apartment Friendly {filterApartment === true && '✓'}
              </button>
            </div>
          </div>

          {/* Search Input Bar */}
          <div style={{ position: 'relative', width: '100%' }}>
            <Search size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              className="input-field"
              style={{ paddingLeft: '3rem', fontSize: '1rem', height: '48px' }}
              placeholder="Search cat name, breed, color, or traits..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="btn btn-secondary btn-icon"
                style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', width: '32px', height: '32px' }}
                onClick={() => setSearchQuery('')}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Cat Grid View */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <div className="pulse-glow" style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-gradient)', margin: '0 auto 1.5rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={30} color="#fff" />
          </div>
          <h3 style={{ color: 'var(--text-muted)' }}>Fetching adorable cats...</h3>
        </div>
      ) : filteredCats.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <CatIcon size={64} color="var(--text-dim)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>No cats match your criteria</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            Try adjusting your search query or reset the attribute filters.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-secondary" onClick={() => { setSearchQuery(''); setFilterKids(null); setFilterApartment(null); }}>
              Reset Filters
            </button>
            <button className="btn btn-primary" onClick={onOpenAddModal}>
              Add New Cat Breed
            </button>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
          {filteredCats.map((cat) => (
            <div key={cat._id || cat.name} className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              {/* Image Container */}
              <div style={{ position: 'relative', width: '100%', height: '200px', backgroundColor: '#1e293b' }}>
                <img
                  src={cat.imageUrl || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop'}
                  alt={cat.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  top: '0.75rem',
                  right: '0.75rem',
                  background: 'rgba(15, 23, 42, 0.75)',
                  backdropFilter: 'blur(8px)',
                  padding: '0.25rem 0.65rem',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--cyan)'
                }}>
                  {cat.breed}
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>{cat.name}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--amber)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={13} /> {cat.lifespan} yrs
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {cat.description}
                  </p>

                  {/* Attributes Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                    {cat.kidsFriendly && (
                      <span className="badge badge-emerald">
                        <Baby size={12} /> Kids OK
                      </span>
                    )}
                    {cat.apartmentFriendly && (
                      <span className="badge badge-cyan">
                        <Home size={12} /> Apartment OK
                      </span>
                    )}
                    <span className="badge badge-purple">
                      <Zap size={12} /> {cat.energyLevel} Energy
                    </span>
                  </div>
                </div>

                <button
                  className="btn btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => setSelectedCatModal(cat)}
                >
                  <Info size={16} /> View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cat Details Modal */}
      {selectedCatModal && (
        <div className="modal-backdrop" onClick={() => setSelectedCatModal(null)}>
          <div className="modal-content glass-panel" style={{ padding: '2rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <CatIcon size={28} color="var(--primary)" />
                <div>
                  <h2 style={{ fontSize: '1.6rem' }}>{selectedCatModal.name}</h2>
                  <span style={{ color: 'var(--cyan)', fontSize: '0.9rem', fontWeight: 600 }}>
                    {selectedCatModal.breed} Breed
                  </span>
                </div>
              </div>
              <button className="btn btn-secondary btn-icon" onClick={() => setSelectedCatModal(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
              <img
                src={selectedCatModal.imageUrl || 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop'}
                alt={selectedCatModal.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', justifyContent: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.6)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Lifespan</span>
                  <strong style={{ color: 'var(--amber)' }}>{selectedCatModal.lifespan} Years</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.6)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Energy Level</span>
                  <strong style={{ color: '#c084fc' }}>{selectedCatModal.energyLevel}</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(15,23,42,0.6)', padding: '0.65rem 1rem', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Coat Color</span>
                  <strong>{selectedCatModal.color}</strong>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                  <span className={`badge ${selectedCatModal.kidsFriendly ? 'badge-emerald' : 'badge-primary'}`} style={{ flex: 1, justifyContent: 'center' }}>
                    <Baby size={13} /> {selectedCatModal.kidsFriendly ? 'Kids Friendly' : 'Needs Quiet'}
                  </span>
                  <span className={`badge ${selectedCatModal.apartmentFriendly ? 'badge-cyan' : 'badge-primary'}`} style={{ flex: 1, justifyContent: 'center' }}>
                    <Home size={13} /> {selectedCatModal.apartmentFriendly ? 'Apartment Friendly' : 'Needs Yard'}
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <h4 style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>About this breed</h4>
              <p style={{ lineHeight: '1.6', fontSize: '0.95rem' }}>{selectedCatModal.description}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedCatModal(null)}>
                Close
              </button>
              <button className="btn btn-accent" onClick={() => { setSelectedCatModal(null); onSelectCat(selectedCatModal); }}>
                <Sparkles size={16} /> Get AI Advice for this Cat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
