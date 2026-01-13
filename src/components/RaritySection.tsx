import { useState } from 'react';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { CardItem } from './CardItem';
import { RARITIES, getCardsByRarity, type RarityId } from '@/data/cards';

interface RaritySectionProps {
  rarityId: RarityId;
  getCount: (cardId: string) => number;
  increment: (cardId: string) => void;
  decrement: (cardId: string) => void;
  setCount: (cardId: string, count: number) => void;
  defaultOpen?: boolean;
}

export const RaritySection = ({
  rarityId,
  getCount,
  increment,
  decrement,
  setCount,
  defaultOpen = false,
}: RaritySectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const rarityInfo = RARITIES.find(r => r.id === rarityId)!;
  const cards = getCardsByRarity(rarityId);
  
  // このレアリティの統計
  const ownedCount = cards.filter(card => getCount(card.id) > 0).length;
  const totalInRarity = cards.length;

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="w-full">
        <div className={`flex items-center justify-between p-3 rounded-xl transition-all bg-gradient-to-r ${rarityInfo.color} ${
          isOpen ? 'rounded-b-none' : ''
        }`}>
          <div className="flex items-center gap-2">
            {isOpen ? (
              <ChevronDown className="h-5 w-5 text-white/80" />
            ) : (
              <ChevronRight className="h-5 w-5 text-white/80" />
            )}
            <span className="font-bold text-white drop-shadow-sm flex items-center gap-1.5">
              {rarityInfo.isRare && <Sparkles className="h-4 w-4" />}
              {rarityInfo.name}
            </span>
            <Badge variant="secondary" className="text-xs bg-white/20 text-white border-0">
              {totalInRarity}種
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge 
              variant={ownedCount === totalInRarity ? "default" : "outline"} 
              className={ownedCount === totalInRarity 
                ? "bg-white text-primary-foreground border-0" 
                : "bg-white/20 text-white border-white/40"
              }
            >
              {ownedCount} / {totalInRarity}
            </Badge>
          </div>
        </div>
      </CollapsibleTrigger>
      
      <CollapsibleContent>
        <div className="space-y-2 p-3 border border-t-0 rounded-b-xl bg-card">
          {cards.map(card => (
            <CardItem
              key={card.id}
              card={card}
              count={getCount(card.id)}
              onIncrement={() => increment(card.id)}
              onDecrement={() => decrement(card.id)}
              onSetCount={(count) => setCount(card.id, count)}
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};
