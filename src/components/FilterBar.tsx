import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Filter, X } from 'lucide-react';
import { RARITIES, type RarityId } from '@/data/cards';

interface FilterBarProps {
  selectedRarities: RarityId[];
  onRarityToggle: (rarityId: RarityId) => void;
  onClearFilters: () => void;
}

export const FilterBar = ({
  selectedRarities,
  onRarityToggle,
  onClearFilters,
}: FilterBarProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const hasFilters = selectedRarities.length > 0;

  return (
    <div className="space-y-3">
      {/* フィルターボタン */}
      <div className="flex gap-2">
        <Button
          variant={showFilters ? "default" : "outline"}
          onClick={() => setShowFilters(!showFilters)}
          className="flex-1"
        >
          <Filter className="h-4 w-4 mr-2" />
          レアリティフィルター
          {hasFilters && (
            <Badge variant="secondary" className="ml-2 bg-primary-foreground/20">
              {selectedRarities.length}
            </Badge>
          )}
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
