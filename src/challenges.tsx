import { Clock3 } from 'lucide-react';
import { Art, ProgressFill } from './components';

export const challengeItems = [
  { id: 'daily', title: 'Daily streak', caption: 'Log in', progress: 100, remaining: 'Completed', deadline: '1 DAY' },
  { id: 'piggy', title: 'Piggy bank', caption: 'Save 10%', progress: 0, remaining: '100% left', deadline: '4 DAYS' },
  { id: 'invite', title: 'Invite 5 friends', caption: 'Unlock Level 25', progress: 12, remaining: '88% left', deadline: '4 DAYS' },
] as const;

export function ChallengeItem({ item, onOpen, showDeadline = false }: {
  item: typeof challengeItems[number]; onOpen?: () => void; showDeadline?: boolean;
}) {
  return <article className={`illustrated-challenge ${item.progress === 100 ? 'completed-challenge' : ''}`}>
    {onOpen && <button className="row-open" onClick={onOpen} aria-label={`Open ${item.title} challenge`} />}
    <div className="challenge-art-tile"><Art name={`challenge-${item.id}`} alt="" /></div>
    <div className="illustrated-challenge-copy">
      <h3>{item.title}</h3>
      {showDeadline && <span className="time-chip"><Clock3 size={11} />{item.deadline}</span>}
      <div className="challenge-track" role="progressbar" aria-label={item.title} aria-valuemin={0} aria-valuemax={100} aria-valuenow={item.progress}>
        <ProgressFill width={`${item.progress}%`} />
      </div>
      <div className="challenge-caption"><strong>{item.caption}</strong><span>{item.remaining}</span></div>
    </div>
  </article>;
}
