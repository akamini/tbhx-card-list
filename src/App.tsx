import { useState, useMemo } from 'react';
import { StatsSummary } from '@/components/StatsSummary';
import { RaritySection } from '@/components/RaritySection';
import { HeroSummary } from '@/components/HeroSummary';
import { FilterBar } from '@/components/FilterBar';
import { useCardCollection } from '@/hooks/useCardCollection';
import { RARITIES, type RarityId } from '@/data/cards';
import './App.css';

function App() {
  const { getCount, increment, decrement, setCount, stats } = useCardCollection();
  const [selectedRarities, setSelectedRarities] = useState<RarityId[]>([]);
  const [currentView, setCurrentView] = useState<'list' | 'summary'>('list');

  // フィルタリングされたレアリティリスト
  const filteredRarities = useMemo(() => {
    const rarities = [...RARITIES];

    // レアリティフィルター
    if (selectedRarities.length > 0) {
      return rarities.filter((r) => selectedRarities.includes(r.id));
    }

    return rarities;
  }, [selectedRarities]);

  const handleRarityToggle = (rarityId: RarityId) => {
    setSelectedRarities((prev) =>
      prev.includes(rarityId)
        ? prev.filter((r) => r !== rarityId)
        : [...prev, rarityId]
    );
  };

  const handleClearFilters = () => {
    setSelectedRarities([]);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="inline-block relative">
          <h1 className="text-3xl font-black italic tracking-tighter bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent pr-2">
            TBHX TRACKER
          </h1>
          <div className="absolute -top-1 -right-2 rotate-12">
            <span className="bg-primary text-primary-foreground text-[0.6rem] font-bold px-1.5 py-0.5 rounded-full shadow-sm">
              BETA
            </span>
          </div>
        </div>
        <p className="text-sm font-medium text-muted-foreground mt-1">
          To Be Hero X Card Collection Manager
        </p>

        {/* View Switcher */}
        <div className="flex w-full mt-4 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setCurrentView('list')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              currentView === 'list'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            カードリスト
          </button>
          <button
            onClick={() => setCurrentView('summary')}
            className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${
              currentView === 'summary'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            ヒーロー集計
          </button>
        </div>
      </header>

      <main className="app-main">
        {currentView === 'list' ? (
          <>
            {/* 統計サマリー */}
            <StatsSummary
              ownedTypes={stats.ownedTypes}
              totalCards={stats.totalCards}
            />

            {/* フィルターバー */}
            <FilterBar
              selectedRarities={selectedRarities}
              onRarityToggle={handleRarityToggle}
              onClearFilters={handleClearFilters}
            />

            {/* カードリスト */}
            <div className="space-y-3">
              {filteredRarities.map((rarity, index) => (
                <RaritySection
                  key={rarity.id}
                  rarityId={rarity.id}
                  getCount={getCount}
                  increment={increment}
                  decrement={decrement}
                  setCount={setCount}
                  defaultOpen={index === 0}
                />
              ))}
            </div>
          </>
        ) : (
          /* ヒーロー別サマリー */
          <HeroSummary
            stats={{
              ownedCount: stats.ownedTypes,
              totalCards: stats.totalCards
            }}
            getCount={getCount}
          />
        )}
      </main>

      <footer className="app-footer">
        <p className="text-xs text-muted-foreground">
          データはブラウザに保存されます
        </p>
      </footer>
    </div>
  );
}

export default App;
