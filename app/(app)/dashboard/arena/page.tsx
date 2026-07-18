'use client';

import { useState } from 'react';
import { submitArena } from '@/actions/arena';
import { Swords, CheckCircle2, AlertCircle } from 'lucide-react';
import { AchievementToast } from '@/components/gamification/AchievementToast';

const DAILY_QUESTIONS = [
  { id: 'q1', text: 'Which of the following describes a "Bull Market"?', options: ['Prices are falling', 'Prices are rising', 'Prices are stagnant'] },
  { id: 'q2', text: 'What does P/E ratio stand for?', options: ['Price to Earnings', 'Profit to Equity', 'Public to Enterprise'] },
  { id: 'q3', text: 'What is a dividend?', options: ['A penalty for selling early', 'A tax paid to the government', 'A share of profits paid to shareholders'] },
];

export default function ArenaPage() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (Object.keys(answers).length < DAILY_QUESTIONS.length) {
      setError('Please answer all questions before submitting.');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const res = await submitArena(answers);
    
    setIsSubmitting(false);
    if (res.success) {
      setResult(res.result);
    } else {
      setError(res.error || 'Something went wrong.');
    }
  };

  if (result) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-display font-bold text-text-1 mb-2">Arena Completed!</h2>
        <p className="text-text-2 mb-8">You scored {result.score}/{DAILY_QUESTIONS.length}.</p>
        
        <div className="bg-surface border border-border p-6 rounded-2xl mb-8">
          <p className="text-sm font-medium text-text-3 uppercase tracking-wider mb-2">XP Earned</p>
          <h3 className="text-4xl font-display font-bold text-gold">+{result.xpEarned}</h3>
        </div>

        {/* Presentation Toast mapping to server response */}
        {result.unlockedBadges.map((badge: any) => (
          <AchievementToast key={badge.id} newBadge={badge} onDismiss={() => {}} />
        ))}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center">
          <Swords size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-display font-bold text-text-1">Daily Arena</h1>
          <p className="text-text-2">Test your knowledge. Earn XP. (1 attempt per day)</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-6">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      <div className="space-y-8 mb-8">
        {DAILY_QUESTIONS.map((q, idx) => (
          <div key={q.id} className="bg-surface border border-border p-6 rounded-2xl">
            <h3 className="text-lg font-semibold text-text-1 mb-4">
              <span className="text-primary mr-2">{idx + 1}.</span>
              {q.text}
            </h3>
            <div className="space-y-3">
              {q.options.map((opt, optIdx) => (
                <button
                  key={optIdx}
                  onClick={() => setAnswers(prev => ({ ...prev, [q.id]: optIdx }))}
                  className={`w-full text-left p-4 rounded-xl border transition-colors font-medium text-sm ${
                    answers[q.id] === optIdx
                      ? 'bg-primary/10 border-primary text-primary'
                      : 'bg-surface-2 border-border text-text-2 hover:bg-surface-2/80'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full h-14 bg-primary text-white font-semibold rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? 'Submitting...' : 'Submit Answers'}
      </button>
    </div>
  );
}
