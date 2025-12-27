'use client';

import { useState, FormEvent } from 'react';
import { Button } from '../(app)/(components)/Button';
import { Input } from '../(app)/(components)/Input';
import { Modal } from '../(app)/(components)/Modal';
import { LogIn } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {

        if (password.length < 6) {
            throw new Error('Invalid credentials');
        }

        const res = await api.post("/login", { email, password })

        if (res.status != 200) throw new Error(res.data.error);
        
        const user = res.data;

        localStorage.setItem('user', JSON.stringify(user));

        router.push('/')

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(false);
    setResetEmail('');
    alert(`Password reset link sent to ${resetEmail}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-950 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            SwiftReach
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="email"
            label="E-Mail"
            placeholder="name@swift-reach.de"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error && !email ? 'Email is required' : undefined}
          />

          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={error && !password ? 'Password is required' : undefined}
          />

          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          <Button type="submit" className="w-full" loading={loading}>
            Sign In
          </Button>

          {/* <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline w-full text-center"
          >
            Forgot password?
          </button> */}
        </form>
      </div>

      <Modal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        title="Reset Password"
      >
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
          <Input
            type="email"
            label="E-Mail"
            placeholder="name@swift-reach.de"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
          <div className="flex space-x-3">
            <Button
              variant="secondary"
              onClick={() => setShowForgotPassword(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button onClick={handleForgotPassword} className="flex-1">
              Send Reset Link
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
