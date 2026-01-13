import { Progress } from '@/components/ui/progress';
import { TOTAL_CARD_TYPES } from '@/data/cards';

interface StatsSummaryProps {
  ownedTypes: number;
  totalCards: number;
}

export const StatsSummary = ({ ownedTypes, totalCards }: StatsSummaryProps) => {
  const completionRate = Math.round((ownedTypes / TOTAL_CARD_TYPES) * 100);

  return (
    <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        📊 コレクション統計
      </h2>
      
      <div className="space-y-3">
        {/* コンプリート率 */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-sm text-muted-foreground">コンプリート率</span>
            <span className="text-lg font-bold text-primary">{completionRate}%</span>
          </div>
          <Progress value={completionRate} className="h-3" />
        </div>

        {/* 所持種類数と総枚数 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="text-center p-3 rounded-lg bg-background/60 border">
            <div className="text-2xl font-bold text-primary">{ownedTypes}</div>
            <div className="text-xs text-muted-foreground">種類 / {TOTAL_CARD_TYPES}</div>
          </div>
          <div className="text-center p-3 rounded-lg bg-background/60 border">
            <div className="text-2xl font-bold text-primary">{totalCards}</div>
            <div className="text-xs text-muted-foreground">総枚数</div>
          </div>
        </div>
      </div>
    </div>
  );
};
