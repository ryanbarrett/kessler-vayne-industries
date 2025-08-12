import { useState, useEffect } from 'react';
import { hashCreds, generateRandomBalance } from '../lib/crypto';
import { getStorageItem, setStorageItem, hasOnboarded, getBalance } from '../lib/storage';

export default function Balance() {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setIsOnboarded(hasOnboarded());
    setBalance(getBalance());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const credHash = await hashCreds(account, password);
      const existingCreds = getStorageItem('kv_firstCreds');

      if (!existingCreds) {
        // First time binding
        const newBalance = generateRandomBalance();
        
        setStorageItem('kv_firstCreds', credHash);
        setStorageItem('kv_balanceCVX', newBalance);
        setStorageItem('kv_hasOnboarded', true);
        
        setBalance(newBalance);
        setIsOnboarded(true);
      } else {
        // Verify existing credentials
        if (credHash === existingCreds) {
          setIsOnboarded(true);
          setBalance(getBalance());
        } else {
          setError('Invalid credentials. This client is bound to different SpecterID.');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isOnboarded) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyber-green mb-2">
            CONVERGENCELEDGER ACCOUNT
          </h1>
          <p className="text-cyber-gray-400">
            Mesh-native settlement. Your GhostMark improves delivery priority.
          </p>
        </div>

        <div className="bg-cyber-gray-800/30 border border-cyber-green/30 rounded-lg p-8 text-center cyber-glow">
          <div className="text-6xl font-bold text-cyber-green mb-4">
            {balance}
          </div>
          <div className="text-xl text-cyber-gray-300 mb-2">CVX</div>
          <div className="text-sm text-cyber-gray-500 uppercase tracking-wider">
            Bound to this client
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-cyber-gray-400">
          <p>
            Account status: <span className="text-cyber-green">ACTIVE</span>
          </p>
          <p className="mt-2">
            SpecterID verification complete. ImpulseCast enabled.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-cyber-green mb-2">
          OPEN ACCOUNT
        </h1>
        <p className="text-cyber-gray-400">
          Bind your Prime SpecterID to initialize CVX
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="account" className="block text-sm font-medium text-cyber-gray-300 mb-2">
            Account Number
          </label>
          <input
            type="text"
            id="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
            className="cyber-input w-full"
            placeholder="Enter account number"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-cyber-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="cyber-input w-full"
            placeholder="Enter password"
            required
          />
        </div>

        {error && (
          <div className="text-cyber-red text-sm bg-cyber-red/10 border border-cyber-red/30 rounded p-3">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="cyber-button w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'INITIALIZING...' : 'INITIALIZE ACCOUNT'}
        </button>
      </form>

      <div className="mt-8 text-xs text-cyber-gray-500 text-center">
        <p>
          First successful submit binds credentials permanently to this client.
          Subsequent access requires identical SpecterID verification.
        </p>
      </div>
    </div>
  );
}