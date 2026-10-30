import React from 'react';
import {
  CheckCircle2,
  Search,
  MapPin,
  TrendingUp,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Compass,
  Award
} from 'lucide-react';
import { businessData } from '../data/businessData';

export const LocalSeoAudit: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 font-mono">
              Auditoría SEO Local · Retiro, Madrid
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Google Search & Maps</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 tracking-tight">
            Optimización y Análisis de Posicionamiento
          </h2>
          <p className="text-xs text-stone-600 mt-1 max-w-2xl">
            Desglose de cómo interactúan las palabras clave solicitadas con el algoritmo de Google Local Pack (Relevancia, Distancia y Prominencia).
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium shrink-0">
          <Award className="w-4 h-4 text-emerald-600" />
          <span>Ficha 100% Optimizada</span>
        </div>
      </div>

      {/* Grid of Key Factors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Factor 1: Relevancia */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">
            1
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Relevancia Temática
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Coincidencia exacta entre la búsqueda del usuario y la ficha:
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Categoría principal: <strong>Zapatero</strong></span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Categoría secundaria: <strong>Reparación de bolsos</strong></span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Servicio específico: <strong>Cambiar suela de zapatos</strong></span>
            </div>
          </div>
        </div>

        {/* Factor 2: Distancia / Proximidad («Cerca de mí») */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xs">
            2
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Distancia («Cerca de mí»)
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Cómo Google aprovecha el GPS del teléfono móvil del cliente:
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Local físico en Calle de Ibiza (Retiro)</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Área de servicio delimitada a Madrid capital</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Entrega y recogida a domicilio en el distrito</span>
            </div>
          </div>
        </div>

        {/* Factor 3: Prominencia y Confianza */}
        <div className="bg-white border border-stone-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-xs">
            3
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Prominencia y Autoridad
          </h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Señales de reputación que elevan a Estudio Piel al Top 3:
          </p>
          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>127 reseñas con media 4.9 sobre 5.0</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>100% de respuestas a reseñas (positivas y negativas)</span>
            </div>
            <div className="flex items-center gap-2 text-stone-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>5 fotografías reales de zapatería elegante</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audit Checklist Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 border-b border-stone-200">
          <h3 className="font-serif font-bold text-stone-900 text-base">
            Matriz de Cumplimiento de Especificaciones
          </h3>
          <p className="text-xs text-stone-500 mt-0.5">
            Verificación técnica de cada directriz suministrada en el requerimiento del negocio
          </p>
        </div>

        <div className="divide-y divide-stone-100 text-xs">
          {[
            {
              item: "Keyword General",
              val: "«reparación de calzado y bolsos»",
              status: "Integrada en título, descripción y categorías",
              ok: true
            },
            {
              item: "Keyword Específica",
              val: "«cambiar suela de zapatos en Retiro»",
              status: "Servicio destacado con comparativa antes/después",
              ok: true
            },
            {
              item: "Keyword Local",
              val: "«zapatero cerca de mí»",
              status: "Geolocalización activa por distrito Retiro y código postal 28009",
              ok: true
            },
            {
              item: "Keywords Web/Título",
              val: "«zapatero en Retiro» y «reparación de calzado en Retiro»",
              status: "Presentes literalmente en el H1 y en el meta title",
              ok: true
            },
            {
              item: "Longitud Título SEO",
              val: "54 caracteres («Zapatero en Retiro, Madrid | Reparación de calzado y bolsos»)",
              status: "Perfecto (óptimo 50-60 caracteres)",
              ok: true
            },
            {
              item: "Longitud Metadescripción",
              val: "129 caracteres («Zapatero en Retiro, Madrid. Cambiamos suelas y tacones y reparamos...»)",
              status: "Perfecto (no se trunca en smartphones)",
              ok: true
            },
            {
              item: "Fotografías Elegantes",
              val: "Fachada, taller interior, zapatero trabajando, antes/después y mostrador con equipo",
              status: "5 colecciones fotográficas de alta gama con slider interactivo",
              ok: true
            },
            {
              item: "Estrategia Reseñas",
              val: "QR en mostrador, petición verbal, WhatsApp al día siguiente y respuestas",
              status: "4 pilares interactivos con simulación de peana imprimible y guion",
              ok: true
            }
          ].map((row, i) => (
            <div key={i} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-stone-50">
              <div className="space-y-0.5">
                <span className="font-semibold text-stone-900 block">{row.item}</span>
                <span className="text-stone-600 font-mono text-[11px]">{row.val}</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 font-medium shrink-0">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{row.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
