import { useState, useEffect, useCallback } from 'react';
import type { CardOwnership } from '@/data/cards';

const STORAGE_KEY = 'tbhx-card-collection';

export const useCardCollection = () => {
  const [ownership, setOwnership] = useState<CardOwnership>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // localStorageに保存
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ownership));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }, [ownership]);

  // カードの所持数を取得
  const getCount = useCallback((cardId: string): number => {
    return ownership[cardId] || 0;
  }, [ownership]);

  // カードの所持数を設定
  const setCount = useCallback((cardId: string, count: number) => {
    const newCount = Math.max(0, count);
    setOwnership(prev => ({
      ...prev,
      [cardId]: newCount,
    }));
  }, []);

  // カードの所持数を増加
  const increment = useCallback((cardId: string) => {
    setOwnership(prev => ({
      ...prev,
      [cardId]: (prev[cardId] || 0) + 1,
    }));
  }, []);

  // カードの所持数を減少
  const decrement = useCallback((cardId: string) => {
    setOwnership(prev => ({
      ...prev,
      [cardId]: Math.max(0, (prev[cardId] || 0) - 1),
    }));
  }, []);

  // 統計情報
  const stats = {
    // 所持している種類数（1枚以上持っているカード）
    ownedTypes: Object.values(ownership).filter(count => count > 0).length,
    // 総所持枚数
    totalCards: Object.values(ownership).reduce((sum, count) => sum + count, 0),
  };

  // データをリセット
  const resetAll = useCallback(() => {
    setOwnership({});
  }, []);

  // データをエクスポート（JSON形式）
  const exportData = useCallback(() => {
    return JSON.stringify(ownership, null, 2);
  }, [ownership]);

  // データをインポート
  const importData = useCallback((jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      setOwnership(data);
      return true;
    } catch {
      return false;
    }
  }, []);

  return {
    ownership,
    getCount,
    setCount,
    increment,
    decrement,
    stats,
    resetAll,
    exportData,
    importData,
  };
};
