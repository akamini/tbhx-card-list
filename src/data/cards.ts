// カードレアリティ定義
export const RARITIES = [
  { id: 'GSP', name: 'GSP', count: 2, isRare: true, color: 'from-amber-500 to-yellow-300' },
  { id: 'GP', name: 'GP', count: 11, isRare: true, color: 'from-amber-400 to-orange-300' },
  { id: 'SEC', name: 'SEC', count: 10, isRare: true, color: 'from-purple-500 to-pink-400' },
  { id: 'HSP', name: 'HSP', count: 11, isRare: true, color: 'from-rose-500 to-red-400' },
  { id: 'SSP', name: 'SSP', count: 11, isRare: true, color: 'from-cyan-400 to-blue-400' },
  { id: 'SP', name: 'SP', count: 11, isRare: false, color: 'from-violet-400 to-indigo-400' },
  { id: 'QR', name: 'QR', count: 11, isRare: false, color: 'from-emerald-400 to-teal-400' },
  { id: 'HR', name: 'HR', count: 18, isRare: false, color: 'from-sky-400 to-blue-300' },
  { id: 'MR', name: 'MR', count: 11, isRare: false, color: 'from-lime-400 to-green-400' },
  { id: 'IR', name: 'IR', count: 22, isRare: false, color: 'from-orange-300 to-amber-200' },
  { id: 'TR', name: 'TR', count: 22, isRare: false, color: 'from-pink-300 to-rose-200' },
  { id: 'SSR', name: 'SSR', count: 26, isRare: false, color: 'from-fuchsia-400 to-purple-300' },
  { id: 'SR', name: 'SR', count: 32, isRare: false, color: 'from-slate-400 to-zinc-300' },
] as const;

export type RarityId = typeof RARITIES[number]['id'];

export interface Card {
  id: string;
  rarity: RarityId;
  number: number;
}

export interface CardOwnership {
  [cardId: string]: number;
}

// カードマスターデータを生成
export const generateCards = (): Card[] => {
  const cards: Card[] = [];
  
  for (const rarity of RARITIES) {
    for (let i = 1; i <= rarity.count; i++) {
      const paddedNumber = i.toString().padStart(2, '0');
      cards.push({
        id: `TBHX01-${rarity.id}${paddedNumber}`,
        rarity: rarity.id,
        number: i,
      });
    }
  }
  
  return cards;
};

export const CARDS = generateCards();

// 総カード数
export const TOTAL_CARD_TYPES = CARDS.length; // 198

// レアリティでカードをグループ化
export const getCardsByRarity = (rarityId: RarityId): Card[] => {
  return CARDS.filter(card => card.rarity === rarityId);
};

// レアリティ情報を取得
export const getRarityInfo = (rarityId: RarityId) => {
  return RARITIES.find(r => r.id === rarityId)!;
};
