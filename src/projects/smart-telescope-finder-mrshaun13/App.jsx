import React, { useState } from 'react';
import { Telescope, BarChart3, Aperture, Target, Grid3X3, Award, BookOpen, Menu, X, ChevronLeft } from 'lucide-react';
import Overview from './components/Overview';
import ComparisonTable from './components/ComparisonTable';
import OpticsDeepDive from './components/OpticsDeepDive';
import UseCaseFit from './components/UseCaseFit';
import FeaturesMatrix from './components/FeaturesMatrix';
import Recommendations from './components/Recommendations';
import ProductDetail from './components/ProductDetail';
import Sources from './components/Sources';

const sections = [
  { id: 'overview', label: 'Overview', icon: Telescope },
  { id: 'comparison', label: 'Spec Comparison', icon: BarChart3 },
  { id: 'optics', label: 'Optics & Imaging', icon: Aperture },
  { id: 'usecase', label: 'Use Case Fit', icon: Target },
  { id: 'features', label: 'Features Matrix', icon: Grid3X3 },
  { id: 'recommendations', label: 'Recommendations', icon: Award },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

const App = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectProduct = (productId) => {
    setSelectedProduct(productId);
    setActiveSection('product-detail');
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
    setActiveSection('comparison');
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setSelectedProduct(null);
    setMobileMenuOpen(false);
  };

  const renderSection = () => {
    if (activeSection === 'product-detail' && selectedProduct) {
      return <ProductDetail productId={selectedProduct} onBack={handleBackFromProduct} />;
    }
    switch (activeSection) {
      case 'overview': return <Overview />;
      case 'comparison': return <ComparisonTable onSelectProduct={handleSelectProduct} />;
      case 'optics': return <OpticsDeepDive />;
      case 'usecase': return <UseCaseFit />;
      case 'features': return <FeaturesMatrix />;
      case 'recommendations': return <Recommendations onSelectProduct={handleSelectProduct} />;
      case 'sources': return <Sources />;
      default: return <Overview />;
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-gray-950 text-gray-100">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-300 hover:text-white"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-full w-64 bg-gray-900/95 border-r border-gray-800 flex flex-col z-40
        transition-transform duration-200 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <Telescope className="w-5 h-5 text-cyan-400" />
            <div>
              <h1 className="text-sm font-bold text-white leading-tight">Smart Telescope Finder</h1>
              <p className="text-[10px] text-gray-500 leading-tight">Porch Stargazing & Skyline Viewing</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 py-3 overflow-y-auto">
          {sections.map(s => {
            const Icon = s.icon;
            const isActive = activeSection === s.id;
            return (
              <button
                key={s.id}
                onClick={() => handleNavClick(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {s.label}
              </button>
            );
          })}

          {activeSection === 'product-detail' && (
            <button
              onClick={handleBackFromProduct}
              className="w-full flex items-center gap-3 px-5 py-2.5 text-sm text-cyan-400 bg-cyan-500/10 border-r-2 border-cyan-400"
            >
              <ChevronLeft className="w-4 h-4 flex-shrink-0" />
              Product Detail
            </button>
          )}
        </nav>

        <div className="p-4 border-t border-gray-800 text-[10px] text-gray-600">
          <p>12 models · 5 brands</p>
          <p>Data: February 2026</p>
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 min-w-0 overflow-y-auto p-4 lg:p-8">        <div className="max-w-6xl mx-auto">
        {renderSection()}
        </div>
      </main>
    </div>
  );
};

export default App;
