import { Tag } from 'lucide-react';
import { useAccount } from './account';
import { formatMoney } from './money.mjs';
import { ArrowLeft, ArrowRight, Check, ChevronRight, Clock3 } from 'lucide-react';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';

export const ProgressReady = createContext(true);
export function ProgressFill({ width, color = '#FF8EFB', className = '' }: { width: string; color?: string; className?: string }) {
  const ready = useContext(ProgressReady), ref = useRef<HTMLSpanElement>(null);
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    if (!ready || filled || !ref.current) return;
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setFilled(true); observer.disconnect(); }
    }, { threshold: .2 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ready, filled]);
  return <span ref={ref} className={`progress-fill ${className}`} data-target-width={width} style={{ width: filled ? width : '2px', backgroundColor: color }} />;
}

export function Art({ name, className = '', alt = '', ...props }: { name: string; className?: string; alt?: string; width?: number; height?: number }) {
  return <img src={`/art/${name}.svg`} className={`art ${className}`} alt={alt} draggable={false} {...props} />;
}

export function PageHeader({ title, back, balance }: { title: string; back: () => void; balance?: () => void }) {
  const { account } = useAccount();
  return <header className="page-header"><button className="back-button" onClick={back} aria-label="Go back"><ArrowLeft size={20} strokeWidth={2} /></button><h1>{title}</h1>{balance && <button className="header-balance" onClick={balance} aria-label="Open cashback balance"><Art name="coin" />{formatMoney(account.balanceCents)}</button>}</header>;
}

export function CharityBanner() {
  return <aside className="charity-banner"><Art name="donate" /><p>Donate your cashback<br />to charity</p><button className="white-pill" disabled>Give a little <ArrowRight size={13} /></button></aside>;
}

export function SectionHeading({ children, onSeeAll }: { children: ReactNode; onSeeAll?: () => void }) {
  return <div className="section-heading"><h2>{children}</h2><button disabled={!onSeeAll} onClick={onSeeAll}>See all <ChevronRight size={15} /></button></div>;
}

export function StatusPill() { return <span className="status-pill">Ready to use</span>; }

export function ChallengeRow({ onOpen }: { onOpen?: () => void }) {
  return <article className="challenge-row">{onOpen && <button className="row-open" aria-label="Open challenges" onClick={onOpen} />}<div className="challenge-picture"><Art name="cart" /><span className="deadline"><Clock3 size={11} />4 DAYS</span></div><div className="challenge-copy"><h3>Invite 5 friends</h3><div className="challenge-track" role="progressbar" aria-label="Invite challenge" aria-valuenow={12} aria-valuemin={0} aria-valuemax={100}><ProgressFill width="19px" /></div><div className="challenge-caption"><strong>Unlock Level 25</strong><span>88% left</span></div></div></article>;
}

export function Earned() { return <span className="earned"><Check size={13} /><span>Earned</span></span>; }

export type Screen = 'home' | 'profile' | 'cashback' | 'collection' | 'leaderboard' | 'challenges' | 'nearby' | 'deals' | 'rewards' | 'bill' | 'split' | 'transfer' | 'success';
export function Navigation({ screen, go }: { screen: Screen; go: (s: Screen) => void }) {
  return <nav className="bottom-nav" aria-label="App navigation">{[
    { label: 'Home', icon: 'home', onClick: () => go('home'), active: screen === 'home' },
    { label: 'Analytics', icon: 'analytics', disabled: true },
    { label: 'Rewards', icon: 'rewards', onClick: () => go('rewards'), active: ['rewards','collection'].includes(screen) },
    { label: 'Deals', icon: 'deals', onClick: () => go('deals'), active: ['deals','nearby'].includes(screen) },
  ].map(item => <button key={item.label} onClick={item.onClick} disabled={item.disabled} aria-current={item.active ? 'page' : undefined} title={item.disabled ? `${item.label} — coming in a later screen` : item.label} className={item.active ? 'active' : ''}>{item.icon === 'deals' ? <Tag className="nav-icon deals-nav-icon" size={24} strokeWidth={1.6} /> : <span className="nav-icon" style={{ maskImage: `url(/art/nav-${item.icon}.svg)`, WebkitMaskImage: `url(/art/nav-${item.icon}.svg)` }} />}<span>{item.label}</span></button>)}</nav>;
}
