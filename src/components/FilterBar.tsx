import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X } from 'lucide-react';
import { RARITIES, type RarityId } from '@/data/cards';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedRarities: RarityId[];
  onRarityToggle: (rarityId: RarityId) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  searchQuery,
  onSearchChange,
  selectedRarities,
  onRarityToggle,
  onClearFilters,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const hasFilters = searchQuery || selectedRarities.length > 0;

  return (
    <div className="space-y-3">
      {/* 検索バー */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="カードIDで検索..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          variant={showFilters ? "default" : "outline"}
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="shrink-0"
        >
          <Filter className="h-4 w-4" />
        </Button>
        {hasFilters && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearFilters}
            className="shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* レアリティフィルター */}
      {showFilters && (
        <div className="flex flex-wrap gap-1.5 p-3 rounded-lg bg-muted/50 border">
          {RARITIES.map((rarity) => (
            <Badge
              key={rarity.id}
              variant={selectedRarities.includes(rarity.id) ? "default" : "outline"}
              className={`cursor-pointer transition-all ${
                selectedRarities.includes(rarity.id)
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
              onClick={() => onRarityToggle(rarity.id)}
            >
              {rarity.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
