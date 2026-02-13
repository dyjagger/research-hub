import React, { useState } from 'react';
import { LayoutDashboard, Table2, Zap, DollarSign, ListChecks, Target, Award, BookOpen, ArrowLeft } from 'lucide-react';
import { products, BRAND_COLORS } from './data/products';
import { productDetails, getAggregateRating } from './data/productDetails';
import Overview from './components/Overview';
import ComparisonTable from './components/ComparisonTable';
import PowerPerformance from './components/PowerPerformance';
import ValueAnalysis from './components/ValueAnalysis';
import FeaturesMatrix from './components/FeaturesMatrix';
import UseCaseFit from './components/UseCaseFit';
import Recommendations from './components/Recommendations';
import Sources from './components/Sources';
import ProductDetail from './components/ProductDetail';

const sections = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'comparison', label: 'Head-to-Head', icon: Table2 },
  { id: 'power', label: 'Power & Weight', icon: Zap },
  { id: 'value', label: 'Value Analysis', icon: DollarSign },
  { id: 'features', label: 'Features Matrix', icon: ListChecks },
  { id: 'usecase', label: 'Use Case Fit', icon: Target },
  { id: 'recommendations', label: 'Recommendations', icon: Award },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const brands = [...new Set(products.map(p => p.brand))];
  const priceRange = `$${Math.min(...products.map(p => p.price))} – $${Math.max(...products.map(p => p.price)).toLocaleString()}`;

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setSelectedProduct(null);
    setMobileMenuOpen(false);
  };

  const renderSection = () => {
    if (selectedProduct) {
      return (
        <ProductDetail
          product={products.find(p => p.id === selectedProduct)}
          details={productDetails[selectedProduct]}
          getAggregateRating={getAggregateRating}
          onBack={handleBackFromProduct}
        />
      );
    }
    switch (activeSection) {
      case 'overview': return <Overview onProductSelect={handleProductSelect} />;
      case 'comparison': return <ComparisonTable onProductSelect={handleProductSelect} />;
      case 'power': return <PowerPerformance />;
      case 'value': return <ValueAnalysis />;
      case 'features': return <FeaturesMatrix />;
      case 'usecase': return <UseCaseFit />;
      case 'recommendations': return <Recommendations onProductSelect={handleProductSelect} />;
      case 'sources': return <Sources />;
      default: return <Overview onProductSelect={handleProductSelect} />;
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-gray-950">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 bg-gray-800 p-2 rounded-lg border border-gray-700"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gray-900 border-r border-gray-800 flex flex-col transition-transform duration-200`}>
        <div className="p-5 border-b border-gray-800">
          <h1 className="text-lg font-bold text-gray-100 flex items-center gap-2">
            <span className="text-2xl">🪚</span> Gas Chainsaw
          </h1>
          <p className="text-xs text-gray-500 mt-1">Comparison Dashboard</p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {sections.map(s => {
            const Icon = s.icon;
            const isActive = activeSection === s.id && !selectedProduct;
            return (
              <button
                key={s.id}
                onClick={() => handleNavClick(s.id)}
                className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-orange-500/10 text-orange-400 border-r-2 border-orange-500'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {s.label}
              </button>
            );
          })}
        </nav>

        <div className="p-5 border-t border-gray-800 text-xs text-gray-600 space-y-1">
          <p>{products.length} models compared</p>
          <p>{brands.length} brands ({brands.join(', ')})</p>
          <p>Price range: {priceRange}</p>
          <p>Data: Feb 2026</p>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedProduct && (
            <button
              onClick={handleBackFromProduct}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-200 mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to {sections.find(s => s.id === activeSection)?.label || 'Overview'}
            </button>
          )}
          {renderSection()}
        </div>
      </main>
    </div>
  );
}

export default App;
