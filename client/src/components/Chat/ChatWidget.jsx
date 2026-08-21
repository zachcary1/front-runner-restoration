import { useEffect, useRef, useState } from 'react';
import { ChatIcon, CloseIcon, SendIcon } from '../shared/Icons.jsx';
import { PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import './ChatWidget.css';

const GREETING = "Hi! I'm the Front Runner Restoration assistant. Ask me about water, fire, mold, or storm damage, or how our restoration process works.";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'model', text: GREETING }]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || sending) return;

    const history = messages.slice(1); // exclude the static greeting
    setMessages((m) => [...m, { role: 'user', text }]);
    setInput('');
    setSending(true);
    setError('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong.');
      }

      setMessages((m) => [...m, { role: 'model', text: data.reply }]);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="chat-widget">
      {open && (
        <div className="chat-widget__panel" role="dialog" aria-label="Chat with Front Runner Restoration">
          <div className="chat-widget__header">
            <span>Front Runner Assistant</span>
            <button
              type="button"
              className="chat-widget__icon-btn"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              <CloseIcon width={18} height={18} />
            </button>
          </div>

          <div className="chat-widget__messages" ref={scrollRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-widget__bubble chat-widget__bubble--${m.role}`}>
                {m.text}
              </div>
            ))}
            {sending && (
              <div className="chat-widget__bubble chat-widget__bubble--model chat-widget__bubble--typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {error && <div className="chat-widget__error">{error}</div>}
          </div>

          <div className="chat-widget__footer-note">
            For active emergencies, call <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
          </div>

          <form className="chat-widget__input-row" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question..."
              maxLength={600}
              disabled={sending}
              aria-label="Message"
            />
            <button type="submit" className="chat-widget__icon-btn chat-widget__send" disabled={sending || !input.trim()} aria-label="Send message">
              <SendIcon width={18} height={18} />
            </button>
          </form>
        </div>
      )}

      <div className="chat-widget__launcher">
        {!open && <span className="chat-widget__label">Need help? Chat with us</span>}
        <button
          type="button"
          className={`chat-widget__toggle ${open ? 'chat-widget__toggle--open' : ''}`}
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close chat' : 'Open chat'}
        >
          {open ? <CloseIcon /> : <ChatIcon />}
        </button>
      </div>
    </div>
  );
}
