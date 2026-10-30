import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Phone,
  Globe,
  Clock,
  Share2,
  Bookmark,
  Navigation,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Monitor,
  Search,
  Star,
  ShieldCheck,
  Truck,
  Scissors,
  Check,
  Send,
  AlertCircle
} from 'lucide-react';
import { businessData } from '../data/businessData';
import { ImageWithFallback } from './ImageWithFallback';
import { getCustomPhotos, subscribeToPhotoChanges } from '../utils/photoStorage';

interface GbpPreviewProps {
  onOpenBudgetModal: () => void;
  onSelectPhotoTab: () => void;
}

export const GbpPreview: React.FC<GbpPreviewProps> = ({
  onOpenBudgetModal,
  onSelectPhotoTab
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'desktop'>('mobile');
  const [viewType, setViewType] = useState<'maps' | 'search'>('maps');
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'photos' | 'reviews'>('overview');
  const [selectedReviewFilter, setSelectedReviewFilter] = useState<'all' | '5' | 'critical'>('all');
  const [showFullHours, setShowFullHours] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [customPhotos, setCustomPhotos] = useState(getCustomPhotos);

  useEffect(() => {
    return subscribeToPhotoChanges(() => {
      setCustomPhotos(getCustomPhotos());
    });
  }, []);

  const gbpPhotos = [
    {
      title: "Mostrador de recepción y boutique artesanal",
      url: customPhotos['mostrador']?.url || businessData.photos[4].url,
      tag: "🏬 Mostrador"
    },
    {
      title: "Zapatos de piel Oxford elegantes restaurados",
      url: customPhotos['featured-shoe']?.url || businessData.featuredShoePhoto,
      tag: "👞 Zapatos elegantes"
    },
    {
      title: "Antes y después: Suelas Vibram",
      url: customPhotos['antes-despues']?.url || businessData.photos[3].url,
      tag: "🔄 Antes y después"
    },
    {
      title: "Maestro zapatero trabajando",
      url: customPhotos['zapatero']?.url || businessData.photos[2].url,
      tag: "🔨 Cosido artesano"
    },
    {
      title: "Fachada del taller en Retiro",
      url: customPhotos['fachada']?.url || businessData.photos[0].url,
      tag: "🏬 Calle de Ibiza, 34"
    }
  ];
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Determine current opening status based on Spain local time
  const getOpeningStatus = () => {
    const now = new Date();
    // Using Europe/Madrid local time
    const madridHour = (now.getUTCHours() + 2) % 24; // approximation for Spain CEST/CET
    const day = now.getUTCDay(); // 0 is Sunday, 6 is Saturday

    if (day === 0) {
      return { isOpen: false, text: "Cerrado hoy domingo", next: "Abre lunes a las 10:00" };
    }
    if (day === 6) {
      if (madridHour >= 10 && madridHour < 14) {
        return { isOpen: true, text: "Abierto ahora", next: "Cierra a las 14:00" };
      }
      return { isOpen: false, text: "Cerrado", next: "Abre lunes a las 10:00" };
    }
    // Monday to Friday: 10:00-14:00 & 17:00-20:30
    if ((madridHour >= 10 && madridHour < 14) || (madridHour >= 17 && madridHour < 20.5)) {
      return {
        isOpen: true,
        text: "Abierto ahora",
        next: madridHour < 14 ? "Cierra a las 14:00 (reabre 17:00)" : "Cierra a las 20:30"
      };
    }
    return {
      isOpen: false,
      text: "Cerrado en este momento",
      next: madridHour < 10 ? "Abre hoy a las 10:00" : (madridHour < 17 ? "Abre a las 17:00" : "Abre mañana a las 10:00")
    };
  };

  const status = getOpeningStatus();

  return (
    <div className="w-full">
      {/* Control Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-6 bg-white border border-stone-200 rounded-xl shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-500 font-mono">
            Simulador de Ficha
          </span>
          <span className="text-stone-300">·</span>
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setViewType('maps')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewType === 'maps'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Google Maps
            </button>
            <button
              onClick={() => setViewType('search')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                viewType === 'search'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Google Search (SERP)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 hidden sm:inline">Dispositivo:</span>
          <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-lg">
            <button
              onClick={() => setDeviceMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                deviceMode === 'mobile'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Vista móvil (cerca de mí)"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Móvil (Cerca de mí)</span>
            </button>
            <button
              onClick={() => setDeviceMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                deviceMode === 'desktop'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Vista escritorio"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Escritorio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Preview Container */}
      <div className="flex justify-center">
        {deviceMode === 'mobile' ? (
          /* Mobile Device Mockup */
          <div className="w-full max-w-[420px] bg-white rounded-[38px] shadow-2xl border-[10px] border-stone-800 overflow-hidden relative">
            {/* Phone Speaker & Notch */}
            <div className="bg-stone-800 h-6 w-full flex items-center justify-center relative">
              <div className="w-20 h-3.5 bg-black rounded-b-xl flex items-center justify-center">
                <div className="w-10 h-1 bg-stone-700 rounded-full" />
              </div>
            </div>

            {/* Google Search / Maps Header Bar in Phone */}
            <div className="bg-stone-50 border-b border-stone-200 px-4 py-2.5 flex items-center gap-2.5">
              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
                </svg>
              </div>
              <div className="flex-1 bg-white border border-stone-200 rounded-full px-3 py-1 flex items-center justify-between text-xs text-stone-700 shadow-2xs">
                <span className="truncate font-medium">zapatero cerca de mí (Retiro)</span>
                <Search className="w-3.5 h-3.5 text-stone-400 shrink-0 ml-1" />
              </div>
            </div>

            {/* Content Body of Phone */}
            <div className="max-h-[720px] overflow-y-auto bg-stone-50 text-stone-800 text-sm">
              {viewType === 'search' && (
                /* Google SERP Snippet Preview */
                <div className="p-4 bg-white border-b border-stone-200">
                  <div className="text-[11px] text-stone-500 mb-1 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-stone-400" />
                    <span className="truncate">https://estudiopiel-retiro.es</span>
                  </div>
                  <h3 className="text-blue-700 hover:underline font-medium text-base leading-snug cursor-pointer">
                    {businessData.seoTitle}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-3 leading-relaxed">
                    {businessData.seoDescription}
                  </p>
                  <div className="mt-2.5 pt-2 border-t border-stone-100 flex items-center gap-4 text-xs text-stone-600">
                    <span className="text-amber-700 font-medium">★ 4.9 (127)</span>
                    <span>·</span>
                    <span>Retiro, Madrid</span>
                    <span>·</span>
                    <span>Presupuesto sin compromiso</span>
                  </div>
                </div>
              )}

              {/* Photo Showcase Carousel (Shows elegant shoes by default) */}
              <div className="relative bg-stone-900 h-56 group">
                <ImageWithFallback
                  src={gbpPhotos[activePhotoIdx].url}
                  alt={gbpPhotos[activePhotoIdx].title}
                  className="w-full h-full object-cover"
                  fallbackTitle="Zapatos elegantes · Estudio Piel"
                  fallbackSubtitle="Reparación de calzado artesanal en Retiro"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                
                {/* Photo Category Switcher Pills */}
                <div className="absolute top-2.5 left-3 right-3 flex items-center justify-between gap-1 z-10">
                  <div className="flex gap-1 overflow-x-auto py-0.5">
                    {gbpPhotos.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIdx(idx)}
                        className={`px-2 py-0.5 rounded-full text-[10px] font-medium transition-all backdrop-blur-md ${
                          activePhotoIdx === idx
                            ? 'bg-amber-400 text-stone-950 font-bold shadow-xs'
                            : 'bg-black/50 text-white hover:bg-black/70'
                        }`}
                      >
                        {p.tag}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={onSelectPhotoTab}
                    className="px-2 py-0.5 bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs text-[10px] rounded-md transition-colors flex items-center gap-0.5 shrink-0"
                  >
                    <span>5 fotos</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="absolute bottom-2.5 left-4 right-4 text-white">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[10px] text-amber-300 font-semibold tracking-wide uppercase font-mono bg-black/40 px-1.5 py-0.2 rounded">
                      {businessData.category.primary} en Retiro
                    </span>
                    <span className="text-[10px] text-stone-300 font-mono">
                      · {gbpPhotos[activePhotoIdx].title}
                    </span>
                  </div>
                  <h1 className="font-serif text-2xl font-bold tracking-tight text-white leading-tight">
                    {businessData.name}
                  </h1>
                </div>
              </div>

              {/* Business Overview Header Card */}
              <div className="bg-white p-4 border-b border-stone-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="flex items-center text-amber-500">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                  <span className="font-semibold text-stone-900 text-sm">4.9</span>
                  <span className="text-stone-500 text-xs">(127 reseñas en Google)</span>
                </div>

                <div className="text-xs text-stone-600 flex flex-wrap items-center gap-x-2 gap-y-1 mb-3">
                  <span className="font-medium text-stone-800">{businessData.category.primary}</span>
                  <span>·</span>
                  <span>{businessData.serviceArea.mainLocation}</span>
                </div>

                {/* Opening Hours Status Banner */}
                <div className="flex items-start gap-2 text-xs py-2 px-3 bg-stone-50 rounded-lg border border-stone-200 mb-3">
                  <Clock className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className={`font-semibold ${status.isOpen ? 'text-emerald-700' : 'text-amber-800'}`}>
                      {status.text}
                    </span>
                    <span className="text-stone-600 ml-1.5">· {status.next}</span>
                    <button
                      onClick={() => setShowFullHours(!showFullHours)}
                      className="block text-blue-600 hover:underline mt-0.5 text-[11px]"
                    >
                      {showFullHours ? 'Ocultar horarios de la semana' : 'Ver todos los horarios'}
                    </button>
                    {showFullHours && (
                      <div className="mt-2 pt-2 border-t border-stone-200 space-y-1 font-mono text-[11px] text-stone-700">
                        {businessData.hours.schedule.map((item) => (
                          <div key={item.day} className="flex justify-between">
                            <span className="font-sans font-medium">{item.day}:</span>
                            <span className={item.isClosed ? 'text-rose-600' : 'text-stone-700'}>
                              {item.openTime}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Primary CTA Action Row */}
                <div className="grid grid-cols-4 gap-2 text-center pt-1">
                  <a
                    href="https://maps.google.com/?q=Estudio+Piel+Calle+Ibiza+Madrid"
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium">Cómo llegar</span>
                  </a>

                  <a
                    href={`tel:${businessData.contact.phoneClean}`}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium">Llamar</span>
                  </a>

                  <a
                    href={`https://wa.me/${businessData.contact.whatsappClean}?text=Hola%20Estudio%20Piel,%20quisiera%20pedir%20presupuesto%20para%20un%20arreglo`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-800 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium">WhatsApp</span>
                  </a>

                  <button
                    onClick={onOpenBudgetModal}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center mb-1">
                      <Scissors className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-medium leading-none">Presupuesto</span>
                  </button>
                </div>
              </div>

              {/* In-Card Nav Tabs */}
              <div className="bg-white border-b border-stone-200 flex text-xs font-medium text-stone-600 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-4 py-2.5 border-b-2 whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent hover:text-stone-900'
                  }`}
                >
                  Información
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`px-4 py-2.5 border-b-2 whitespace-nowrap ${
                    activeTab === 'services'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent hover:text-stone-900'
                  }`}
                >
                  Servicios y Precios
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-4 py-2.5 border-b-2 whitespace-nowrap ${
                    activeTab === 'reviews'
                      ? 'border-blue-600 text-blue-600 font-semibold'
                      : 'border-transparent hover:text-stone-900'
                  }`}
                >
                  Reseñas (127)
                </button>
              </div>

              {/* Tab: Overview */}
              {activeTab === 'overview' && (
                <div className="p-4 space-y-4 bg-white">
                  {/* Address & Zone */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <div className="font-medium text-stone-900">{businessData.contact.address}</div>
                      <div className="text-stone-500">{businessData.contact.postalCode} {businessData.contact.city}</div>
                      <div className="text-[11px] text-amber-800 mt-1 flex items-center gap-1 font-medium">
                        <Truck className="w-3 h-3 text-amber-700" />
                        <span>{businessData.serviceArea.details}</span>
                      </div>
                    </div>
                  </div>

                  {/* Official GBP Description */}
                  <div className="pt-3 border-t border-stone-100">
                    <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-1.5 font-mono">
                      Descripción del taller
                    </h4>
                    <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200">
                      {businessData.description}
                    </p>
                  </div>

                  {/* Highlights & Guarantees */}
                  <div className="pt-2 border-t border-stone-100">
                    <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-2 font-mono">
                      Atributos destacados
                    </h4>
                    <div className="grid grid-cols-1 gap-1.5">
                      {businessData.attributes.map((attr, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-stone-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{attr}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fast Quote Banner */}
                  <div className="p-3 bg-gradient-to-r from-amber-900 to-stone-900 text-white rounded-xl shadow-xs">
                    <div className="text-xs font-serif font-semibold text-amber-200 mb-0.5">
                      ¿Zapatos o bolsos para reparar en Retiro?
                    </div>
                    <div className="text-[11px] text-stone-300 mb-2">
                      Presupuesto sin compromiso y entrega en 24 a 48 horas.
                    </div>
                    <button
                      onClick={onOpenBudgetModal}
                      className="w-full py-1.5 text-xs font-medium bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg transition-colors"
                    >
                      Calcular presupuesto online
                    </button>
                  </div>
                </div>
              )}

              {/* Tab: Services */}
              {activeTab === 'services' && (
                <div className="p-4 space-y-3 bg-white">
                  <div className="text-xs text-stone-500 mb-2">
                    Servicios de zapatero artesanal y marroquinería en el distrito Retiro:
                  </div>
                  {businessData.services.map((service) => (
                    <div
                      key={service.id}
                      className="p-3 rounded-lg border border-stone-200 hover:border-amber-400 bg-stone-50/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-semibold text-xs text-stone-900">
                          {service.name}
                        </div>
                        <span className="text-xs font-bold text-amber-800 font-mono shrink-0">
                          {service.priceEstimate}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-600 mt-1 leading-snug">
                        {service.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-stone-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-stone-400" />
                          <span>Plazo: {service.duration}</span>
                        </span>
                        <button
                          onClick={onOpenBudgetModal}
                          className="text-amber-800 hover:underline font-medium"
                        >
                          Solicitar presupuesto →
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Reviews */}
              {activeTab === 'reviews' && (
                <div className="p-4 space-y-4 bg-white">
                  {/* Reviews Summary */}
                  <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                    <div>
                      <div className="text-2xl font-bold text-stone-900 font-mono">4.9</div>
                      <div className="flex text-amber-400 text-xs my-0.5">★★★★★</div>
                      <div className="text-[11px] text-stone-500">127 opiniones verificadas</div>
                    </div>
                    <div className="flex flex-col gap-1 text-[11px]">
                      <button
                        onClick={() => setSelectedReviewFilter('all')}
                        className={`px-2.5 py-1 rounded text-left ${
                          selectedReviewFilter === 'all' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        Todas (127)
                      </button>
                      <button
                        onClick={() => setSelectedReviewFilter('5')}
                        className={`px-2.5 py-1 rounded text-left ${
                          selectedReviewFilter === '5' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        5 estrellas (121)
                      </button>
                      <button
                        onClick={() => setSelectedReviewFilter('critical')}
                        className={`px-2.5 py-1 rounded text-left ${
                          selectedReviewFilter === 'critical' ? 'bg-stone-900 text-white' : 'bg-stone-100 text-stone-700'
                        }`}
                      >
                        Respuesta a crítica (1)
                      </button>
                    </div>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-4">
                    {businessData.reviewStrategy.responses
                      .filter((r) => {
                        if (selectedReviewFilter === '5') return r.rating === 5;
                        if (selectedReviewFilter === 'critical') return r.rating < 5;
                        return true;
                      })
                      .map((review, idx) => (
                        <div key={idx} className="text-xs space-y-1.5 pb-3 border-b border-stone-100 last:border-b-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-stone-900">{review.customerName}</span>
                            <span className="text-[10px] text-stone-400">{review.date}</span>
                          </div>
                          <div className="flex text-amber-400 text-xs">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                            ))}
                          </div>
                          <p className="text-stone-700 text-xs leading-relaxed">
                            {review.customerComment}
                          </p>

                          {/* Owner Response */}
                          <div className="mt-2 pl-3 border-l-2 border-amber-600 bg-stone-50 p-2.5 rounded-r-lg space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-[11px] text-stone-900">
                                Respuesta del propietario (Estudio Piel)
                              </span>
                              <span className="text-[9px] text-stone-400">Verificada</span>
                            </div>
                            <p className="text-[11px] text-stone-600 leading-relaxed italic">
                              "{review.officialReply}"
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Bottom Local SEO Bar inside Mobile Mockup */}
              <div className="p-3 bg-stone-100 border-t border-stone-200 text-[11px] text-stone-500 flex items-center justify-between">
                <span>📍 Ubicación: Retiro, Madrid</span>
                <span className="font-mono text-emerald-700 font-medium">Keywords optimizadas</span>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Google Knowledge Panel View */
          <div className="w-full max-w-4xl bg-white rounded-2xl shadow-md border border-stone-200 overflow-hidden">
            {/* Desktop Google Search Mockup Bar */}
            <div className="bg-[#f1f3f4] border-b border-stone-200 p-3 px-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 flex-1 max-w-xl">
                <span className="font-bold text-xl text-blue-600 font-sans tracking-tight">Google</span>
                <div className="flex-1 bg-white border border-stone-300 rounded-full px-4 py-2 flex items-center justify-between shadow-2xs">
                  <span className="text-sm text-stone-800">zapatero en Retiro madrid</span>
                  <Search className="w-4 h-4 text-stone-500" />
                </div>
              </div>
              <div className="text-xs text-stone-500 font-mono">
                Búsqueda local · Retiro, Madrid
              </div>
            </div>

            {/* Desktop Two-Column Split (SERP Results Left + Google Business Profile Card Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
              {/* Left Column: Organic Web Snippet */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs text-stone-500 flex items-center gap-1.5 mb-1 font-mono">
                    <span>https://estudiopiel-retiro.es</span>
                    <span className="text-stone-300">›</span>
                    <span>zapatero-retiro</span>
                  </div>
                  <h3 className="text-xl text-[#1a0dab] hover:underline font-medium cursor-pointer leading-tight mb-1.5">
                    {businessData.seoTitle}
                  </h3>
                  <p className="text-sm text-[#4d5156] leading-relaxed">
                    {businessData.seoDescription}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-stone-600">
                    <span className="bg-stone-100 px-2 py-1 rounded">Cambiamos suelas y tacones</span>
                    <span className="bg-stone-100 px-2 py-1 rounded">Reparación de bolsos</span>
                    <span className="bg-stone-100 px-2 py-1 rounded">24 a 48 horas</span>
                    <span className="bg-stone-100 px-2 py-1 rounded">Taller en Retiro</span>
                  </div>
                </div>

                {/* Map Pack Highlight */}
                <div className="border border-stone-200 rounded-xl p-4 bg-stone-50">
                  <div className="text-xs font-semibold text-stone-700 uppercase tracking-wider mb-2 font-mono flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-rose-600" />
                    <span>Presencia en Google Maps Pack 3 (Retiro)</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-stone-200 flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-stone-900 text-sm">Estudio Piel</div>
                      <div className="text-xs text-stone-600 mt-0.5">
                        4.9 ★★★★★ (127) · Zapatero en Madrid
                      </div>
                      <div className="text-xs text-stone-500 mt-1">
                        Calle de Ibiza, 34 · {status.isOpen ? 'Abierto' : 'Cerrado'}
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium mt-1">
                        ✓ Recogida y entrega a domicilio opcional en Retiro
                      </div>
                    </div>
                    <button
                      onClick={onOpenBudgetModal}
                      className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-lg transition-colors shrink-0"
                    >
                      Presupuesto
                    </button>
                  </div>
                </div>

                {/* Services Grid on Desktop */}
                <div>
                  <h4 className="font-serif text-lg font-semibold text-stone-900 mb-3">
                    Servicios destacados en el taller de Retiro
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {businessData.services.slice(0, 4).map((s) => (
                      <div key={s.id} className="p-3 border border-stone-200 rounded-lg bg-white">
                        <div className="font-medium text-xs text-stone-900">{s.name}</div>
                        <div className="text-xs font-bold text-amber-800 font-mono mt-0.5">{s.priceEstimate}</div>
                        <div className="text-[11px] text-stone-500 mt-1">{s.duration}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Google Business Knowledge Panel */}
              <div className="lg:col-span-5 border border-stone-200 rounded-2xl p-5 shadow-xs bg-white space-y-4">
                {/* Photo Strip with Elegant Shoes */}
                <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden h-40">
                  <div className="col-span-2 h-full relative group">
                    <ImageWithFallback
                      src={customPhotos['featured-shoe']?.url || businessData.featuredShoePhoto}
                      alt="Zapatos elegantes de piel artesanales"
                      className="w-full h-full object-cover"
                      fallbackTitle="Zapatos elegantes de piel"
                    />
                    <span className="absolute bottom-1.5 left-2 bg-black/70 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                      Calzado de alta gama
                    </span>
                  </div>
                  <div className="flex flex-col gap-1.5 h-full">
                    <div className="h-1/2 relative">
                      <ImageWithFallback
                        src={customPhotos['antes-despues']?.url || businessData.photos[3].url}
                        alt="Suela Vibram nueva"
                        className="w-full h-full object-cover"
                        fallbackTitle="Suela Vibram"
                      />
                    </div>
                    <div className="h-1/2 relative">
                      <ImageWithFallback
                        src={customPhotos['zapatero']?.url || businessData.photos[2].url}
                        alt="Zapatero trabajando"
                        className="w-full h-full object-cover"
                        fallbackTitle="Zapatero trabajando"
                      />
                    </div>
                  </div>
                </div>

                {/* Name & Title */}
                <div>
                  <h2 className="text-2xl font-bold text-stone-900 font-serif">
                    {businessData.name}
                  </h2>
                  <div className="text-xs text-stone-600 mt-1">
                    {businessData.category.primary} · {businessData.category.additional[0]}
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-xs">
                    <span className="font-bold text-stone-900">4.9</span>
                    <div className="flex text-amber-400">★★★★★</div>
                    <span className="text-blue-600 hover:underline cursor-pointer">
                      127 reseñas en Google
                    </span>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-200">
                  <button
                    onClick={() => handleCopy(businessData.contact.address, 'dirección')}
                    className="p-2 border border-stone-300 rounded-lg text-center hover:bg-stone-50 text-xs font-medium text-stone-800"
                  >
                    <Navigation className="w-4 h-4 mx-auto text-blue-600 mb-1" />
                    <span>Cómo llegar</span>
                  </button>
                  <a
                    href={`tel:${businessData.contact.phoneClean}`}
                    className="p-2 border border-stone-300 rounded-lg text-center hover:bg-stone-50 text-xs font-medium text-stone-800"
                  >
                    <Phone className="w-4 h-4 mx-auto text-emerald-600 mb-1" />
                    <span>Llamar</span>
                  </a>
                  <button
                    onClick={onOpenBudgetModal}
                    className="p-2 border border-amber-300 rounded-lg text-center bg-amber-50 hover:bg-amber-100 text-xs font-medium text-amber-900"
                  >
                    <Scissors className="w-4 h-4 mx-auto text-amber-700 mb-1" />
                    <span>Presupuesto</span>
                  </button>
                </div>

                {/* Metadata List */}
                <div className="space-y-2.5 text-xs text-stone-700 pt-2 border-t border-stone-100">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span><strong>Dirección:</strong> {businessData.contact.address}, {businessData.contact.city}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <div>
                      <span className={`font-semibold ${status.isOpen ? 'text-emerald-700' : 'text-amber-800'}`}>
                        {status.text}
                      </span>
                      <span className="text-stone-500"> · {status.next}</span>
                      <div className="text-[11px] text-stone-500 mt-0.5">
                        {businessData.hours.weekdays} · {businessData.hours.saturday}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span><strong>Teléfono:</strong> {businessData.contact.phone}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MessageSquare className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                    <span><strong>WhatsApp:</strong> {businessData.contact.whatsapp}</span>
                  </div>
                </div>

                {/* Description Excerpt */}
                <div className="pt-2 border-t border-stone-100">
                  <p className="text-xs text-stone-600 leading-relaxed line-clamp-4">
                    {businessData.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
