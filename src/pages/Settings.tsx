import { useState } from 'react';
import { clearAllKVData } from '../lib/storage';

export default function Settings() {
  const [showConfirm, setShowConfirm] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const handleClearData = async () => {
    setIsClearing(true);
    
    // Add a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    clearAllKVData();
    setIsClearing(false);
    setShowConfirm(false);
    
    // Reload the page to reset all state
    window.location.reload();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-cyber-green mb-8">
        SYSTEM SETTINGS
      </h1>

      <div className="space-y-8">
        <div className="bg-cyber-gray-800/30 border border-cyber-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyber-green mb-4">
            Data Management
          </h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-cyber-gray-200 mb-2">
                Clear All Local Data
              </h3>
              <p className="text-sm text-cyber-gray-400 mb-4">
                This will reset all stored credentials, balance, orders, and puzzle progress. 
                This action cannot be undone.
              </p>
              
              {!showConfirm ? (
                <button
                  onClick={() => setShowConfirm(true)}
                  className="cyber-button bg-cyber-red/10 border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-cyber-gray-900"
                >
                  CLEAR ALL DATA
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-cyber-red text-sm font-medium">
                    Are you sure? This will permanently delete all local data.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleClearData}
                      disabled={isClearing}
                      className="cyber-button bg-cyber-red/10 border-cyber-red text-cyber-red hover:bg-cyber-red hover:text-cyber-gray-900 disabled:opacity-50"
                    >
                      {isClearing ? 'CLEARING...' : 'YES, CLEAR ALL'}
                    </button>
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="cyber-button"
                    >
                      CANCEL
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-cyber-gray-800/30 border border-cyber-gray-700 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-cyber-green mb-4">
            Accessibility
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-cyber-gray-200">High Contrast</h3>
                <p className="text-sm text-cyber-gray-400">
                  Increase visual contrast for better readability
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-cyber-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-cyber-gray-200">Reduce Animation</h3>
                <p className="text-sm text-cyber-gray-400">
                  Minimize motion effects and transitions
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-cyber-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyber-green"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="text-xs text-cyber-gray-500">
          <p>
            Settings are stored locally and will be reset when clearing all data.
            No data is transmitted to external servers.
          </p>
        </div>
      </div>
    </div>
  );
}