import React, { useState, useEffect } from 'react';
import {
  Camera,
  Layers,
  Sparkles,
  Maximize2,
  Sliders,
  Check,
  Info,
  Tag,
  ArrowRight
} from 'lucide-react';
import { businessData } from '../data/businessData';
import { ImageWithFallback } from './ImageWithFallback';
import { getCustomPhotos, subscribeToPhotoChanges } from '../utils/photoStorage';

export const PhotoGallery: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [beforeAfterPosition, setBeforeAfterPosition] = useState<number>(50);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [customPhotos, setCustomPhotos] = useState(getCustomPhotos);

  useEffect(() => {
    return subscribeToPhotoChanges(() => {
      setCustomPhotos(getCustomPhotos());
    });
  }, []);

  const beforeAfterItem = businessData.photos.find((p) => p.id === 'antes-despues');
  const effectiveBeforeAfterUrl = customPhotos['antes-despues']?.url || beforeAfterItem?.url || '';
  const effectiveBeforeAfterBeforeUrl = customPhotos['antes-despues']?.beforeUrl || beforeAfterItem?.beforeUrl || effectiveBeforeAfterUrl;

  const filteredPhotos = filterCategory === 'all'
    ? businessData.photos
    : businessData.photos.filter((p) => p.id === filterCategory);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 font-mono">
              Sección 5 · Activos Visuales
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Fotografías de Zapatería Elegante</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Galería Fotográfica Oficial para Google Business
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl">
            Cinco composiciones fotográficas de alta gama con atmósfera de taller artesanal en Retiro: fachada, banco de herramientas, maestro trabajando, antes/después y mostrador.
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-1 p-1 bg-stone-100 rounded-xl text-xs">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              filterCategory === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Todas (5)
          </button>
          {businessData.photos.map((p) => (
            <button
              key={p.id}
              onClick={() => setFilterCategory(p.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                filterCategory === p.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {p.tag}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Before & After Feature for Resoling */}
      {beforeAfterItem && (filterCategory === 'all' || filterCategory === 'antes-despues') && (
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-700" />
                <h3 className="font-serif font-bold text-stone-900 text-lg">
                  Comparador Interactivo: Antes y Después (Suelas y Tacones)
                </h3>
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                Arrastra el control deslizante para comparar el calzado desgastado vs la suela Vibram y tacón nuevo terminado en 24-48 horas.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md self-start sm:self-auto">
              Mayor conversión en Google Maps
            </span>
          </div>

          <div className="relative w-full h-[360px] sm:h-[440px] rounded-xl overflow-hidden select-none bg-stone-900 border border-stone-300">
            {/* After Image (Full Background) */}
            <ImageWithFallback
              src={effectiveBeforeAfterUrl}
              alt="Después: Suela renovada y nutrida"
              className="absolute inset-0 w-full h-full object-cover"
              fallbackTitle="Después: Suela renovada"
              fallbackSubtitle="Acabado brillo espejo y suela nueva"
            />
            <div className="absolute top-4 right-4 bg-emerald-900/80 backdrop-blur-xs text-emerald-100 text-xs px-3 py-1 rounded-full font-medium shadow-md">
              DESPUÉS: Suela y tacón nuevo Vibram
            </div>

            {/* Before Image (Clipped Overlay) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden"
              style={{ width: `${beforeAfterPosition}%` }}
            >
              <div className="relative w-full h-full min-w-[360px] sm:min-w-[700px]">
                <ImageWithFallback
                  src={effectiveBeforeAfterBeforeUrl}
                  alt="Antes: Calzado gastado para reparar"
                  className="w-full h-full object-cover filter contrast-90 brightness-90"
                  fallbackTitle="Antes: Suela desgastada"
                  fallbackSubtitle="Desgaste por uso en asfalto"
                />
                <div className="absolute top-4 left-4 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-xs px-3 py-1 rounded-full font-medium shadow-md">
                  ANTES: Suela desgastada
                </div>
              </div>
            </div>

            {/* Slider Handle Line */}
            <div
              className="absolute inset-y-0 w-1 bg-white cursor-ew-resize shadow-2xl flex items-center justify-center pointer-events-none"
              style={{ left: `${beforeAfterPosition}%` }}
            >
              <div className="w-8 h-8 rounded-full bg-white shadow-lg border border-stone-300 flex items-center justify-center text-stone-800 text-xs font-bold pointer-events-auto cursor-ew-resize">
                ⇄
              </div>
            </div>

            {/* Slider Input Range Control */}
            <input
              type="range"
              min="0"
              max="100"
              value={beforeAfterPosition}
              onChange={(e) => setBeforeAfterPosition(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
              aria-label="Control deslizante antes y después"
            />
          </div>

          {/* Side by side cards below the slider for 100% clarity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-stone-50 rounded-2xl border border-rose-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-600 text-white font-bold text-xs">
                  🛑 ESTADO INICIAL (ANTES)
                </span>
                <span className="text-[11px] font-mono text-stone-500">Calzado al entrar en taller</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Pie de foto:</strong> Suela de cuero original perforada y adelgazada por el uso diario sobre asfalto, y tapa de tacón desgastada con inclinación en la pisada.
              </p>
            </div>

            <div className="p-4 bg-stone-50 rounded-2xl border border-emerald-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-600 text-white font-bold text-xs">
                  ✅ RESULTADO ARTESANAL (DESPUÉS)
                </span>
                <span className="text-[11px] font-mono text-stone-500">Entrega en 24 a 48 horas</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                <strong>Pie de foto:</strong> Sustitución completa por media suela técnica Vibram de alto agarre con cosido de cerco tradicional, nuevo tacón de caucho biselado y cuero nutrido con brillo artesanal.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <span>← Mueve el deslizador para ver el proceso artesanal</span>
            <span className="font-mono text-stone-700">{beforeAfterPosition}% revelado</span>
          </div>
        </div>
      )}

      {/* Main 5 Required Photos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, index) => {
          const photoUrl = customPhotos[photo.id]?.url || photo.url;
          return (
            <div
              key={photo.id}
              className="group bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              {/* Image Header with Tag */}
              <div className="relative h-60 bg-stone-900 overflow-hidden cursor-pointer" onClick={() => setSelectedPhoto(photoUrl)}>
                <ImageWithFallback
                  src={photoUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  fallbackTitle={photo.title}
                  fallbackSubtitle={photo.description}
                />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

              <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-xs text-stone-100 text-[11px] font-mono px-2.5 py-1 rounded-md">
                Foto #{index + 1}
              </div>

              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-stone-900 text-[11px] font-medium px-2 py-0.5 rounded">
                {photo.tag}
              </div>

              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[11px] text-amber-300 font-mono tracking-wide uppercase block">
                  {photo.badge}
                </span>
                <h4 className="font-serif text-base font-semibold leading-snug">
                  {photo.title}
                </h4>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <p className="text-xs text-stone-600 leading-relaxed">
                {photo.description}
              </p>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-[11px] text-stone-400 font-mono">
                  Categoría GBP: {photo.category}
                </span>
                <button
                  onClick={() => setSelectedPhoto(photoUrl)}
                  className="flex items-center gap-1 text-amber-800 hover:text-amber-950 font-medium"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Ampliar</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
      </div>

      {/* Guidelines Card for Google Business Profile Photos */}
      <div className="p-5 bg-amber-50/60 border border-amber-200/80 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-200 text-amber-900 flex items-center justify-center shrink-0 mt-0.5">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-stone-900 text-sm">
              Consejo de Optimización para Google Maps en Retiro
            </h4>
            <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">
              Google prioriza fichas locales que renuevan fotografías cada 30 a 60 días. Subir imágenes con geoetiquetas de Madrid (barrio Retiro) y con nombres descriptivos como <code className="bg-amber-100/70 px-1 py-0.5 rounded text-[11px]">cambiar-suela-zapatos-retiro-madrid.jpg</code> multiplica las impresiones en búsquedas «cerca de mí».
            </p>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-stone-950 rounded-2xl overflow-hidden border border-stone-800"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center"
            >
              ✕
            </button>
            <img
              src={selectedPhoto}
              alt="Detalle zapatería elegante Estudio Piel"
              referrerPolicy="no-referrer"
              className="w-full h-full max-h-[80vh] object-contain"
            />
            <div className="p-4 bg-stone-900 text-stone-200 text-xs flex justify-between items-center">
              <span>Estudio Piel · Zapatero en Retiro, Madrid</span>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-3 py-1 bg-stone-800 hover:bg-stone-700 rounded text-stone-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
