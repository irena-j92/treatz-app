import { useEffect, useReducer, useRef } from 'react';
import { X } from 'lucide-react';
import { Art } from './components';
import { SPIN, spinFlow } from './flow.mjs';

export default function WheelPopup({ close, reducedMotion }: { close: () => void; reducedMotion: boolean }) {
  const [phase, dispatch] = useReducer(spinFlow, 'ready');
  const panel = useRef<HTMLDivElement>(null), wheel = useRef<HTMLImageElement>(null), button = useRef<HTMLButtonElement>(null);
  const started = useRef(false);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    button.current?.focus({ preventScroll: true });
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close(); }
      if (event.key === 'Tab') {
        const controls = Array.from(panel.current?.querySelectorAll<HTMLButtonElement>('button:not(:disabled)') || []);
        if (!controls.length) return;
        event.preventDefault();
        const index = controls.indexOf(document.activeElement as HTMLButtonElement);
        controls[(index + (event.shiftKey ? -1 : 1) + controls.length) % controls.length].focus({ preventScroll: true });
      }
    };
    const device = panel.current?.closest('.device');
    device?.addEventListener('keydown', keydown as EventListener);
    return () => { device?.removeEventListener('keydown', keydown as EventListener); previous?.focus({ preventScroll: true }); };
  }, [close]);
  useEffect(() => {
    if (phase !== 'spinning') return;
    const duration = reducedMotion ? SPIN.reducedDuration : SPIN.duration;
    const animation = wheel.current?.animate(reducedMotion ? [{ opacity: 1 }, { opacity: .65 }, { opacity: 1 }] : [
      { transform: 'rotate(0deg)' }, { transform: `rotate(${SPIN.turns * 360 + SPIN.offset}deg)` },
    ], { duration, easing: 'cubic-bezier(.12,.72,.15,1)', fill: 'forwards' });
    const timer = window.setTimeout(() => dispatch('finish'), duration + SPIN.settle);
    return () => { window.clearTimeout(timer); animation?.cancel(); };
  }, [phase, reducedMotion]);
  useEffect(() => { if (phase === 'closing') { const timer = window.setTimeout(close, 280); return () => window.clearTimeout(timer); } }, [phase, close]);
  return <div className={`wheel-overlay ${phase}`} data-reduced={reducedMotion} ref={panel} role="dialog" aria-modal="true" aria-labelledby="wheel-title"><div className="wheel-panel"><button type="button" className="wheel-close" aria-label="Close wheel popup" onClick={close}><X size={24} strokeWidth={2} /></button><h2 id="wheel-title">Give luck a spin</h2><div className="wheel-assembly"><img ref={wheel} className="wheel-disc" src="/art/wheel.svg" alt="Prize wheel with XP, coins and streak rewards" draggable={false} /><Art name="wheel-pointer" className="wheel-pointer" /></div><button ref={button} className="spin-button" aria-disabled={phase !== 'ready'} onClick={() => { if (started.current) return; started.current = true; dispatch('spin'); }}>{phase === 'ready' ? 'Spin Now' : 'Spinning…'}</button><span className="sr-only" role="status">{phase === 'spinning' ? 'The wheel is spinning. You’ll return to Home when it stops.' : ''}</span></div></div>;
}
