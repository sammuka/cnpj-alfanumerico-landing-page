import { useState, useEffect, useRef, type ReactNode, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CORRECT_HASH = 'f0f9b8ce63faa00b21d49b9a88fbf903a0039e8c4dd8023f946c6e1881ad05b7';
const SESSION_KEY = 'bb_seg_auth';

async function sha256(text: string): Promise<string | null> {
  if (!crypto?.subtle) return null;
  const encoded = new TextEncoder().encode(text);
  const buffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

interface PasswordGateProps {
  children: ReactNode;
}

export default function PasswordGate({ children }: PasswordGateProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY) === 'true') {
      setUnlocked(true);
    } else {
      const id = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(id);
    }
  }, []);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError(false);
    const hash = await sha256(value);
    if (!mountedRef.current) return;
    if (hash === null) {
      setError(true);
      setValue('');
      setChecking(false);
      return;
    }
    if (hash === CORRECT_HASH) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setUnlocked(true);
    } else {
      setError(true);
      setValue('');
      requestAnimationFrame(() => inputRef.current?.focus());
    }
    setChecking(false);
  }

  if (unlocked) return <>{children}</>;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[9999]"
      style={{ background: 'var(--color-bg-deep)' }}
    >
      <div
        className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="relative w-full max-w-sm mx-4"
      >
        <div
          className="rounded-2xl p-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div className="flex justify-center mb-6">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(124,58,237,0.2)', border: '1px solid rgba(124,58,237,0.4)' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#a78bfa' }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
          </div>

          <h1
            className="text-center text-xl font-bold mb-1"
            style={{ color: 'var(--color-text-primary)', fontFamily: 'Inter, sans-serif' }}
          >
            Acesso Restrito
          </h1>
          <p
            className="text-center text-sm mb-6"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            BB Seguros · CNPJ Alfanumérico
          </p>

          <form onSubmit={handleSubmit} noValidate>
            <div className="relative mb-4">
              <input
                ref={inputRef}
                type="password"
                value={value}
                onChange={(e) => { setValue(e.target.value); setError(false); }}
                placeholder="Senha de acesso"
                autoComplete="current-password"
                className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: error
                    ? '1px solid rgba(239,68,68,0.7)'
                    : '1px solid rgba(255,255,255,0.12)',
                  color: 'var(--color-text-primary)',
                  fontFamily: 'Inter, sans-serif',
                }}
                disabled={checking}
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  key="err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-xs text-center mb-3"
                  style={{ color: '#f87171' }}
                >
                  Senha incorreta. Tente novamente.
                </motion.p>
              )}
            </AnimatePresence>

            <motion.button
              type="submit"
              disabled={checking || value.length === 0}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full rounded-xl py-3 text-sm font-semibold transition-opacity disabled:opacity-40"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #3b82f6)',
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                cursor: checking || value.length === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              {checking ? 'Verificando…' : 'Entrar'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
