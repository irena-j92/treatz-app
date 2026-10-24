import { useRef, useState } from 'react';
import { Clock3, Search } from 'lucide-react';
import { Art, PageHeader, ProgressFill, SectionHeading } from './components';
import { ChallengeItem, challengeItems } from './challenges';

const pastryTreats = [
  ['waffle','Golden waffle'], ['sandwich','Ice cream sandwich'], ['custard','Sweet Custard'],
  ['candy','Candy twist'], ['pie','Berry pie'], ['tart','Lemon tart'],
] as const;
const collectionGroups = [
  { name:'Pastry', collected:6, total:10, slots:12, items:pastryTreats },
  { name:'Cake', collected:0, total:8, slots:10, items:[] },
  { name:'Bite-sized', collected:0, total:10, slots:10, items:[] },
  { name:'Mystery', collected:0, total:10, slots:10, items:[] },
];
function TreatGrid({ group }: { group: typeof collectionGroups[number] }) {
  return <section className="treat-section"><header><h2>{group.name}</h2><span>{group.collected}/{group.total}</span></header>
    <div className="treat-grid">{Array.from({ length:group.slots },(_,index) => {
      const item = group.items[index];
      return <div className={`treat-tile ${item ? 'collected' : 'locked'}`} key={index} style={{animationDelay:`${Math.min(index,7)*35}ms`}} aria-label={item ? item[1] : 'Locked treat'}>{item ? <Art name={`pastry-${item[0]}`} alt={item[1]} /> : <Art name="question-mark" />}</div>;
    })}</div>
  </section>;
}
export function CollectionScreen({ back, cashback }: { back: () => void; cashback: () => void }) {
  const [category,setCategory] = useState('All');
  const groups = category === 'All' ? collectionGroups.slice(0,2) : collectionGroups.filter(group => group.name === category);
  return <div className="screen-content collection-content light-header"><PageHeader title="Collection" back={back} balance={cashback} />
    <div className="chip-scroll" aria-label="Treat categories">{['All',...collectionGroups.map(group=>group.name)].map(item=><button className={`category-chip ${category === item ? 'selected' : ''}`} key={item} aria-pressed={category === item} onClick={()=>setCategory(item)}>{item}</button>)}</div>
    <div className="collection-grids" key={category}>{groups.map(group=><TreatGrid key={group.name} group={group} />)}</div>
  </div>;
}

const ranks = [
  ['Christy','avatar',12480], ['Mia','avatar-mia',12140], ['Leo','avatar-leo',11650], ['Ava','avatar-ava',11540], ['Noah','avatar-noah',11260], ['Tina','avatar-tina',10370], ['Sam','avatar-sam',10240], ['Max','avatar-max',10110],
] as const;
export function LeaderboardScreen({ back, profile }: { back: () => void; profile: () => void }) {
  const [scope, setScope] = useState('Global');
  const rows = scope === 'Regional' ? ranks.slice(0,5) : ranks;
  return <div className="screen-content leaderboard-content light-header"><PageHeader title="Leaderboard" back={back} /><div className="league-meta"><h2>Golden League</h2><span>3d 2h 29m</span></div><div className="trophy-podium"><Art name="cup-bronze" alt="Bronze trophy" /><Art name="cup-gold" alt="Gold trophy" /><Art name="cup-silver" alt="Silver trophy" /></div><div className="league-tabs" aria-label="Leaderboard scope">{['Global','Regional','Friends'].map(item => <button className={`category-chip ${item === scope ? 'selected' : ''}`} key={item} onClick={() => setScope(item)} aria-pressed={scope === item}>{item}</button>)}</div><ol className="ranking-list" start={14}>{rows.map(([name, art, xp],index) => <li className={`ranking-row ${index === 0 ? 'current-user' : ''}`} key={name}><span className="rank-number">{14+index}</span><span className={`ranking-avatar ${['Leo','Ava','Sam'].includes(name) ? 'rimmed' : ''}`}><Art name={art} /></span>{index === 0 ? <button onClick={profile} className="rank-name" aria-label="Open Christy’s profile">{name}</button> : <span className="rank-name">{name}</span>}<span className="rank-xp"><Art name="bolt" />{xp}</span></li>)}</ol></div>;
}

export function Deadline({ children }: { children: string }) { return <span className="time-chip"><Clock3 size={11} />{children}</span>; }
export function ChallengesScreen({ back }: { back: () => void }) {
  return <div className="screen-content challenges-content">
    <header className="challenges-hero"><PageHeader title="Challenges" back={back} />
      <div className="challenge-reward-line"><p className="challenge-award">Earn +250 XP</p><Deadline>3 DAYS</Deadline></div>
      <section className="grocery-goal"><h2>Spend €50 on groceries</h2><div className="challenge-track" role="progressbar" aria-label="Groceries challenge" aria-valuenow={31.45} aria-valuemin={0} aria-valuemax={50}><ProgressFill width="199px" color="#FF8EFB" /></div><div><span>€31.45</span><span>24% left</span></div></section>
      <Art name="grocery-cart" className="grocery-cart" />
    </header>
    <div className="challenge-sections">
      <section><header><h2>Daily challenge</h2><Deadline>1 DAY</Deadline></header><ChallengeItem item={challengeItems[0]} /></section>
      <section><header><h2>Weekly challenges</h2><Deadline>4 DAYS</Deadline></header><ChallengeItem item={challengeItems[1]} /><ChallengeItem item={challengeItems[2]} /></section>
    </div>
  </div>;
}

const brands = [
  ['shell','Shell','3%'],['ubereats','Uber Eats','2%'],['dunkin','Dunkin’','4%'],['hm','H&M','6%'],['zara','ZARA','1%'],['doordash','DoorDash','5%'],['tacobell','Taco Bell','3%'],['seveneleven','7-Eleven','4%'],
] as const;
function scrollCarousel(event: React.KeyboardEvent<HTMLDivElement>, step: number) {
  if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
  event.preventDefault();
  event.currentTarget.scrollBy({ left: event.key === 'ArrowRight' ? step : -step, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
export function DealsScreen({ back, cashback, map, rewards }: { back: () => void; cashback: () => void; map: () => void; rewards: () => void }) {
  const track = useRef<HTMLDivElement>(null), [active, setActive] = useState(0);
  return <div className="screen-content deals-content">
    <section className="deals-green"><PageHeader title="Rewards" back={back} balance={cashback} />
      <button className="deal-search" onClick={map} aria-label="Search brands or deals"><Search size={21} strokeWidth={1.5} /><span>Search brands or deals...</span></button>
      <h2>Top Deals</h2>
      <div className="deals-carousel" ref={track} role="region" tabIndex={0} aria-label="Top deals, scroll horizontally" onScroll={e => setActive(Math.max(0,Math.min(2,Math.round(e.currentTarget.scrollLeft/177))))} onKeyDown={event => scrollCarousel(event,177)}>
        {[['nike','Nike','15%'],['smeg','SMEG','5%'],['third','SMEG','5%']].map(([art,name,rate]) => <article className="top-deal-card" key={art}>
          <button className="row-open" onClick={rewards} aria-label={`View ${name} reward status`} />
          <Art name={`deal-${art}`} className="deal-photo" /><Deadline>3 DAYS</Deadline>
          <span className="deal-brand-bubble"><Art name={`brand-${art === 'nike' ? 'nike' : 'smeg'}`} alt={`${name} logo`} /></span>
          <div className="deal-card-copy"><h3>Earn up to {rate}</h3><p>{name}</p></div>
        </article>)}
      </div>
      <div className="deal-pagination" aria-label={`Deal ${active+1} of 3`}>{[0,1,2].map(index => <button key={index} className={active === index ? 'selected' : ''} aria-label={`Show deal ${index+1}`} aria-current={active === index ? 'true' : undefined} onClick={() => track.current?.scrollTo({ left: index*177, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })} />)}</div>
    </section>
    <section className="active-boosts"><SectionHeading onSeeAll={rewards}>Active boosts</SectionHeading>
      <div className="boost-carousel" role="region" tabIndex={0} aria-label="Active boosts, scroll horizontally" onKeyDown={event => scrollCarousel(event,168)}>
        {[['dunkin','Dunkin’ Coffee','10%'],['urban','Urban Outfitters','20%'],['third','Google Play','15%']].map(([art,name,rate]) => <button className={`active-boost-card boost-${art}`} key={art} onClick={rewards} aria-label={`View ${name} ${rate} off boost`}>
          <Art name={`boost-${art}`} className="boost-photo" /><span className="boost-multiplier"><Art name="boost-rocket" />2X</span><span className="boost-caption"><strong>{rate} off</strong><span>{name}</span></span>
        </button>)}
      </div>
    </section>
    <section className="shop-brands"><SectionHeading onSeeAll={map}>Shop by brand</SectionHeading><div className="brand-grid">{brands.map(([art,name,rate]) => <button key={art} onClick={map} aria-label={`Find ${name} and ${rate} cashback`}><span className="brand-logo-tile"><Art name={`brand-${art}`} alt={`${name} logo`} /></span><strong>{name}</strong><span>{rate} back</span></button>)}</div></section>
  </div>;
}
