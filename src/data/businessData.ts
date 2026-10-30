export interface BusinessData {
  name: string;
  tagline: string;
  seoTitle: string;
  seoDescription: string;
  category: {
    primary: string;
    additional: string[];
  };
  keywords: {
    general: string;
    specific: string;
    local: string;
    webAndTitle: string[];
  };
  description: string;
  serviceArea: {
    mainLocation: string;
    district: string;
    city: string;
    details: string;
    deliveryAvailable: boolean;
  };
  contact: {
    phone: string;
    phoneClean: string;
    whatsapp: string;
    whatsappClean: string;
    address: string;
    neighborhood: string;
    postalCode: string;
    city: string;
    websiteUrl: string;
    mapsPlaceId: string;
  };
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    schedule: {
      day: string;
      openTime: string;
      morning: string;
      afternoon: string;
      isClosed?: boolean;
    }[];
  };
  attributes: string[];
  featuredShoePhoto: string;
  photos: {
    id: string;
    title: string;
    category: string;
    description: string;
    url: string;
    beforeUrl?: string;
    tag: string;
    badge: string;
    alternatives?: {
      title: string;
      url: string;
      beforeUrl?: string;
    }[];
  }[];
  services: {
    id: string;
    name: string;
    category: 'suelas' | 'tacones' | 'bolsos' | 'restauracion';
    duration: string;
    priceEstimate: string;
    description: string;
    highlight?: boolean;
  }[];
  reviewStrategy: {
    qrCounter: {
      title: string;
      subtitle: string;
      instruction: string;
    };
    verbalScript: {
      moment: string;
      script: string;
      tips: string;
    };
    whatsappFollowup: {
      delay: string;
      template: string;
    };
    responses: {
      type: 'positive' | 'negative' | 'neutral';
      customerName: string;
      rating: number;
      date: string;
      customerComment: string;
      officialReply: string;
      keyTactic: string;
    }[];
  };
}

export const businessData: BusinessData = {
  name: "Estudio Piel",
  tagline: "Zapatero artesanal en Retiro, Madrid · Reparación de calzado y bolsos",
  seoTitle: "Zapatero en Retiro, Madrid | Reparación de calzado y bolsos",
  seoDescription: "Zapatero en Retiro, Madrid. Cambiamos suelas y tacones y reparamos tu calzado de piel y bolsos. Presupuesto sin compromiso, llámanos hoy.",
  
  keywords: {
    general: "reparación de calzado y bolsos",
    specific: "cambiar suela de zapatos en Retiro",
    local: "zapatero cerca de mí",
    webAndTitle: ["zapatero en Retiro", "reparación de calzado en Retiro"]
  },

  category: {
    primary: "Zapatero",
    additional: [
      "Servicio de reparación de bolsos y artículos de piel",
      "Taller de marroquinería y restauración de cuero",
      "Reparación de calzado artesanal"
    ]
  },

  description: "Estudio Piel es un taller de zapatero en Retiro, Madrid. Cambiamos suelas y tacones, cosemos, tintamos y damos nueva vida al calzado de piel, a las botas y a las zapatillas. También arreglamos bolsos y cinturones. Trabajamos con materiales de calidad, damos presupuesto sin compromiso y entregamos la mayoría de los arreglos en 24 a 48 horas. Para quien trabaja o vive en la zona y prefiere reparar sus zapatos antes que comprar otros.",

  serviceArea: {
    mainLocation: "Taller con local en Retiro, Madrid",
    district: "Distrito Retiro (Ibiza, Jerónimos, Niño Jesús, Pacífico, Adelfas, Estrella)",
    city: "Madrid capital",
    details: "Taller con local en Retiro, Madrid. Clientes de Madrid capital, con recogida y entrega a domicilio opcional en el distrito.",
    deliveryAvailable: true
  },

  contact: {
    phone: "+34 912 34 56 78",
    phoneClean: "912345678",
    whatsapp: "+34 612 34 56 79",
    whatsappClean: "34612345679",
    address: "Calle de Ibiza, 34 (a pasos del Parque del Retiro)",
    neighborhood: "Barrio de Retiro / Ibiza",
    postalCode: "28009",
    city: "Madrid, España",
    websiteUrl: "https://estudiopiel-retiro.es",
    mapsPlaceId: "ChIJ_estudio_piel_retiro_madrid"
  },

  hours: {
    weekdays: "Lunes a viernes de 10:00 a 14:00 y de 17:00 a 20:30",
    saturday: "Sábados de 10:00 a 14:00",
    sunday: "Domingos cerrado",
    schedule: [
      { day: "Lunes", openTime: "10:00 - 14:00 · 17:00 - 20:30", morning: "10:00 - 14:00", afternoon: "17:00 - 20:30" },
      { day: "Martes", openTime: "10:00 - 14:00 · 17:00 - 20:30", morning: "10:00 - 14:00", afternoon: "17:00 - 20:30" },
      { day: "Miércoles", openTime: "10:00 - 14:00 · 17:00 - 20:30", morning: "10:00 - 14:00", afternoon: "17:00 - 20:30" },
      { day: "Jueves", openTime: "10:00 - 14:00 · 17:00 - 20:30", morning: "10:00 - 14:00", afternoon: "17:00 - 20:30" },
      { day: "Viernes", openTime: "10:00 - 14:00 · 17:00 - 20:30", morning: "10:00 - 14:00", afternoon: "17:00 - 20:30" },
      { day: "Sábado", openTime: "10:00 - 14:00", morning: "10:00 - 14:00", afternoon: "Cerrado" },
      { day: "Domingo", openTime: "Cerrado", morning: "Cerrado", afternoon: "Cerrado", isClosed: true }
    ]
  },

  attributes: [
    "Identificado como empresa artesanal",
    "Servicio de entrega a domicilio en distrito Retiro",
    "Presupuesto sin compromiso gratuito",
    "Entrega urgente en 24 - 48 horas",
    "Materiales de alta gama (Vibram, Dainite, curtidos vegetales)",
    "Entrada accesible para sillas de ruedas",
    "Pagos con tarjeta contactless y Bizum"
  ],

  featuredShoePhoto: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=80",

  photos: [
    {
      id: "fachada",
      title: "Fachada y entrada del local",
      category: "Exterior / Fachada",
      description: "Fachada del taller con escaparate de calzado y bolsos artesanos en Calle de Ibiza, 34 (Retiro, Madrid).",
      url: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80",
      tag: "Fachada",
      badge: "Calle de Ibiza, 34 (Retiro)",
      alternatives: [
        {
          title: "Boutique artesanal clásica",
          url: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Escaparate de calzado y piel",
          url: "https://images.unsplash.com/photo-1513094735237-8f2714d57c13?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Entrada comercio de barrio Retiro",
          url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    },
    {
      id: "interior",
      title: "Interior del taller artesanal",
      category: "Interior / Atmósfera",
      description: "Interior del taller: banco de trabajo, hormas tradicionales de madera de zapatero y estantes de pieles nobles.",
      url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80",
      tag: "Taller",
      badge: "Hormas y banco de trabajo",
      alternatives: [
        {
          title: "Banco de zapatero y pieles nobles",
          url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Taller artesano con herramientas de madera",
          url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Mesa de corte y hormas de calzado",
          url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    },
    {
      id: "zapatero",
      title: "El maestro zapatero trabajando",
      category: "En acción / Artesanía",
      description: "El artesano en plena faena: cosido a mano de cerco de piel y montaje de suela nueva en el banco.",
      url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1200&q=80",
      tag: "Maestro artesano",
      badge: "Cosido artesanal de cerco",
      alternatives: [
        {
          title: "Artesano en el banco con lezna y hormas",
          url: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Hormas de zapatero de madera y taller tradicional",
          url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Zapato de piel pulido y acabado artesanal",
          url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Corte y patronaje de cueros nobles para calzado",
          url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    },
    {
      id: "antes-despues",
      title: "Antes y después: Suelas y tacones",
      category: "Resultados / Suelas",
      description: "Comparativa real: suela gastada con desgaste severo (Antes) frente a sustitución por suela Vibram y tacón nuevo en 24-48h (Después).",
      url: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=1200&q=80",
      beforeUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80",
      tag: "Antes y Después",
      badge: "Renovación 24-48h",
      alternatives: [
        {
          title: "Tacones biselados y media suela técnica pulida (Después)",
          url: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1200&q=80",
          beforeUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Botas de piel acondicionadas con nueva suela cosida (Después)",
          url: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=1200&q=80",
          beforeUrl: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=1200&q=80"
        },
        {
          title: "Calzado urbano y zapatillas con suela Vibram limpia (Después)",
          url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=1200&q=80",
          beforeUrl: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    },
    {
      id: "mostrador",
      title: "Mostrador de recepción de Estudio Piel",
      category: "Atención / Marroquinería",
      description: "Mostrador de recepción de Estudio Piel en Retiro (Madrid): atención personalizada, rótulo artesanal de Estudio Piel en madera noble, exposición de calzado de vestir y bolsos de cuero restaurados.",
      url: "/assets/aistudio/image_61d06198.png",
      tag: "Mostrador Estudio Piel",
      badge: "Recepción Estudio Piel",
      alternatives: [
        {
          title: "Foto del mostrador de recepción (imagen adjunta)",
          url: "/assets/aistudio/image_61d06198.png"
        },
        {
          title: "Mostrador con rótulo Estudio Piel en madera",
          url: "/assets/aistudio/WhatsApp_Image_2026-10-30_at_17.34.45_38f834de.jpeg"
        },
        {
          title: "Marroquinería fina y bolsos restaurados en Estudio Piel",
          url: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1200&q=80"
        }
      ]
    }
  ],

  services: [
    {
      id: "suela-retiro",
      name: "Cambio de suela de zapatos en Retiro",
      category: "suelas",
      duration: "24 - 48 horas",
      priceEstimate: "Desde 28 €",
      description: "Sustitución completa o media suela de cuero curtido o caucho Vibram de alto agarre.",
      highlight: true
    },
    {
      id: "tapas-tacones",
      name: "Cambio de tapas y tacones",
      category: "tacones",
      duration: "En el día / 24h",
      priceEstimate: "Desde 12 €",
      description: "Renovación de tacones de aguja, botines, botas y calzado de caballero con goma antideslizante.",
      highlight: true
    },
    {
      id: "reparacion-bolsos",
      name: "Reparación de bolsos y artículos de piel",
      category: "bolsos",
      duration: "48 - 72 horas",
      priceEstimate: "Desde 25 €",
      description: "Arreglo de asas descosidas, cambio de cremalleras, forros interiores y sustitución de cierres metálicos.",
      highlight: true
    },
    {
      id: "tinte-nutricion",
      name: "Tintado y nutrición profunda de cuero",
      category: "restauracion",
      duration: "48 horas",
      priceEstimate: "Desde 35 €",
      description: "Restauración de color original o cambio de tono, desinfección, encerado y brillo espejo artesanal."
    },
    {
      id: "ajuste-cinturones",
      name: "Arreglo de cinturones y marroquinería fina",
      category: "bolsos",
      duration: "En 24 horas",
      priceEstimate: "Desde 8 €",
      description: "Acortado profesional con remate original de fábrica, troquelado de agujeros y costuras de refuerzo."
    },
    {
      id: "botas-sneakers",
      name: "Restauración de botas y limpieza de zapatillas",
      category: "restauracion",
      duration: "24 - 48 horas",
      priceEstimate: "Desde 22 €",
      description: "Ensanchado en horma, cosido de punteras, cambio de elásticos de botín Chelsea y reacondicionamiento."
    }
  ],

  reviewStrategy: {
    qrCounter: {
      title: "Código QR en el mostrador",
      subtitle: "Ubicado en peana de metacrilato/madera junto a la caja",
      instruction: "Lleva directo a la pantalla de valoración 5 estrellas de Google con un solo escaneo de móvil sin tener que buscar el negocio."
    },
    verbalScript: {
      moment: "Al entregar el calzado o bolso en mano al cliente",
      script: "«Don/Doña [Nombre], aquí tiene sus zapatos listos con la suela nueva. Si le ha gustado el resultado, nos ayuda muchísimo si nos deja una breve reseña en Google con ese QR del mostrador; a los talleres artesanos de barrio nos da la vida».",
      tips: "Momento emocional clave: cuando el cliente ve y toca la pieza restaurada y comprueba el brillo y la calidad."
    },
    whatsappFollowup: {
      delay: "Mensaje automatizado al día siguiente (24h después de la entrega)",
      template: "Hola [Nombre]! Te escribimos desde Estudio Piel en Retiro. Esperamos que ya estés disfrutando de tus zapatos/bolso recién reparados. ¿Nos ayudarías dedicando 30 segundos a compartir tu experiencia en Google? Nos apoya enormemente a seguir manteniendo vivo el oficio artesano: https://g.page/r/estudiopiel-retiro/review ¡Muchas gracias!"
    },
    responses: [
      {
        type: "positive",
        customerName: "Carlos Méndez (Vecino de Retiro)",
        rating: 5,
        date: "Hace 2 días",
        customerComment: "Llevé unos zapatos Goodyear ingleses que tenían la suela destrozada para ver si tenían arreglo. El resultado de Estudio Piel es impecable, parece calzado recién salido de fábrica y en apenas 36 horas. Además el trato en la tienda de Ibiza fue exquisito. Mi zapatero de confianza en Retiro a partir de ahora.",
        officialReply: "Muchas gracias, Carlos. Ha sido un auténtico placer trabajar sobre unos zapatos con tan buena construcción de cerco. En Estudio Piel mimamos cada par con materiales de primera para alargar su vida útil muchos años más. ¡Disfrútalos y estamos a tu disposición en Retiro cuando lo necesites!",
        keyTactic: "Refuerza la especialidad en calzado de alta gama, rapidez (36h) y localización (Retiro)."
      },
      {
        type: "positive",
        customerName: "Elena R. (Barrio Ibiza)",
        rating: 5,
        date: "Hace 1 semana",
        customerComment: "Me arreglaron un bolso de piel heredado de mi madre al que se le había roto un asa y tenía el cuero muy reseco. Ha quedado espectacular, nutrido y con la costura reforzada idéntica a la original. Muy agradecida por el cariño que le ponen al trabajo.",
        officialReply: "Muchísimas gracias por tus palabras, Elena. Saber que hemos podido devolver a la vida una pieza con tanto valor sentimental para ti es la mayor satisfacción para nuestro equipo de taller. Gracias por confiar en el comercio artesano de Retiro.",
        keyTactic: "Destaca la categoría secundaria de marroquinería y bolsos, con trato cercano y humano."
      },
      {
        type: "negative",
        customerName: "Javier G.",
        rating: 2,
        date: "Hace 3 semanas",
        customerComment: "El cambio de suela quedó bien pero tardaron casi 3 días en vez de las 24 horas que me comentaron en un principio porque tuvieron que pedir una goma especial Vibram.",
        officialReply: "Hola, Javier. Lamentamos sinceramente la demora frente al plazo inicial estimado de 24h. En tu caso particular, para garantizar la máxima durabilidad optamos por esperar el compuesto técnico Vibram específico para tu tipo de pisada en lugar de montar un material genérico. No obstante, debimos habértelo comunicado de inmediato por WhatsApp para evitar esperas imprevistas. Tomamos nota directa para mejorar nuestros avisos y te esperamos de nuevo en el taller con un descuento en tu próximo servicio. Un cordial saludo del equipo de Estudio Piel.",
        keyTactic: "Protocolo de respuesta a reseñas negativas: empatía inmediata, explicación técnica que demuestra obsesión por la calidad sin sonar a excusa, reconocimiento del fallo de comunicación y propuesta de reconciliación."
      }
    ]
  }
};
