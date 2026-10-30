import React, { useState } from 'react';
import {
  Copy,
  Check,
  FileText,
  KeyRound,
  Tag,
  MapPin,
  Camera,
  Clock,
  Star,
  Download,
  CheckCircle2,
  Sparkles,
  Search,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { businessData } from '../data/businessData';

interface DataCopyDashboardProps {
  onOpenBudgetModal: () => void;
  onNavigateToPhotos: () => void;
  onNavigateToReviews: () => void;
}

export const DataCopyDashboard: React.FC<DataCopyDashboardProps> = ({
  onOpenBudgetModal,
  onNavigateToPhotos,
  onNavigateToReviews
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2200);
  };

  const copyAllProposal = () => {
    const fullText = `
FICHA DE GOOGLE BUSINESS PROFILE - ESTUDIO PIEL (RETIRO, MADRID)
================================================================

KEYWORDS:
- General: ${businessData.keywords.general}
- Específica: ${businessData.keywords.specific}
- Local: ${businessData.keywords.local} (Google usa ubicación del móvil)
- Para web y título: ${businessData.keywords.webAndTitle.join(' y ')}

TÍTULO SEO (54 caracteres):
${businessData.seoTitle}

METADESCRIPCIÓN (129 caracteres):
${businessData.seoDescription}

1. NOMBRE DEL NEGOCIO:
${businessData.name}

2. CATEGORÍA:
- Principal: ${businessData.category.primary}
- Adicional: ${businessData.category.additional.join(', ')}

3. DESCRIPCIÓN OFICIAL (${businessData.description.length} caracteres):
${businessData.description}

4. ZONA DE ACTUACIÓN:
${businessData.serviceArea.details}

5. FOTOGRAFÍAS:
${businessData.photos.map((p, i) => `${i + 1}. ${p.title} (${p.description})`).join('\n')}

6. CONTACTO Y HORARIOS:
- Teléfono fijo: ${businessData.contact.phone}
- WhatsApp: ${businessData.contact.whatsapp}
- Web: ${businessData.contact.websiteUrl} (con formulario de presupuesto)
- Horarios: ${businessData.hours.weekdays}, ${businessData.hours.saturday}, ${businessData.hours.sunday}

7. RESEÑAS AUTÉNTICAS:
- Código QR en mostrador para acceso directo
- Petición verbal en el momento de entrega del calzado
- Mensaje automatizado por WhatsApp al día siguiente
- Respuesta personalizada a cada reseña (incluidas negativas con protocolo de resolución)
    `.trim();

    copyToClipboard(fullText, 'all');
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / Actions Bar */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 font-mono">
              Propuesta Completa de Ficha
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Google Business Profile & SEO Local</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Ficha Oficial de Estudio Piel en Retiro
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl">
            Todos los textos, palabras clave y parámetros redactados y listos para copiar y pegar directamente en la consola de Google Business Profile.
          </p>
        </div>

        <button
          onClick={copyAllProposal}
          className="flex items-center gap-2 px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl transition-all shadow-xs shrink-0"
        >
          {copiedId === 'all' ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span>¡Toda la ficha copiada!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span>Copiar toda la propuesta</span>
            </>
          )}
        </button>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Keywords & SEO Panel */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Estrategia de Palabras Clave (Keywords)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-500">SEO Retiro</span>
          </div>

          <div className="space-y-3 text-xs">
            {/* General */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                  General
                </span>
                <span className="font-semibold text-stone-900 text-sm">
                  {businessData.keywords.general}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(businessData.keywords.general, 'kw-gen')}
                className="p-1.5 hover:bg-white rounded-md text-stone-600 border border-transparent hover:border-stone-200 transition-colors"
                title="Copiar"
              >
                {copiedId === 'kw-gen' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Específica */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                  Específica
                </span>
                <span className="font-semibold text-stone-900 text-sm">
                  {businessData.keywords.specific}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(businessData.keywords.specific, 'kw-esp')}
                className="p-1.5 hover:bg-white rounded-md text-stone-600 border border-transparent hover:border-stone-200 transition-colors"
                title="Copiar"
              >
                {copiedId === 'kw-esp' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Local */}
            <div className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider text-amber-800 font-mono font-semibold">
                    Local («Cerca de mí»)
                  </span>
                  <span className="text-[10px] text-amber-700">· Ubicación móvil</span>
                </div>
                <span className="font-semibold text-stone-900 text-sm">
                  {businessData.keywords.local}
                </span>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  Google geolocaliza automáticamente la petición del usuario en el distrito de Retiro.
                </p>
              </div>
              <button
                onClick={() => copyToClipboard(businessData.keywords.local, 'kw-loc')}
                className="p-1.5 hover:bg-white rounded-md text-stone-600 border border-transparent hover:border-stone-200 transition-colors shrink-0"
                title="Copiar"
              >
                {copiedId === 'kw-loc' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Para web y título */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
              <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono mb-1">
                Para el texto de la web y el título
              </span>
              <div className="flex flex-wrap gap-2">
                {businessData.keywords.webAndTitle.map((kw, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-stone-200 rounded-lg font-medium text-stone-800 text-xs"
                  >
                    <span>«{kw}»</span>
                    <button
                      onClick={() => copyToClipboard(kw, `kw-web-${i}`)}
                      className="text-stone-400 hover:text-stone-700"
                    >
                      {copiedId === `kw-web-${i}` ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Meta Titles & Descriptions */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Search className="w-4 h-4 text-blue-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Título y Metadescripción SEO
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Medidas exactas
            </span>
          </div>

          <div className="space-y-4 text-xs">
            {/* Título */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-semibold">
                  Título SEO
                </span>
                <span className="text-[11px] font-mono text-blue-700 font-medium">
                  {businessData.seoTitle.length} caracteres (límite ideal 55-60)
                </span>
              </div>
              <p className="font-semibold text-stone-900 text-sm">
                {businessData.seoTitle}
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => copyToClipboard(businessData.seoTitle, 'seo-title')}
                  className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded text-stone-700 text-[11px]"
                >
                  {copiedId === 'seo-title' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar Título</span>
                </button>
              </div>
            </div>

            {/* Metadescripción */}
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-500 font-mono font-semibold">
                  Metadescripción
                </span>
                <span className="text-[11px] font-mono text-blue-700 font-medium">
                  {businessData.seoDescription.length} caracteres (límite ideal 120-135)
                </span>
              </div>
              <p className="text-stone-700 text-xs leading-relaxed">
                {businessData.seoDescription}
              </p>
              <div className="flex justify-end pt-1">
                <button
                  onClick={() => copyToClipboard(businessData.seoDescription, 'seo-desc')}
                  className="flex items-center gap-1 px-2 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded text-stone-700 text-[11px]"
                >
                  {copiedId === 'seo-desc' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>Copiar Metadescripción</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 1. Nombre & 2. Categoría */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="font-serif font-bold text-stone-900 text-base">
              1. Nombre & 2. Categorías
            </h3>
            <span className="text-[11px] font-mono text-stone-400">Datos Oficiales</span>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-mono">
                  1. Nombre del negocio
                </span>
                <span className="font-serif text-lg font-bold text-stone-900">
                  {businessData.name}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(businessData.name, 'gbp-name')}
                className="p-1.5 hover:bg-white rounded-md text-stone-600 border border-transparent hover:border-stone-200 transition-colors"
              >
                {copiedId === 'gbp-name' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono">
                  2. Categoría Principal
                </span>
                <button
                  onClick={() => copyToClipboard(businessData.category.primary, 'gbp-cat-p')}
                  className="text-stone-500 hover:text-stone-800"
                >
                  {copiedId === 'gbp-cat-p' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <div className="font-semibold text-stone-900 text-sm">
                {businessData.category.primary}
              </div>

              <div className="pt-2 border-t border-stone-200">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-mono block mb-1">
                  Categoría Adicional Recomendada
                </span>
                <div className="text-stone-700 font-medium">
                  {businessData.category.additional[0]}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. Zona de actuación */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-rose-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                4. Zona de Actuación
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-400">Radio de Servicio</span>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-2.5 text-xs">
            <p className="text-stone-800 font-medium leading-relaxed">
              {businessData.serviceArea.details}
            </p>
            <div className="pt-2 border-t border-stone-200 flex flex-wrap gap-2 text-[11px] text-stone-600">
              <span className="bg-white border border-stone-200 px-2 py-1 rounded">Distrito Retiro</span>
              <span className="bg-white border border-stone-200 px-2 py-1 rounded">Barrio Ibiza</span>
              <span className="bg-white border border-stone-200 px-2 py-1 rounded">Jerónimos</span>
              <span className="bg-white border border-stone-200 px-2 py-1 rounded">Niño Jesús</span>
              <span className="bg-white border border-stone-200 px-2 py-1 rounded">Madrid Capital</span>
            </div>
            <div className="flex justify-end pt-1">
              <button
                onClick={() => copyToClipboard(businessData.serviceArea.details, 'gbp-area')}
                className="flex items-center gap-1 px-2.5 py-1 bg-white hover:bg-stone-100 border border-stone-200 rounded text-stone-700 text-[11px]"
              >
                {copiedId === 'gbp-area' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>Copiar Zona de Actuación</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3. Descripción (Full Width) */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-700" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                3. Descripción de la Ficha Google Business
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-500">
              {businessData.description.length} / 750 caracteres permitidos por Google
            </span>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 relative group">
            <p className="text-stone-800 text-xs sm:text-sm leading-relaxed font-sans">
              {businessData.description}
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-200">
              <div className="flex items-center gap-3 text-[11px] text-stone-500">
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Incluye «zapatero en Retiro»
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Suelas, tacones y bolsos
                </span>
                <span>·</span>
                <span className="flex items-center gap-1 text-emerald-700 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Plazo 24-48h
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(businessData.description, 'gbp-desc')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-medium transition-colors"
              >
                {copiedId === 'gbp-desc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copiar Descripción</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5. Fotografías Requeridas */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-indigo-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                5. Fotografías Requeridas
              </h3>
            </div>
            <button
              onClick={onNavigateToPhotos}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Ver galería elegante →
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {businessData.photos.map((photo, i) => (
              <div
                key={photo.id}
                className="p-2.5 rounded-lg border border-stone-200 hover:bg-stone-50 flex items-start justify-between gap-3"
              >
                <div>
                  <div className="font-semibold text-stone-900">
                    {i + 1}. {photo.title}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-0.5">
                    {photo.description}
                  </div>
                </div>
                <span className="text-[10px] font-mono text-stone-600 bg-stone-100 px-2 py-0.5 rounded shrink-0">
                  {photo.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Contacto y Horarios */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                6. Contacto y Horarios
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-400">Atención Cliente</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-[10px] uppercase text-stone-400 block font-mono">Teléfono Fijo</span>
                <span className="font-semibold text-stone-900">{businessData.contact.phone}</span>
              </div>
              <div className="p-2.5 bg-stone-50 rounded-lg border border-stone-200">
                <span className="text-[10px] uppercase text-stone-400 block font-mono">WhatsApp</span>
                <span className="font-semibold text-stone-900">{businessData.contact.whatsapp}</span>
              </div>
            </div>

            <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 space-y-1">
              <span className="text-[10px] uppercase text-stone-400 block font-mono">Horario Oficial</span>
              <div className="font-medium text-stone-800">
                <strong>L-V:</strong> 10:00 - 14:00 y 17:00 - 20:30
              </div>
              <div className="font-medium text-stone-800">
                <strong>Sábados:</strong> 10:00 - 14:00
              </div>
              <div className="text-stone-500 text-[11px]">
                <strong>Domingos:</strong> Cerrado
              </div>
            </div>

            <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200 flex items-center justify-between">
              <span className="text-[11px] text-amber-900 font-medium">
                Web con formulario de presupuesto disponible
              </span>
              <button
                onClick={onOpenBudgetModal}
                className="px-2.5 py-1 bg-amber-700 hover:bg-amber-800 text-white text-[11px] font-medium rounded transition-colors"
              >
                Abrir formulario
              </button>
            </div>
          </div>
        </div>

        {/* 7. Reseñas Auténticas (Full Width) */}
        <div className="lg:col-span-2 bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                7. Estrategia de Reseñas Auténticas (4 Pilares)
              </h3>
            </div>
            <button
              onClick={onNavigateToReviews}
              className="text-xs text-blue-600 hover:underline font-medium"
            >
              Ver simulador de QR y respuestas →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs">
                QR
              </div>
              <h4 className="font-semibold text-stone-900">1. Código QR en Mostrador</h4>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Peana física junto a la caja que lleva con un solo escaneo a la valoración 5 estrellas en Google.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center font-bold text-xs">
                🗣
              </div>
              <h4 className="font-semibold text-stone-900">2. Petición Verbal al Entregar</h4>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                En el momento de satisfacción cuando el cliente recoge y admira el calzado restaurado.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 flex items-center justify-center font-bold text-xs">
                💬
              </div>
              <h4 className="font-semibold text-stone-900">3. WhatsApp al Día Siguiente</h4>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Mensaje automatizado 24h después con el enlace directo para facilitar la opinión desde el móvil.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 space-y-1.5">
              <div className="w-7 h-7 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs">
                ✍️
              </div>
              <h4 className="font-semibold text-stone-900">4. Respuesta a Cada Reseña</h4>
              <p className="text-stone-600 text-[11px] leading-relaxed">
                Agradecimiento a las de 5 estrellas y protocolo empático y constructivo a las incidencias o negativas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
