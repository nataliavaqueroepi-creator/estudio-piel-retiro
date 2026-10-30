import React, { useState } from 'react';
import {
  X,
  Scissors,
  Truck,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  MessageSquare,
  HelpCircle
} from 'lucide-react';
import { businessData } from '../data/businessData';

interface BudgetCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BudgetCalculatorModal: React.FC<BudgetCalculatorModalProps> = ({
  isOpen,
  onClose
}) => {
  const [selectedService, setSelectedService] = useState('suela');
  const [shoeType, setShoeType] = useState('vestir');
  const [material, setMaterial] = useState('vibram');
  const [deliveryOption, setDeliveryOption] = useState<'taller' | 'domicilio'>('taller');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  // Estimate price dynamically
  const calculatePrice = () => {
    let base = 28;
    if (selectedService === 'suela') {
      base = material === 'cuero' ? 34 : 29;
      if (shoeType === 'botas') base += 6;
    } else if (selectedService === 'tacones') {
      base = 12;
      if (shoeType === 'botas') base += 4;
    } else if (selectedService === 'bolsos') {
      base = 25;
    } else if (selectedService === 'tinte') {
      base = 35;
    }
    const deliveryFee = deliveryOption === 'domicilio' ? 4 : 0;
    return {
      min: base + deliveryFee,
      max: base + deliveryFee + 8
    };
  };

  const estimate = calculatePrice();

  const handleSendWhatsApp = () => {
    const text = `Hola Estudio Piel! Quisiera pedir presupuesto sin compromiso:
- Servicio: ${selectedService} (${shoeType}, ${material})
- Entrega: ${deliveryOption === 'domicilio' ? 'Recogida a domicilio en Retiro' : 'Entrega en taller de Calle Ibiza'}
- Nombre: ${clientName || 'Cliente'}
- Contacto: ${clientPhone || 'No especificado'}
${notes ? `- Nota: ${notes}` : ''}
¡Muchas gracias!`;

    window.open(
      `https://wa.me/${businessData.contact.whatsappClean}?text=${encodeURIComponent(text)}`,
      '_blank'
    );
    setIsSubmitted(true);
  };

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-stone-200 overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-stone-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono tracking-wider uppercase text-amber-300 block">
              Formulario Web Oficial
            </span>
            <h3 className="font-serif text-lg font-bold">
              Solicitar Presupuesto sin Compromiso
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              ¡Presupuesto solicitado con éxito!
            </h4>
            <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
              El maestro artesano de Estudio Piel revisará los detalles y te responderá en menos de 2 horas laborables. También puedes acercarte directamente a nuestro taller en Calle de Ibiza, 34 (Retiro).
            </p>
            <div className="pt-3 border-t border-stone-100 flex justify-center gap-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 border border-stone-300 text-xs font-medium rounded-lg text-stone-700 hover:bg-stone-50"
              >
                Modificar datos
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-stone-900 text-white text-xs font-medium rounded-lg hover:bg-stone-800"
              >
                Cerrar ventana
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmitForm} className="p-6 space-y-4 text-xs">
            {/* Service selector */}
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5">
                Tipo de arreglo o reparación:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'suela', label: 'Cambiar suela de zapatos', hint: 'Cuero o goma Vibram' },
                  { id: 'tacones', label: 'Cambio de tapas y tacones', hint: 'Calzado caballero/mujer' },
                  { id: 'bolsos', label: 'Reparación de bolsos de piel', hint: 'Asas, cremalleras, forros' },
                  { id: 'tinte', label: 'Tintado y nutrición', hint: 'Recuperar color original' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedService(item.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      selectedService === item.id
                        ? 'border-amber-600 bg-amber-50/70 text-stone-900 font-medium'
                        : 'border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    <div className="font-semibold text-xs">{item.label}</div>
                    <div className="text-[10px] text-stone-500 mt-0.5">{item.hint}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sub-options for Shoes */}
            {selectedService === 'suela' && (
              <div className="grid grid-cols-2 gap-3 p-3 bg-stone-50 rounded-xl border border-stone-200">
                <div>
                  <label className="block text-[11px] text-stone-600 font-medium mb-1">
                    Tipo de calzado:
                  </label>
                  <select
                    value={shoeType}
                    onChange={(e) => setShoeType(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-1.5 text-xs"
                  >
                    <option value="vestir">Zapato de vestir (Oxford/Derby)</option>
                    <option value="botas">Botas o Botines</option>
                    <option value="mocasines">Mocasines o Náuticos</option>
                    <option value="zapatillas">Sneakers de piel</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-stone-600 font-medium mb-1">
                    Tipo de suela:
                  </label>
                  <select
                    value={material}
                    onChange={(e) => setMaterial(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-1.5 text-xs"
                  >
                    <option value="vibram">Goma técnica Vibram (Antideslizante)</option>
                    <option value="cuero">Cuero curtido tradicional de cerco</option>
                    <option value="crepe">Goma crepé natural</option>
                  </select>
                </div>
              </div>
            )}

            {/* Delivery Option in Retiro */}
            <div>
              <label className="block text-stone-700 font-semibold mb-1.5 flex items-center justify-between">
                <span>Modo de entrega:</span>
                <span className="text-[11px] text-amber-800 font-normal">Distrito Retiro</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setDeliveryOption('taller')}
                  className={`p-2.5 rounded-xl border text-left ${
                    deliveryOption === 'taller'
                      ? 'border-stone-900 bg-stone-900 text-white font-medium'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="font-semibold text-xs">En taller de Retiro</div>
                  <div className="text-[10px] opacity-80">Calle de Ibiza, 34 (Gratis)</div>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryOption('domicilio')}
                  className={`p-2.5 rounded-xl border text-left ${
                    deliveryOption === 'domicilio'
                      ? 'border-stone-900 bg-stone-900 text-white font-medium'
                      : 'border-stone-200 bg-stone-50 text-stone-700'
                  }`}
                >
                  <div className="font-semibold text-xs">Recogida a domicilio</div>
                  <div className="text-[10px] opacity-80">En distrito Retiro (+4 €)</div>
                </button>
              </div>
            </div>

            {/* Contact details */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Tu nombre:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Carmen"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-stone-600 font-medium mb-1">
                  Teléfono / WhatsApp:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ej. 612 34 56 78"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full p-2 border border-stone-300 rounded-lg text-xs"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-stone-600 font-medium mb-1">
                Detalles del calzado o bolso (opcional):
              </label>
              <textarea
                rows={2}
                placeholder="Indica marca, problema concreto o plazo deseado..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full p-2 border border-stone-300 rounded-lg text-xs"
              />
            </div>

            {/* Estimated price box */}
            <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-900 tracking-wider block">
                  Presupuesto aproximado
                </span>
                <span className="font-bold text-stone-900 text-base font-mono">
                  {estimate.min} € – {estimate.max} €
                </span>
                <span className="text-[10px] text-stone-500 block">
                  Sin compromiso · Plazo habitual 24 a 48 horas
                </span>
              </div>
              <div className="text-right text-[11px] text-stone-600">
                <span className="font-medium text-emerald-700">✓ Materiales de calidad</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                type="button"
                onClick={handleSendWhatsApp}
                className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Pedir por WhatsApp directo</span>
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 px-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl font-medium text-xs transition-colors"
              >
                Confirmar solicitud
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
