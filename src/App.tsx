import React, { useEffect, useRef, useState } from 'react';
import { Coffee, Factory, AlertTriangle, ArrowRight, Home, DollarSign, Leaf, Shield, Zap, Recycle, TrendingDown, Users, TreePine, Building, Hammer, Eye, Waves, Trash2, Anchor, PalmtreeIcon as Palmtree, Building2, Music } from 'lucide-react';
import './styles/main.css';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const [ciscoInput, setCiscoInput] = useState<string>('196');
  const [calculatorResult, setCalculatorResult] = useState({ exact: 0, rounded: 0 });
  const [urbanWasteInput, setUrbanWasteInput] = useState<string>('50');
  const [urbanCalculatorResult, setUrbanCalculatorResult] = useState({ benches: 0, shelters: 0, deckMeters: 0 });
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
      const sectionIds = ['hero', 'problema', 'transformacion', 'galeria', 'aplicaciones-urbanas', 'impacto', 'costos', 'proceso', 'economia-circular'];
      
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
    if (popupImage === 'Ciclo_cisco.png') {
      return { title: 'Ciclo de Economía Circular', description: 'Del cisco de café a materiales de construcción y de vuelta al inicio del ciclo' };
    }
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

  const calculateUrbanWasteProduction = (wasteToneladas: string) => {
    const toneladas = parseFloat(wasteToneladas) || 0;
    const benchesEstimate = Math.floor((toneladas * 1000) / 85);
    const sheltersEstimate = Math.floor((toneladas * 1000) / 450);
    const deckMetersEstimate = Math.floor((toneladas * 1000) / 17);

    setUrbanCalculatorResult({
      benches: benchesEstimate,
      shelters: sheltersEstimate,
      deckMeters: deckMetersEstimate
    });
  };

  const handleUrbanWasteInputChange = (value: string) => {
    setUrbanWasteInput(value);
    calculateUrbanWasteProduction(value);
  };

  useEffect(() => {
    calculateCiscoProduction(ciscoInput);
    calculateUrbanWasteProduction(urbanWasteInput);
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
        <div className="progress-line" style={{ width: `${(currentSection + 1) * (100 / 9)}%` }}></div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-items">
        <a href="#hero" className={currentSection === 0 ? 'active' : ''}>Inicio</a>
        <a href="#problema" className={currentSection === 1 ? 'active' : ''}>Problema</a>
        <a href="#transformacion" className={currentSection === 2 ? 'active' : ''}>Solución</a>
        <a href="#galeria" className={currentSection === 3 ? 'active' : ''}>Galería</a>
        <a href="#aplicaciones-urbanas" className={currentSection === 4 ? 'active' : ''}>Urbano</a>
        <a href="#impacto" className={currentSection === 5 ? 'active' : ''}>Impacto</a>
        <a href="#costos" className={currentSection === 6 ? 'active' : ''}>Costos</a>
        <a href="#proceso" className={currentSection === 7 ? 'active' : ''}>Proceso</a>
        <a href="#economia-circular" className={currentSection === 8 ? 'active' : ''}>RSC</a>
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
              De residuos a recursos: Transformando comunidades y ciudades.
              <span className="hero-subtitle">Del cisco de café y residuos urbanos a infraestructura sostenible</span>
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
                <h2 className="section-title slide-up">El Desafío: Residuos Rurales y Urbanos</h2>

                <div className="cisco-explanation slide-up">
                  <p className="cisco-definition">
                    El <strong>cisco de café</strong> es la cáscara seca que rodea el grano de café.
                  </p>
                  <p className="production-context">
                    Colombia produce <span className="production-number" id="productionCounter">14</span> millones de sacos de café al año, generando aproximadamente <strong id="contador">195,000+</strong> toneladas de cisco.
                  </p>
                </div>

                <div className="urban-waste-explanation slide-up" style={{marginTop: '2rem'}}>
                  <p className="urban-definition">
                    Paralelamente, las <strong>ciudades costeras como Santa Marta</strong> enfrentan desafíos de residuos urbanos y contaminación marina.
                  </p>
                  <div className="urban-stats" style={{marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                    <div style={{padding: '1rem', background: 'rgba(34, 139, 34, 0.1)', borderRadius: '8px'}}>
                      <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#228B22'}}>~2,500 ton</p>
                      <p style={{fontSize: '0.9rem'}}>de madera llegan al mar anualmente</p>
                    </div>
                    <div style={{padding: '1rem', background: 'rgba(34, 139, 34, 0.1)', borderRadius: '8px'}}>
                      <p style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#228B22'}}>~3,800 ton</p>
                      <p style={{fontSize: '0.9rem'}}>de plástico HDPE generados mensualmente</p>
                    </div>
                  </div>
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

                  <div className="infographic-item slide-up">
                    <div className="infographic-visual">
                      <Waves size={48} className="infographic-icon" style={{color: '#1E90FF'}} />
                    </div>
                    <div className="infographic-text">
                      <span className="problem-stat">~2.5K</span>
                      <p>toneladas de madera al mar anualmente</p>
                    </div>
                  </div>

                  <div className="infographic-item slide-up">
                    <div className="infographic-visual">
                      <Trash2 size={48} className="infographic-icon" style={{color: '#FF6347'}} />
                    </div>
                    <div className="infographic-text">
                      <span className="problem-stat">~3.8K</span>
                      <p>toneladas de HDPE urbano mensual</p>
                    </div>
                  </div>
                </div>

                <div className="problem-summary slide-up">
                  <p>Estos residuos representan una doble oportunidad: solucionar problemas ambientales rurales y urbanos mientras generamos materiales de construcción sostenibles para viviendas y espacios públicos.</p>
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
                    Los <strong>compuestos de plástico-madera (WPC)</strong> son materiales híbridos que combinan fibras naturales con termoplásticos, creando <span className="highlight-text">materiales de construcción superiores</span>.
                  </p>
                  <p className="wpc-context">
                    Nuestro proceso innovador transforma <strong>tres fuentes de residuos</strong> en recursos valiosos para construcciones rurales y urbanas.
                  </p>
                </div>

                <div className="material-sources" style={{marginTop: '2rem', marginBottom: '2rem'}}>
                  <h3 style={{fontSize: '1.3rem', marginBottom: '1.5rem', color: '#228B22'}}>Múltiples Fuentes de Material</h3>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
                    <div style={{padding: '1.5rem', background: 'rgba(139, 69, 19, 0.1)', borderRadius: '12px', border: '2px solid rgba(139, 69, 19, 0.3)'}}>
                      <Coffee size={36} style={{color: '#8B4513', marginBottom: '0.5rem'}} />
                      <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Cisco de Café</h4>
                      <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>Residuo agrícola de comunidades cafeteras. <strong>55%</strong> del material en aplicaciones rurales.</p>
                    </div>
                    <div style={{padding: '1.5rem', background: 'rgba(30, 144, 255, 0.1)', borderRadius: '12px', border: '2px solid rgba(30, 144, 255, 0.3)'}}>
                      <Waves size={36} style={{color: '#1E90FF', marginBottom: '0.5rem'}} />
                      <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Madera Marina</h4>
                      <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>Recuperada de costas y mares mediante proyectos de limpieza. <strong>Evitamos contaminación</strong> oceánica.</p>
                    </div>
                    <div style={{padding: '1.5rem', background: 'rgba(255, 99, 71, 0.1)', borderRadius: '12px', border: '2px solid rgba(255, 99, 71, 0.3)'}}>
                      <Recycle size={36} style={{color: '#FF6347', marginBottom: '0.5rem'}} />
                      <h4 style={{fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.5rem'}}>Plástico HDPE</h4>
                      <p style={{fontSize: '0.9rem', lineHeight: '1.6'}}>Polietileno de alta densidad reciclado de residuos urbanos. <strong>Colaboración</strong> con recicladores locales.</p>
                    </div>
                  </div>
                  <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(34, 139, 34, 0.15)', borderRadius: '8px', borderLeft: '4px solid #228B22'}}>
                    <p style={{fontSize: '0.95rem', lineHeight: '1.6', margin: 0}}>
                      <strong>✅ Triple Impacto:</strong> Valorizamos residuos agrícolas, limpiamos nuestros océanos y reducimos basura urbana, todo en un solo proceso de transformación.
                    </p>
                  </div>
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

        {/* SECCIÓN 5: APLICACIONES URBANAS PARA SANTA MARTA */}
        <section
          id="aplicaciones-urbanas"
          className="aplicaciones-urbanas-section"
          ref={el => el && (sectionsRef.current[4] = el)}
          style={{background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', padding: '5rem 0', minHeight: '100vh'}}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container">
            <h2 className="section-title" style={{color: 'white', textAlign: 'center'}}>Soluciones para Espacios Públicos Urbanos</h2>
            <p className="section-subtitle" style={{color: 'rgba(255,255,255,0.9)', textAlign: 'center', maxWidth: '800px', margin: '0 auto 1rem'}}>
              Mobiliario sostenible para Santa Marta: Resistente al ambiente costero, duradero y ecológico
            </p>
            <p style={{color: 'rgba(255,255,255,0.8)', textAlign: 'center', fontSize: '0.95rem', marginBottom: '3rem'}}>
              <strong style={{color: '#FFD700'}}>✓ Resistente a la sal y humedad marina</strong> •
              <strong style={{color: '#FFD700'}}> ✓ 3x más duradero que madera tradicional</strong> •
              <strong style={{color: '#FFD700'}}> ✓ Mínimo mantenimiento</strong>
            </p>

            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem'}}>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease'}}>
                <div style={{height: '240px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                  <Anchor size={80} style={{color: 'white', opacity: 0.9}} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Próximamente
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Bancas para el Malecón</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Mobiliario resistente para el paseo costero. Diseño ergonómico con capacidad para 3-4 personas. Perfecto para disfrutar de la vista al mar.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Resistente a sal</span>
                    <span style={{background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Anti-vandálico</span>
                  </div>
                </div>
              </div>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease'}}>
                <div style={{height: '240px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                  <TreePine size={80} style={{color: 'white', opacity: 0.9}} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Próximamente
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Mobiliario Parque de los Novios</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Conjunto de bancas, mesas y jardineras para el icónico parque. Diseño moderno que complementa el ambiente histórico del lugar.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Modular</span>
                    <span style={{background: '#fce7f3', color: '#9f1239', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Estético</span>
                  </div>
                </div>
              </div>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease'}}>
                <div style={{height: '240px', background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                  <Building2 size={80} style={{color: 'white', opacity: 0.9}} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Próximamente
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Casetas y Kioscos de Playa</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Estructuras modulares para servicios turísticos en playas. Incluye opciones para puntos de información, venta y almacenamiento.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#dbeafe', color: '#1e3a8a', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Modular</span>
                    <span style={{background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Rápida instalación</span>
                  </div>
                </div>
              </div>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease'}}>
                <div style={{height: '240px', background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>
                  <Music size={80} style={{color: 'white', opacity: 0.9}} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Próximamente
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Decks para Eventos Culturales</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Plataformas y escenarios para presentaciones artísticas al aire libre. Alta capacidad de carga y excelente acabado superficial.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#fce7f3', color: '#9f1239', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Alta resistencia</span>
                    <span style={{background: '#e0e7ff', color: '#3730a3', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Versátil</span>
                  </div>
                </div>
              </div>

            </div>

            <div style={{marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', border: '2px solid rgba(255,255,255,0.2)'}}>
              <p style={{color: 'white', fontSize: '1.1rem', textAlign: 'center', margin: 0, lineHeight: '1.8'}}>
                <strong style={{color: '#FFD700'}}>📸 Próximamente:</strong> Imágenes reales de estos proyectos implementados en Santa Marta.
                Estamos trabajando en traer estas soluciones sostenibles a nuestra ciudad costera.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 6: IMPACTO SOCIAL */}
        <section
          id="impacto"
          className="impacto-section"
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
                <h2 className="section-title">Impacto Social: Dual</h2>

                <div className="impacto-explanation">
                  <p className="impacto-definition">
                    Nuestra iniciativa <strong>transforma vidas y ciudades</strong> al convertir residuos rurales y urbanos en oportunidades económicas.
                  </p>
                  <p className="impacto-context">
                    Generamos beneficios tanto para comunidades cafeteras como para ciudades costeras como Santa Marta.
                  </p>
                </div>

                <div style={{marginTop: '2rem', marginBottom: '2rem'}}>
                  <h3 style={{fontSize: '1.3rem', marginBottom: '1rem', color: '#228B22'}}>Impacto Rural</h3>
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

                <div style={{marginTop: '3rem', marginBottom: '1.5rem', paddingTop: '2rem', borderTop: '2px solid rgba(34, 139, 34, 0.3)'}}>
                  <h3 style={{fontSize: '1.3rem', marginBottom: '1.5rem', color: '#1E90FF'}}>Impacto Urbano</h3>
                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                    <div style={{padding: '1.5rem', background: 'rgba(30, 144, 255, 0.1)', borderRadius: '12px', textAlign: 'center'}}>
                      <Waves size={40} style={{color: '#1E90FF', margin: '0 auto 0.5rem'}} />
                      <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#1E90FF', margin: '0.5rem 0'}}>2,500</p>
                      <p style={{fontSize: '0.9rem'}}>toneladas de basura evitadas en el mar anualmente</p>
                    </div>
                    <div style={{padding: '1.5rem', background: 'rgba(255, 215, 0, 0.15)', borderRadius: '12px', textAlign: 'center'}}>
                      <Building2 size={40} style={{color: '#DAA520', margin: '0 auto 0.5rem'}} />
                      <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#DAA520', margin: '0.5rem 0'}}>85%</p>
                      <p style={{fontSize: '0.9rem'}}>mejora en durabilidad vs. mobiliario tradicional costero</p>
                    </div>
                    <div style={{padding: '1.5rem', background: 'rgba(34, 139, 34, 0.1)', borderRadius: '12px', textAlign: 'center'}}>
                      <Recycle size={40} style={{color: '#228B22', margin: '0 auto 0.5rem'}} />
                      <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#228B22', margin: '0.5rem 0'}}>3,800</p>
                      <p style={{fontSize: '0.9rem'}}>toneladas de HDPE reciclado mensualmente</p>
                    </div>
                  </div>
                  <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(30, 144, 255, 0.1)', borderRadius: '8px', borderLeft: '4px solid #1E90FF'}}>
                    <p style={{fontSize: '0.95rem', lineHeight: '1.6'}}>
                      <strong>Santa Marta se posiciona como ciudad líder en sostenibilidad:</strong> Embellecemos espacios públicos, protegemos nuestras costas y fortalecemos el turismo ecológico.
                    </p>
                  </div>
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

        {/* SECCIÓN 7: COSTOS */}
        <section
          id="costos"
          className="costos-section"
          ref={el => el && (sectionsRef.current[6] = el)}
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

                <div style={{marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', borderRadius: '16px', color: 'white'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '1.5rem', textAlign: 'center'}}>Calculadora de Impacto Urbano</h3>
                  <p style={{textAlign: 'center', marginBottom: '2rem', opacity: 0.9}}>Calcula cuánto mobiliario urbano puedes producir con residuos disponibles</p>

                  <div style={{background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem'}}>
                    <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 'bold'}}>
                      Toneladas de residuos urbanos disponibles (madera marina + HDPE):
                    </label>
                    <input
                      type="number"
                      value={urbanWasteInput}
                      onChange={(e) => handleUrbanWasteInputChange(e.target.value)}
                      style={{width: '100%', padding: '0.75rem', fontSize: '1.1rem', borderRadius: '8px', border: '2px solid rgba(255,255,255,0.3)', background: 'rgba(255,255,255,0.9)', color: '#1e3a8a', fontWeight: 'bold'}}
                      placeholder="Ej: 50"
                    />
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem'}}>
                    <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                      <Anchor size={32} style={{margin: '0 auto 0.5rem', display: 'block'}} />
                      <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>{urbanCalculatorResult.benches}</p>
                      <p style={{fontSize: '0.9rem', opacity: 0.9}}>Bancas para malecón</p>
                      <p style={{fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem'}}>~85 kg por banca</p>
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                      <Building2 size={32} style={{margin: '0 auto 0.5rem', display: 'block'}} />
                      <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>{urbanCalculatorResult.shelters}</p>
                      <p style={{fontSize: '0.9rem', opacity: 0.9}}>Casetas de playa</p>
                      <p style={{fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem'}}>~450 kg por caseta</p>
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '12px', textAlign: 'center'}}>
                      <Music size={32} style={{margin: '0 auto 0.5rem', display: 'block'}} />
                      <p style={{fontSize: '2rem', fontWeight: 'bold', margin: '0.5rem 0'}}>{urbanCalculatorResult.deckMeters}</p>
                      <p style={{fontSize: '0.9rem', opacity: 0.9}}>Metros de deck</p>
                      <p style={{fontSize: '0.75rem', opacity: 0.7, marginTop: '0.5rem'}}>~17 kg por m²</p>
                    </div>
                  </div>

                  <div style={{marginTop: '1.5rem', padding: '1rem', background: 'rgba(255,215,0,0.2)', borderRadius: '8px', border: '1px solid rgba(255,215,0,0.4)'}}>
                    <p style={{margin: 0, fontSize: '0.9rem', lineHeight: '1.6'}}>
                      <strong>💡 Nota:</strong> Estas estimaciones asumen uso combinado de madera marina recuperada y plástico HDPE reciclado. Los valores reales pueden variar según diseño y especificaciones técnicas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN 8: PROCESO */}
        <section
          id="proceso"
          className="proceso-section"
          ref={el => el && (sectionsRef.current[7] = el)}
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

        {/* SECCIÓN 9: ECONOMÍA CIRCULAR Y RSC */}
        <section
          id="economia-circular"
          className="economia-circular-section"
          ref={el => el && (sectionsRef.current[8] = el)}
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
                        <h4>Economía Circular Triple</h4>
                        <p>Valorizamos residuos agrícolas, recuperamos madera marina y reciclamos plástico HDPE urbano</p>
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

                    <div className="commitment-item">
                      <div className="commitment-icon">
                        <Waves size={36} style={{color: '#1E90FF'}} />
                      </div>
                      <div className="commitment-text">
                        <h4>Protección Marina</h4>
                        <p>Evitamos que <strong>2,500 toneladas</strong> de basura lleguen al océano anualmente</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{marginTop: '3rem', padding: '2rem', background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%)', borderRadius: '16px', color: 'white'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
                    <Building2 size={32} />
                    El Gobierno de Santa Marta como Líder en Sostenibilidad
                  </h3>
                  <div style={{display: 'grid', gap: '1.5rem'}}>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'start'}}>
                      <div style={{minWidth: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Waves size={24} />
                      </div>
                      <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>Protegemos Nuestras Playas y Mares</h4>
                        <p style={{opacity: 0.9, lineHeight: '1.6'}}>Mediante proyectos de recolección de madera marina, evitamos contaminación oceánica y generamos recursos para infraestructura urbana.</p>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'start'}}>
                      <div style={{minWidth: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Recycle size={24} />
                      </div>
                      <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>Convertimos Basura en Solución Urbana</h4>
                        <p style={{opacity: 0.9, lineHeight: '1.6'}}>Colaboramos con recicladores locales para transformar plástico HDPE en mobiliario público de alta calidad y durabilidad.</p>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'start'}}>
                      <div style={{minWidth: '40px', height: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Shield size={24} />
                      </div>
                      <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>Mostramos Responsabilidad y Liderazgo</h4>
                        <p style={{opacity: 0.9, lineHeight: '1.6'}}>Posicionamos a Santa Marta como ciudad modelo en sostenibilidad, atrayendo turismo ecológico y mejorando la calidad de vida.</p>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '1rem', alignItems: 'start'}}>
                      <div style={{minWidth: '40px', height: '40px', background: 'rgba(255,215,0,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <Leaf size={24} style={{color: '#FFD700'}} />
                      </div>
                      <div>
                        <h4 style={{fontSize: '1.1rem', marginBottom: '0.5rem'}}>Alineados con Política de Basura Cero</h4>
                        <p style={{opacity: 0.9, lineHeight: '1.6'}}>Cumplimos objetivos nacionales de reducción de residuos mientras embellecemos espacios públicos como el malecón y el Parque de los Novios.</p>
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
                      <li>Valorización de residuos agrícolas y urbanos</li>
                      <li>Reducción de la deforestación</li>
                      <li>Limpieza de costas y protección marina</li>
                      <li>Disminución de disposición inadecuada de desechos</li>
                    </ul>
                  </div>

                  <div className="beneficio-card">
                    <div className="beneficio-header">
                      <DollarSign size={28} className="beneficio-icon" />
                      <h4>Económicos</h4>
                    </div>
                    <ul className="beneficio-list">
                      <li>Impulso a la economía circular rural y urbana</li>
                      <li>Generación de empleo rural y urbano</li>
                      <li>Producto más durable y de menor mantenimiento</li>
                      <li>Fortalecimiento del turismo sostenible</li>
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
                    className="ciclo-image clickable"
                    onClick={() => setPopupImage('Ciclo_cisco.png')}
                    style={{ cursor: 'pointer' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3850512/pexels-photo-3850512.jpeg?auto=compress&cs=tinysrgb&w=800';
                    }}
                  />
                  <div className="ciclo-caption">
                    <h4>El Ciclo de Transformación Continua</h4>
                    <div className="ciclo-steps">
                      <div className="step-item">
                        <span className="step-number">1</span>
                        <p>Recolección de tres fuentes: cisco de café, madera marina y HDPE urbano</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">2</span>
                        <p>Procesamiento y combinación con termoplásticos</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">3</span>
                        <p>Transformación en material WPC de alta calidad</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">4</span>
                        <p>Fabricación dual: viviendas rurales y mobiliario urbano</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">5</span>
                        <p>Uso prolongado (3x más duradero) y reciclaje al final de vida útil</p>
                      </div>
                      <div className="step-item">
                        <span className="step-number">6</span>
                        <p>Reinicio del ciclo: material 100% reciclable</p>
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

            <div className="logos-container" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem', alignItems: 'center', justifyItems: 'center', maxWidth: '900px', margin: '0 auto'}}>
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

              <div className="logo-wrapper santa-marta" style={{padding: '1.5rem', background: 'rgba(30, 144, 255, 0.1)', borderRadius: '12px', border: '2px dashed rgba(30, 144, 255, 0.3)', minHeight: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{textAlign: 'center'}}>
                  <Building2 size={48} style={{color: '#1E90FF', margin: '0 auto 0.5rem'}} />
                  <p style={{fontSize: '0.9rem', color: '#1E90FF', fontWeight: 'bold', margin: 0}}>Gobierno de</p>
                  <p style={{fontSize: '1.1rem', color: '#1E90FF', fontWeight: 'bold', margin: 0}}>Santa Marta</p>
                  <p style={{fontSize: '0.75rem', color: '#666', marginTop: '0.5rem'}}>(Logo próximamente)</p>
                </div>
              </div>
            </div>

            <p className="partnership-subtitle" style={{marginTop: '2rem'}}>
              Transformando comunidades cafeteras y ciudades costeras a través de la innovación sostenible
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