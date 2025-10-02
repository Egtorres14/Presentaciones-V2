import React, { useEffect, useRef, useState } from 'react';
import { Coffee, Factory, AlertTriangle, ArrowRight, Home, DollarSign, Leaf, Shield, Zap, Recycle, TrendingDown, Users, TreePine, Building, Hammer, Eye } from 'lucide-react';
import './styles/main.css';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [ciscoInput, setCiscoInput] = useState<string>('196');
  const [calculatorResult, setCalculatorResult] = useState({ exact: 0, rounded: 0 });
  const sectionsRef = useRef<HTMLElement[]>([]);
  
  // Gallery images array for navigation
  const galleryImages = [
    'galeria_1.jpg',
    'galeria_2.jpg', 
    'galeria_3.jpg',
    'galeria_4.jpg',
    'galeria_5.jpg',
    'galeria_6.jpg',
    'galeria_7.jpg',
    'galeria_8.jpg',
    'galeria_9.jpg'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const cleanupScroll = setupScrollAnimations();
    const cleanupObserver = setupIntersectionObserver();
    const cleanupKeyboard = setupKeyboardNavigation();
    
    return () => {
      if (cleanupScroll) cleanupScroll();
      if (cleanupObserver) cleanupObserver();
      if (cleanupKeyboard) cleanupKeyboard();
    };
  }, []);

  const setupScrollAnimations = () => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const heroBackground = document.querySelector('.hero-background') as HTMLElement;
      if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  };

  const setupIntersectionObserver = () => {
    const options = {
      root: null,
      rootMargin: '-10% 0px -10% 0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionIndex = sectionsRef.current.indexOf(entry.target as HTMLElement);
          if (sectionIndex !== -1 && sectionIndex >= 0) {
            setCurrentSection(sectionIndex);
            triggerSectionAnimations(entry.target as HTMLElement);
          }
        }
      });
    }, options);

    sectionsRef.current.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach(section => {
        if (section) observer.unobserve(section);
      });
      observer.disconnect();
    };
  };

  const setupKeyboardNavigation = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const sectionIds = ['hero', 'problema', 'transformacion', 'galeria', 'impacto', 'costos', 'proceso', 'economia-circular'];
      
      if (popupImage && galleryImages.includes(popupImage)) {
        const currentArray = galleryImages;
        const currentIndex = currentGalleryIndex;
        
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const nextIndex = (currentIndex + 1) % currentArray.length;
          setCurrentGalleryIndex(nextIndex);
          setPopupImage(currentArray[nextIndex]);
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prevIndex = currentIndex === 0 ? currentArray.length - 1 : currentIndex - 1;
          setCurrentGalleryIndex(prevIndex);
          setPopupImage(currentArray[prevIndex]);
        } else if (e.key === 'Escape') {
          e.preventDefault();
          closePopup();
        }
      } else {
        if (e.key === 'ArrowDown' || (e.key === 'ArrowRight' && !popupImage)) {
          e.preventDefault();
          const nextSection = Math.min(currentSection + 1, sectionIds.length - 1);
          if (nextSection < sectionIds.length) {
            setCurrentSection(nextSection);
            scrollToSection(sectionIds[nextSection]);
          }
        } else if (e.key === 'ArrowUp' || (e.key === 'ArrowLeft' && !popupImage)) {
          e.preventDefault();
          const prevSection = Math.max(currentSection - 1, 0);
          if (prevSection >= 0) {
            setCurrentSection(prevSection);
            scrollToSection(sectionIds[prevSection]);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  };

  const triggerSectionAnimations = (section: HTMLElement) => {
    const sectionId = section.id;
    console.log(`🎯 Triggering animations for section: ${sectionId}`);
    
    switch (sectionId) {
      case 'galeria':
        console.log('📸 Gallery section detected, starting animation...');
        animateGalleryItems();
        break;
      case 'problema':
        animateCounter();
        setTimeout(() => createParticles(), 1200);
        break;
      case 'transformacion':
        setTimeout(() => {
          const transformLine = document.getElementById('transformLine');
          if (transformLine) transformLine.classList.add('active');
        }, 1000);
        break;
      case 'impacto':
        animateImpactCounters();
        break;
      case 'costos':
        animateCostCounters();
        break;
      case 'economia-circular':
        animateGenericSection(section);
        break;
      default:
        animateGenericSection(section);
    }
  };

  const animateGalleryItems = () => {
    console.log('🎨 Animating gallery items...');
   
   // First animate the title and subtitle
   const galleryTitle = document.querySelector('#galeria .section-title');
   const gallerySubtitle = document.querySelector('#galeria .section-subtitle');
   
   if (galleryTitle) {
     console.log('🎯 Animating gallery title...');
     galleryTitle.classList.add('visible');
     // Force visibility as fallback
     (galleryTitle as HTMLElement).style.opacity = '1';
     (galleryTitle as HTMLElement).style.transform = 'translateY(0)';
   }
   
   if (gallerySubtitle) {
     console.log('🎯 Animating gallery subtitle...');
     setTimeout(() => {
       gallerySubtitle.classList.add('visible');
       // Force visibility as fallback
       (gallerySubtitle as HTMLElement).style.opacity = '1';
       (gallerySubtitle as HTMLElement).style.transform = 'translateY(0)';
     }, 200);
   }
   
   // Then animate the gallery items
    const galleryItems = document.querySelectorAll('.galeria-item');
    console.log(`Found ${galleryItems.length} gallery items`);
    
    galleryItems.forEach((item, index) => {
      setTimeout(() => {
        console.log(`Animating item ${index}`);
        item.classList.add('visible');
      }, 400 + (index * 150)); // Start after title animation
    });
  };

  const animateCounter = () => {
    const counter = document.getElementById('contador');
    const ciscoPercentage = document.getElementById('ciscoPercentage');
    const productionCounter = document.getElementById('productionCounter');
    
    if (!counter || !ciscoPercentage) return;
    
    // Animar porcentaje de cisco
    const ciscoTarget = 22;
    const ciscoDuration = 1500;
    const ciscoStart = performance.now();
    
    const animateCisco = (currentTime: number) => {
      const elapsed = currentTime - ciscoStart;
      const progress = Math.min(elapsed / ciscoDuration, 1);
      
      const currentValue = Math.floor(ciscoTarget * easeOutExpo(progress));
      ciscoPercentage.textContent = currentValue.toString();
      
      if (progress < 1) {
        requestAnimationFrame(animateCisco);
      }
    };
    
    requestAnimationFrame(animateCisco);
    
    // Animar producción anual de café
    if (productionCounter) {
      const productionTarget = 14;
      const productionDuration = 2000;
      const productionStart = performance.now() + 600;
      
      const animateProduction = (currentTime: number) => {
        if (currentTime < productionStart) {
          requestAnimationFrame(animateProduction);
          return;
        }
        
        const elapsed = currentTime - productionStart;
        const progress = Math.min(elapsed / productionDuration, 1);
        
        const currentValue = Math.floor(productionTarget * easeOutExpo(progress));
        productionCounter.textContent = currentValue.toString();
        
        if (progress < 1) {
          requestAnimationFrame(animateProduction);
        }
      };
      
      requestAnimationFrame(animateProduction);
    }
    
    // Animar contador de toneladas
    const target = 195000;
    const duration = 2500;
    const start = performance.now() + 800;
    
    const animate = (currentTime: number) => {
      if (currentTime < start) {
        requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      
      const currentValue = Math.floor(target * easeOutExpo(progress));
      counter.textContent = currentValue.toLocaleString('es-CO') + '+';
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  const animateImpactCounters = () => {
    const familiesCounter = document.getElementById('familiesCounter');
    const costReductionCounter = document.getElementById('costReductionCounter');
    const co2Counter = document.getElementById('co2Counter');

    if (familiesCounter) {
      const target = 540000;
      const duration = 2000;
      const start = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(target * easeOutExpo(progress));
        familiesCounter.textContent = currentValue.toLocaleString('es-CO');
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    if (costReductionCounter) {
      const target = 35;
      const duration = 1800;
      const start = performance.now() + 500;
      
      const animate = (currentTime: number) => {
        if (currentTime < start) {
          requestAnimationFrame(animate);
          return;
        }
        
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(target * easeOutExpo(progress));
        costReductionCounter.textContent = currentValue + '%';
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
    
    if (co2Counter) {
      const target = 78000;
      const duration = 2200;
      const start = performance.now() + 1000;
      
      const animate = (currentTime: number) => {
        if (currentTime < start) {
          requestAnimationFrame(animate);
          return;
        }
        
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(target * easeOutExpo(progress));
        co2Counter.textContent = currentValue.toLocaleString('es-CO');
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  };

  const animateCostCounters = () => {
    // Animación para contadores de costos si es necesario
    console.log('Cost counters animation triggered');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const animateGenericSection = (section: HTMLElement) => {
    const elementsToAnimate = section.querySelectorAll('.fade-in, .slide-up, .slide-left, .slide-right');
    elementsToAnimate.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add('visible');
      }, index * 100);
    });
  };

  const easeOutExpo = (t: number) => {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };

  const createParticles = () => {
    const container = document.querySelector('.particles-container');
    if (!container) return;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      container.appendChild(particle);
      
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle);
        }
      }, 5000);
    }
  };

  const openGalleryPopup = (imagePath: string) => {
    const imageIndex = galleryImages.indexOf(imagePath);
    
    if (imageIndex !== -1) {
      setCurrentGalleryIndex(imageIndex);
      setPopupImage(imagePath);
    }
  };

  const getPopupCaption = () => {
    return { title: 'Proceso de Transformación', description: 'Del cisco de café a materiales de construcción sostenibles' };
  };

  const closePopup = () => {
    setPopupImage(null);
  };
  // Force gallery visibility after component mount (fallback)
  const calculateCiscoProduction = (ciscoToneladas: string) => {
    const toneladas = parseFloat(ciscoToneladas) || 0;
    const metrosCuadrados = (toneladas * 1000) / 9; // Fórmula: toneladas * 1000 / 9
    const rounded = Math.round(metrosCuadrados / 1000) * 1000; // Redondear a miles
    
    setCalculatorResult({
      exact: metrosCuadrados,
      rounded: rounded
    });
  };

  const handleCiscoInputChange = (value: string) => {
    setCiscoInput(value);
    calculateCiscoProduction(value);
  };

  useEffect(() => {
    calculateCiscoProduction(ciscoInput); // Calcular inicial
  }, []);

  useEffect(() => {
    const forceGalleryVisibility = () => {
      setTimeout(() => {
        const galleryItems = document.querySelectorAll('.galeria-item');
        if (galleryItems.length > 0) {
          const hasVisibleItems = Array.from(galleryItems).some(item => 
            item.classList.contains('visible')
          );
          
          if (!hasVisibleItems) {
            console.log('🔧 Forcing gallery visibility as fallback...');
            galleryItems.forEach((item, index) => {
              setTimeout(() => {
                item.classList.add('visible', 'force-visible');
              }, index * 100);
            });
          }
        }
      }, 3000); // Wait 3 seconds, then force visibility if needed
    };

    forceGalleryVisibility();
  }, []);

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Progress Navigation */}
      <div className="progress-nav">
        <div className="progress-line" style={{ width: `${(currentSection + 1) * (100 / 8)}%` }}></div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-items">
        <a href="#hero" className={currentSection === 0 ? 'active' : ''}>Inicio</a>
        <a href="#problema" className={currentSection === 1 ? 'active' : ''}>Problema</a>
        <a href="#transformacion" className={currentSection === 2 ? 'active' : ''}>Solución</a>
        <a href="#galeria" className={currentSection === 3 ? 'active' : ''}>Galería</a>
        <a href="#impacto" className={currentSection === 4 ? 'active' : ''}>Impacto</a>
        <a href="#costos" className={currentSection === 5 ? 'active' : ''}>Costos</a>
        <a href="#proceso" className={currentSection === 6 ? 'active' : ''}>Proceso</a>
        <a href="#economia-circular" className={currentSection === 7 ? 'active' : ''}>RSC</a>
      </nav>

      <main>
        {/* SECCIÓN 1: HERO */}
        <section 
          id="hero" 
          className="hero-section"
          ref={el => el && (sectionsRef.current[0] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="hero-background">
            <img 
              src="/images/imagen_1.png?v=2" 
              alt="Grano de café colombiano" 
              className="hero-image"
              onError={(e) => {
                console.warn('imagen_1.png failed to load, falling back to Pexels');
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                console.log(`Image loaded successfully: ${img.src}`);
                console.log(`Image dimensions: ${img.naturalWidth} x ${img.naturalHeight}`);
              }}
            />
          </div>
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">
              Cada grano de café colombiano cuenta una historia.
              <span className="hero-subtitle">Pero, ¿qué pasa con lo que queda atrás?</span>
            </h1>
          </div>
          <div className="scroll-indicator">
            <div className="scroll-arrow"></div>
            <span className="scroll-text">Usa las flechas del teclado para navegar</span>
          </div>
        </section>

        {/* SECCIÓN 2: PROBLEMA */}
        <section 
          id="problema" 
          className="problema-section"
          ref={el => el && (sectionsRef.current[1] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <div className="two-columns">
              <div className="content-column">
                <h2 className="section-title slide-up">El Desafío del Cisco</h2>
                
                <div className="cisco-explanation slide-up">
                  <p className="cisco-definition">
                    El <strong>cisco de café</strong> es la cáscara seca que rodea el grano de café.
                  </p>
                  <p className="production-context">
                    Colombia produce <span className="production-number" id="productionCounter">14</span> millones de sacos de café al año, generando aproximadamente <strong id="contador">195,000+</strong> toneladas de cisco.
                  </p>
                </div>

                <div className="infographics-container">
                  <div className="infographic-item slide-up">
                    <div className="infographic-visual">
                      <Coffee size={48} className="infographic-icon coffee-icon" />
                    </div>
                    <div className="infographic-text">
                      <span className="percentage" id="ciscoPercentage">22</span>
                      <p>% del peso total del café se convierte en cisco</p>
                    </div>
                  </div>

                  <div className="infographic-item slide-up">
                    <div className="infographic-visual">
                      <Factory size={48} className="infographic-icon production-icon" />
                    </div>
                    <div className="infographic-text">
                      <span className="counter-number">540K</span>
                      <p>familias cafeteras en Colombia</p>
                    </div>
                  </div>

                  <div className="infographic-item slide-up">
                    <div className="infographic-visual">
                      <AlertTriangle size={48} className="infographic-icon warning-icon" />
                    </div>
                    <div className="infographic-text">
                      <span className="problem-stat">85%</span>
                      <p>del cisco no se aprovecha adecuadamente</p>
                    </div>
                  </div>
                </div>

                <div className="problem-summary slide-up">
                  <p>Este residuo representa una oportunidad perdida para las comunidades cafeteras, que podrían transformarlo en materiales de construcción sostenibles.</p>
                </div>
              </div>

              <div className="image-column">
                <img 
                  src="/images/imagen_2.png" 
                  alt="Cisco de café acumulado" 
                  className="cisco-image slide-right"
                  onError={(e) => {
                   console.log('❌ Error loading imagen_2.png, using fallback');
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/4109743/pexels-photo-4109743.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                 onLoad={(e) => {
                   const img = e.target as HTMLImageElement;
                   console.log(`✅ Image loaded successfully: ${img.src}`);
                   img.classList.add('visible');
                 }}
                />
              </div>
            </div>
          </div>
          <div className="particles-container"></div>
        </section>

        {/* SECCIÓN 3: TRANSFORMACIÓN */}
        <section 
          id="transformacion" 
          className="transformacion-section"
          ref={el => el && (sectionsRef.current[2] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <div className="two-columns">
              <div className="content-column">
                <h2 className="section-title">La Transformación</h2>
                
                <div className="wpc-explanation">
                  <p className="wpc-definition">
                    Los <strong>compuestos de plástico-madera (WPC)</strong> son materiales híbridos que combinan fibras de madera con termoplásticos, creando <span className="highlight-text">materiales de construcción superiores</span>.
                  </p>
                  <p className="wpc-context">
                    Al incorporar cisco de café como fibra natural, creamos un material revolucionario que transforma residuos en recursos valiosos.
                  </p>
                </div>

                <div className="wpc-stats-container">
                  <div className="wpc-stat-item">
                    <div className="stat-visual">
                      <Recycle size={48} className="stat-icon recycle-icon" />
                    </div>
                    <div className="stat-text">
                      <span className="stat-number">100%</span>
                      <p>Aprovechamiento del cisco</p>
                    </div>
                  </div>

                  <div className="wpc-stat-item">
                    <div className="stat-visual">
                      <Shield size={48} className="stat-icon durability-icon" />
                    </div>
                    <div className="stat-text">
                      <span className="stat-number">3x</span>
                      <p>Más duradero que madera tradicional</p>
                    </div>
                  </div>

                  <div className="wpc-stat-item">
                    <div className="stat-visual">
                      <TrendingDown size={48} className="stat-icon cost-icon" />
                    </div>
                    <div className="stat-text">
                      <span className="stat-number">35%</span>
                      <p>Reducción de costos</p>
                    </div>
                  </div>
                </div>

                <div className="wpc-benefits-summary">
                  <p>Esta innovación no solo soluciona el problema del cisco, sino que proporciona materiales de construcción de alta calidad a precios accesibles para las comunidades cafeteras.</p>
                </div>
              </div>

              <div className="image-column">
                <div className="transformation-showcase">
                  <img 
                    src="/images/imagen_3.png" 
                    alt="Transformación de cisco a WPC" 
                    className="wpc-transformation-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <div className="showcase-caption">
                    <p>Del residuo de café a material de construcción de alta calidad</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: GALERÍA */}
        <section 
          id="galeria" 
          className="galeria-section"
          ref={el => el && (sectionsRef.current[3] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <h2 className="section-title">Galería del Proceso</h2>
            <p className="section-subtitle">Descubre cómo transformamos el cisco de café en materiales de construcción</p>
            
            <div className="galeria-grid">
              {galleryImages.map((image, index) => (
                <div 
                  key={index}
                  className="galeria-item slide-up" 
                  onClick={() => openGalleryPopup(image)}
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                  <img 
                    src={`/images/${image}`} 
                    alt={`Proceso de transformación ${index + 1}`}
                    className="galeria-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://images.pexels.com/photos/${1000000 + index}/pexels-photo-${1000000 + index}.jpeg?auto=compress&cs=tinysrgb&w=400`;
                    }}
                  />
                  <div className="galeria-overlay">
                    <Eye size={48} className="galeria-icon" />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="gallery-instructions">
              <p>Haz clic en cualquier imagen para verla en tamaño completo</p>
              <div className="gallery-navigation-hint">
                <small>Usa las flechas del teclado para navegar entre imágenes</small>
              </div>
            </div>
          </div>
        </section>


        {/* SECCIÓN 5: IMPACTO SOCIAL */}
        <section 
          id="impacto" 
          className="impacto-section"
          ref={el => el && (sectionsRef.current[4] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <div className="two-columns">
              <div className="content-column">
                <h2 className="section-title">Impacto Social</h2>
                
                <div className="impacto-explanation">
                  <p className="impacto-definition">
                    Nuestra iniciativa <strong>transforma vidas</strong> al convertir residuos en oportunidades económicas para las comunidades cafeteras.
                  </p>
                  <p className="impacto-context">
                    Cada tonelada de cisco procesado genera empleo, reduce costos de vivienda y fortalece la economía local.
                  </p>
                </div>

                <div className="impacto-stats-container">
                  <div className="impacto-stat-item">
                    <div className="stat-visual">
                      <Users size={48} className="stat-icon families-icon" />
                    </div>
                    <div className="stat-text">
                      <span className="stat-number" id="familiesCounter">540,000</span>
                      <p>familias beneficiadas</p>
                    </div>
                  </div>

                  <div className="impacto-stat-item">
                    <div className="stat-visual">
                      <DollarSign size={48} className="stat-icon cost-icon" />
                    </div>
                    <div className="stat-text">
                      <span className="stat-number" id="costReductionCounter">35%</span>
                      <p>reducción en costos de construcción</p>
                    </div>
                  </div>

                  <div className="impacto-stat-item">
                    <div className="stat-visual">
                      <TreePine size={48} className="stat-icon environmental-icon" />
                    </div>
                    <div className="stat-text">
                      <span className="stat-number" id="co2Counter">78,000</span>
                      <p>toneladas de CO₂ evitadas anualmente</p>
                    </div>
                  </div>
                </div>

                <div className="impacto-summary">
                  <p>Al aprovechar el cisco, generamos un círculo virtuoso: las familias cafeteras reducen sus costos de vivienda en un <span className="highlight-number">35%</span> mientras contribuyen a la sostenibilidad ambiental.</p>
                </div>
              </div>

              <div className="image-column">
                <img 
                  src="/images/imagen_5.png" 
                  alt="Impacto social en comunidades cafeteras" 
                  className="impacto-image zoom-effect"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/8728380/pexels-photo-8728380.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 6: COSTOS */}
        <section 
          id="costos" 
          className="costos-section"
          ref={el => el && (sectionsRef.current[5] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <div className="two-columns">
              <div className="content-column">
                <h2 className="section-title">Análisis de Costos</h2>
                
                <div className="costos-explanation">
                  <p className="costos-definition">
                    Los <strong>materiales WPC de cisco</strong> ofrecen una ventaja económica significativa comparado con materiales de construcción tradicionales.
                  </p>
                  <p className="costos-context">
                    Cada metro cuadrado de WPC contiene <strong>55% cisco</strong> y pesa <strong>17 kilos</strong>, creando un modelo económico sostenible.
                  </p>
                </div>

                <div className="production-facts-container">
                  <div className="production-fact">
                    <div className="fact-icon">
                      <Coffee size={32} />
                    </div>
                    <div className="fact-content">
                      <h4>Composición WPC</h4>
                      <p><strong>55% cisco</strong> por metro cuadrado</p>
                    </div>
                  </div>
                  
                  <div className="production-fact">
                    <div className="fact-icon">
                      <Building size={32} />
                    </div>
                    <div className="fact-content">
                      <h4>Peso Material</h4>
                      <p><strong>17 kg</strong> por metro cuadrado</p>
                    </div>
                  </div>
                  
                  <div className="production-fact">
                    <div className="fact-icon">
                      <Factory size={32} />
                    </div>
                    <div className="fact-content">
                      <h4>Capacidad Planta</h4>
                      <p><strong>800 m²</strong> por mes</p>
                    </div>
                  </div>
                  
                  <div className="production-fact">
                    <div className="fact-icon">
                      <Zap size={32} />
                    </div>
                    <div className="fact-content">
                      <h4>Uso Actual de Cisco</h4>
                      <p><strong>7,500 kilos</strong> de cisco mensuales</p>
                    </div>
                  </div>
                </div>

                <div className="costos-table-container">
                  <div className="costos-header">
                    <h3>Costo por m² (Proyecto Piloto)</h3>
                  </div>
                  
                  <div className="costos-row">
                    <div className="costos-item">
                      <div className="costos-description">Material WPC con Cisco</div>
                      <div className="costos-specification">Proyecto piloto - Incluye procesamiento y acabados</div>
                    </div>
                    <div className="costos-price">
                      <span className="cost-number">$95,000</span>
                    </div>
                  </div>

                  <div className="costos-note">
                    <p>*Precios en COP por metro cuadrado. Incluye procesamiento y acabados.</p>
                  </div>
                </div>
              </div>

              <div className="image-column">
                <div className="costos-breakdown">
                  <h3>Distribución de Costos</h3>
                  
                  <div className="breakdown-chart">
                    <div className="breakdown-item">
                      <div className="breakdown-label-section">
                        <div className="breakdown-category-icon"></div>
                        <span>Cisco de café (55%)</span>
                      </div>
                      <div className="breakdown-bar-container">
                        <div className="breakdown-bar" style={{width: '20%'}}>
                          <span className="breakdown-percentage-small">20%</span>
                        </div>
                      </div>
                      <div className="breakdown-percentage-display">20%</div>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-label-section">
                        <div className="breakdown-category-icon"></div>
                        <span>Polímeros y aditivos</span>
                      </div>
                      <div className="breakdown-bar-container">
                        <div className="breakdown-bar" style={{width: '35%'}}>
                          <span className="breakdown-percentage-small">35%</span>
                        </div>
                      </div>
                      <div className="breakdown-percentage-display">35%</div>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-label-section">
                        <div className="breakdown-category-icon"></div>
                        <span>Procesamiento</span>
                      </div>
                      <div className="breakdown-bar-container">
                        <div className="breakdown-bar" style={{width: '30%'}}>
                          <span className="breakdown-percentage-small">30%</span>
                        </div>
                      </div>
                      <div className="breakdown-percentage-display">30%</div>
                    </div>

                    <div className="breakdown-item">
                      <div className="breakdown-label-section">
                        <div className="breakdown-category-icon"></div>
                        <span>Distribución y otros</span>
                      </div>
                      <div className="breakdown-bar-container">
                        <div className="breakdown-bar" style={{width: '20%'}}>
                          <span className="breakdown-percentage-small">20%</span>
                        </div>
                      </div>
                      <div className="breakdown-percentage-display">20%</div>
                    </div>
                  </div>

                  <div className="breakdown-total">
                    <strong>Total: 100% = $95,000 COP/m²</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 7: PROCESO */}
        <section 
          id="proceso" 
          className="proceso-section"
          ref={el => el && (sectionsRef.current[6] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="video-container">
            <video 
              className="fullscreen-video"
              autoPlay
              muted
              loop
              playsInline
             preload="auto"
             onError={(e) => {
               console.warn('Video failed to load:', e);
               const videoElement = e.target as HTMLVideoElement;
               const fallback = videoElement.nextElementSibling as HTMLElement;
               if (fallback && fallback.classList.contains('video-fallback')) {
                 fallback.style.display = 'flex';
               }
             }}
             onLoadedData={() => {
               console.log('Video loaded successfully');
             }}
            >
              <source src="/video/video.mp4" type="video/mp4" />
             Su navegador no soporta el elemento video.
            </video>
           <div className="video-fallback" style={{display: 'none'}}>
             <div className="fallback-content">
               <h3>Video del Proceso</h3>
               <p>Video del proceso de transformación no disponible</p>
               <div className="fallback-image">
                 <img 
                   src="/images/imagen_3.png" 
                   alt="Proceso de transformación del cisco"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5691659/pexels-photo-5691659.jpeg?auto=compress&cs=tinysrgb&w=800';
                   }}
                 />
               </div>
             </div>
           </div>
            <div className="video-overlay">
              <div className="video-content">
                <h2 className="video-title">El Proceso Continua</h2>
                <p className="video-subtitle">De residuo a recurso: así transformamos el cisco en materiales de construcción</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8: ECONOMÍA CIRCULAR Y RSC */}
        <section
          id="economia-circular"
          className="economia-circular-section"
          ref={el => el && (sectionsRef.current[7] = el)}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <div className="two-columns">
              <div className="content-column">
                <h2 className="section-title">Responsabilidad Social Corporativa</h2>

                <div className="rsc-explanation">
                  <p className="rsc-definition">
                    Este proyecto materializa la <strong>RSC</strong> al implementar políticas que protegen el medio ambiente y promueven el desarrollo sostenible.
                  </p>
                </div>

                <div className="rsc-commitment">
                  <h3 className="commitment-title">Compromiso Ambiental</h3>
                  <div className="commitment-items">
                    <div className="commitment-item">
                      <div className="commitment-icon">
                        <Recycle size={36} className="icon-recycle" />
                      </div>
                      <div className="commitment-text">
                        <h4>Economía Circular</h4>
                        <p>Minimizamos residuos valorizando un residuo agrícola y reduciendo el consumo de plásticos vírgenes</p>
                      </div>
                    </div>

                    <div className="commitment-item">
                      <div className="commitment-icon">
                        <Leaf size={36} className="icon-carbon" />
                      </div>
                      <div className="commitment-text">
                        <h4>Reducción de Huella de Carbono</h4>
                        <p>Disminución de emisiones de CO₂ entre <strong>40-60%</strong> frente a la madera convencional</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="beneficios-clave">
                  <h3 className="beneficios-title">Beneficios Clave del Proyecto</h3>

                  <div className="beneficio-card">
                    <div className="beneficio-header">
                      <TreePine size={28} className="beneficio-icon" />
                      <h4>Ambientales</h4>
                    </div>
                    <ul className="beneficio-list">
                      <li>Valorización de residuos agrícolas</li>
                      <li>Reducción de la deforestación</li>
                      <li>Disminución de disposición inadecuada de desechos</li>
                    </ul>
                  </div>

                  <div className="beneficio-card">
                    <div className="beneficio-header">
                      <DollarSign size={28} className="beneficio-icon" />
                      <h4>Económicos</h4>
                    </div>
                    <ul className="beneficio-list">
                      <li>Impulso a la economía circular</li>
                      <li>Generación de empleo rural</li>
                      <li>Producto más durable y de menor mantenimiento</li>
                    </ul>
                  </div>

                  <div className="beneficio-card">
                    <div className="beneficio-header">
                      <Shield size={28} className="beneficio-icon" />
                      <h4>Respaldo Institucional</h4>
                    </div>
                    <ul className="beneficio-list">
                      <li>Alineado con el Plan Nacional de Desarrollo</li>
                      <li>Cumple con la política de Basura Cero</li>
                      <li>Compromiso con un futuro sostenible</li>
                    </ul>
                  </div>
                </div>

                <div className="mensaje-final">
                  <div className="mensaje-box">
                    <Recycle size={48} className="mensaje-icon" />
                    <p className="mensaje-text">
                      <strong>Convertimos un residuo en una oportunidad,</strong> demostrando un compromiso real con un futuro sostenible.
                    </p>
                  </div>
                </div>
              </div>

              <div className="image-column">
                <div className="ciclo-showcase">
                  <img
                    src="/images/Ciclo_cisco.png"
                    alt="Ciclo de economía circular del cisco"
                    className="ciclo-image"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <div className="ciclo-caption">
                    <h4>El Ciclo de Transformación Continua</h4>
                    <div className="ciclo-steps">
                      <div className="step-item">
                        <span className="step-number">1</span>
                        <p>Obtención del cisco de café</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">2</span>
                        <p>Combinación con polietileno para crear masa plástica</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">3</span>
                        <p>Transformación en material de construcción similar a la madera</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">4</span>
                        <p>Construcción de puertas, paredes y techos</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">5</span>
                        <p>Reciclaje al final de su vida útil y reinicio del ciclo</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="partnership-footer-section">
        <div className="partnership-container">
          <div className="partnership-content">
            <h3 className="partnership-title">En Colaboración con</h3>
            
            <div className="logos-container">
              <div className="logo-wrapper grupo-it">
                <img 
                  src="/images/Grupo_it_logo.png" 
                  alt="Grupo IT" 
                  className="partnership-logo grupo-logo"
                  onError={(e) => {
                    console.warn('Grupo IT logo failed to load');
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x80/333333/white?text=Grupo+IT';
                  }}
                />
              </div>
              
              <div className="connection-animation">
                <div className="energy-flow"></div>
                <div className="connecting-line"></div>
                <div className="pulse-dot pulse-1"></div>
                <div className="pulse-dot pulse-2"></div>
                <div className="pulse-dot pulse-3"></div>
              </div>
              
              <div className="logo-wrapper federacion">
                <img 
                  src="/images/logo_federacion_cafeteros.png" 
                  alt="Federación Nacional de Cafeteros de Colombia" 
                  className="partnership-logo federacion-logo"
                  onError={(e) => {
                    console.warn('Federación logo failed to load');
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x80/228B22/white?text=Federación';
                  }}
                />
              </div>
            </div>
            
            <p className="partnership-subtitle">
              Transformando el futuro del sector cafetero a través de la innovación tecnológica
            </p>
          </div>
        </div>
      </footer>

      {/* POPUP MODAL */}
      {popupImage && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={closePopup}>×</button>
            <img 
              src={`/images/${popupImage}`} 
              alt="Vista ampliada" 
              className="popup-image"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1000000/pexels-photo-1000000.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
            <div className="popup-caption">
             <h3>{getPopupCaption().title}</h3>
             <p>{getPopupCaption().description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;