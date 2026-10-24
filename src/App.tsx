import { useCallback, useEffect, useRef, useState } from 'react';
import { Art, DeviceStatusBar, Navigation, ProgressReady, type Screen } from './components';
import { CashbackScreen, HomeScreen, ProfileScreen } from './screens';
import { ChallengesScreen, CollectionScreen, DealsScreen, LeaderboardScreen } from './RewardScreens';
import MapScreen from './MapScreen';
import { BillScreen, RewardsScreen, SplitScreen, SuccessScreen, TransferScreen } from './FinanceScreens';
import { useAccount } from './account';
import { newReceiptId } from './money.mjs';
import WheelPopup from './WheelPopup';
import { deviceScale, INTRO, readScreen } from './flow.mjs';

export default function App() {
  const { account, dispatch } = useAccount();
  const [billId,setBillId] = useState('starbucks'), [recipientId,setRecipientId] = useState('ava');
  const transferLock = useRef(false);
  const [screen, setScreen] = useState<Screen>(() => readScreen(location.hash) as Screen);
  const [intro, setIntro] = useState<'show' | 'dissolve' | 'done'>(() => location.hash ? 'done' : 'show');
  const [wheelOpen, setWheelOpen] = useState(false);
  const [scale, setScale] = useState(() => deviceScale(innerWidth, innerHeight));
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const scroll = useRef<HTMLDivElement>(null), main = useRef<HTMLElement>(null), initialPopup = useRef(!location.hash);
  const closeWheel = useCallback(() => setWheelOpen(false), []);
  const origins = useRef<Partial<Record<Screen,Screen>>>({ profile:'home',cashback:'profile',collection:'home',leaderboard:'home',challenges:'home',deals:'home',nearby:'deals',rewards:'home',bill:'home',split:'bill',transfer:'split',success:'home' });
  const navigate = useCallback((next: Screen, record = true) => { if(record && next !== screen) origins.current[next] = screen; if (location.hash === `#${next}`) { setScreen(next); scroll.current?.scrollTo({ top: 0 }); } else location.hash = next; }, [screen]);
  const go = (next: Screen) => navigate(next);
  const back = () => navigate(origins.current[screen] || 'home', false);
  const openBill = (id: string) => { setBillId(id); go('bill'); };
  const startTransfer = (id: string) => { transferLock.current = false; setRecipientId(id); go('transfer'); };
  const submitTransfer = (amountCents: number) => {
    if(transferLock.current || !Number.isSafeInteger(amountCents) || amountCents <= 0 || amountCents > account.balanceCents) return;
    transferLock.current = true;
    dispatch({ type:'transfer',id:newReceiptId(),amountCents,recipientId,billId,createdAt:new Date().toISOString() });
    go('success');
  };
  useEffect(() => { if (screen === 'transfer') transferLock.current = false; }, [screen]);
  useEffect(() => {
    const resize = () => setScale(deviceScale(innerWidth, innerHeight));
    const route = () => { setScreen(readScreen(location.hash) as Screen); setWheelOpen(false); };
    const media = matchMedia('(prefers-reduced-motion: reduce)'), motion = () => setReducedMotion(media.matches);
    addEventListener('resize', resize); addEventListener('hashchange', route); media.addEventListener('change', motion);
    return () => { removeEventListener('resize', resize); removeEventListener('hashchange', route); media.removeEventListener('change', motion); };
  }, []);
  useEffect(() => { const titles = {home:'Home',profile:'Your Profile',cashback:'Cashback Balance',collection:'Collection',leaderboard:'Leaderboard',challenges:'Challenges',deals:'Deals',nearby:'Nearby merchants',rewards:'Reward Status',bill:'Bill Overview',split:'Bill Splitter',transfer:'Transfer',success:'Success'}; document.title = `${titles[screen]} — Treatz`; if (scroll.current) scroll.current.scrollTop = 0; if (intro === 'done' && !wheelOpen && !['nearby','transfer'].includes(screen)) main.current?.focus({ preventScroll: true }); }, [screen, intro, wheelOpen]);
  useEffect(() => {
    if (intro === 'done') return;
    const timer = window.setTimeout(() => setIntro(intro === 'show' ? 'dissolve' : 'done'), intro === 'show' ? INTRO.reveal : reducedMotion ? 180 : INTRO.dissolve);
    return () => window.clearTimeout(timer);
  }, [intro, reducedMotion]);
  useEffect(() => {
    if (intro !== 'done' || !initialPopup.current) return;
    if (screen !== 'home') { initialPopup.current = false; return; }
    const timer = window.setTimeout(() => { initialPopup.current = false; setWheelOpen(true); }, INTRO.popup);
    return () => window.clearTimeout(timer);
  }, [intro, screen]);
  return <div className="desktop-stage min-h-dvh flex items-center justify-center"><div className="device-slot" style={{ width: 393 * scale, height: 852 * scale }}><div className="device" style={{ transform: `scale(${scale})` }}>
    {intro === 'done' && !wheelOpen && !['home','profile','leaderboard','nearby','cashback','challenges','deals','collection'].includes(screen) && <DeviceStatusBar light={['rewards','bill','split','transfer'].includes(screen)} />}
    <ProgressReady value={intro === 'done' && !wheelOpen && (screen !== 'home' || !initialPopup.current)}><div className="app-shell flex h-full flex-col" inert={intro !== 'done' || wheelOpen}>
      <main className="app-main flex-1 min-h-0" ref={main} tabIndex={-1} id="main-content"><div className="screen-scroll h-full" ref={scroll} key={screen}>
        {screen === 'home' ? <HomeScreen profile={() => go('profile')} cashback={() => go('cashback')} collection={() => go('collection')} leaderboard={() => go('leaderboard')} challenges={() => go('challenges')} onTransaction={openBill} /> : screen === 'profile' ? <ProfileScreen back={back} cashback={() => go('cashback')} collection={() => go('collection')} leaderboard={() => go('leaderboard')} /> : screen === 'cashback' ? <CashbackScreen back={back} onTransaction={openBill} /> : screen === 'collection' ? <CollectionScreen back={back} cashback={() => go('cashback')} /> : screen === 'leaderboard' ? <LeaderboardScreen back={back} profile={() => go('profile')} /> : screen === 'challenges' ? <ChallengesScreen back={back} /> : screen === 'deals' ? <DealsScreen back={back} cashback={() => go('cashback')} map={() => go('nearby')} rewards={() => go('rewards')} /> : screen === 'rewards' ? <RewardsScreen back={back} collection={() => go('collection')} cashback={() => go('cashback')} deals={() => go('deals')} /> : screen === 'bill' ? <BillScreen billId={billId} back={back} split={() => go('split')} /> : screen === 'split' ? <SplitScreen billId={billId} back={back} transfer={startTransfer} /> : screen === 'transfer' ? <TransferScreen recipientId={recipientId} back={back} submit={submitTransfer} /> : screen === 'success' ? <SuccessScreen receipt={account.receipts.at(-1) || null} home={() => go('home')} /> : <MapScreen back={back} />}
      </div></main>{!['nearby','split','transfer','success'].includes(screen) && <Navigation screen={screen} go={go} />}
    </div></ProgressReady>
    {intro !== 'done' && <div className={`splash-screen ${intro}`} role="status" aria-label="Welcome to Treatz"><Art name="logo-updated" className="splash-logo" alt="treatz" /></div>}
    {wheelOpen && <WheelPopup close={closeWheel} reducedMotion={reducedMotion} />}
  </div></div></div>;
}
