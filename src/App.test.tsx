import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { canSelect, players } from './model';
afterEach(cleanup);
describe('Koro Baby discussion prototype', () => {
  it('allows eight suspects while excluding public roles and the local Police', () => {
    expect(players).toHaveLength(10);
    expect(players.filter(canSelect)).toHaveLength(8);
    render(<App />);
    expect(screen.getByRole('button', {name:'Hassan, Master, public role'})).toBeDisabled();
    expect(screen.getByRole('button', {name:'Mariama, Police, public role'})).toBeDisabled();
    expect(screen.getByRole('button',{name:'Review accusation'})).toBeDisabled();
  });
  it('preserves private selection and unsent chat through all presentation switches', async () => {
    const user = userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button',{name:'Select Mohamed'}));
    await user.type(screen.getByLabelText('Message the room'),'I think it is Sorie');
    await user.click(screen.getByRole('button',{name:'Grid view'}));
    await user.click(screen.getByRole('button',{name:'Together'}));
    await user.click(screen.getByRole('button',{name:/Discussion 4/}));
    await user.click(screen.getByRole('button',{name:'Table view'}));
    await user.click(screen.getByRole('button',{name:'Remote'}));
    expect(screen.getByRole('button',{name:'Select Mohamed'})).toHaveAttribute('aria-pressed','true');
    expect(screen.getByLabelText('Message the room')).toHaveValue('I think it is Sorie');
  });
  it('sends only nonempty local messages and renders markup as literal text', async () => {
    const user=userEvent.setup(); render(<App />);
    expect(screen.getByRole('button',{name:'Send message'})).toBeDisabled();
    const input=screen.getByLabelText('Message the room');
    await user.type(input,'   '); expect(screen.getByRole('button',{name:'Send message'})).toBeDisabled();
    await user.clear(input); await user.type(input,'<script>alert(1)</script>');
    await user.click(screen.getByRole('button',{name:'Send message'}));
    expect(within(screen.getByRole('log')).getByText('<script>alert(1)</script>')).toBeInTheDocument();
    expect(input).toHaveValue(''); expect(document.querySelector('script')).toBeNull();
  });
  it('shows only the local paper and restores trigger focus and selection on Escape', async () => {
    const user=userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button',{name:'Select Hawa'}));
    const trigger=screen.getByRole('button',{name:'View my paper'}); await user.click(trigger);
    const dialog=screen.getByRole('dialog');
    expect(within(dialog).getByText('90')).toBeInTheDocument();
    expect(within(dialog).queryByText('100')).not.toBeInTheDocument();
    expect(within(dialog).queryByText('80')).not.toBeInTheDocument();
    await user.keyboard('{Escape}'); expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus(); expect(screen.getByRole('button',{name:'Select Hawa'})).toHaveAttribute('aria-pressed','true');
  });
  it('preserves the suspect when confirmation is cancelled, locks once and resets without results', async () => {
    const user=userEvent.setup(); render(<App />);
    await user.click(screen.getByRole('button',{name:'Select Mohamed'}));
    await user.click(screen.getByRole('button',{name:'Review accusation'}));
    expect(screen.getByRole('heading',{name:'Accuse Mohamed?'})).toBeInTheDocument();
    expect(within(screen.getByRole('dialog')).getByRole('img',{name:"Mohamed's chosen avatar"})).toHaveStyle('--avatar-x: 50%');
    await user.click(screen.getByRole('button',{name:'Keep discussing'}));
    expect(screen.getByRole('button',{name:'Select Mohamed'})).toHaveAttribute('aria-pressed','true');
    await user.click(screen.getByRole('button',{name:'Review accusation'}));
    await user.click(screen.getByRole('button',{name:'Lock accusation'}));
    expect(screen.queryByRole('button',{name:'Review accusation'})).not.toBeInTheDocument();
    expect(screen.getByRole('button',{name:'Select Mohamed'})).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('No result or points have been generated');
    await user.click(screen.getAllByRole('button',{name:'Reset demo'})[0]);
    expect(screen.getByRole('button',{name:'Review accusation'})).toBeDisabled();
    expect(screen.getByRole('button',{name:'Select Mohamed'})).toBeEnabled();
  });
  it('supports keyboard suspect selection and settings without clearing drafts', async () => {
    const user=userEvent.setup(); render(<App />);
    screen.getByRole('button',{name:'Select Aminata'}).focus(); await user.keyboard('{Enter}');
    expect(screen.getByRole('button',{name:'Select Aminata'})).toHaveAttribute('aria-pressed','true');
    await user.click(screen.getByRole('button',{name:'Settings'}));
    await user.click(screen.getByRole('checkbox',{name:/Reduced motion/}));
    expect(document.querySelector('.app')).toHaveClass('reduce-motion');
    await user.keyboard('{Escape}'); expect(screen.getByRole('button',{name:'Settings'})).toHaveFocus();
  });
});
