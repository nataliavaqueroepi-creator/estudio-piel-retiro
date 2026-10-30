import React, { useState } from 'react';
import {
  MapPin,
  Sparkles,
  Search,
  Camera,
  Star,
  FileText,
  Phone,
  MessageSquare,
  Copy,
  Check,
  Scissors,
  Award,
  Layers,
  ChevronRight,
  TrendingUp,
  Clock,
  Navigation,
  PlaySquare
} from 'lucide-react';
import { businessData } from './data/businessData';
import { PresentationDeck } from './components/PresentationDeck';
import { GbpPreview } from './components/GbpPreview';
import { DataCopyDashboard } from './components/DataCopyDashboard';
import { PhotoGallery } from './components/PhotoGallery';
import { ReviewStrategy } from './components/ReviewStrategy';
import { LocalSeoAudit } from './components/LocalSeoAudit';
import { BudgetCalculatorModal } from './components/BudgetCalculatorModal';

export default function App() {
  const [activeNav, setActiveNav] = useState<
    'presentation' | 'preview' | 'data' | 'photos' | 'reviews' | 'audit'
  >('presentation');
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E293B] flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-stone-900">
      {/* Top Bar Contract (§2) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => setActiveNav('presentation')}
            className="flex items-baseline gap-2 text-left cursor-pointer group"
          >
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 group-hover:text-amber-800 transition-colors">
              Estudio Piel
            </span>
            <span className="text-xs font-mono text-stone-400 hidden md:inline">
              Retiro · Madrid
            </span>
          </button>

          {/* Zone 2: 4-5 Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600">
            <button
              onClick={() => setActiveNav('presentation')}
              className={`flex items-center gap-1.5 hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeNav === 'presentation'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              <PlaySquare className="w-3.5 h-3.5 text-amber-700" />
              <span>Presentación Slides</span>
            </button>
            <button
              onClick={() => setActiveNav('preview')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeNav === 'preview'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Ficha Google
            </button>
            <button
              onClick={() => setActiveNav('data')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeNav === 'data'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Datos & Copia
            </button>
            <button
              onClick={() => setActiveNav('photos')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeNav === 'photos'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Fotos Elegantes
            </button>
            <button
              onClick={() => setActiveNav('reviews')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeNav === 'reviews'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Reseñas & QR
            </button>
            <button
              onClick={() => setActiveNav('audit')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 pb-0.5 border-b-2 ${
                activeNav === 'audit'
                  ? 'border-stone-900 text-stone-900 font-semibold'
                  : 'border-transparent text-stone-600'
              }`}
            >
              Auditoría SEO
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsBudgetModalOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 shadow-2xs"
            >
              <Scissors className="w-3.5 h-3.5 text-amber-400" />
              <span>Pedir Presupuesto</span>
            </button>
          </div>
        </div>

        {/* Mobile horizontal scroller for navigation tabs */}
        <div className="lg:hidden flex items-center gap-1 px-4 py-2 overflow-x-auto border-t border-stone-100 bg-stone-50 text-xs text-stone-600">
          <button
            onClick={() => setActiveNav('presentation')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 font-medium ${
              activeNav === 'presentation' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : ''
            }`}
          >
            Slides
          </button>
          <button
            onClick={() => setActiveNav('preview')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 ${
              activeNav === 'preview' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : ''
            }`}
          >
            Ficha Google
          </button>
          <button
            onClick={() => setActiveNav('data')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 ${
              activeNav === 'data' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : ''
            }`}
          >
            Datos & Copia
          </button>
          <button
            onClick={() => setActiveNav('photos')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 ${
              activeNav === 'photos' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : ''
            }`}
          >
            Fotos Elegantes
          </button>
          <button
            onClick={() => setActiveNav('reviews')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 ${
              activeNav === 'reviews' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : ''
            }`}
          >
            Reseñas & QR
          </button>
          <button
            onClick={() => setActiveNav('audit')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap shrink-0 ${
              activeNav === 'audit' ? 'bg-white font-semibold text-stone-900 shadow-2xs' : ''
            }`}
          >
            Auditoría SEO
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        {activeNav === 'presentation' && (
          <PresentationDeck
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            onGoToFullInteractiveView={() => setActiveNav('preview')}
          />
        )}

        {activeNav === 'preview' && (
          <GbpPreview
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            onSelectPhotoTab={() => setActiveNav('photos')}
          />
        )}

        {activeNav === 'data' && (
          <DataCopyDashboard
            onOpenBudgetModal={() => setIsBudgetModalOpen(true)}
            onNavigateToPhotos={() => setActiveNav('photos')}
            onNavigateToReviews={() => setActiveNav('reviews')}
          />
        )}

        {activeNav === 'photos' && <PhotoGallery />}

        {activeNav === 'reviews' && <ReviewStrategy />}

        {activeNav === 'audit' && <LocalSeoAudit />}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-stone-200 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-900 text-sm">Estudio Piel</span>
            <span>·</span>
            <span>Zapatero artesanal en Retiro, Madrid</span>
            <span>·</span>
            <span>Calle de Ibiza, 34</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] text-stone-400 font-mono">
            <span>Horario: L-V 10-14h / 17-20:30h · Sáb 10-14h</span>
            <span>·</span>
            <span>Madrid 28009</span>
          </div>
        </div>
      </footer>

      {/* Web Budget Request Modal */}
      <BudgetCalculatorModal
        isOpen={isBudgetModalOpen}
        onClose={() => setIsBudgetModalOpen(false)}
      />
    </div>
  );
}
