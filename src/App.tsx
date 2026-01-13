import { useState, useMemo } from 'react';
import { StatsSummary } from '@/components/StatsSummary';
import { RaritySection } from '@/components/RaritySection';
import { FilterBar } from '@/components/FilterBar';
import { useCardCollection } from '@/hooks/useCardCollection';
import { RARITIES, type RarityId } from '@/data/cards';
import './App.css';

function App() {
  const { getCount, increment, decrement, setCount, stats } = useCardCollection();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRarities, setSelectedRarities] = useState<RarityId[]>([]);

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
    setSearchQuery('');
    setSelectedRarities([]);
  };

  // 検索クエリに基づいてカードをフィルタ（大文字小文字区別なし）
  const getFilteredCount = (cardId: string): number => {
    if (searchQuery && !cardId.toLowerCase().includes(searchQuery.toLowerCase())) {
      return -1; // 非表示マーカー
    }
    return getCount(cardId);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          To be hero X
        </h1>
        <p className="text-sm text-muted-foreground">カードコレクション管理</p>
      </header>

      <main className="app-main">
        {/* 統計サマリー */}
        <StatsSummary
          ownedTypes={stats.ownedTypes}
          totalCards={stats.totalCards}
        />

        {/* フィルターバー */}
        <FilterBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
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
              getCount={(cardId) => {
                const count = getFilteredCount(cardId);
                return count >= 0 ? count : getCount(cardId);
              }}
              increment={increment}
              decrement={decrement}
              setCount={setCount}
              defaultOpen={index === 0}
            />
          ))}
        </div>
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
