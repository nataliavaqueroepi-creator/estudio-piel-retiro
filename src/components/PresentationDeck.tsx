import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Printer,
  Copy,
  Check,
  Star,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  Globe,
  Sliders,
  QrCode,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Search,
  Sparkles,
  ArrowRight,
  Scissors,
  Layers,
  Eye,
  Camera,
  Edit3,
  RotateCcw,
  Upload,
  Link as LinkIcon,
  HelpCircle,
  RefreshCw,
  Image as ImageIcon,
  X
} from 'lucide-react';
import { businessData } from '../data/businessData';
import { ImageWithFallback } from './ImageWithFallback';
import { QrCodeSvg } from './QrCodeSvg';
import {
  getCustomPhotos,
  saveCustomPhoto,
  resetCustomPhoto,
  subscribeToPhotoChanges,
  compressImageFile,
  type CustomPhotoEntry
} from '../utils/photoStorage';

interface PresentationDeckProps {
  onOpenBudgetModal: () => void;
  onGoToFullInteractiveView: () => void;
}

// Clean Minimal Header for Estudio Piel Slides (No institutional branding or minute badges)
const CleanSlideHeader: React.FC<{
  currentSlide: number;
  totalSlides: number;
  categoryTitle?: string;
}> = ({ currentSlide, totalSlides, categoryTitle }) => (
  <div className="flex items-center justify-between w-full pb-3 mb-4 border-b border-stone-200 select-none">
    {/* Left: Clean Brand */}
    <div className="flex items-center gap-2.5">
      <div className="w-8 h-8 rounded-lg bg-stone-900 text-amber-300 font-serif font-bold text-sm flex items-center justify-center shadow-xs">
        EP
      </div>
      <div>
        <div className="font-serif font-bold text-base text-stone-900 leading-tight">
          Estudio Piel
        </div>
        <div className="text-[11px] text-stone-500 font-sans">
          Zapatero en Retiro, Madrid · Calle de Ibiza, 34
        </div>
      </div>
    </div>

    {/* Right: Category and Slide count */}
    <div className="flex items-center gap-2.5">
      {categoryTitle && (
        <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/80 font-mono">
          {categoryTitle}
        </span>
      )}
      <span className="font-mono text-xs font-bold text-stone-600 bg-stone-100 px-2.5 py-1 rounded-md border border-stone-200">
        {currentSlide + 1} / {totalSlides}
      </span>
    </div>
  </div>
);

// Clean Presentation Footer (No institutional logos)
const CleanSlideFooter: React.FC<{
  currentSlide: number;
  totalSlides: number;
  slideLabel: string;
  onPrev: () => void;
  onNext: () => void;
  onGoToSlide: (index: number) => void;
}> = ({ currentSlide, totalSlides, slideLabel, onPrev, onNext, onGoToSlide }) => (
  <div className="w-full pt-3 mt-auto border-t border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 select-none">
    {/* Progress Dots */}
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSlides }).map((_, idx) => (
        <button
          key={idx}
          onClick={() => onGoToSlide(idx)}
          className={`h-2 rounded-full transition-all ${
            currentSlide === idx ? 'w-7 bg-stone-900' : 'w-2 bg-stone-200 hover:bg-stone-400'
          }`}
          title={`Ir a diapositiva ${idx + 1}`}
        />
      ))}
    </div>

    {/* Center Label */}
    <div className="text-[11px] font-medium text-stone-700">
      <span className="text-stone-400">Diapositiva {currentSlide + 1}:</span> {slideLabel}
    </div>

    {/* Navigation Helpers */}
    <div className="flex items-center gap-2 font-mono text-[11px]">
      <button
        onClick={onPrev}
        disabled={currentSlide === 0}
        className="hover:text-stone-900 disabled:opacity-30 flex items-center gap-0.5"
      >
        <ChevronLeft className="w-3.5 h-3.5" /> Anterior
      </button>
      <span>·</span>
      <button
        onClick={onNext}
        disabled={currentSlide === totalSlides - 1}
        className="hover:text-stone-900 disabled:opacity-30 flex items-center gap-0.5"
      >
        Siguiente <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
);

export const PresentationDeck: React.FC<PresentationDeckProps> = ({
  onOpenBudgetModal,
  onGoToFullInteractiveView
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(4); // Default to Photo #5 (Mostrador)
  const [beforeAfterPos, setBeforeAfterPos] = useState(50);
  const defaultCaptions: Record<string, string> = {
    fachada: "Fachada del taller con escaparate de calzado y bolsos artesanos en Calle de Ibiza, 34 (Retiro, Madrid).",
    interior: "Interior del taller: banco de trabajo, hormas tradicionales de madera de zapatero y estantes de pieles nobles.",
    zapatero: "El artesano en plena faena: cosido a mano de cerco de piel y montaje de suela nueva en el banco.",
    antes: "Antes: Suela de cuero original perforada y adelgazada por el uso diario sobre asfalto, y tapa de tacón desgastada con inclinación en la pisada.",
    despues: "Después: Sustitución completa por media suela técnica Vibram de alto agarre con cosido de cerco tradicional, nuevo tacón de caucho biselado y cuero nutrido.",
    mostrador: "Mostrador de recepción de Estudio Piel: atención personalizada, rótulo artesanal grabado en madera noble, exposición de calzado de vestir y bolsos de cuero restaurados."
  };

  const [photoCaptions, setPhotoCaptions] = useState<Record<string, string>>(defaultCaptions);
  const [editingCaptionKey, setEditingCaptionKey] = useState<string | null>(null);
  const [tempCaptionText, setTempCaptionText] = useState<string>('');
  const [showNegativeExample, setShowNegativeExample] = useState<boolean>(false);
  const [customPhotos, setCustomPhotos] = useState<Record<string, CustomPhotoEntry>>(getCustomPhotos);
  const [showHowToPhotoGuide, setShowHowToPhotoGuide] = useState<boolean>(false);
  const [activeUrlInputKey, setActiveUrlInputKey] = useState<string | null>(null);
  const [urlInputValue, setUrlInputValue] = useState<string>('');
  const [photoModalTarget, setPhotoModalTarget] = useState<{
    id: string;
    title: string;
    isBefore: boolean;
    currentUrl: string;
    defaultUrl: string;
    alternatives: { title: string; url: string; beforeUrl?: string }[];
  } | null>(null);
  const [photoModalTab, setPhotoModalTab] = useState<'upload' | 'alternatives' | 'url'>('upload');
  const [modalUrlInput, setModalUrlInput] = useState('');
  const [uploadSuccessAlert, setUploadSuccessAlert] = useState<string | null>(null);
  const directFileInputRef = useRef<HTMLInputElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPhotoChanges(() => {
      setCustomPhotos(getCustomPhotos());
    });
    return unsubscribe;
  }, []);

  const openPhotoModal = (
    id: string,
    title: string,
    isBefore = false
  ) => {
    if (id === 'featured-shoe') {
      const cur = customPhotos['featured-shoe']?.url || businessData.featuredShoePhoto;
      setPhotoModalTarget({
        id: 'featured-shoe',
        title,
        isBefore: false,
        currentUrl: cur,
        defaultUrl: businessData.featuredShoePhoto,
        alternatives: [
          {
            title: "Zapatos Oxford de vestir con suela brillante",
            url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=80"
          },
          {
            title: "Mocasines clásicos de piel marrón artesanal",
            url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80"
          },
          {
            title: "Botas de piel lustrada con tacón renovado",
            url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=80"
          }
        ]
      });
      setPhotoModalTab('upload');
      setModalUrlInput('');
      setUploadSuccessAlert(null);
      return;
    }

    const photoItem = businessData.photos.find(p => p.id === id);
    const eff = photoItem ? getEffectivePhoto(photoItem) : { url: '', beforeUrl: '' };
    setPhotoModalTarget({
      id,
      title,
      isBefore,
      currentUrl: isBefore ? eff.beforeUrl : eff.url,
      defaultUrl: photoItem ? (isBefore ? (photoItem.beforeUrl || photoItem.url) : photoItem.url) : '',
      alternatives: photoItem?.alternatives || []
    });
    setPhotoModalTab('upload');
    setModalUrlInput('');
    setUploadSuccessAlert(null);
  };

  const handleUploadPhoto = async (id: string, file: File, isBefore = false) => {
    try {
      const dataUrl = await compressImageFile(file);
      if (dataUrl) {
        saveCustomPhoto(id, dataUrl, isBefore, 'uploaded');
        setPhotoModalTarget(prev => prev && prev.id === id ? { ...prev, currentUrl: dataUrl } : prev);
        setUploadSuccessAlert('✓ ¡Fotografía actualizada con éxito!');
        setTimeout(() => setUploadSuccessAlert(null), 3500);
      }
    } catch (err) {
      console.error('Error al procesar la fotografía', err);
    }
  };

  const handleApplyPhotoUrl = (id: string, url: string, isBefore = false) => {
    if (!url.trim()) return;
    saveCustomPhoto(id, url.trim(), isBefore, 'url');
    setActiveUrlInputKey(null);
    setUrlInputValue('');
    setPhotoModalTarget(prev => prev && prev.id === id ? { ...prev, currentUrl: url.trim() } : prev);
    setUploadSuccessAlert('✓ ¡Enlace web de foto aplicado!');
    setTimeout(() => setUploadSuccessAlert(null), 3500);
  };

  const handleSelectAlternativePhoto = (id: string, url: string, isBefore = false) => {
    saveCustomPhoto(id, url, isBefore, 'alternative');
    setPhotoModalTarget(prev => prev && prev.id === id ? { ...prev, currentUrl: url } : prev);
    setUploadSuccessAlert('✓ ¡Foto artesanal seleccionada!');
    setTimeout(() => setUploadSuccessAlert(null), 3500);
  };

  const handleResetPhoto = (id: string, isBefore = false) => {
    resetCustomPhoto(id, isBefore);
    const photoItem = businessData.photos.find(p => p.id === id);
    const origUrl = id === 'featured-shoe' 
      ? businessData.featuredShoePhoto 
      : photoItem 
        ? (isBefore ? (photoItem.beforeUrl || photoItem.url) : photoItem.url)
        : '';
    setPhotoModalTarget(prev => prev && prev.id === id ? { ...prev, currentUrl: origUrl } : prev);
    setUploadSuccessAlert('✓ Restaurada foto original predeterminada');
    setTimeout(() => setUploadSuccessAlert(null), 3500);
  };

  const getEffectivePhoto = (photoItem: typeof businessData.photos[0]) => {
    const custom = customPhotos[photoItem.id];
    return {
      url: custom?.url || photoItem.url,
      beforeUrl: custom?.beforeUrl || photoItem.beforeUrl || photoItem.url,
      isCustom: Boolean(custom?.url || custom?.beforeUrl),
      source: custom?.source || 'default'
    };
  };

  const startEditingCaption = (key: string) => {
    setEditingCaptionKey(key);
    setTempCaptionText(photoCaptions[key] || '');
  };

  const saveCaption = (key: string) => {
    if (tempCaptionText.trim()) {
      setPhotoCaptions(prev => ({
        ...prev,
        [key]: tempCaptionText.trim()
      }));
    }
    setEditingCaptionKey(null);
  };

  const resetCaption = (key: string) => {
    setPhotoCaptions(prev => ({
      ...prev,
      [key]: defaultCaptions[key]
    }));
    setTempCaptionText(defaultCaptions[key]);
  };

  const totalSlides = 11;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      deckRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const slideIndexLabels = [
    "P1: Cliente & Keywords",
    "P2: Título SEO & Meta",
    "P3: Propuesta Ficha",
    "1. Nombre del Negocio",
    "2. Categoría Principal",
    "3. Descripción Oficial",
    "4. Zona de Actuación",
    "5. Fotos Elegantes",
    "6. Contacto & Horarios",
    "7. Reseñas Auténticas",
    "Ficha Google Final"
  ];

  return (
    <div ref={deckRef} className="space-y-4 w-full">
      {/* Top Deck Control Toolbar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-3.5 shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-serif font-bold text-stone-900 text-sm">
            Presentación de Ficha Google Business Profile
          </span>
          <span className="text-stone-300">·</span>
          <span className="text-xs font-medium text-stone-600">
            Estudio Piel (Retiro, Madrid)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Navigation Controls */}
          <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="p-1.5 rounded-lg text-stone-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Anterior (←)"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono font-medium px-2 text-stone-600">
              {currentSlide + 1}/{totalSlides}
            </span>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className="p-1.5 rounded-lg text-stone-700 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition-all"
              title="Siguiente (→ o espacio)"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="p-2 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-700 transition-colors"
            title="Pantalla completa (tecla F)"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 rounded-xl text-stone-700 text-xs font-medium transition-colors"
            title="Imprimir o exportar PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimir / PDF</span>
          </button>
        </div>
      </div>

      {/* Main Slide Canvas (Clean, elegant, no institutional logos) */}
      <div className="relative w-full min-h-[600px] lg:min-h-[650px] bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden flex flex-col justify-between p-6 sm:p-9 transition-all">
        {/* ========================================================= */}
        {/* SLIDE 1: PARTE 1 - EL CLIENTE Y SUS BÚSQUEDAS */}
        {/* ========================================================= */}
        {currentSlide === 0 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="Parte 1 · Cliente & Keywords"
              />

              <div className="text-center mb-5">
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold tracking-tight">
                  Parte 1: el cliente y sus búsquedas
                </h2>
                <p className="text-xs text-stone-500 mt-0.5">
                  Caso práctico: <strong>Estudio Piel</strong> · Taller de zapatero y marroquinería en Retiro (Madrid)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Left Column: 5 Preguntas */}
                <div className="md:col-span-5 space-y-2.5">
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                    Antes de elegir keywords:
                  </h3>

                  <div className="space-y-2 text-xs">
                    {[
                      {
                        num: 1,
                        q: "¿Qué servicios ofrece el negocio?",
                        ans: "Reparación artesanal de calzado de piel, cambio de suelas Vibram y tacones en 24-48h, restauración de bolsos y cinturones."
                      },
                      {
                        num: 2,
                        q: "¿Quiénes son sus clientes potenciales?",
                        ans: "Profesional de 30 a 55 años que vive o trabaja en Madrid y tiene zapatos de piel caros (mocasines, botas, tacones) con la suela gastada o un tacón roto. Prefiere arreglarlos antes que comprar otros, busca desde el móvil y necesita el servicio rápido, a menudo para esa misma semana."
                      },
                      {
                        num: 3,
                        q: "¿Qué problema necesita resolver el cliente?",
                        ans: "Suela gastada, tacón roto o bolso descosido; busca rapidez (24-48h), cercanía y presupuesto sin compromiso."
                      },
                      {
                        num: 4,
                        q: "¿Qué escribiría en Google para encontrarlo?",
                        ans: "«zapatero en Retiro», «reparación de calzado en Retiro», «cambiar suela de zapatos» o «zapatero cerca de mí»."
                      },
                      {
                        num: 5,
                        q: "¿Busca información, compara o quiere contratar ya?",
                        ans: "Intención directa de contratación («contratar ya»): el zapato está roto y requiere solución inmediata en el barrio."
                      }
                    ].map((item) => (
                      <div key={item.num} className={`flex items-start gap-2.5 ${item.num === 2 ? 'p-2 rounded-xl bg-amber-50/80 border border-amber-200/80' : ''}`}>
                        <div className={`w-5 h-5 rounded-full ${item.num === 2 ? 'bg-[#272262]' : 'bg-[#f59e0b]'} text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5 shadow-2xs`}>
                          {item.num}
                        </div>
                        <div className="leading-tight">
                          <div className="flex items-center gap-1.5">
                            <span className="text-stone-900 font-semibold">{item.q}</span>
                            {item.num === 2 && (
                              <span className="text-[9px] font-mono uppercase bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-bold">
                                Perfil Elegido
                              </span>
                            )}
                          </div>
                          <div className={`text-[11px] ${item.num === 2 ? 'text-stone-800 font-medium' : 'text-stone-600'} mt-0.5 leading-snug`}>
                            → {item.ans}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Column: Tres palabras clave */}
                <div className="md:col-span-7 space-y-3">
                  <h3 className="font-bold text-xs sm:text-sm text-stone-900">
                    Después, elegid tres palabras clave:
                  </h3>

                  <div className="border border-stone-200 rounded-xl overflow-hidden shadow-2xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#272262] text-white font-semibold">
                        <tr>
                          <th className="p-2.5 w-24">Tipo</th>
                          <th className="p-2.5">Qué significa</th>
                          <th className="p-2.5 text-amber-200">Ejemplo: Estudio Piel</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200 text-stone-700 bg-white">
                        <tr className="hover:bg-stone-50">
                          <td className="p-2.5 font-bold text-[#272262]">General</td>
                          <td className="p-2.5 text-[11px]">Describe el servicio de forma amplia</td>
                          <td className="p-2.5 font-bold text-stone-900 italic">
                            reparación de calzado y bolsos
                          </td>
                        </tr>
                        <tr className="hover:bg-stone-50">
                          <td className="p-2.5 font-bold text-[#272262]">Específica</td>
                          <td className="p-2.5 text-[11px]">Una necesidad concreta o intención definida</td>
                          <td className="p-2.5 font-bold text-amber-900 italic">
                            cambiar suela de zapatos en Retiro
                          </td>
                        </tr>
                        <tr className="hover:bg-amber-50/50">
                          <td className="p-2.5 font-bold text-[#272262]">Local</td>
                          <td className="p-2.5 text-[11px]">Incluye una ubicación o referencia geográfica</td>
                          <td className="p-2.5 font-bold text-emerald-900 italic">
                            zapatero cerca de mí <span className="font-normal text-[10px] text-stone-500 block">(Google usa ubicación del móvil)</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Debate Box */}
                  <div className="p-3.5 bg-[#e8eaf6] border border-[#c5cae9] rounded-2xl flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#3949ab] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                      ?
                    </div>
                    <div className="flex-1 text-xs text-stone-800">
                      <div className="font-bold text-[#1a237e] mb-0.5">
                        Debate: ¿cuál de las tres búsquedas indica más posibilidades de contratar? ¿Por qué?
                      </div>
                      <p className="text-stone-600 text-[11px] leading-relaxed">
                        <strong>Respuesta Estudio Piel:</strong> <em>«cambiar suela de zapatos en Retiro»</em> y <em>«zapatero cerca de mí»</em> indican la mayor posibilidad porque el cliente tiene una avería física que no puede posponer y busca desplazarse al taller de Calle Ibiza o concertar recogida en el distrito.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 2: PARTE 2 - TÍTULO SEO Y METADESCRIPCIÓN */}
        {/* ========================================================= */}
        {currentSlide === 1 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="Parte 2 · SEO Snippet"
              />

              <div className="text-center mb-4">
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold tracking-tight">
                  Parte 2: título SEO y metadescripción
                </h2>
                <p className="text-xs text-stone-600 mt-0.5">
                  Imaginad que el negocio tiene web y queréis mejorar cómo aparece en Google. Caso: Estudio Piel
                </p>
              </div>

              {/* SERP Preview */}
              <div className="max-w-2xl mx-auto p-4 bg-white border border-stone-200 rounded-2xl shadow-xs space-y-1 mb-5">
                <div className="text-[11px] text-stone-400 font-mono">
                  https://estudiopiel-retiro.es › zapatero-en-retiro
                </div>
                <h3 className="text-blue-700 text-lg sm:text-xl font-medium hover:underline cursor-pointer leading-snug">
                  {businessData.seoTitle}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {businessData.seoDescription}
                </p>
                <div className="pt-1 flex items-center justify-between text-[10px] text-stone-400 font-mono">
                  <span>Título optimizado para Google</span>
                  <span>Metadescripción con llamada a la acción</span>
                </div>
              </div>

              {/* Cards A & B */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
                <div className="p-5 bg-[#ede7f6] border border-[#d1c4e9] rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#512da8] text-white flex items-center justify-center font-bold text-xs">
                      A
                    </div>
                    <h4 className="font-bold text-[#311b92] text-sm">
                      A. Título SEO
                    </h4>
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Qué ofrece el negocio y, cuando tenga sentido, dónde. Claro, específico y natural, sin repetir keywords.
                  </p>
                  <div className="p-3 bg-white rounded-xl border border-purple-200 font-serif font-bold text-stone-900 text-xs">
                    «Zapatero en Retiro, Madrid | Reparación de calzado y bolsos»
                  </div>
                </div>

                <div className="p-5 bg-[#fff3e0] border border-[#ffe0b2] rounded-2xl space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-[#f57c00] text-white flex items-center justify-center font-bold text-xs">
                      B
                    </div>
                    <h4 className="font-bold text-[#e65100] text-sm">
                      B. Metadescripción
                    </h4>
                  </div>
                  <ul className="text-xs text-stone-700 space-y-1 list-disc list-inside">
                    <li><strong>¿Qué servicio ofrecéis?</strong> Cambiamos suelas y tacones y reparamos calzado y bolsos.</li>
                    <li><strong>¿En qué zona trabajáis?</strong> En Retiro, Madrid.</li>
                    <li><strong>¿Qué debe hacer el cliente?</strong> Presupuesto sin compromiso, llámanos hoy.</li>
                  </ul>
                  <div className="p-2.5 bg-white rounded-xl border border-amber-200 text-stone-800 text-[11px] leading-relaxed">
                    «Zapatero en Retiro, Madrid. Cambiamos suelas y tacones y reparamos tu calzado de piel y bolsos. Presupuesto sin compromiso, llámanos hoy.»
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 3: PARTE 3 - DISEÑAD LA FICHA DE GOOGLE (COMPLETA) */}
        {/* ========================================================= */}
        {currentSlide === 2 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="Parte 3 · Propuesta Completa"
              />

              <div className="text-center mb-4">
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold tracking-tight">
                  Parte 3: diseñad la ficha de Google
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-0.5">
                  Propuesta completa de ficha de Google Business Profile para <strong>Estudio Piel</strong>. Todos los apartados detallados:
                </p>
              </div>

              {/* Complete, Detailed 8-Card Grid with Full Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-6xl mx-auto text-xs">
                {/* 1. Nombre */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          1
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Nombre del negocio</span>
                      </div>
                      <span className="text-base">🏬</span>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «Inventad un nombre realista»
                    </div>
                    <div className="font-serif text-base font-bold text-[#272262]">
                      Estudio Piel
                    </div>
                    <p className="text-[11px] text-stone-700 mt-1 leading-snug">
                      Taller artesanal de calzado y marroquinería en Calle de Ibiza, 34 (Retiro). Nombre limpio, conforme a las directrices antibloqueo de Google.
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(businessData.name, 's3-p1')}
                    className="self-end text-[10px] text-[#512da8] hover:underline font-mono"
                  >
                    {copiedText === 's3-p1' ? '¡Copiado!' : 'Copiar nombre'}
                  </button>
                </div>

                {/* 2. Categoría */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          2
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Categoría principal</span>
                      </div>
                      <span className="text-base">🏷️</span>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «La que mejor describe la actividad»
                    </div>
                    <div className="font-serif text-base font-bold text-[#272262]">
                      {businessData.category.primary}
                    </div>
                    <div className="text-[11px] text-stone-700 mt-1 leading-snug">
                      <strong>Categoría adicional:</strong> {businessData.category.additional[0]}. Activan la aparición en el Google Local 3-Pack de Retiro.
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(businessData.category.primary, 's3-p2')}
                    className="self-end text-[10px] text-[#512da8] hover:underline font-mono"
                  >
                    {copiedText === 's3-p2' ? '¡Copiado!' : 'Copiar categoría'}
                  </button>
                </div>

                {/* 3. Descripción (Spans 2 columns on desktop for full readability) */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 md:col-span-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          3
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Descripción oficial</span>
                      </div>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «Qué hacéis, dónde y para quién»
                    </div>
                    <p className="text-[11px] text-stone-800 leading-relaxed bg-white/80 p-2.5 rounded-xl border border-purple-200/60 font-sans">
                      «{businessData.description}»
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-stone-500">
                      Incluye Retiro, suelas, tacones, bolsos y plazo 24-48h.
                    </span>
                    <button
                      onClick={() => handleCopy(businessData.description, 's3-p3')}
                      className="text-[10px] text-[#512da8] hover:underline font-mono"
                    >
                      {copiedText === 's3-p3' ? '¡Copiado!' : 'Copiar descripción'}
                    </button>
                  </div>
                </div>

                {/* 4. Zona de actuación */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          4
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Zona de actuación</span>
                      </div>
                      <span className="text-base">📍</span>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «Si es a domicilio, la zona de servicio»
                    </div>
                    <div className="font-bold text-stone-900 text-xs">
                      Taller en Retiro (Calle Ibiza, 34)
                    </div>
                    <p className="text-[11px] text-stone-700 mt-1 leading-snug">
                      Clientes de Madrid capital. Recogida y entrega a domicilio opcional en el distrito Retiro (Ibiza, Jerónimos, Niño Jesús, Pacífico, Estrella, Adelfas).
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopy(businessData.serviceArea.details, 's3-p4')}
                    className="self-end text-[10px] text-[#512da8] hover:underline font-mono"
                  >
                    {copiedText === 's3-p4' ? '¡Copiado!' : 'Copiar zona'}
                  </button>
                </div>

                {/* 5. Fotografías */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          5
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Fotografías elegantes</span>
                      </div>
                      <span className="text-base">📷</span>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «Qué fotos reales publicaríais»
                    </div>
                    <ul className="text-[11px] text-stone-700 space-y-1 list-disc list-inside">
                      <li>Fachada y entrada del local</li>
                      <li>Interior del taller con hormas</li>
                      <li>El zapatero trabajando</li>
                      <li><strong>Antes y después de suelas</strong></li>
                      <li>Mostrador con el equipo y bolsos</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setCurrentSlide(7)}
                    className="self-end text-[10px] text-[#512da8] hover:underline font-mono"
                  >
                    Ver fotos →
                  </button>
                </div>

                {/* 6. Contacto y horarios */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          6
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Contacto y horarios</span>
                      </div>
                      <span className="text-base">📞</span>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «Teléfono, web, horario de atención»
                    </div>
                    <div className="text-[11px] text-stone-800 space-y-0.5">
                      <div><strong>Tel:</strong> {businessData.contact.phone}</div>
                      <div><strong>WA:</strong> {businessData.contact.whatsapp}</div>
                      <div><strong>Web:</strong> Formulario de presupuesto</div>
                    </div>
                    <div className="text-[10px] text-stone-600 mt-1 font-mono">
                      L-V 10-14h y 17-20:30h · Sáb 10-14h
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(`${businessData.contact.phone} | ${businessData.hours.weekdays}`, 's3-p6')}
                    className="self-end text-[10px] text-[#512da8] hover:underline font-mono"
                  >
                    {copiedText === 's3-p6' ? '¡Copiado!' : 'Copiar contacto'}
                  </button>
                </div>

                {/* 7. Reseñas auténticas */}
                <div className="p-3.5 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-2 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-[#f59e0b] text-white flex items-center justify-center font-bold text-[10px]">
                          7
                        </div>
                        <span className="font-bold text-stone-900 text-xs">Reseñas auténticas</span>
                      </div>
                      <span className="text-base">⭐</span>
                    </div>
                    <div className="text-[10px] text-stone-500 italic mb-1.5">
                      «Cómo las conseguiríais»
                    </div>
                    <ul className="text-[11px] text-stone-700 space-y-1">
                      <li>• <strong>QR en mostrador:</strong> acceso directo</li>
                      <li>• <strong>Petición verbal:</strong> al entregar en mano</li>
                      <li>• <strong>WhatsApp 24h:</strong> enlace al día siguiente</li>
                      <li>• <strong>Respuestas:</strong> 100% (incluidas negativas)</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setCurrentSlide(9)}
                    className="self-end text-[10px] text-[#512da8] hover:underline font-mono"
                  >
                    Ver protocolo →
                  </button>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 4: 1. NOMBRE DEL NEGOCIO */}
        {/* ========================================================= */}
        {currentSlide === 3 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="1. Identidad del Negocio"
              />

              <div className="mb-4">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Punto 1 del requerimiento
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  1. Nombre del Negocio: Estudio Piel
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="p-8 bg-stone-900 text-white rounded-3xl space-y-3 text-center md:text-left">
                  <span className="text-xs text-amber-400 font-mono tracking-wider uppercase block">
                    Nombre comercial registrado
                  </span>
                  <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
                    Estudio Piel
                  </h1>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    Elegante, breve y memorable. Refleja la maestría artesana en calzado y artículos de cuero sin recargar artificialmente palabras clave.
                  </p>
                </div>

                <div className="space-y-3 text-xs text-stone-700">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl">
                    <strong className="text-emerald-900 block font-semibold mb-1">
                      ✓ Cumplimiento estricto con las políticas de Google
                    </strong>
                    Google suspende fichas que añaden apellidos artificiales («Estudio Piel - Reparación Zapatos Retiro»). El nombre legal es «Estudio Piel»; las keywords se posicionan mediante la categoría y la descripción.
                  </div>
                  <div className="p-4 bg-stone-50 border border-stone-200 rounded-2xl">
                    <strong className="text-stone-900 block font-semibold mb-1">
                      Coherencia con el local físico en Calle de Ibiza, 34
                    </strong>
                    Coincide exactamente con el rótulo de la tienda, lo que garantiza una verificación inmediata por parte del soporte de Google.
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 5: 2. CATEGORÍA PRINCIPAL */}
        {/* ========================================================= */}
        {currentSlide === 4 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="2. Categorización"
              />

              <div className="mb-4">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Punto 2 del requerimiento
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  2. Categoría Principal y Adicional
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-stone-50 rounded-3xl border-2 border-[#272262] space-y-3">
                  <div className="text-xs font-mono uppercase text-[#272262] font-bold">
                    Categoría Principal
                  </div>
                  <div className="font-serif text-3xl font-bold text-stone-900">
                    Zapatero
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Es la categoría que mejor describe la actividad. Activa la visibilidad en Google Maps para: <em>«zapatero cerca de mí»</em>, <em>«zapatero en Retiro»</em> y <em>«cambiar suela de zapatos»</em>.
                  </p>
                </div>

                <div className="p-6 bg-[#ede7f6] rounded-3xl border border-[#d1c4e9] space-y-3">
                  <div className="text-xs font-mono uppercase text-[#512da8] font-bold">
                    Categoría Adicional Recomendada
                  </div>
                  <div className="font-serif text-2xl font-bold text-[#311b92]">
                    Servicio de reparación de bolsos y artículos de piel
                  </div>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    Permite captar clientes que necesitan reparar asas descosidas, cambio de cremalleras, forros o teñido de bolsos de cuero en el barrio de Retiro.
                  </p>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 6: 3. DESCRIPCIÓN */}
        {/* ========================================================= */}
        {currentSlide === 5 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="3. Redacción Oficial"
              />

              <div className="mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Punto 3 del requerimiento
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  3. Descripción de la Ficha
                </h2>
                <span className="text-xs text-stone-500 font-mono">
                  Texto directo, optimizado para conversión y SEO local en Retiro
                </span>
              </div>

              <div className="p-6 bg-[#ede7f6]/60 border border-[#d1c4e9] rounded-3xl space-y-4">
                <p className="font-serif text-base sm:text-lg text-stone-900 leading-relaxed bg-white p-4 rounded-2xl border border-purple-200">
                  «{businessData.description}»
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                    <span className="font-mono text-[10px] text-stone-400 block uppercase">¿Qué hacéis?</span>
                    <span className="font-semibold text-stone-800">Suelas, tacones, bolsos</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                    <span className="font-mono text-[10px] text-stone-400 block uppercase">¿Dónde?</span>
                    <span className="font-semibold text-stone-800">Retiro, Madrid</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                    <span className="font-mono text-[10px] text-stone-400 block uppercase">¿Para quién?</span>
                    <span className="font-semibold text-stone-800">Vecinos y trabajadores</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-stone-200">
                    <span className="font-mono text-[10px] text-stone-400 block uppercase">Rapidez</span>
                    <span className="font-semibold text-stone-800">24 a 48 horas</span>
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 7: 4. ZONA DE ACTUACIÓN */}
        {/* ========================================================= */}
        {currentSlide === 6 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="4. Cobertura Geográfica"
              />

              <div className="mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Punto 4 del requerimiento
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  4. Zona de Actuación
                </h2>
              </div>

              <div className="p-6 bg-stone-50 rounded-3xl border border-stone-200 space-y-4">
                <p className="text-sm font-semibold text-stone-800">
                  «{businessData.serviceArea.details}»
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-amber-900 block font-serif">Taller con local en Retiro</span>
                    <p className="text-stone-600 text-[11px]">
                      Calle de Ibiza, 34. Atención presencial, diagnóstico de suela y presupuesto inmediato.
                    </p>
                  </div>

                  <div className="p-4 bg-white rounded-2xl border border-stone-200 space-y-1">
                    <span className="text-xs font-bold text-[#272262] block font-serif">Clientes de Madrid capital</span>
                    <p className="text-stone-600 text-[11px]">
                      Servicio para clientes de cualquier zona de Madrid que buscan acabado de cerco Goodyear y piel noble.
                    </p>
                  </div>

                  <div className="p-4 bg-[#ede7f6] rounded-2xl border border-[#d1c4e9] space-y-1">
                    <span className="text-xs font-bold text-[#512da8] block font-serif">Recogida y entrega opcional</span>
                    <p className="text-stone-700 text-[11px]">
                      Servicio a domicilio en los 6 barrios de Retiro: Ibiza, Jerónimos, Niño Jesús, Pacífico, Estrella y Adelfas.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 8: 5. FOTOGRAFÍAS ELEGANTES (CON ANTES Y DESPUÉS REAL Y PIE DE FOTO) */}
        {/* ========================================================= */}
        {currentSlide === 7 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="5. Activos Visuales"
              />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                    Punto 5 del requerimiento
                  </span>
                  <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                    5. Fotografías Elegantes de la Zapatería
                  </h2>
                </div>

                {/* Photo Selector Buttons */}
                <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-xl text-xs">
                  {businessData.photos.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                        activePhotoIndex === idx
                          ? 'bg-stone-900 text-white shadow-xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      Foto #{idx + 1}: {p.tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* SPECIAL SPOTLIGHT: IF "ANTES Y DESPUÉS" IS SELECTED */}
              {activePhotoIndex === 3 ? (
                /* Clear Side-by-Side BEFORE & AFTER */
                <div className="p-5 bg-stone-900 text-white rounded-3xl space-y-4 shadow-xl border border-stone-800">
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-stone-800">
                    <div>
                      <span className="text-xs text-amber-300 font-mono uppercase tracking-wider block">
                        Fotografía #4 Requerida · Comparativa Real
                      </span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                        Antes y Después: Suelas y Tacones de Calzado de Piel
                      </h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-md border border-emerald-800">
                        Entrega en 24 a 48 horas
                      </span>
                    </div>
                  </div>

                  {/* Side-by-Side Visual Inspection Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* ANTES */}
                    <div className="bg-stone-950 p-4 rounded-2xl border border-rose-900/50 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-rose-600 text-white font-bold text-xs tracking-wide">
                            🛑 ANTES (Calzado desgastado)
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono">Calzado entregado en taller</span>
                        </div>
                        <div className="relative h-56 rounded-xl overflow-hidden bg-stone-800 border border-rose-900/40">
                          <ImageWithFallback
                            src={getEffectivePhoto(businessData.photos[3]).beforeUrl}
                            alt="Antes: suela desgastada"
                            className="w-full h-full object-cover filter brightness-90 contrast-95"
                            fallbackTitle="Antes: Suela gastada"
                          />
                        </div>
                      </div>

                      {/* Official Caption Box for ANTES */}
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-amber-300 font-bold uppercase">
                            Pie de foto oficial (Antes):
                          </span>
                          <button
                            onClick={() => handleCopy(photoCaptions.antes, 'copy-caption-antes')}
                            className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 font-mono"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedText === 'copy-caption-antes' ? '¡Copiado!' : 'Copiar'}
                          </button>
                        </div>
                        <p className="text-xs text-stone-200 leading-relaxed font-sans">
                          {photoCaptions.antes}
                        </p>
                      </div>
                    </div>

                    {/* DESPUÉS */}
                    <div className="bg-stone-950 p-4 rounded-2xl border border-emerald-900/50 space-y-3 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-xs tracking-wide">
                            ✅ DESPUÉS (Calzado restaurado)
                          </span>
                          <span className="text-[11px] text-stone-400 font-mono">Terminado en 24-48h</span>
                        </div>
                        <div className="relative h-56 rounded-xl overflow-hidden bg-stone-800 border border-emerald-900/40">
                          <ImageWithFallback
                            src={getEffectivePhoto(businessData.photos[3]).url}
                            alt="Después: suela nueva Vibram y tacón"
                            className="w-full h-full object-cover"
                            fallbackTitle="Después: Suela nueva Vibram"
                          />
                        </div>
                      </div>

                      {/* Official Caption Box for DESPUÉS */}
                      <div className="p-3 bg-stone-900/90 rounded-xl border border-stone-800 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono text-emerald-300 font-bold uppercase">
                            Pie de foto oficial (Después):
                          </span>
                          <button
                            onClick={() => handleCopy(photoCaptions.despues, 'copy-caption-despues')}
                            className="text-[11px] text-stone-400 hover:text-white flex items-center gap-1 font-mono"
                          >
                            <Copy className="w-3 h-3" />
                            {copiedText === 'copy-caption-despues' ? '¡Copiado!' : 'Copiar'}
                          </button>
                        </div>
                        <p className="text-xs text-stone-200 leading-relaxed font-sans">
                          {photoCaptions.despues}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Footer note */}
                  <div className="pt-2 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
                    <span>
                      ✓ Esta fotografía comparativa es la que genera más conversiones hacia <em>«Cómo llegar»</em> y <em>«Pedir presupuesto»</em> en Google Business Profile.
                    </span>
                    <button
                      onClick={() => setActivePhotoIndex(0)}
                      className="text-amber-300 hover:underline text-xs"
                    >
                      Ver las otras fotografías →
                    </button>
                  </div>
                </div>
              ) : (
                /* Clean Showcase for Single Photo */
                (() => {
                  const currentPhoto = businessData.photos[activePhotoIndex];
                  const eff = getEffectivePhoto(currentPhoto);
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 p-5 bg-white rounded-3xl border border-stone-200 shadow-sm">
                      {/* Left: Clean Full Image */}
                      <div className="md:col-span-7 flex flex-col gap-2">
                        <div className="h-72 sm:h-80 rounded-2xl overflow-hidden bg-stone-900 shadow-md relative border border-stone-200">
                          <ImageWithFallback
                            src={eff.url}
                            alt={currentPhoto.title}
                            className="w-full h-full object-cover"
                            fallbackTitle={currentPhoto.title}
                            fallbackSubtitle={photoCaptions[currentPhoto.id] || currentPhoto.description}
                          />
                          <div className="absolute top-3 left-3 bg-black/75 text-white text-xs font-mono px-2.5 py-1 rounded-md z-10">
                            Foto #{activePhotoIndex + 1} de 5
                          </div>
                          <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs z-10">
                            {currentPhoto.tag}
                          </div>
                        </div>
                      </div>

                      {/* Right: Clean Editorial Details & Official Caption */}
                      <div className="md:col-span-5 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <span className="text-[11px] font-mono text-amber-800 font-bold uppercase tracking-wider block">
                            {currentPhoto.badge}
                          </span>
                          <h3 className="font-serif text-2xl font-bold text-stone-900 leading-tight">
                            {currentPhoto.title}
                          </h3>

                          {/* Official Caption Card */}
                          <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200 space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-stone-900">
                                Pie de foto oficial para Google Business Profile:
                              </span>
                              <button
                                onClick={() => handleCopy(photoCaptions[currentPhoto.id], `copy-${activePhotoIndex}`)}
                                className="text-xs text-stone-600 hover:text-stone-900 flex items-center gap-1 font-mono"
                              >
                                <Copy className="w-3.5 h-3.5" />
                                {copiedText === `copy-${activePhotoIndex}` ? '¡Copiado!' : 'Copiar'}
                              </button>
                            </div>
                            <p className="text-xs text-stone-700 leading-relaxed font-sans">
                              {photoCaptions[currentPhoto.id] || currentPhoto.description}
                            </p>
                          </div>

                          <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/70 space-y-1 text-xs">
                            <div className="text-stone-700">
                              <span className="font-semibold text-stone-900">Categoría en Google:</span> {currentPhoto.category}
                            </div>
                            <div className="text-stone-700">
                              <span className="font-semibold text-stone-900">Calidad técnica:</span> Alta resolución (4:3) · Fotografía artesanal
                            </div>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-stone-200 text-xs text-stone-500 flex items-center justify-between">
                          <span>Estudio Piel · Retiro, Madrid</span>
                          <span className="font-mono text-[11px] text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded">
                            Foto {activePhotoIndex + 1} de 5
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {/* Thumbnails of all 5 Photos */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {businessData.photos.map((p, idx) => {
                  const eff = getEffectivePhoto(p);
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`p-1.5 rounded-xl border text-left transition-all relative ${
                        activePhotoIndex === idx
                          ? 'border-stone-900 ring-2 ring-stone-900 bg-stone-100'
                          : 'border-stone-200 bg-white hover:bg-stone-50'
                      }`}
                    >
                      <div className="h-12 rounded-lg overflow-hidden bg-stone-200 mb-1 relative">
                        <ImageWithFallback
                          src={eff.url}
                          alt={p.title}
                          className="w-full h-full object-cover"
                          fallbackTitle={p.title}
                        />
                      </div>
                      <div className="text-[10px] font-semibold text-stone-900 truncate">
                        #{idx + 1}. {p.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 9: 6. CONTACTO Y HORARIOS */}
        {/* ========================================================= */}
        {currentSlide === 8 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="6. Atención al Cliente"
              />

              <div className="mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Punto 6 del requerimiento
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  6. Contacto y Horarios de Atención
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <h4 className="font-bold text-stone-900 text-sm">Canales de Contacto Directo</h4>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase text-stone-400 block font-mono">Teléfono Fijo</span>
                    <span className="font-mono font-bold text-stone-900 text-sm">{businessData.contact.phone}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase text-stone-400 block font-mono">WhatsApp Presupuestos</span>
                    <span className="font-mono font-bold text-emerald-700 text-sm">{businessData.contact.whatsapp}</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <span className="text-[10px] uppercase text-stone-400 block font-mono">Web Oficial</span>
                    <span className="font-semibold text-stone-800">Con formulario de presupuesto sin compromiso</span>
                  </div>
                </div>

                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-200 space-y-3 text-xs">
                  <h4 className="font-bold text-stone-900 text-sm">Horario de Atención</h4>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="font-bold text-stone-900">Lunes a Viernes</div>
                    <div className="font-mono text-stone-700">10:00 a 14:00 y de 17:00 a 20:30</div>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-stone-200">
                    <div className="font-bold text-stone-900">Sábados</div>
                    <div className="font-mono text-stone-700">10:00 a 14:00</div>
                  </div>
                  <div className="p-2 bg-stone-100 rounded-xl text-stone-500 font-mono text-[11px] flex justify-between">
                    <span>Domingos:</span>
                    <span>Cerrado</span>
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 10: 7. RESEÑAS AUTÉNTICAS (Incluye Negativas) */}
        {/* ========================================================= */}
        {currentSlide === 9 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="7. Reputación Online"
              />

              <div className="mb-2">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Punto 7 del requerimiento
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  7. Reseñas Auténticas (Valoración 5★)
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs mb-3">
                <div className="p-3 bg-[#ede7f6] rounded-xl border border-[#d1c4e9] space-y-0.5">
                  <span className="font-bold text-[#311b92] block">1. QR Mostrador</span>
                  <p className="text-[10px] text-stone-600">Peana física que lleva directo a la ficha.</p>
                </div>
                <div className="p-3 bg-[#ede7f6] rounded-xl border border-[#d1c4e9] space-y-0.5">
                  <span className="font-bold text-[#311b92] block">2. Petición Verbal</span>
                  <p className="text-[10px] text-stone-600">Al entregar el calzado en mano al cliente.</p>
                </div>
                <div className="p-3 bg-[#ede7f6] rounded-xl border border-[#d1c4e9] space-y-0.5">
                  <span className="font-bold text-[#311b92] block">3. WhatsApp 24h</span>
                  <p className="text-[10px] text-stone-600">Mensaje con enlace al día siguiente.</p>
                </div>
                <div className="p-3 bg-purple-100/70 rounded-xl border border-purple-300 space-y-0.5">
                  <span className="font-bold text-[#272262] block">4. Respuesta a Todo</span>
                  <p className="text-[10px] text-stone-700">Incluyendo respuesta a reseñas negativas.</p>
                </div>
              </div>

              {/* Both Reviews Displayed Simultaneously: Positive 5★ and Negative 2★ Response Protocol */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-xs">
                {/* 1. Reseña Positiva 5★ */}
                <div className="p-3.5 bg-emerald-50/80 border border-emerald-200/90 rounded-2xl space-y-2 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-emerald-200/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                        <span className="font-bold text-emerald-950 text-xs">1. Reseña Positiva (5★)</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <span>★★★★★</span>
                        <span className="text-stone-500 text-[10px] font-mono font-normal">5.0</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-600 font-mono">
                      Carlos Méndez · <span className="text-emerald-800 font-semibold">Vecino de Retiro (Madrid)</span>
                    </div>
                    <p className="italic text-stone-800 text-[11px] leading-relaxed bg-white/80 p-2.5 rounded-xl border border-emerald-100 font-sans">
                      «Llevé unos zapatos Goodyear ingleses que tenían la suela destrozada para ver si tenían arreglo. El resultado de Estudio Piel es impecable, parece calzado recién salido de fábrica y en apenas 36 horas. Además el trato en la tienda de Ibiza fue exquisito. Mi zapatero de confianza en Retiro a partir de ahora.»
                    </p>
                  </div>

                  <div className="pt-2 pl-2.5 border-l-2 border-emerald-600 bg-white p-2.5 rounded-r-xl shadow-2xs space-y-1 mt-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-stone-900 text-[11px] flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                        Respuesta Oficial de Estudio Piel:
                      </strong>
                      <span className="text-[9px] text-emerald-800 font-mono bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        En 2 horas
                      </span>
                    </div>
                    <p className="text-stone-700 text-[10.5px] leading-relaxed">
                      «Muchas gracias, Carlos. Ha sido un auténtico placer trabajar sobre unos zapatos con tan buena construcción de cerco. En Estudio Piel mimamos cada par con materiales de primera para alargar su vida útil muchos años más. ¡Disfrútalos y estamos a tu disposición en Retiro cuando lo necesites!»
                    </p>
                  </div>
                </div>

                {/* 2. Reseña Negativa 2★ (Protocolo de Gestión y Fidelización) */}
                <div className="p-3.5 bg-rose-50/70 border border-rose-200/90 rounded-2xl space-y-2 shadow-2xs flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between pb-1 border-b border-rose-200/60">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-600"></span>
                        <span className="font-bold text-rose-950 text-xs">2. Reseña Negativa (2★) - Gestión</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <span>★★☆☆☆</span>
                        <span className="text-stone-500 text-[10px] font-mono font-normal">2.0</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-600 font-mono">
                      Javier G. · <span className="text-rose-800 font-semibold">Cliente taller Retiro</span>
                    </div>
                    <p className="italic text-stone-800 text-[11px] leading-relaxed bg-white/80 p-2.5 rounded-xl border border-rose-100 font-sans">
                      «El cambio de suela quedó bien pero tardaron casi 3 días en vez de 24h porque tuvieron que pedir una goma especial Vibram.»
                    </p>
                  </div>

                  <div className="pt-2 pl-2.5 border-l-2 border-amber-600 bg-white p-2.5 rounded-r-xl shadow-2xs space-y-1 mt-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-stone-900 text-[11px] flex items-center gap-1 font-bold">
                        <ShieldCheck className="w-3 h-3 text-amber-600 inline" />
                        Respuesta Oficial (Protocolo antibloqueo y fidelización):
                      </strong>
                      <span className="text-[9px] text-amber-800 font-mono bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
                        Explicación técnica
                      </span>
                    </div>
                    <p className="text-stone-700 text-[10.5px] leading-relaxed">
                      «Hola Javier. Lamentamos la demora. Para tu pisada optamos por esperar el compuesto técnico Vibram específico en lugar de montar un material genérico. No obstante, debimos habértelo avisado por WhatsApp. Tomamos nota directa para mejorar y te esperamos en el taller con un descuento en tu próximo servicio. Saludos del equipo de Estudio Piel.»
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}

        {/* ========================================================= */}
        {/* SLIDE 11: FICHA GOOGLE FINAL */}
        {/* ========================================================= */}
        {currentSlide === 10 && (
          <div className="space-y-4 animate-fadeIn flex-1 flex flex-col justify-between">
            <div>
              <CleanSlideHeader
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                categoryTitle="Resultado Final"
              />

              <div className="mb-3">
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block font-mono">
                  Consolidación de la Ficha
                </span>
                <h2 className="text-[#272262] font-sans text-2xl sm:text-3xl font-bold">
                  Ficha de Google Business Profile: Estudio Piel
                </h2>
              </div>

              <div className="p-6 bg-gradient-to-br from-[#272262] via-[#1a1744] to-stone-950 text-white rounded-3xl shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs text-[#fbc02d] font-mono uppercase tracking-wider">
                      Google Maps & Local Search · Retiro, Madrid
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white">
                      Estudio Piel · Zapatero en Retiro
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-stone-300 mt-1">
                      <span className="text-amber-400 font-bold">4.9 ★★★★★</span>
                      <span>(127 reseñas)</span>
                      <span>·</span>
                      <span>Calle de Ibiza, 34</span>
                    </div>
                  </div>

                  <button
                    onClick={onGoToFullInteractiveView}
                    className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 shrink-0"
                  >
                    <span>Abrir Ficha Interactiva Completa</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-stone-300">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-mono">KEYWORDS</span>
                    <span className="font-semibold text-white">Retiro, suelas, cerca de mí</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-mono">RAPIDEZ</span>
                    <span className="font-semibold text-white">24 a 48 horas</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-mono">SERVICIOS</span>
                    <span className="font-semibold text-white">Suelas, tacones, bolsos</span>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <span className="text-[10px] text-stone-400 block font-mono">CANALES</span>
                    <span className="font-semibold text-white">Tel, WhatsApp, Web, QR</span>
                  </div>
                </div>

                {/* Visual Showcase: Fotos de Calzado Elegante en la Ficha Google */}
                <div className="pt-2 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-300">
                    <span className="font-mono uppercase text-[#fbc02d] text-[10px] tracking-wider">
                      Galería de Fotos de Calzado Elegante vinculada a Google Maps:
                    </span>
                    <span className="text-[10px] text-stone-400">
                      Zapatos de piel · Suelas Vibram · Oficio artesanal
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2.5">
                    <div
                      className="h-24 rounded-xl overflow-hidden relative group border border-white/10"
                    >
                      <ImageWithFallback
                        src={customPhotos['featured-shoe']?.url || businessData.featuredShoePhoto}
                        alt="Zapatos elegantes Oxford de piel"
                        className="w-full h-full object-cover"
                        fallbackTitle="Zapatos elegantes de piel"
                      />
                      <span className="absolute bottom-1 left-1.5 bg-black/75 text-amber-300 text-[9px] font-mono px-1.5 py-0.2 rounded">
                        👞 Zapatos elegantes de piel
                      </span>
                    </div>

                    <div
                      className="h-24 rounded-xl overflow-hidden relative group border border-white/10"
                    >
                      <ImageWithFallback
                        src={getEffectivePhoto(businessData.photos[3]).url}
                        alt="Suela técnica Vibram nueva"
                        className="w-full h-full object-cover"
                        fallbackTitle="Suela Vibram nueva"
                      />
                      <span className="absolute bottom-1 left-1.5 bg-black/75 text-emerald-300 text-[9px] font-mono px-1.5 py-0.2 rounded">
                        🔄 Suela Vibram terminada
                      </span>
                    </div>

                    <div
                      className="h-24 rounded-xl overflow-hidden relative group border border-white/10"
                    >
                      <ImageWithFallback
                        src={getEffectivePhoto(businessData.photos[2]).url}
                        alt="Artesano en plena faena"
                        className="w-full h-full object-cover"
                        fallbackTitle="Maestro artesano"
                      />
                      <span className="absolute bottom-1 left-1.5 bg-black/75 text-white text-[9px] font-mono px-1.5 py-0.2 rounded">
                        🔨 Cosido artesano de cerco
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <CleanSlideFooter
              currentSlide={currentSlide}
              totalSlides={totalSlides}
              slideLabel={slideIndexLabels[currentSlide]}
              onPrev={prevSlide}
              onNext={nextSlide}
              onGoToSlide={setCurrentSlide}
            />
          </div>
        )}
      </div>

      {/* Slide Navigation Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-11 gap-1.5 pt-1">
        {slideIndexLabels.map((label, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`p-2 rounded-xl border text-left transition-all ${
              currentSlide === idx
                ? 'border-stone-900 bg-stone-900 text-white shadow-xs font-semibold'
                : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
            }`}
          >
            <div className="text-[9px] font-mono opacity-75">Slide {idx + 1}</div>
            <div className="text-[10px] truncate leading-tight font-sans">
              {label}
            </div>
          </button>
        ))}
      </div>

      {/* INTERACTIVE PHOTO EDIT MODAL */}
      {photoModalTarget && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-xs z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-xl w-full p-5 sm:p-6 shadow-2xl border border-stone-200 flex flex-col max-h-[92vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-stone-200">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-800 flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold block">
                    {photoModalTarget.isBefore ? 'Foto del ANTES (Desgastado)' : photoModalTarget.id === 'zapatero' ? 'Foto del Maestro Artesano' : photoModalTarget.id === 'antes-despues' ? 'Foto del DESPUÉS (Restaurado)' : 'Cambiar Fotografía'}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight">
                    {photoModalTarget.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setPhotoModalTarget(null)}
                className="p-1.5 rounded-full hover:bg-stone-100 text-stone-500 hover:text-stone-900 transition-colors"
                title="Cerrar ventana"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Preview Banner */}
            <div className="my-3 p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3">
              <div className="w-20 h-16 rounded-xl overflow-hidden bg-stone-900 shrink-0 border border-stone-300">
                <img
                  src={photoModalTarget.currentUrl || photoModalTarget.defaultUrl}
                  alt="Foto actual"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                  <span>Foto actualmente activa</span>
                  <span className="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-mono text-[9px] font-bold">
                    En pantalla
                  </span>
                </div>
                <div className="text-[11px] text-stone-500 truncate">
                  {photoModalTarget.isBefore
                    ? 'Calzado desgastado antes de la intervención artesanal'
                    : photoModalTarget.id === 'zapatero'
                    ? 'El zapatero en su banco cosiendo a mano el calzado'
                    : photoModalTarget.id === 'antes-despues'
                    ? 'Calzado restaurado con nueva suela Vibram y tacón biselado'
                    : 'Fotografía para la ficha de Google Business'}
                </div>
              </div>
            </div>

            {/* Notification Alert */}
            {uploadSuccessAlert && (
              <div className="mb-3 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-xs font-semibold flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{uploadSuccessAlert}</span>
              </div>
            )}

            {/* Tabs */}
            <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl text-xs mb-3">
              <button
                onClick={() => setPhotoModalTab('upload')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  photoModalTab === 'upload'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>1. Subir archivo (PC)</span>
              </button>
              <button
                onClick={() => setPhotoModalTab('alternatives')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  photoModalTab === 'alternatives'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>2. Fotos de muestra</span>
              </button>
              <button
                onClick={() => setPhotoModalTab('url')}
                className={`flex-1 py-1.5 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                  photoModalTab === 'url'
                    ? 'bg-stone-900 text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <LinkIcon className="w-3.5 h-3.5" />
                <span>3. Pegar URL web</span>
              </button>
            </div>

            {/* Tab Body */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {photoModalTab === 'upload' && (
                <div className="space-y-3">
                  <div
                    onClick={() => directFileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-300 hover:border-amber-600 bg-stone-50 hover:bg-amber-50/40 rounded-2xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-stone-200 group-hover:bg-amber-200/60 flex items-center justify-center text-stone-700 transition-colors">
                      <Upload className="w-6 h-6 text-amber-800" />
                    </div>
                    <div className="font-bold text-stone-900 text-sm">
                      Haz clic aquí para seleccionar una foto de tu ordenador
                    </div>
                    <p className="text-xs text-stone-500 max-w-sm">
                      Sube cualquier archivo JPG o PNG. Se comprime al instante para garantizar un renderizado nítido y fluido sin superar los límites del navegador.
                    </p>
                    <button
                      type="button"
                      className="mt-1 px-4 py-2 bg-stone-900 group-hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors"
                    >
                      Explorar archivos...
                    </button>
                    <input
                      ref={directFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        const f = e.target.files?.[0];
                        if (f && photoModalTarget) {
                          await handleUploadPhoto(photoModalTarget.id, f, photoModalTarget.isBefore);
                          e.target.value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              )}

              {photoModalTab === 'alternatives' && (
                <div className="space-y-2">
                  <span className="text-xs text-stone-600 block">
                    Haz clic en cualquiera de estas opciones fotográficas de alta calidad para aplicarla de inmediato:
                  </span>
                  <div className="grid grid-cols-2 gap-2.5">
                    {photoModalTarget.alternatives.map((alt, idx) => {
                      const targetUrl = photoModalTarget.isBefore ? (alt.beforeUrl || alt.url) : alt.url;
                      const isSelected = photoModalTarget.currentUrl === targetUrl;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            handleSelectAlternativePhoto(photoModalTarget.id, targetUrl, photoModalTarget.isBefore);
                          }}
                          className={`p-2 rounded-2xl border-2 text-left transition-all flex flex-col gap-1.5 group ${
                            isSelected
                              ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                              : 'border-stone-200 bg-stone-50 hover:border-amber-400 hover:bg-amber-50/30'
                          }`}
                        >
                          <div className="h-28 rounded-xl overflow-hidden bg-stone-200 w-full relative">
                            <img
                              src={targetUrl}
                              alt={alt.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                            />
                            <span className="absolute bottom-1 right-1 bg-stone-900/80 text-white text-[9px] font-mono px-1.5 py-0.5 rounded">
                              Opción #{idx + 1}
                            </span>
                            {isSelected && (
                              <span className="absolute top-1 left-1 bg-amber-500 text-stone-950 text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                                ✓ Activa
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-stone-800 group-hover:text-amber-950 line-clamp-2">
                            {alt.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {photoModalTab === 'url' && (
                <div className="space-y-3">
                  <label className="text-xs font-semibold text-stone-800 block">
                    Pega cualquier enlace público de imagen (Unsplash, Pexels, Google o tu hosting):
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={modalUrlInput}
                      onChange={(e) => setModalUrlInput(e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="flex-1 p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:outline-hidden focus:border-stone-900"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (modalUrlInput.trim()) {
                          handleApplyPhotoUrl(photoModalTarget.id, modalUrlInput.trim(), photoModalTarget.isBefore);
                          setModalUrlInput('');
                        }
                      }}
                      disabled={!modalUrlInput.trim()}
                      className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-amber-300 rounded-xl text-xs font-bold disabled:opacity-40 transition-colors"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="pt-3 mt-3 border-t border-stone-200 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => {
                  handleResetPhoto(photoModalTarget.id, photoModalTarget.isBefore);
                }}
                className="text-stone-500 hover:text-stone-900 font-mono text-[11px] flex items-center gap-1 underline"
              >
                <RotateCcw className="w-3 h-3" />
                Restablecer foto original
              </button>
              <button
                type="button"
                onClick={() => setPhotoModalTarget(null)}
                className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors shadow-xs"
              >
                Cerrar y ver diapositiva
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
