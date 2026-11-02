import { useEffect, useRef, useState } from 'react';
import type { CSSProperties, ReactNode, FormEvent } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowRight, Check, Crown, FileText, Globe2, HelpCircle, LayoutGrid, Leaf, LockKeyhole, MessageCircle, RotateCcw, Send, Settings2, Shield, Sparkles, Timer, Users, Volume2, VolumeX, X } from 'lucide-react';
import { canSelect, initialMessages, localPlayer, players } from './model';
import type { Message, Player } from './model';

function Avatar({ player, className = '' }: { player: Player; className?: string }) {
  const { preset } = player.avatar;
  return <span className={`avatar ${className}`} role="img" aria-label={`${player.name}'s chosen avatar`} style={{ '--avatar-x': `${preset % 5 * 25}%`, '--avatar-y': `${Math.floor(preset / 5) * 100}%` } as CSSProperties} />;
}
function Modal({ trigger, title, description, children, className = '', open, onOpenChange }: { trigger: ReactNode; title: string; description: string; children: ReactNode; className?: string; open?: boolean; onOpenChange?: (open: boolean) => void }) {
  return <Dialog.Root open={open} onOpenChange={onOpenChange}><Dialog.Trigger asChild>{trigger}</Dialog.Trigger><Dialog.Portal><Dialog.Overlay className="modal-shade" /><Dialog.Content className={`modal ${className}`}><Dialog.Close className="icon-button close" aria-label="Close dialog"><X size={22} /></Dialog.Close><Dialog.Title>{title}</Dialog.Title><Dialog.Description>{description}</Dialog.Description>{children}</Dialog.Content></Dialog.Portal></Dialog.Root>;
}
function PlayerCard({ player, selected, locked, onSelect }: { player: Player; selected: boolean; locked: boolean; onSelect: () => void }) {
  const eligible = canSelect(player);
  return <button className={`player-card ${selected ? 'selected' : ''} ${player.role ? 'public-role' : ''}`} disabled={!eligible || locked} aria-label={eligible ? `Select ${player.name}` : `${player.name}, ${player.role}, public role`} aria-pressed={eligible ? selected : undefined} onClick={onSelect}>
    <div className="portrait-wrap"><Avatar player={player} />{selected && <span className="selection-tick"><Check size={14} strokeWidth={3} /></span>}{player.role && <span className={`role-pin ${player.role.toLowerCase()}`}>{player.role === 'Master' ? <Crown size={14} /> : <Shield size={14} />}</span>}</div>
    <span className="player-name">{player.name}{player.id === localPlayer.id && <small> You</small>}</span>
    <span className={`player-detail ${player.role?.toLowerCase() || ''}`}>{player.role ? `${player.role} · ${player.role === 'Master' ? '100' : '90'}` : selected ? 'Selected' : 'Suspect'}</span>
  </button>;
}
export default function App() {
  const [gathering, setGathering] = useState<'remote' | 'together'>('remote');
  const [view, setView] = useState<'table' | 'grid'>('table');
  const [panel, setPanel] = useState<'players' | 'chat'>('players');
  const [selectedId, setSelectedId] = useState<string>();
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [locked, setLocked] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [paperOpen, setPaperOpen] = useState(false);
  const [reduced, setReduced] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [lighter, setLighter] = useState(false);
  const [sound, setSound] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const endRef = useRef<HTMLDivElement>(null);
  const selected = players.find(p => p.id === selectedId);
  useEffect(() => { if (panel === 'chat') endRef.current?.scrollIntoView?.({ block: 'nearest' }); }, [messages, panel]);
  useEffect(() => {
    const hidePaper = () => { if (document.hidden) setPaperOpen(false); };
    document.addEventListener('visibilitychange', hidePaper);
    return () => document.removeEventListener('visibilitychange', hidePaper);
  }, []);
  function reset() { setSelectedId(undefined); setDraft(''); setMessages(initialMessages); setLocked(false); setAnnouncement('Demo reset. Choose a suspect to begin again.'); }
  function send(event: FormEvent) {
    event.preventDefault();
    const text = draft.trim(); if (!text || locked) return;
    setMessages(previous => [...previous, { id: Date.now(), playerId: localPlayer.id, text, time: 'Demo' }]); setDraft('');
  }
  function lock() {
    if (!selected || !canSelect(selected) || locked) return;
    setLocked(true); setConfirmOpen(false); setAnnouncement(`Demo accusation acknowledged: ${selected.name}. No result or points have been generated.`);
    if (sound) { // Optional, local feedback only; never signifies guilt.
      try { const audio = new AudioContext(); const tone = audio.createOscillator(); const gain = audio.createGain(); tone.connect(gain); gain.connect(audio.destination); gain.gain.value = 0.035; tone.frequency.value = 440; tone.start(); tone.stop(audio.currentTime + 0.12); tone.onended = () => { void audio.close(); }; } catch { /* Silent fallback when audio is unavailable. */ }
    }
  }
  return <div className={`app ${reduced ? 'reduce-motion' : ''} ${lighter ? 'lighter' : ''}`}>
    <header className="site-header"><a className="wordmark" href="#main" aria-label="Koro Baby game"><span>KORO<span className="logo-rays">✦</span></span><span className="baby">BABY<span className="logo-stroke" /></span></a><div className="header-divider" /><span className="header-caption">Good people.<br /><strong>Great gatherings.</strong></span><div className="header-right"><span className="prototype-label"><span /> INTERACTION PROTOTYPE</span>
      <Modal title="Welcome to the gathering" description="This is Task 01: a local interaction prototype, with simulated players and chat." trigger={<button className="icon-button" aria-label="How to play"><HelpCircle size={21} /></button>}><ol className="help-list"><li><strong>Know your role.</strong> You are Mariama, Police 90. Hassan is Master 100. Koro Baby holds 0.</li><li><strong>Talk and bluff.</strong> Try local chat, then select one of the eight suspects. Your selection stays private.</li><li><strong>Review before locking.</strong> Only Police can accuse. A wrong accusation awards Police 0, the accused 90, and Koro Baby the accused’s original value.</li></ol><div className="notice">This prototype acknowledges your selection only. It does not draw papers, connect players or calculate results.</div></Modal>
      <Modal title="Make yourself comfortable" description="Display and feedback preferences for this prototype." trigger={<button className="icon-button" aria-label="Settings"><Settings2 size={21} /></button>}><div className="preferences"><label><span>Reduced motion<small>Keep feedback, skip movement.</small></span><input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} /></label><label><span>Lighter graphics<small>Replace the scene with a quiet surface.</small></span><input type="checkbox" checked={lighter} onChange={e => setLighter(e.target.checked)} /></label><label><span>Confirmation sound<small>A brief tone when a demo accusation is locked.</small></span><input type="checkbox" checked={sound} onChange={e => setSound(e.target.checked)} /></label></div></Modal>
      <Avatar player={localPlayer} className="header-avatar" /></div></header>
    <main id="main"><div className="room-heading"><div><div className="eyebrow"><Leaf size={14} /> YOUR LITTLE CORNER OF THE COURTYARD</div><h1>Let the guessing begin<span>.</span></h1><p>Talk a little. Bluff a little. Find Koro Baby.</p></div><div className="room-meta"><span className="room-name">COURTYARD 24</span><span><Users size={15} /> 10 simulated players <span className="meta-dot">·</span> Classic</span></div></div>
      <div className="workspace-toolbar"><div className="round-info"><span className="round-disc">1</span><div><strong>Round 1 <span>of 5</span></strong><small><span className="live-dot" /> Discussion · simulated</small></div></div><div className="segmented gathering" aria-label="Gathering presentation"><button aria-pressed={gathering === 'together'} onClick={() => setGathering('together')}><Users size={16} /><span>Together</span></button><button aria-pressed={gathering === 'remote'} onClick={() => setGathering('remote')}><Globe2 size={16} /><span>Remote</span></button></div><div className="demo-clock"><Timer size={20} /><strong>00:42</strong><span>demo timer</span></div></div>
      <div className="mobile-tabs" aria-label="Game panels"><button aria-pressed={panel === 'players'} onClick={() => setPanel('players')}><Users size={17} /> Players <span>10</span></button><button aria-pressed={panel === 'chat'} onClick={() => setPanel('chat')}><MessageCircle size={17} /> Discussion <span>{messages.length}</span></button></div>
      <div className={`game-layout ${gathering} mobile-${panel}`}><section className="table-panel" aria-label="Players and game table"><div className="scene-toolbar"><span><span className="live-dot" /> Everyone is here <small>· demo</small></span><div className="segmented view-switch" aria-label="Player view"><button aria-label="Table view" aria-pressed={view === 'table'} onClick={() => setView('table')}><Users size={16} /><span>Table</span></button><button aria-label="Grid view" aria-pressed={view === 'grid'} onClick={() => setView('grid')}><LayoutGrid size={16} /><span>Grid</span></button></div></div>
        <div className={`scene ${view}`}><div className="scene-wash" /><div className="table-surface" aria-hidden="true"><div className="paper-scatter"><i /><i /><i /></div><div className="table-inscription"><Leaf size={22} /><span>People. Paper. Possibilities.</span></div></div><div className="player-roster">{players.map(player => <PlayerCard key={player.id} player={player} selected={selectedId === player.id} locked={locked} onSelect={() => { if (canSelect(player)) { setSelectedId(player.id); setAnnouncement(`${player.name} selected privately.`); } }} />)}</div></div>
        <div className="scene-caption"><LockKeyhole size={14} /><span>Only Master and Police are public. Your selection stays private.</span></div>
      </section>
      <aside className="chat-panel" aria-label="Room discussion"><div className="chat-heading"><div><span className="eyebrow">A LITTLE TALK GOES A LONG WAY</span><h2>Room discussion<span className="chat-count">{messages.length}</span></h2></div><span className="chat-local">LOCAL DEMO</span></div><div className="chat-messages" role="log" aria-label="Demo messages" aria-live="polite"><div className="system-message"><Sparkles size={14} /> Master has given the command. Let’s talk!</div>{messages.map(message => { const player = players.find(p => p.id === message.playerId)!; return <div className={`chat-message ${player.id === localPlayer.id ? 'own' : ''}`} key={message.id}><Avatar player={player} /><div className="message-content"><div className="message-author"><strong>{player.name}{player.id === localPlayer.id ? ' (you)' : ''}</strong>{player.role === 'Master' && <Crown size={12} />}<time>{message.time}</time></div><p>{message.text}</p></div></div>; })}<div ref={endRef} /></div><div className="chat-composer"><p><LockKeyhole size={12} /> Demo messages stay in this browser session.</p><form onSubmit={send}><label className="sr-only" htmlFor="message">Message the room</label><input id="message" placeholder="A little bluff? Say something…" maxLength={500} value={draft} disabled={locked} onChange={e => setDraft(e.target.value)} /><button type="submit" className="send-button" aria-label="Send message" disabled={!draft.trim() || locked}><Send size={18} /></button></form></div></aside></div>
      <section className={`action-bar ${locked ? 'acknowledged' : ''}`} aria-label="Your game actions"><div className="selection-summary">{selected ? <Avatar player={selected} /> : <span className="empty-suspect"><Users size={23} /></span>}<div><span>{locked ? 'DEMO ACCUSATION ACKNOWLEDGED' : selected ? 'YOUR PRIVATE SELECTION' : 'YOU ARE THE POLICE'}</span><strong>{selected ? selected.name : 'Who could it be?'}</strong><small>{locked ? 'No result or points generated.' : selected ? 'You can change your mind before locking.' : 'Choose a suspect at the table.'}</small></div>{selected && !locked && <button className="icon-button clear-selection" aria-label="Clear selected suspect" onClick={() => setSelectedId(undefined)}><X size={16} /></button>}</div><div className="action-buttons"><Modal open={paperOpen} onOpenChange={setPaperOpen} title="Your private paper" description="Only your own paper is shown. Master and Police are public after the draw." className="paper-modal" trigger={<button className="button secondary"><FileText size={18} /><span>View my paper</span></button>}><div className="notebook-paper"><span>90</span><strong>Police</strong></div><div className="paper-note"><Shield size={19} /><p>Find Koro Baby.<small>A wrong accusation gives you 0 points.</small></p></div><Dialog.Close className="button primary full">Hide my paper <LockKeyhole size={17} /></Dialog.Close></Modal>
      {locked ? <button className="button primary" onClick={reset}><RotateCcw size={18} /> Reset demo</button> : <Modal open={confirmOpen} onOpenChange={setConfirmOpen} title={selected ? `Accuse ${selected.name}?` : 'Review accusation'} description="You can make only one final accusation. If you are wrong, you receive 0 points." trigger={<button className="button primary" disabled={!selected}><span>Review accusation</span><ArrowRight size={19} /></button>}>{selected && <><Avatar player={selected} className="confirmation-avatar" /><strong className="confirmation-name">{selected.name}</strong><div className="notice"><LockKeyhole size={16} /> Prototype only: locking acknowledges your choice locally. No player is revealed and no score is awarded.</div><button className="button primary full" onClick={lock}>Lock accusation <LockKeyhole size={17} /></button><Dialog.Close className="button secondary full">Keep discussing</Dialog.Close></>}</Modal>}</div></section>
      <div className="under-table"><p><Shield size={14} /> Playing as <strong>Mariama · Police 90</strong></p><button onClick={reset}><RotateCcw size={14} /> Reset demo</button></div><div className="sr-only" role="status">{announcement}</div>
    </main><footer><span className="footer-brand">NOMOLI FORGE <span>·</span> Made for the gathering.</span><span>Task 01 <span> / </span> Local prototype <span> / </span> No live connection</span><button className="sound-toggle" aria-label={sound ? 'Mute confirmation sound' : 'Enable confirmation sound'} onClick={() => setSound(!sound)}>{sound ? <Volume2 size={16} /> : <VolumeX size={16} />}</button></footer>
  </div>;
}
