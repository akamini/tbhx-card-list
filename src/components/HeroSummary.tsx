import { useMemo } from 'react';
import { getUniqueHeroes, getCardsByHero } from '@/data/cards';
import { Badge } from '@/components/ui/badge';

interface HeroSummaryProps {
  stats: {
    ownedCount: number;
    totalCards: number;
  };
  getCount: (cardId: string) => number;
}

export const HeroSummary = ({ getCount }: HeroSummaryProps) => {
  const heroStats = useMemo(() => {
    const heroes = getUniqueHeroes();
    return heroes.map(hero => {
      const cards = getCardsByHero(hero);
      const total = cards.length;
      let owned = 0;       // 所持種類数
      let totalOwned = 0;  // 総所持枚数（被り含む）

      cards.forEach(card => {
        const count = getCount(card.id);
        if (count > 0) {
          owned++;
          totalOwned += count;
        }
      });

      return {
        name: hero,
        owned,
        totalOwned, // 総所持枚数
        total,
        isComplete: owned === total,
        percentage: Math.round((owned / total) * 100)
      };
    }).sort((a, b) => {
      // ソート順: コンプリート(上) -> 所持率高い順 -> 名前順
      if (a.isComplete && !b.isComplete) return -1;
      if (!a.isComplete && b.isComplete) return 1;
      if (b.percentage !== a.percentage) return b.percentage - a.percentage;
      return a.name.localeCompare(b.name, 'ja');
    });
  }, [getCount]);

  return (
    <div className="bg-card rounded-xl border shadow-sm p-4 mb-20">      
      <div className="h-[calc(100vh-250px)] w-full pr-2 overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {heroStats.map((hero) => (
            <div key={hero.name} className="flex flex-col p-3 rounded-lg border bg-card/50 hover:bg-muted/50 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-base">{hero.name}</span>
                  {hero.isComplete && (
                    <Badge variant="default" className="text-[10px] h-5 px-1.5 bg-yellow-500 hover:bg-yellow-600 border-0">
                      COMPLETE
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="font-mono text-xs">
                    総計: {hero.totalOwned}枚
                  </Badge>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>コンプリート率</span>
                  <span>{hero.owned} / {hero.total} 種</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-500 ${hero.isComplete ? 'bg-yellow-500' : 'bg-primary'}`}
                    style={{ width: `${hero.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
