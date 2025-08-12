import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-cyber-gray-900 text-cyber-gray-100">
      <header className="border-b border-cyber-gray-700 bg-cyber-gray-800/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/shop" className="flex items-center space-x-2">
              <div className="text-xl font-bold text-cyber-green">K&V</div>
              <div className="text-sm text-cyber-gray-400">INDUSTRIES</div>
            </Link>
            
            <nav className="flex space-x-8">
              <Link
                to="/shop"
                className={`text-sm uppercase tracking-wider transition-colors ${
                  isActive('/shop')
                    ? 'text-cyber-green'
                    : 'text-cyber-gray-300 hover:text-cyber-green'
                }`}
              >
                Shop
              </Link>
              <Link
                to="/about"
                className={`text-sm uppercase tracking-wider transition-colors ${
                  isActive('/about')
                    ? 'text-cyber-green'
                    : 'text-cyber-gray-300 hover:text-cyber-green'
                }`}
              >
                About
              </Link>
              <Link
                to="/balance"
                className={`text-sm uppercase tracking-wider transition-colors ${
                  isActive('/balance')
                    ? 'text-cyber-green'
                    : 'text-cyber-gray-300 hover:text-cyber-green'
                }`}
              >
                Balance
              </Link>
              <Link
                to="/settings"
                className={`text-sm uppercase tracking-wider transition-colors ${
                  isActive('/settings')
                    ? 'text-cyber-green'
                    : 'text-cyber-gray-300 hover:text-cyber-green'
                }`}
              >
                ⚙ Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t border-cyber-gray-700 bg-cyber-gray-800/30 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
            <div>
              <h3 className="text-cyber-green font-semibold mb-2">Legal</h3>
              <p className="text-cyber-gray-400">
                All augmentations void where prohibited. 
                Neural interface compatibility not guaranteed.
              </p>
            </div>
            <div>
              <h3 className="text-cyber-green font-semibold mb-2">Meshbits Disclaimer</h3>
              <p className="text-cyber-gray-400">
                ConvergenceLedger transactions are final. 
                GhostMark verification required for priority delivery.
              </p>
            </div>
            <div>
              <h3 className="text-cyber-green font-semibold mb-2">Catalog</h3>
              <p className="text-cyber-gray-400">
                Print Catalog Issue #2157 available via Axiom Mesh.
                <br />
                <span className="text-cyber-green">NodeKey: 7J3L-MESH-BITS</span>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}