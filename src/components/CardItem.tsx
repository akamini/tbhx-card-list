import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Card } from '@/data/cards';

interface CardItemProps {
  card: Card;
  count: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onSetCount: (count: number) => void;
}

export const CardItem = ({
  card,
  count,
  onIncrement,
  onDecrement,
  onSetCount,
}: CardItemProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      onSetCount(value);
    } else if (e.target.value === '') {
      onSetCount(0);
    }
  };

  return (
    <div className={`flex items-center justify-between p-3 rounded-lg transition-all ${
      count > 0 
        ? 'bg-primary/10 border-primary/30' 
        : 'bg-muted/30 border-muted'
    } border`}>
      <div className="flex flex-col">
        <span className={`font-mono text-sm ${count > 0 ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
          {card.id}
        </span>
        <span className="text-xs text-muted-foreground">
          {card.hero}
        </span>
      </div>
      
      <div className="flex items-center gap-1.5">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onDecrement}
          disabled={count === 0}
        >
          <span className="text-lg leading-none">−</span>
        </Button>
        
        <Input
          type="number"
          min="0"
          value={count}
          onChange={handleInputChange}
          className="w-14 h-8 text-center px-1 font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 shrink-0"
          onClick={onIncrement}
        >
          <span className="text-lg leading-none">+</span>
        </Button>
      </div>
    </div>
  );
};
