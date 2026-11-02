export type AvatarConfig = { preset: number; hair: string; outfit: string; skinTone: string };
export type Player = { id: string; name: string; avatar: AvatarConfig; role?: 'Master' | 'Police' };
// Simulated saved choices. One config feeds table, grid, chat and dialogs.
export const players: Player[] = [
  { id: 'hassan', name: 'Hassan', avatar: { preset: 0, hair: 'short curls', outfit: 'green patterned shirt', skinTone: 'brown' }, role: 'Master' },
  { id: 'mariama', name: 'Mariama', avatar: { preset: 1, hair: 'braided bun', outfit: 'amber blouse', skinTone: 'brown' }, role: 'Police' },
  { id: 'mohamed', name: 'Mohamed', avatar: { preset: 2, hair: 'short curls', outfit: 'blue shirt', skinTone: 'brown' } },
  { id: 'fatmata', name: 'Fatmata', avatar: { preset: 3, hair: 'rust headwrap', outfit: 'orange dress', skinTone: 'brown' } },
  { id: 'ibrahim', name: 'Ibrahim', avatar: { preset: 4, hair: 'close cropped', outfit: 'ivory shirt', skinTone: 'brown' } },
  { id: 'aminata', name: 'Aminata', avatar: { preset: 5, hair: 'long braids', outfit: 'purple blouse', skinTone: 'brown' } },
  { id: 'sorie', name: 'Sorie', avatar: { preset: 6, hair: 'short curls', outfit: 'yellow shirt', skinTone: 'brown' } },
  { id: 'kadiatu', name: 'Kadiatu', avatar: { preset: 7, hair: 'natural puff', outfit: 'teal blouse', skinTone: 'brown' } },
  { id: 'alusine', name: 'Alusine', avatar: { preset: 8, hair: 'locs', outfit: 'navy shirt', skinTone: 'brown' } },
  { id: 'hawa', name: 'Hawa', avatar: { preset: 9, hair: 'green headwrap', outfit: 'coral blouse', skinTone: 'brown' } },
];
export const localPlayer = players[1];
export const canSelect = (player: Player) => !player.role && player.id !== localPlayer.id;
export type Message = { id: number; playerId: string; text: string; time: string };
export const initialMessages: Message[] = [
  { id: 1, playerId: 'hassan', text: 'Police, find Koro Baby! 👀', time: '00:08' },
  { id: 2, playerId: 'mohamed', text: 'Everyone looks a little too confident today.', time: '00:12' },
  { id: 3, playerId: 'fatmata', text: 'Ask Aminata. She has been very quiet 😂', time: '00:16' },
  { id: 4, playerId: 'aminata', text: 'Me? I’m just enjoying the gathering!', time: '00:18' },
];
