
import React from 'react';

const Tip: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <li className="flex items-start gap-3">
    <span className="text-xl">💡</span>
    <span className="flex-1">{children}</span>
  </li>
);

const Tips: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-2xl border-l-4 border-blue-400 mt-12">
      <h3 className="text-2xl font-bold text-blue-800 mb-4">Pro Tips</h3>
      <ul className="space-y-3 text-gray-700">
        <Tip><strong>Facebook:</strong> Use exactly 1200×630px for the most reliable link preview.</Tip>
        <Tip><strong>File Naming:</strong> For website previews, save your file as <code>og-image.jpg</code> and place it in your site's <code>/public</code> folder.</Tip>
        <Tip><strong>Meta Tag:</strong> Update your HTML head with <code>&lt;meta property="og:image" content="https://your-domain.com/og-image.jpg" /&gt;</code></Tip>
        <Tip><strong>Final Check:</strong> Always test your URL with the <a href="https://developers.facebook.com/tools/debug/" target="_blank" rel="noopener noreferrer" className="font-bold text-blue-600 hover:underline">Facebook Debugger</a> to clear the cache and see the final preview.</Tip>
      </ul>
    </div>
  );
};

export default Tips;
