import { useRef, useState } from 'react';
import { Clock3, Search } from 'lucide-react';
import { Art, PageHeader, ProgressFill, SectionHeading } from './components';

const treats = [
  ['caramel', 'Caramel slice'], ['muffin', 'Berry muffin'], ['custard', 'Sweet Custard'], ['candy', 'Candy twist'], ['cake', 'Vanilla cake'],
];
function TreatGrid({ category = 'Bakery' }: { category?: string }) {
  return <section className="treat-section"><header><h2>{category}</h2><span>{category === 'Bakery' ? '8 / 10' : category === 'Candy' ? '1 / 10' : '0 / 10'}</span></header><div className="treat-grid">{Array.from({ length: 10 }, (_, index) => {
    const item = category === 'Bakery' ? treats[index] : category === 'Candy' && index === 0 ? treats[3] : undefined;
    return <div className={`treat-tile ${item ? 'collected' : 'locked'}`} key={index} aria-label={item ? item[1] : 'Locked treat'}>{item ? <Art name={`treat-${item[0]}`} alt={item[1]} /> : <Art name="question-mark" />}</div>;
  })}</div></section>;
}
export function CollectionScreen({ back, cashback }: { back: () => void; cashback: () => void }) {
  const [category, setCategory] = useState('All');
  return <div className="screen-content collection-content light-header"><PageHeader title="Collection" back={back} balance={cashback} /><p className="collection-count">23 / 50 collected</p><div className="chip-scroll" aria-label="Treat categories">{['All','Bakery','Candy','Frozen','Drinks'].map(item => <button className={`category-chip ${category === item ? 'selected' : ''}`} key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="collection-grids" key={category}>{category === 'All' ? <><TreatGrid /><TreatGrid /></> : <TreatGrid category={category} />}</div></div>;
}

const ranks = [
  ['Christy','avatar',12480], ['Mia','avatar-mia',12140], ['Leo','avatar-leo',11650], ['Ava','avatar-ava',11540], ['Noah','avatar-noah',11260], ['Tina','avatar-tina',10370], ['Sam','avatar-sam',10240], ['Max','avatar-max',10110],
] as const;
export function LeaderboardScreen({ back, profile }: { back: () => void; profile: () => void }) {
  const [scope, setScope] = useState('Global');
  const rows = scope === 'Regional' ? ranks.slice(0,5) : ranks;
  return <div className="screen-content leaderboard-content light-header"><PageHeader title="Leaderboard" back={back} /><div className="trophy-podium"><Art name="cup-bronze" alt="Bronze trophy" /><Art name="cup-gold" alt="Gold trophy" /><Art name="cup-silver" alt="Silver trophy" /></div><div className="league-meta"><h2>Golden League</h2><span>3d 2h 29m</span></div><div className="league-tabs" aria-label="Leaderboard scope">{['Global','Regional','Friends'].map(item => <button className={`category-chip ${item === scope ? 'selected' : ''}`} key={item} onClick={() => setScope(item)} aria-pressed={scope === item}>{item}</button>)}</div><ol className="ranking-list" start={14}>{rows.map(([name, art, xp],index) => <li className={`ranking-row ${index === 0 ? 'current-user' : ''}`} key={name}><span className="rank-number">{14+index}</span><span className={`ranking-avatar ${['Leo','Ava','Sam'].includes(name) ? 'rimmed' : ''}`}><Art name={art} /></span>{index === 0 ? <button onClick={profile} className="rank-name" aria-label="Open Christy’s profile">{name}</button> : <span className="rank-name">{name}</span>}<span className="rank-xp"><Art name="bolt" />{xp}</span></li>)}</ol></div>;
}

export function Deadline({ children }: { children: string }) { return <span className="time-chip"><Clock3 size={11} />{children}</span>; }
function DetailedChallenge({ title = 'Invite 5 friends', caption = 'Unlock Level 25', left = '88% left', value = 12 }: { title?: string; caption?: string; left?: string; value?: number }) {
  return <article className="detailed-challenge"><div className="challenge-placeholder" aria-hidden="true" /><div><h3>{title}</h3><div className="challenge-track" role="progressbar" aria-label={title} aria-valuemin={0} aria-valuemax={100} aria-valuenow={value}><ProgressFill width="19px" /></div><div className="challenge-caption"><strong>{caption}</strong><span>{left}</span></div></div></article>;
}
export function ChallengesScreen({ back }: { back: () => void }) {
  return <div className="screen-content challenges-content"><header className="challenges-hero"><PageHeader title="Challenges" back={back} /><p className="challenge-award">Earn +250 XP</p><Deadline>3 DAYS</Deadline><Art name="grocery-cart" className="grocery-cart" /><section className="grocery-goal"><h2>Spend €50 on groceries</h2><div className="challenge-track" role="progressbar" aria-label="Groceries challenge" aria-valuenow={31.45} aria-valuemin={0} aria-valuemax={50}><ProgressFill width="199px" /></div><div><span>€31.45</span><span>24% left</span></div></section></header><div className="challenge-sections"><section><header><h2>Weekly challenge</h2><Deadline>4 DAYS</Deadline></header><DetailedChallenge /></section><section><header><h2>Daily challenges</h2><Deadline>1 DAY</Deadline></header><DetailedChallenge title="Saving streak" caption="Log a saving goal" left="100% left" value={0} /><DetailedChallenge /><DetailedChallenge /></section></div></div>;
}

const brands = [
  ['shell','Shell','3%'],['ubereats','Uber Eats','2%'],['dunkin','Dunkin’','4%'],['hm','H&M','6%'],['zara','ZARA','1%'],['doordash','DoorDash','5%'],['tacobell','Taco Bell','3%'],['seveneleven','7-Eleven','4%'],
] as const;
export function DealsScreen({ back, cashback, map, rewards }: { back: () => void; cashback: () => void; map: () => void; rewards: () => void }) {
  const track = useRef<HTMLDivElement>(null), [active, setActive] = useState(0);
  return <div className="screen-content deals-content"><section className="deals-green"><PageHeader title="Deals" back={back} balance={cashback} /><button className="deal-search" onClick={map} aria-label="Search brands or deals"><Search size={21} strokeWidth={1.5} /><span>Search brands or deals...</span></button><h2>Top Deals</h2><div className="deals-carousel" ref={track} tabIndex={0} aria-label="Top deals, scroll horizontally" onScroll={e => setActive(Math.max(0,Math.min(2,Math.round(e.currentTarget.scrollLeft/177))))} onKeyDown={e => { if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); e.currentTarget.scrollBy({ left: e.key === 'ArrowRight' ? 177 : -177, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); } }}>{[['nike','Nike','15%'],['smeg','SMEG','5%'],['third','SMEG','5%']].map(([art,name,rate]) => <article className="top-deal-card" key={art}><button className="row-open" onClick={rewards} aria-label={`View ${name} reward status`} /><Art name={`deal-${art}`} className="deal-photo" /><Deadline>3 DAYS</Deadline><span className="deal-brand-bubble"><Art name={`brand-${art === 'nike' ? 'nike' : 'smeg'}`} alt={`${name} logo`} /></span><div className="deal-card-copy"><h3>Earn up to {rate}</h3><p>{name}</p></div></article>)}</div><div className="deal-pagination" aria-label={`Deal ${active+1} of 3`}>{[0,1,2].map(index => <button key={index} className={active === index ? 'selected' : ''} aria-label={`Show deal ${index+1}`} aria-current={active === index ? 'true' : undefined} onClick={() => track.current?.scrollTo({ left: index*177, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} />)}</div></section><section className="shop-brands"><SectionHeading onSeeAll={map}>Shop by brand</SectionHeading><div className="brand-grid">{brands.map(([art,name,rate]) => <button key={art} onClick={map} aria-label={`Find ${name} and ${rate} cashback`}><span className="brand-logo-tile"><Art name={`brand-${art}`} alt={`${name} logo`} /></span><strong>{name}</strong><span>{rate} back</span></button>)}</div></section></div>;
}
