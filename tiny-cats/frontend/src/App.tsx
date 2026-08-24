import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { CatGallery } from './components/CatGallery';
import { AiMatchmaker } from './components/AiMatchmaker';
import { CatGptChat } from './components/CatGptChat';
import { McpInspector } from './components/McpInspector';
import { AddCatModal } from './components/AddCatModal';
import { PwaPrompt } from './components/PwaPrompt';
import { getAllCats, searchCats, fetchHealthCheck, createCat } from './services/api';
import type { Cat } from './types/cat';
import { Heart } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<'gallery' | 'matchmaker' | 'chat' | 'mcp'>('gallery');
  const [cats, setCats] = useState<Cat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [backendConnected, setBackendConnected] = useState<boolean | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [selectedCatForChat, setSelectedCatForChat] = useState<string | undefined>(undefined);

  // Check health and load cats
  useEffect(() => {
    checkHealthAndLoadCats();
  }, []);

  // Search debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim()) {
        performSearch(searchQuery);
      } else {
        loadCats();
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  const checkHealthAndLoadCats = async () => {
    const health = await fetchHealthCheck();
    setBackendConnected(health.success);
    if (health.success) {
      await loadCats();
    } else {
      setLoading(false);
    }
  };

  const loadCats = async () => {
    setLoading(true);
    try {
      let data = await getAllCats();
      // If database is completely empty, seed 3 initial demo cats automatically
      if (data.length === 0) {
        await seedDemoCats();
        data = await getAllCats();
      }
      setCats(data);
    } catch (err) {
      console.error('Failed to load cats:', err);
    } finally {
      setLoading(false);
    }
  };

  const seedDemoCats = async () => {
    const sampleCats = [
      {
        name: 'Oliver',
        breed: 'Scottish Fold',
        description: 'Charming owl-faced cat with folded ears, calm disposition, and gentle loving nature.',
        kidsFriendly: true,
        apartmentFriendly: true,
        lifespan: 15,
        energyLevel: 'Medium',
        imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop',
        color: 'Grey Tabby',
      },
      {
        name: 'Simba',
        breed: 'Maine Coon',
        description: 'Majestic gentle giant with long silky fur, tufted ears, and affectionate personality.',
        kidsFriendly: true,
        apartmentFriendly: false,
        lifespan: 14,
        energyLevel: 'High',
        imageUrl: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=600&auto=format&fit=crop',
        color: 'Orange Tiger',
      },
      {
        name: 'Cleo',
        breed: 'Ragdoll',
        description: 'Docile, blue-eyed lap cat that goes limp with joy when cuddled.',
        kidsFriendly: true,
        apartmentFriendly: true,
        lifespan: 16,
        energyLevel: 'Low',
        imageUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&auto=format&fit=crop',
        color: 'Seal Point White',
      },
    ];

    for (const cat of sampleCats) {
      try {
        await createCat(cat);
      } catch (e) {
        console.error('Error seeding cat:', e);
      }
    }
  };

  const performSearch = async (query: string) => {
    setLoading(true);
    try {
      const results = await searchCats(query);
      setCats(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCatForAiAdvice = (cat: Cat) => {
    setSelectedCatForChat(`Tell me all about the ${cat.breed} breed (${cat.name}). Is it good for beginners and what care tips do you recommend?`);
    setActiveTab('chat');
  };

  const handleCatAdded = (newCat: Cat) => {
    setCats((prev) => [newCat, ...prev]);
  };

  return (
    <div className="app-container">
      {/* Header Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        backendConnected={backendConnected}
      />

      {/* Main View Tab Content */}
      <main>
        {activeTab === 'gallery' && (
          <CatGallery
            cats={cats}
            loading={loading}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSelectCat={handleSelectCatForAiAdvice}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        )}

        {activeTab === 'matchmaker' && <AiMatchmaker />}

        {activeTab === 'chat' && <CatGptChat initialPrompt={selectedCatForChat} />}

        {activeTab === 'mcp' && <McpInspector />}
      </main>

      {/* Add Cat Modal */}
      <AddCatModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onCatAdded={handleCatAdded}
      />

      {/* PWA Install & Offline Alert Banners */}
      <PwaPrompt />

      {/* Footer */}
      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
          Crafted with <Heart size={14} color="var(--primary)" /> for TinyCats Platform • Express, MongoDB, Gemini AI & Model Context Protocol
        </p>
      </footer>
    </div>
  );
}

export default App;
