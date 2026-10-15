import { useAccount } from './account';
import { formatMoney, TOTAL_RECEIVED } from './money.mjs';
import { TransactionsSection } from './transactions';
import { Art, CharityBanner, ChallengeRow, Earned, PageHeader, ProgressFill, SectionHeading, StatusPill } from './components';

export function HomeScreen({ profile, cashback, collection, leaderboard, challenges, onTransaction }: { profile: () => void; cashback: () => void; collection: () => void; leaderboard: () => void; challenges: () => void; onTransaction: (id: string) => void }) {
  const { account } = useAccount();
  return <div className="screen-content home-content">
    <div className="home-stats" aria-label="Your progress"><span><Art name="bolt" />12480</span><span className="streak-count"><Art name="flame" />4</span><button onClick={leaderboard} aria-label="Open leaderboard"><Art name="trophy" />#14</button><button onClick={collection} aria-label="Open current level collection"><Art name="custard-small" />Lvl 24</button></div>
    <header className="welcome-row"><h1>Welcome back,<br />Christy</h1><button className="avatar home-avatar" onClick={profile} aria-label="Open Christy’s profile"><Art name="avatar" /><span className="online-dot" /></button></header>
    <section className="streak-card" aria-label="Streak goal"><h2>Streak Goal</h2><div className="streak-track" role="progressbar" aria-label="Streak goal" aria-valuenow={168} aria-valuemax={175} aria-valuemin={0}><ProgressFill className="streak-fill" width="18%" color="#005F34" />{[0,17.3,28.6,50.3,71.7,96].map((position,i) => <i key={position} className={i < 2 ? 'completed' : i === 5 ? 'future' : ''} style={{ left: `${position}%` }} />)}</div><p>168 / 175 days</p></section>
    <button className="balance-card" onClick={cashback} aria-label={`Open cashback balance, ${formatMoney(account.balanceCents)}`}><Art name="coin-stack" /><span className="balance-card-copy"><strong>{formatMoney(account.balanceCents)}</strong><StatusPill /></span></button>
    <CharityBanner />
    <SectionHeading onSeeAll={challenges}>Challenges</SectionHeading><div className="challenges-list"><ChallengeRow onOpen={challenges} /><ChallengeRow onOpen={challenges} /></div><div className="home-transactions"><TransactionsSection onOpen={onTransaction} /></div>
  </div>;
}

const badges = [['rookie', 'Jun'], ['skilled', 'Jul'], ['expert', 'Aug'], ['mastermind', 'Sep']];
const achievements = [
  { art: 'loyalty', title: 'Loyalty Royalty', description: 'Check in for 30 days', earned: true },
  { art: 'challenge', title: 'Challenge Crusher', description: 'Complete 10 challenges', earned: true },
  { art: 'split', title: 'Bill Splitter Master', description: 'Split 5 bills with friends', earned: false },
];

export function ProfileScreen({ back, cashback, collection, leaderboard }: { back: () => void; cashback: () => void; collection: () => void; leaderboard: () => void }) {
  const { account } = useAccount();
  return <div className="screen-content profile-content">
    <div className="profile-green" aria-hidden="true" /><PageHeader title="Your Profile" back={back} />
    <div className="profile-identity"><div className="avatar profile-avatar"><Art name="avatar" /></div><div><h2>Christy</h2><p>Student ID: <span>14456789</span></p></div></div>
    <div className="profile-metrics"><div className="metric-card"><Art name="profile-bolt" /><strong>12480</strong><span>XP</span></div><button className="metric-card" onClick={cashback} aria-label={`Open cashback balance, ${formatMoney(account.balanceCents)}`}><Art name="coin" /><strong>{formatMoney(account.balanceCents)}</strong><span>Cashback</span></button><button className="metric-card" onClick={leaderboard} aria-label="Open leaderboard"><Art name="profile-trophy" /><strong>#14</strong><span>Global rank</span></button></div>
    <div className="profile-body"><CharityBanner />
      <section className="level-card"><button className="row-open" onClick={collection} aria-label="Open current level collection" /><div className="level-number"><span>Level</span><strong>24</strong></div><div className="level-copy"><h3>On a sweet roll</h3><p>720 / 1000 XP</p></div><Art name="custard" /><div className="level-track" role="progressbar" aria-label="Level 24 progress" aria-valuenow={720} aria-valuemin={0} aria-valuemax={1000}><ProgressFill width="72%" color="#005F34" /></div><span className="custard-caption">Sweet Custard</span></section>
      <SectionHeading>Monthly badges</SectionHeading><div className="badges-grid">{badges.map(([name, month]) => <div className="badge-tile" key={name}><Art name={`badge-${name}`} alt={`${name} badge`} /><span>{month}</span></div>)}</div>
      <div className="achievements-section"><SectionHeading>Achievements</SectionHeading><div className="achievement-list">{achievements.map(item => <article key={item.art} className="achievement-row"><Art name={`achievement-${item.art}`} /><div><h3>{item.title}</h3><p>{item.description}</p></div>{item.earned ? <Earned /> : <strong className="splits-progress">3 / 5 splits</strong>}</article>)}</div></div>
    </div>
  </div>;
}

export function CashbackScreen({ back, onTransaction }: { back: () => void; onTransaction: (id: string) => void }) {
  const { account } = useAccount();
  return <div className="screen-content cashback-content"><section className="cashback-header"><PageHeader title="Cashback Balance" back={back} /><Art className="cashback-hero-coin" name="coin-stack" /><h2>{formatMoney(account.balanceCents)}</h2><span className="status-pill">Expiry date:&nbsp;<time dateTime="2027-10-15">15 Oct 2027</time></span></section>
    <div className="cashback-summary">{[['Received', formatMoney(TOTAL_RECEIVED)], ['Redeemed', formatMoney(account.redeemedCents)]].map(([label, value]) => <div key={label}><Art name="coin" /><div><span>{label}</span><strong>{value}</strong></div></div>)}</div>
    <TransactionsSection onOpen={onTransaction} />
  </div>;
}
