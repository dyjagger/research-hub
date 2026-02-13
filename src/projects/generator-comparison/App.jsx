import React, { useState } from 'react';
import { Zap, BarChart3, Table2, DollarSign, CheckSquare, Award, BookOpen, ChevronLeft } from 'lucide-react';
import { products } from './data/products';
import { productDetails, getAggregateRating } from './data/productDetails';
import Overview from './components/Overview';
import ComparisonTable from './components/ComparisonTable';
import PowerAnalysis from './components/PowerAnalysis';
import ValueAnalysis from './components/ValueAnalysis';
import FeaturesMatrix from './components/FeaturesMatrix';
import Recommendations from './components/Recommendations';
import Sources from './components/Sources';
import ProductDetail from './components/ProductDetail';

const sections = [
  { id: 'overview', label: 'Overview', icon: Zap },
  { id: 'comparison', label: 'Head-to-Head', icon: Table2 },
  { id: 'power', label: 'Power Analysis', icon: BarChart3 },
  { id: 'value', label: 'Value & Cost', icon: DollarSign },
  { id: 'features', label: 'Features Matrix', icon: CheckSquare },
  { id: 'recommendations', label: 'Recommendations', icon: Award },
  { id: 'sources', label: 'Sources', icon: BookOpen },
];

const triFuelCount = products.filter(p => p.fuelType === 'Tri-Fuel').length;
const brandCount = [...new Set(products.map(p => p.brand))].length;
const priceRange = `$${Math.min(...products.map(p => p.price)).toLocaleString()} – $${Math.max(...products.map(p => p.price)).toLocaleString()}`;

export default function App() {
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleProductSelect = (productId) => {
    setSelectedProduct(productId);
  };

  const handleBackFromProduct = () => {
    setSelectedProduct(null);
  };

  const renderSection = () => {
    if (selectedProduct) {
      const product = products.find(p => p.id === selectedProduct);
      const details = productDetails[selectedProduct];
      const rating = getAggregateRating(selectedProduct);
      return (
        <ProductDetail
          product={product}
          details={details}
          rating={rating}
          onBack={handleBackFromProduct}
        />
      );
    }
    switch (activeSection) {
      case 'overview': return <Overview onProductSelect={handleProductSelect} />;
      case 'comparison': return <ComparisonTable onProductSelect={handleProductSelect} />;
      case 'power': return <PowerAnalysis />;
      case 'value': return <ValueAnalysis />;
      case 'features': return <FeaturesMatrix />;
      case 'recommendations': return <Recommendations onProductSelect={handleProductSelect} />;
      case 'sources': return <Sources />;
      default: return <Overview onProductSelect={handleProductSelect} />;
    }
  };

  return (
    <div className="flex h-full bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <div className="w-64 min-w-[256px] bg-gray-900 border-r border-gray-800 flex flex-col">
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-5 h-5 text-amber-400" />
            <h1 className="text-lg font-bold text-white">Generator Finder</h1>
          </div>
          <p className="text-xs text-gray-400">Tri-Fuel & Dual-Fuel Comparison</p>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sections.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => { setActiveSection(id); setSelectedProduct(null); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === id && !selectedProduct
                  ? 'bg-amber-500/20 text-amber-400 border-l-2 border-amber-400'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800 space-y-2 text-xs text-gray-500">
          <div className="flex justify-between">
            <span>Models compared</span>
            <span className="text-gray-300 font-medium">{products.length}</span>
          </div>
          <div className="flex justify-between">
            <span>Tri-fuel models</span>
            <span className="text-emerald-400 font-medium">{triFuelCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Brands</span>
            <span className="text-gray-300 font-medium">{brandCount}</span>
          </div>
          <div className="flex justify-between">
            <span>Price range</span>
            <span className="text-gray-300 font-medium">{priceRange}</span>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-800 text-gray-600">
            Data: Feb 2026
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedProduct && (
          <button
            onClick={handleBackFromProduct}
            className="flex items-center gap-1 m-4 mb-0 px-3 py-1.5 text-sm text-gray-400 hover:text-white bg-gray-800 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to {sections.find(s => s.id === activeSection)?.label || 'Overview'}
          </button>
        )}
        <div className="p-6">
          {renderSection()}
        </div>
      </div>
    </div>
  );
}
