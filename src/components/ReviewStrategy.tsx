import React, { useState } from 'react';
import {
  Star,
  QrCode,
  MessageSquare,
  Volume2,
  Copy,
  Check,
  Printer,
  Sparkles,
  HeartHandshake,
  AlertTriangle,
  Send,
  ThumbsUp,
  MessageCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { businessData } from '../data/businessData';
import { QrCodeSvg } from './QrCodeSvg';

export const ReviewStrategy: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [customerName, setCustomerName] = useState('Carlos');
  const [itemType, setItemType] = useState('zapatos de piel');
  const [activeReviewTab, setActiveReviewTab] = useState<'all' | 'positive' | 'negative'>('all');
  const [customReplyInput, setCustomReplyInput] = useState('');
  const [activeScenarioIndex, setActiveScenarioIndex] = useState(0);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handlePrintStand = () => {
    window.print();
  };

  const generatedWhatsAppMessage = `Hola ${customerName}! Te escribimos desde Estudio Piel en Retiro. Esperamos que ya estés disfrutando de tus ${itemType} recién reparados. ¿Nos ayudarías dedicando 30 segundos a compartir tu experiencia en Google? Nos apoya enormemente a seguir manteniendo vivo el oficio artesano en el barrio: https://g.page/r/estudiopiel-retiro/review ¡Muchas gracias!`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 font-mono">
              Sección 7 · Reputación Online
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Google Business Profile</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Estrategia Integral de Reseñas Auténticas
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl">
            Protocolo 360° para captar reseñas 5 estrellas de vecinos de Retiro y gestionar con profesionalismo cualquier crítica o incidencia.
          </p>
        </div>

        <button
          onClick={handlePrintStand}
          className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-medium rounded-xl border border-stone-300 transition-colors shrink-0"
        >
          <Printer className="w-4 h-4 text-stone-600" />
          <span>Imprimir cartel de mostrador</span>
        </button>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pilar 1: Código QR en Mostrador con Vista Imprimible */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-amber-700" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                1. Código QR en el Mostrador
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-500">Peana de recepción</span>
          </div>

          <p className="text-xs text-stone-600">
            Diseño listo para colocar en soporte acrílico o de madera en el mostrador de Estudio Piel junto a la entrega de zapatos y cobro con datáfono.
          </p>

          {/* Counter Stand Preview */}
          <div className="p-6 bg-gradient-to-b from-stone-50 to-stone-100 rounded-xl border border-stone-300 flex flex-col items-center text-center shadow-inner">
            <div className="font-serif text-xl font-bold text-stone-900 mb-0.5">
              Estudio Piel
            </div>
            <div className="text-[11px] text-amber-800 font-mono tracking-wider uppercase mb-3">
              Zapatero en Retiro · Madrid
            </div>

            <QrCodeSvg value="https://g.page/r/estudiopiel-retiro/review" size={170} />

            <div className="mt-4 max-w-xs space-y-1">
              <div className="flex items-center justify-center gap-1 text-amber-500 text-xs">
                ★★★★★
              </div>
              <div className="text-xs font-semibold text-stone-800">
                ¿Satisfecho con la reparación?
              </div>
              <div className="text-[11px] text-stone-600 leading-tight">
                Escanea este código con la cámara de tu móvil para dejarnos una reseña rápida en Google. Tu apoyo mantiene vivo el comercio local.
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 w-full flex justify-between items-center text-[10px] text-stone-500 font-mono">
              <span>Calle de Ibiza, 34 (Retiro)</span>
              <span>www.estudiopiel-retiro.es</span>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => copyToClipboard('https://g.page/r/estudiopiel-retiro/review', 'qr-url')}
              className="flex items-center gap-1 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700"
            >
              {copiedId === 'qr-url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar enlace de reseña Google</span>
            </button>
          </div>
        </div>

        {/* Pilar 2: Petición Verbal al Entregar el Calzado */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                2. Petición Verbal en Mostrador
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              +68% de conversión
            </span>
          </div>

          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
            <div className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
              <span>Momento clave de entrega:</span>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed italic bg-white p-3 rounded-lg border border-blue-200">
              {businessData.reviewStrategy.verbalScript.script}
            </p>

            <div className="space-y-1.5 text-xs text-stone-600">
              <div className="font-medium text-stone-800">Por qué funciona:</div>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-stone-600">
                <li>Se realiza cuando el cliente acaba de inspeccionar la nueva suela o el bolso restaurado y experimenta el efecto sorpresa («¡ha quedado como nuevo!»).</li>
                <li>Conecta con la empatía hacia los oficios tradicionales y el comercio artesanal del distrito Retiro.</li>
                <li>Señala físicamente el soporte QR facilitando la acción inmediata antes de salir del taller.</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => copyToClipboard(businessData.reviewStrategy.verbalScript.script, 'verbal')}
              className="flex items-center gap-1 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700"
            >
              {copiedId === 'verbal' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar guion verbal</span>
            </button>
          </div>
        </div>

        {/* Pilar 3: Generador de WhatsApp Automatizado al Día Siguiente */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                3. Mensaje de WhatsApp (24 Horas Después)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-stone-500">Día Siguiente</span>
          </div>

          <p className="text-xs text-stone-600">
            Generador interactivo para enviar al cliente al día siguiente tras comprobar la comodidad del calzado:
          </p>

          {/* Form to customize message */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block text-[11px] text-stone-600 font-medium mb-1">
                Nombre del cliente
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-hidden focus:border-amber-600"
                placeholder="Ej. Carlos"
              />
            </div>
            <div>
              <label className="block text-[11px] text-stone-600 font-medium mb-1">
                Artículo reparado
              </label>
              <input
                type="text"
                value={itemType}
                onChange={(e) => setItemType(e.target.value)}
                className="w-full px-3 py-1.5 border border-stone-300 rounded-lg text-xs focus:outline-hidden focus:border-amber-600"
                placeholder="Ej. zapatos Oxford, bolso de piel"
              />
            </div>
          </div>

          {/* Simulated WhatsApp Bubble */}
          <div className="p-4 bg-[#EFEAE2] rounded-xl border border-stone-200">
            <div className="max-w-md bg-white p-3 rounded-lg shadow-2xs space-y-2 text-xs text-stone-800 relative">
              <p className="leading-relaxed whitespace-pre-line">
                {generatedWhatsAppMessage}
              </p>
              <div className="text-[10px] text-stone-400 text-right">
                10:15 ✓✓
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(generatedWhatsAppMessage)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-medium transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Probar en WhatsApp Web</span>
            </a>

            <button
              onClick={() => copyToClipboard(generatedWhatsAppMessage, 'wa-msg')}
              className="flex items-center gap-1 px-3 py-1.5 bg-stone-50 hover:bg-stone-100 border border-stone-200 rounded-lg text-xs text-stone-700"
            >
              {copiedId === 'wa-msg' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Copiar texto de mensaje</span>
            </button>
          </div>
        </div>

        {/* Pilar 4: Protocolo de Respuesta a Cada Reseña (Positivas y Negativas) */}
        <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-purple-600" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                4. Respuesta a Cada Reseña (100% Cobertura)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Incluye Negativas
            </span>
          </div>

          <p className="text-xs text-stone-600">
            Google premia los perfiles activos que contestan todas las opiniones en menos de 24 horas. Selecciona el caso para ver la respuesta estratégica:
          </p>

          {/* Scenario Tabs */}
          <div className="flex gap-2">
            {businessData.reviewStrategy.responses.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveScenarioIndex(idx)}
                className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-medium border text-center transition-all ${
                  activeScenarioIndex === idx
                    ? item.type === 'negative'
                      ? 'bg-rose-50 border-rose-300 text-rose-900 font-bold'
                      : 'bg-amber-50 border-amber-300 text-amber-900 font-bold'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
              >
                {item.type === 'negative' ? '⚠️ Crítica (2★)' : `Caso ${idx + 1} (${item.rating}★)`}
              </button>
            ))}
          </div>

          {/* Active Review Card */}
          {(() => {
            const current = businessData.reviewStrategy.responses[activeScenarioIndex];
            return (
              <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                {/* Customer Comment */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">{current.customerName}</span>
                    <span className="text-amber-500 font-bold">{current.rating} ★</span>
                  </div>
                  <p className="text-stone-700 italic bg-white p-2.5 rounded border border-stone-200">
                    "{current.customerComment}"
                  </p>
                </div>

                {/* Official Reply */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-stone-900">
                    <span>Respuesta oficial redactada:</span>
                    <button
                      onClick={() => copyToClipboard(current.officialReply, `reply-${activeScenarioIndex}`)}
                      className="text-stone-500 hover:text-stone-800 flex items-center gap-1 font-normal"
                    >
                      {copiedId === `reply-${activeScenarioIndex}` ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>Copiar respuesta</span>
                    </button>
                  </div>
                  <p className="text-stone-800 bg-amber-50/70 p-3 rounded-lg border border-amber-200 leading-relaxed font-sans">
                    {current.officialReply}
                  </p>
                </div>

                {/* Strategy breakdown badge */}
                <div className="pt-2 border-t border-stone-200 text-[11px] text-stone-600">
                  <strong className="text-stone-800">Táctica clave:</strong> {current.keyTactic}
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};
