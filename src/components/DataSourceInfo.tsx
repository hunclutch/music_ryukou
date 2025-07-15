'use client';

import { useState } from 'react';

export function DataSourceInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        データソースについて
        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      {isOpen && (
        <div className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm">
          <div className="space-y-2">
            <p className="font-medium text-blue-900">
              📊 チャートデータについて
            </p>
            <p className="text-blue-800">
              このサービスはBillboard Japan Hot 100の実際のデータを取得・表示しています。
            </p>
            <p className="text-blue-700">
              <strong>データ取得方式:</strong>
            </p>
            <ul className="list-disc list-inside text-blue-700 space-y-1 ml-4">
              <li>サーバーサイドでBillboard Japanから直接データを取得</li>
              <li>リアルタイムのランキング情報（1位〜100位）</li>
              <li>楽曲タイトル、アーティスト名、順位変動</li>
              <li>前週順位とチャートイン週数</li>
            </ul>
            <p className="text-blue-600 text-xs mt-3">
              ※ データはBillboard Japan公式サイトから取得されます。サイトの構造変更により一時的に取得できない場合があります。
            </p>
          </div>
        </div>
      )}
    </div>
  );
}