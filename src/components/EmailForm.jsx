import { useState } from 'react';
import { subscribeEmail } from '../lib/supabase';
import './EmailForm.css';

export default function EmailForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    setMessage('');

    const { error } = await subscribeEmail(email.trim());

    if (error) {
      setStatus('error');
      setMessage(error.message || 'Something went wrong. Try again.');
    } else {
      setStatus('success');
      setMessage('You\'re on the list. Obama is proud.');
    }
  };

  const handleReset = () => {
    setStatus('idle');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="email-form-wrapper">
      {status === 'success' ? (
        <div className="email-success">
          <p className="email-success-text">{message}</p>
          <button className="email-reset-btn" onClick={handleReset}>
            Sign up another
          </button>
        </div>
      ) : (
        <form className="email-form" onSubmit={handleSubmit}>
          <label className="email-label" htmlFor="waitlist-email">
            Get notified when we launch
          </label>
          <div className="email-row">
            <input
              id="waitlist-email"
              className="email-input"
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
            />
            <button
              className="email-submit"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Sending…' : 'Join Waitlist'}
            </button>
          </div>
          {status === 'error' && (
            <p className="email-error">{message}</p>
          )}
        </form>
      )}
    </div>
  );
}
