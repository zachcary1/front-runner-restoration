import { useState } from 'react';
import SectionEyebrow from '../shared/SectionEyebrow.jsx';
import Button from '../shared/Button.jsx';
import { PhoneIcon, ClockIcon, ArrowRightIcon } from '../shared/Icons.jsx';
import { services, PHONE_DISPLAY, PHONE_TEL } from '../../data/services.js';
import './ContactForm.css';

const INITIAL_FORM = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidPhone(value) {
  const digits = value.replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
}

function validateField(name, value) {
  if (name === 'email') {
    if (!value) return 'Email is required.';
    if (!EMAIL_PATTERN.test(value)) return 'Please enter a valid email address.';
  }
  if (name === 'phone') {
    if (!value) return 'Phone number is required.';
    if (!isValidPhone(value)) return 'Please enter a valid 10-digit phone number.';
  }
  return '';
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [statusMessage, setStatusMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (touched[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setFieldErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateField('email', form.email);
    const phoneError = validateField('phone', form.phone);
    if (emailError || phoneError) {
      setFieldErrors((prev) => ({ ...prev, email: emailError, phone: phoneError }));
      setTouched((t) => ({ ...t, email: true, phone: true }));
      return;
    }

    setStatus('submitting');
    setStatusMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
      setStatusMessage(data.message);
      setForm(INITIAL_FORM);
    } catch (err) {
      setStatus('error');
      setStatusMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className="section contact reveal" id="contact">
      <div className="section-inner contact__grid">
        <div className="contact__copy">
          <SectionEyebrow>Request Help</SectionEyebrow>
          <h2 className="contact__headline">Need Restoration Help?</h2>
          <p className="contact__text">
            Tell us what happened and we'll connect you with the nearest available
            crew. For active emergencies, calling gets you the fastest response.
          </p>
          <span className="contact__divider" aria-hidden="true" />
          <div className="contact__phone-block">
            <span className="contact__phone-badge">
              <PhoneIcon />
            </span>
            <div>
              <span className="contact__phone-label">For Urgent Help, Call</span>
              <a href={`tel:${PHONE_TEL}`} className="contact__phone-number">
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>
          <div className="contact__availability">
            <ClockIcon />
            <span>Live agents available 24 hours a day, 7 days a week.</span>
          </div>
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <div className="contact__field-row">
            <label className="contact__field">
              <span>First Name</span>
              <input
                type="text"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </label>
            <label className="contact__field">
              <span>Last Name</span>
              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="contact__field-row">
            <label className="contact__field">
              <span>Email</span>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(fieldErrors.email)}
                required
              />
              {fieldErrors.email && <span className="contact__field-error">{fieldErrors.email}</span>}
            </label>
            <label className="contact__field">
              <span>Phone</span>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(fieldErrors.phone)}
                required
              />
              {fieldErrors.phone && <span className="contact__field-error">{fieldErrors.phone}</span>}
            </label>
          </div>

          <label className="contact__field">
            <span>Service Needed</span>
            <select name="service" value={form.service} onChange={handleChange} required>
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>

          <label className="contact__field">
            <span>How Can We Help?</span>
            <textarea name="message" rows="4" value={form.message} onChange={handleChange} />
          </label>

          <Button
            type="submit"
            variant="solid"
            icon={<ArrowRightIcon />}
            className="contact__submit"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Sending...' : 'Request Help'}
          </Button>

          {status === 'success' && (
            <p className="contact__status contact__status--success" role="status">
              {statusMessage}
            </p>
          )}
          {status === 'error' && (
            <p className="contact__status contact__status--error" role="alert">
              {statusMessage}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
