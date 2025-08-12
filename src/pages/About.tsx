export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-cyber-green mb-8">
        ABOUT KESSLER & VAYNE INDUSTRIES
      </h1>
      
      <div className="space-y-6 text-cyber-gray-300 leading-relaxed">
        <p>
          Founded in 2089, Kessler & Vayne Industries emerged from the convergence of 
          military-grade augmentation technology and consumer accessibility. Our mission: 
          democratize human enhancement through the Axiom Mesh network.
        </p>
        
        <p>
          Our divisions span neural interfaces, biomechanical augmentation, and 
          ConvergenceLedger financial systems. Each product undergoes rigorous 
          SpecterID verification and GhostMark authentication protocols.
        </p>
        
        <p>
          <em>Some interfaces respond to unconventional input.</em> Our ImpulseCast 
          ordering system integrates seamlessly with your existing NodeKey 
          infrastructure, ensuring secure BindScript execution across all platforms.
        </p>
        
        <div className="bg-cyber-gray-800/30 border border-cyber-gray-700 rounded-lg p-6 mt-8">
          <h2 className="text-cyber-green font-semibold mb-4">Technical Specifications</h2>
          <ul className="space-y-2 text-sm">
            <li>• NodeKey compatibility: Universal</li>
            <li>• SpecterID binding: Permanent</li>
            <li>• GhostMark optimization: Adaptive</li>
            <li>• ImpulseCast latency: &lt;50ms</li>
            <li>• BindScript execution: Sandboxed</li>
            <li>• Axiom Mesh integration: Native</li>
          </ul>
        </div>
      </div>
    </div>
  );
}