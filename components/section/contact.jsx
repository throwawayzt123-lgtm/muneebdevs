import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  gsap, registerGsap, prefersReducedMotion,
  wipeHeading, animateWipeHeading, animateUnderline,
} from '../../lib/gsapAnimations';

const image1 = "/img/background/5.jpg";

const CONTACT_EMAIL = 'muneebdevs07@gmail.com';
const CONTACT_PHONE = '+92 332-8863805';

/*
  FormSubmit needs no account, no API key and no server config — it delivers
  straight to CONTACT_EMAIL. Only requirement is a one-time confirmation:
  the first submission sends an "Activate Form" email to that address; click
  the link once and every submission after arrives automatically.
*/
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
/* digits, spaces and + - ( ) only, 7-20 chars */
const PHONE_RE = /^[+\d][\d\s\-().]{6,19}$/;

const EMPTY = { name: '', email: '', phone: '', message: '', company: '' };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  else if (values.name.trim().length < 2) errors.name = 'That name looks too short.';

  if (!values.email.trim()) errors.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address.';

  /* phone is optional, but must look sane when provided */
  if (values.phone.trim() && !PHONE_RE.test(values.phone.trim()))
    errors.phone = 'Enter a valid phone number.';

  if (!values.message.trim()) errors.message = 'Please write a short message.';
  else if (values.message.trim().length < 10) errors.message = 'Message should be at least 10 characters.';

  return errors;
}

export default function Contactus() {
  const rootRef = useRef(null);
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState(null); // {type, text}
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name]) setErrors(validate(next));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate({ ...values }));
  };

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone || '-'}\n\n${values.message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, email: true, phone: true, message: true });
    if (Object.keys(found).length) {
      setStatus({ type: 'error', text: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setSending(true);
    setStatus(null);

    const sent = () => {
      setValues(EMPTY);
      setTouched({});
      setStatus({
        type: 'success',
        text: 'Thanks. Your message has been sent, I will reply shortly.',
      });
    };

    try {
      /* 1) Server route (Gmail via nodemailer), tried first. This sends from
         your own Gmail account, so the recipient sees "MUNEEB DEVS" as the
         sender — FormSubmit below is a third-party relay and always shows
         as "FormSubmit" in the inbox instead, with no way to override that.
         Requires GMAIL_APP_PASSWORD in .env.local; falls through cleanly
         to FormSubmit below until that's set.
         trailing slash matters: next.config.js sets trailingSlash: true, and a
         308 redirect on POST can drop the request body in some browsers */
      const res = await fetch('/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      }).catch(() => null);
      const data = res ? await res.json().catch(() => ({})) : {};

      if (res && res.ok && data.ok) {
        sent();
        return;
      }
      if (data.errors) setErrors(data.errors);

      /* 2) FormSubmit — plain JS, no account or API key, works with zero
         setup. Used as a backup while Gmail isn't configured yet (or if it
         ever fails). The very first submission to a given address triggers
         a one-time confirmation email; click that link once and every later
         submission through this path arrives automatically. */
      const fs = await fetch(FORMSUBMIT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          phone: values.phone || '-',
          message: values.message,
          _subject: `New portfolio enquiry from ${values.name}`,
          _template: 'table',
          _captcha: 'false',
        }),
      }).catch(() => null);

      /* FormSubmit answers 200 even on failure, so the JSON body is the real
         result. `success` comes back as the string "true"/"false". */
      let formsubmitPendingActivation = false;
      if (fs && fs.ok) {
        const fsData = await fs.json().catch(() => ({}));
        if (String(fsData.success) === 'true') {
          sent();
          return;
        }
        if (/activat/i.test(fsData.message || '')) {
          formsubmitPendingActivation = true;
        }
      }

      /* 3) Last resort: hand off to the visitor's mail app so the enquiry is
         never silently lost. */
      mailtoFallback();
      setStatus({
        type: 'success',
        text: formsubmitPendingActivation
          ? `Opening your email app instead — the backup form needs a one-time activation first. If nothing happens, write to ${CONTACT_EMAIL} directly.`
          : `Opening your email app. If nothing happens, write to ${CONTACT_EMAIL} directly.`,
      });
    } catch (err) {
      setStatus({
        type: 'error',
        text: `Network error. Please check your connection or email ${CONTACT_EMAIL} directly.`,
      });
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    registerGsap();
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const panel = root.querySelector('.contact_form_wrapper');
      const fields = gsap.utils.toArray('.contact-field');
      const button = root.querySelector('#submit');
      const details = gsap.utils.toArray('.contact-detail');

      if (prefersReducedMotion()) {
        gsap.set([panel, fields, button, details].filter(Boolean), { opacity: 1 });
        return;
      }

      animateWipeHeading(wipeHeading(root));
      animateUnderline(root.querySelector('.space-border'));

      /* Panel clips open top-to-bottom like a shutter lifting, then the
         fields cascade in underneath. */
      gsap.fromTo(panel,
        { clipPath: 'inset(0% 0% 100% 0%)', opacity: 1 },
        {
          scrollTrigger: { trigger: panel, start: 'top 85%', once: true },
          clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.inOut',
          clearProps: 'clip-path',
        }
      );

      gsap.fromTo(fields,
        { y: 30, opacity: 0 },
        {
          scrollTrigger: { trigger: panel, start: 'top 80%', once: true },
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          stagger: 0.09, delay: 0.25,
          clearProps: 'opacity,transform',
        }
      );

      gsap.fromTo(button,
        { scale: 0.85, opacity: 0 },
        {
          scrollTrigger: { trigger: panel, start: 'top 70%', once: true },
          scale: 1, opacity: 1, duration: 0.7, ease: 'back.out(1.8)',
          clearProps: 'opacity,transform',
        }
      );

      gsap.fromTo(details,
        { y: 45, opacity: 0 },
        {
          scrollTrigger: { trigger: details[0], start: 'top 92%', once: true },
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          stagger: 0.15,
          clearProps: 'opacity,transform',
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  const fieldError = (key) => (touched[key] && errors[key] ? errors[key] : '');

  return (
    <div className="section bg-top bg-bottom py-0">
      <div className="section-bg" aria-hidden="true">
        <Image src={image1} alt="" fill sizes="100vw" className="section-bg-img" />
      </div>
      <div className="py-5 position-relative" ref={rootRef}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h2>Contact Me</h2>
                <div className="space-border"></div>
              </div>
            </div>
            <div className="col-lg-8 offset-lg-2">
              <div className="contact_form_wrapper">
                <p className="contact-lead">
                  Have a project in mind or just want to say hello? Fill in the form
                  and I will get back to you as soon as possible.
                </p>
                <form name="contactForm" id="contact_form" className="form-border" onSubmit={sendEmail} noValidate>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="contact-field">
                        <label htmlFor="name">Your Name</label>
                        <input
                          type="text" name="name" id="name" className="form-control"
                          placeholder="Muneeb Ur Rehman"
                          value={values.name} onChange={handleChange} onBlur={handleBlur}
                          aria-invalid={Boolean(fieldError('name'))}
                        />
                        <span className="contact-error">{fieldError('name')}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="contact-field">
                        <label htmlFor="email">Your Email</label>
                        <input
                          type="email" name="email" id="email" className="form-control"
                          placeholder="you@example.com"
                          value={values.email} onChange={handleChange} onBlur={handleBlur}
                          aria-invalid={Boolean(fieldError('email'))}
                        />
                        <span className="contact-error">{fieldError('email')}</span>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="contact-field">
                        <label htmlFor="phone">Your Phone <span style={{ textTransform: 'none', letterSpacing: 0 }}>(optional)</span></label>
                        <input
                          type="tel" name="phone" id="phone" className="form-control"
                          placeholder="+92 300 0000000"
                          value={values.phone} onChange={handleChange} onBlur={handleBlur}
                          aria-invalid={Boolean(fieldError('phone'))}
                        />
                        <span className="contact-error">{fieldError('phone')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="contact-field">
                    <label htmlFor="message">Your Message</label>
                    <textarea
                      name="message" id="message" className="form-control"
                      placeholder="Tell me a little about your project..."
                      value={values.message} onChange={handleChange} onBlur={handleBlur}
                      aria-invalid={Boolean(fieldError('message'))}
                    ></textarea>
                    <span className="contact-error">{fieldError('message')}</span>
                  </div>

                  {/* honeypot: hidden from people, bots fill it and get silently dropped */}
                  <input
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={values.company}
                    onChange={handleChange}
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: '-9999px',
                      width: '1px',
                      height: '1px',
                      opacity: 0,
                    }}
                  />

                  {status && (
                    <div
                      className={`contact-status ${status.type === 'success' ? 'is-success' : 'is-error'}`}
                      role="status"
                      aria-live="polite"
                    >
                      {status.text}
                    </div>
                  )}

                  <div className="text-center">
                    <div id="submit" className="mt30">
                      <button type="submit" id="send_message" className="btn-main" disabled={sending}>
                        {sending ? 'Sending...' : 'Send Message'}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="spacer-double"></div>
              <div className="row text-center">
                <div className="col-md-4 contact-detail">
                  <div className="wm-1"></div>
                  <h6>Email Me</h6>
                  <p><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
                </div>
                <div className="col-md-4 contact-detail">
                  <div className="wm-1"></div>
                  <h6>Call Me</h6>
                  <p><a href={`tel:${CONTACT_PHONE.replace(/[^+\d]/g, '')}`}>{CONTACT_PHONE}</a></p>
                </div>
                <div className="col-md-4 contact-detail">
                  <div className="wm-1"></div>
                  <h6>Address</h6>
                  <p>Cavalry Ground, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
