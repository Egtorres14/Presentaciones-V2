# 🌱 Del Cisco a la Construcción
## Federación Nacional de Cafeteros de Colombia

### 📋 **DESCRIPCIÓN DEL PROYECTO**

Esta aplicación web interactiva presenta una innovadora solución para transformar el cisco de café (residuo del procesamiento del grano) en materiales de construcción sostenibles usando tecnología WPC (Wood Plastic Composite).

El sitio web muestra cómo las **540,000 familias cafeteras** de Colombia pueden convertir las **195,000+ toneladas** de cisco generadas anualmente en oportunidades económicas y materiales de construcción de alta calidad.

---

## 🎯 **GUÍA DE NAVEGACIÓN (Para Usuarios)**

### **🖱️ Controles de Navegación**

#### **Navegación por Teclado:**
- **⬅️ Flecha Izquierda**: Ir a la sección anterior
- **➡️ Flecha Derecha**: Ir a la siguiente sección  
- **⬆️ Flecha Arriba**: Ir a la sección anterior
- **⬇️ Flecha Abajo**: Ir a la siguiente sección
- **Escape**: Cerrar popups/modales

#### **Navegación por Mouse:**
- **Menú superior**: Clic directo a cualquier sección
- **Scroll**: Desplazamiento libre por todo el contenido
- **Clic en tarjetas**: Abrir detalles o popups

#### **Indicadores Visuales:**
- **Barra de progreso verde**: Muestra tu ubicación actual
- **Menú destacado**: La sección activa se resalta en verde
- **Scroll indicator**: Flecha animada en la primera sección

---

## 📑 **SECCIONES Y FUNCIONALIDADES**

### **1. 🏠 INICIO (Hero)**
- **Imagen de fondo**: Grano de café colombiano con efecto parallax
- **Mensaje principal**: Introduce el concepto del cisco de café
- **Scroll automático**: La imagen se mueve mientras navegas
- **Indicador**: Instrucciones de navegación por teclado

### **2. ⚠️ PROBLEMA**
- **Contadores animados**: 
  - 22% del café se convierte en cisco
  - 14 millones de sacos producidos anualmente
  - 195,000+ toneladas de cisco generadas
- **Infografías interactivas**: Datos visuales con iconos
- **Partículas animadas**: Efectos visuales de fondo
- **Estadísticas clave**: 540K familias, 85% cisco desperdiciado

### **3. 🔄 TRANSFORMACIÓN (Solución)**
- **Explicación WPC**: Qué son los compuestos plástico-madera
- **Beneficios destacados**:
  - 100% aprovechamiento del cisco
  - 3x más duradero que madera tradicional
  - 35% reducción de costos
- **Imagen showcase**: Transformación visual del proceso

### **4. 📸 GALERÍA**
- **9 imágenes** del proceso de transformación
- **Navegación por teclado**: ⬅️➡️ entre imágenes en popup
- **Vista ampliada**: Clic en cualquier imagen para popup
- **Galería responsive**: Grid adaptativo para móviles
- **Auto-animación**: Las imágenes aparecen progresivamente

### **5. 🏗️ PRODUCTOS**
- **6 tarjetas interactivas**:
  - **Pisos WPC**: Pavimentos resistentes
  - **Paredes**: Paneles de revestimiento  
  - **Techos**: Tejas y estructuras
  - **Muebles**: Mobiliario sostenible
  - **Puertas**: Marcos y puertas WPC
  - **Vivienda**: Casa modelo completa
- **Popups de productos**: Cada tarjeta abre imagen detallada
- **Navegación entre productos**: ⬅️➡️ en modo popup
- **Efectos hover**: Animaciones al pasar el mouse

### **6. 🌍 IMPACTO SOCIAL**
- **Contadores animados**:
  - 540,000 familias beneficiadas
  - 35% reducción costos construcción
  - 78,000 toneladas CO₂ evitadas
- **Estadísticas destacadas**: Impacto económico y ambiental
- **Diseño responsivo**: Información clara y accesible

### **7. 💰 COSTOS**
- **Información técnica actualizada**:
  - 55% cisco por metro cuadrado
  - 17 kg peso por m²
  - 800 m² capacidad planta/mes
  - 21 mil m² potencial con 196 toneladas

#### **🧮 CALCULADORA INTERACTIVA**
- **Input**: Ingresa toneladas de cisco disponibles
- **Cálculo automático**: Metros cuadrados producibles
- **Dos resultados**:
  - **Exacto**: Número preciso con decimales
  - **Redondeado**: Aproximado a miles
- **Fórmula**: `(toneladas × 1000) ÷ 9 = metros cuadrados`
- **Ejemplo**: 196 toneladas = 21,777.8 m² (22,000 redondeado)

#### **📊 Comparativa de Costos**
- **WPC Tradicional**: $85,000 COP/m²
- **WPC con Cisco**: $55,000 COP/m²
- **Ahorro**: $30,000 COP/m² (35% reducción)

### **8. 🎬 PROCESO**
- **Video de fondo**: Proceso completo de transformación
- **Video autoplay**: Reproducción automática y loop
- **Overlay informativo**: Título y descripción sobre el video
- **Responsive**: Se adapta a todos los dispositivos

### **9. 🏢 FOOTER**
- **Video institucional**: Logos animados de la Federación
- **Branding**: Identidad visual corporativa

---

## 🔧 **INFORMACIÓN TÉCNICA (Para Desarrolladores)**

### **📱 Tecnologías Utilizadas**
- **React 18** con TypeScript
- **Vite** como bundler y dev server
- **Tailwind CSS** para estilos
- **Lucide React** para iconografía
- **CSS Grid/Flexbox** para layouts responsivos

### **🎨 Estructura de Componentes**
```
App.tsx (Componente principal)
├── Hero Section
├── Problema Section (+ contadores animados)
├── Transformación Section
├── Galería Section (+ popup modal)
├── Productos Section (+ popup productos)
├── Impacto Section (+ contadores animados)
├── Costos Section (+ calculadora)
├── Proceso Section (+ video background)
└── Footer (+ video institucional)
```

### **⚡ Funcionalidades Interactivas**

#### **Animaciones CSS:**
- **Fade in/out**: Elementos aparecen progresivamente
- **Slide effects**: Movimientos desde diferentes direcciones
- **Counter animations**: Contadores numéricos animados
- **Parallax scrolling**: Efecto de profundidad en hero
- **Hover effects**: Interacciones con mouse

#### **JavaScript Interactivo:**
- **Intersection Observer**: Detecta elementos visibles
- **Keyboard Navigation**: Control completo por teclado
- **State Management**: Manejo de popups y navegación
- **Real-time Calculator**: Calculadora de cisco en tiempo real
- **Video Controls**: Manejo de reproducción automática

#### **Responsive Design:**
- **Mobile-first**: Diseñado primero para móviles
- **Breakpoints**: Adaptación automática tablet/desktop
- **Touch-friendly**: Controles táctiles optimizados
- **Cross-browser**: Compatible con navegadores modernos

### **📂 Estructura de Archivos**
```
/
├── public/
│   ├── images/           # Imágenes del sitio
│   │   ├── imagen_1.png  # Hero background
│   │   ├── imagen_2.png  # Problema section
│   │   ├── imagen_3.png  # Transformación
│   │   ├── imagen_5.png  # Impacto social
│   │   ├── vivienda.png  # Productos background
│   │   ├── pisos.png     # Producto pisos
│   │   ├── paredes.png   # Producto paredes
│   │   ├── techos.png    # Producto techos
│   │   ├── mesas.png     # Producto muebles
│   │   ├── puerta.png    # Producto puertas
│   │   └── galeria_1-9.jpg # Galería proceso
│   └── video/
│       ├── video.mp4     # Video proceso
│       └── logos.mp4     # Video footer
├── src/
│   ├── App.tsx          # Componente principal
│   ├── main.tsx         # Entry point
│   ├── index.css        # Estilos base Tailwind
│   └── styles/
│       └── main.css     # Estilos personalizados
└── package.json         # Dependencias del proyecto
```

### **🚀 Comandos de Desarrollo**
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Linter de código
```

### **🎯 Optimizaciones Implementadas**
- **Lazy Loading**: Carga diferida de imágenes
- **Error Boundaries**: Manejo de errores de imágenes
- **Performance**: Animaciones optimizadas con CSS
- **SEO**: Meta tags y estructura semántica
- **Accessibility**: Navegación por teclado y ARIA labels

---

## 📞 **SOPORTE Y CONTACTO**

**Federación Nacional de Cafeteros de Colombia**
- **Web**: [federaciondecafeteros.org](https://federaciondecafeteros.org)
- **Email**: Contacto institucional
- **Proyecto**: Transformación sostenible del cisco de café

---

## 📄 **LICENCIA**

Este proyecto está desarrollado para la Federación Nacional de Cafeteros de Colombia como parte de la iniciativa de transformación sostenible del cisco de café en materiales de construcción.

**© 2025 Federación Nacional de Cafeteros de Colombia**