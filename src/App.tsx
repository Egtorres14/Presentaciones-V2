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
    'Render_plataforma.jpg',
    'kioskos.png',
    'Imagen_render_mesas_sillas_jardineras.jpg',
    'Parque_de_los_novios-con-mesas-y-sillas.png',
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
      const sectionIds = ['hero', 'problema', 'transformacion', 'galeria', 'aplicaciones-urbanas', 'impacto', 'economia-circular'];
      
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
        <div className="progress-line" style={{ width: `${(currentSection + 1) * (100 / 7)}%` }}></div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-items">
        <a href="#hero" className={currentSection === 0 ? 'active' : ''}>Inicio</a>
        <a href="#problema" className={currentSection === 1 ? 'active' : ''}>Problema</a>
        <a href="#transformacion" className={currentSection === 2 ? 'active' : ''}>Solución</a>
        <a href="#galeria" className={currentSection === 3 ? 'active' : ''}>Galería</a>
        <a href="#aplicaciones-urbanas" className={currentSection === 4 ? 'active' : ''}>Urbano</a>
        <a href="#impacto" className={currentSection === 5 ? 'active' : ''}>Impacto</a>
        <a href="#economia-circular" className={currentSection === 6 ? 'active' : ''}>RSC</a>
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
              src="/images/Banner.png"
              alt="Transformando residuos en recursos sostenibles"
              className="hero-image"
              onError={(e) => {
                console.warn('Banner.png failed to load, falling back to default');
                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/894695/pexels-photo-894695.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop';
              }}
              onLoad={(e) => {
                const img = e.target as HTMLImageElement;
                console.log(`Banner loaded successfully: ${img.src}`);
                console.log(`Banner dimensions: ${img.naturalWidth} x ${img.naturalHeight}`);
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
          style={{minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0 2rem 0'}}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container" style={{maxWidth: '1400px', margin: '0 auto', width: '100%'}}>
            <h2 className="section-title slide-up visible" style={{marginBottom: '1.5rem', fontSize: '2.2rem', paddingRight: '180px'}}>
              El Desafío Ambiental: De Residuos a Recursos
            </h2>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start'}}>

              {/* COLUMNA IZQUIERDA: PROBLEMA URBANO (PRIORIDAD) */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(30, 58, 138, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Waves size={40} style={{color: '#60A5FA'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Contaminación Marina</h3>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Santa Marta y Costa Caribe</p>
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
                    <div style={{background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', textAlign: 'center'}}>
                      <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#FFD700', margin: 0}}>~2,500</p>
                      <p style={{color: 'white', fontSize: '0.8rem', margin: '0.25rem 0 0 0'}}>ton madera/año al mar</p>
                    </div>
                    <div style={{background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', textAlign: 'center'}}>
                      <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#FF6347', margin: 0}}>~3,800</p>
                      <p style={{color: 'white', fontSize: '0.8rem', margin: '0.25rem 0 0 0'}}>ton HDPE/mes</p>
                    </div>
                  </div>

                  <div style={{marginTop: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.2)', borderRadius: '8px', borderLeft: '4px solid #EF4444'}}>
                    <p style={{color: 'white', fontSize: '0.85rem', margin: 0, lineHeight: '1.4'}}>
                      <strong>Impacto Crítico:</strong> Deterioro ecosistema, afectación turismo. Recursos transformables en infraestructura sostenible.
                    </p>
                  </div>
                </div>

                {/* Estadísticas urbanas compactas */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
                  <div style={{background: 'rgba(30, 144, 255, 0.1)', padding: '0.75rem', borderRadius: '12px', border: '2px solid rgba(30, 144, 255, 0.3)', textAlign: 'center'}}>
                    <Trash2 size={28} style={{color: '#1E90FF', margin: '0 auto 0.25rem'}} />
                    <p style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#1E90FF', margin: '0.15rem 0'}}>85%</p>
                    <p style={{fontSize: '0.75rem', color: '#334155'}}>no reciclado</p>
                  </div>
                  <div style={{background: 'rgba(34, 139, 34, 0.1)', padding: '0.75rem', borderRadius: '12px', border: '2px solid rgba(34, 139, 34, 0.3)', textAlign: 'center'}}>
                    <Anchor size={28} style={{color: '#228B22', margin: '0 auto 0.25rem'}} />
                    <p style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#228B22', margin: '0.15rem 0'}}>100%</p>
                    <p style={{fontSize: '0.75rem', color: '#334155'}}>recuperable</p>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: PROBLEMA RURAL (SECUNDARIO) */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(120, 53, 15, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Coffee size={40} style={{color: '#D97706'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Residuo Agrícola</h3>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Cisco de café en Colombia</p>
                    </div>
                  </div>

                  <div style={{background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', textAlign: 'center', marginBottom: '1rem'}}>
                    <p style={{fontSize: '2rem', fontWeight: 'bold', color: '#FCD34D', margin: 0, lineHeight: 1}}>
                      <span id="contador">195,000</span>+
                    </p>
                    <p style={{color: 'white', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>ton anuales cisco</p>
                    <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', margin: '0.25rem 0 0 0'}}>
                      De <span id="productionCounter">14</span>M sacos café/año
                    </p>
                  </div>

                  <div style={{marginTop: '1rem', padding: '0.75rem', background: 'rgba(217, 119, 6, 0.2)', borderRadius: '8px', borderLeft: '4px solid #D97706'}}>
                    <p style={{color: 'white', fontSize: '0.85rem', margin: 0, lineHeight: '1.4'}}>
                      <strong>Oportunidad:</strong> Cisco = <span id="ciscoPercentage" style={{fontWeight: 'bold'}}>22</span>% peso café. Materia prima para WPC.
                    </p>
                  </div>
                </div>

                {/* Estadísticas rurales compactas */}
                <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem'}}>
                  <div style={{background: 'rgba(139, 69, 19, 0.1)', padding: '0.75rem', borderRadius: '12px', border: '2px solid rgba(139, 69, 19, 0.3)', textAlign: 'center'}}>
                    <Factory size={28} style={{color: '#8B4513', margin: '0 auto 0.25rem'}} />
                    <p style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#8B4513', margin: '0.15rem 0'}}>540K</p>
                    <p style={{fontSize: '0.75rem', color: '#334155'}}>familias cafeteras</p>
                  </div>
                  <div style={{background: 'rgba(255, 99, 71, 0.1)', padding: '0.75rem', borderRadius: '12px', border: '2px solid rgba(255, 99, 71, 0.3)', textAlign: 'center'}}>
                    <AlertTriangle size={28} style={{color: '#FF6347', margin: '0 auto 0.25rem'}} />
                    <p style={{fontSize: '1.3rem', fontWeight: 'bold', color: '#FF6347', margin: '0.15rem 0'}}>85%</p>
                    <p style={{fontSize: '0.75rem', color: '#334155'}}>sin aprovechar</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CONCLUSIÓN UNIFICADA */}
            <div className="slide-up visible" style={{marginTop: '1.5rem', padding: '1.25rem', background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)', borderRadius: '16px', border: '2px solid rgba(34, 139, 34, 0.3)', textAlign: 'center'}}>
              <Recycle size={36} style={{color: '#228B22', margin: '0 auto 0.5rem'}} />
              <p style={{fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: 0, lineHeight: '1.6'}}>
                <strong style={{color: '#228B22'}}>Triple Solución:</strong> Limpiamos costas, valorizamos residuos urbanos y aprovechamos cisco de café para crear mobiliario sostenible y viviendas accesibles.
              </p>
            </div>
          </div>
          <div className="particles-container"></div>
        </section>

        {/* SECCIÓN 3: TRANSFORMACIÓN */}
        <section
          id="transformacion"
          className="transformacion-section"
          ref={el => el && (sectionsRef.current[2] = el)}
          style={{minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0 2rem 0'}}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container" style={{maxWidth: '1400px', margin: '0 auto', width: '100%'}}>
            <h2 className="section-title slide-up visible" style={{marginBottom: '1rem', fontSize: '2.2rem', paddingRight: '180px'}}>
              La Solución: Tecnología WPC
            </h2>
            <p style={{fontSize: '1rem', color: '#475569', marginBottom: '2rem', paddingRight: '180px', lineHeight: '1.6'}}>
              <strong>Compuestos de Plástico-Madera (WPC):</strong> Materiales híbridos que transforman residuos en infraestructura sostenible de alta calidad.
            </p>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start'}}>

              {/* COLUMNA IZQUIERDA: SOLUCIÓN URBANA (PRIORIDAD) */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(15, 118, 110, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Building2 size={40} style={{color: '#5eead4'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Mobiliario Urbano Costero</h3>
                      <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Madera Marina + HDPE Reciclado</p>
                    </div>
                  </div>

                  <div style={{background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem'}}>
                    <p style={{color: 'white', fontSize: '0.9rem', lineHeight: '1.5', margin: 0}}>
                      Recuperamos madera del mar y combinamos con plástico HDPE urbano para crear mobiliario resistente al ambiente marino.
                    </p>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem'}}>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                      <Shield size={24} style={{color: '#5eead4', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>3x</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>más duradero</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                      <Waves size={24} style={{color: '#5eead4', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>100%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>resistente sal</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                      <Zap size={24} style={{color: '#5eead4', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>0%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>mantenimiento</p>
                    </div>
                  </div>
                </div>

                {/* Aplicaciones Urbanas */}
                <div style={{background: 'rgba(15, 118, 110, 0.1)', padding: '1rem', borderRadius: '12px', border: '2px solid rgba(15, 118, 110, 0.3)'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', color: '#0f766e', margin: '0 0 0.75rem 0'}}>Aplicaciones Principales</h4>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#14b8a6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Bancas y mobiliario de malecón</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#14b8a6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Kioscos y estructuras de playa</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#14b8a6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Decks para eventos culturales</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#14b8a6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Jardineras y elementos decorativos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: SOLUCIÓN RURAL (SECUNDARIA) */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #92400e 0%, #c2410c 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(146, 64, 14, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Home size={40} style={{color: '#fdba74'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Viviendas Rurales</h3>
                      <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Cisco de Café + HDPE</p>
                    </div>
                  </div>

                  <div style={{background: 'rgba(255,255,255,0.15)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem'}}>
                    <p style={{color: 'white', fontSize: '0.9rem', lineHeight: '1.5', margin: 0}}>
                      Aprovechamos el cisco de café local mezclado con HDPE para crear materiales de construcción accesibles para comunidades cafeteras.
                    </p>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem'}}>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                      <TrendingDown size={24} style={{color: '#fdba74', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>35%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>menos costo</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                      <Recycle size={24} style={{color: '#fdba74', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>100%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>reciclable</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: '8px'}}>
                      <Leaf size={24} style={{color: '#fdba74', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>55%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>cisco café</p>
                    </div>
                  </div>
                </div>

                {/* Aplicaciones Rurales */}
                <div style={{background: 'rgba(146, 64, 14, 0.1)', padding: '1rem', borderRadius: '12px', border: '2px solid rgba(146, 64, 14, 0.3)'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', color: '#92400e', margin: '0 0 0.75rem 0'}}>Componentes de Vivienda</h4>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#c2410c', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Pisos y techos de bajo costo</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#c2410c', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Paredes y divisiones internas</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#c2410c', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Puertas y ventanas resistentes</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#c2410c', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Mobiliario básico del hogar</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BENEFICIOS UNIFICADOS */}
            <div className="slide-up visible" style={{marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem'}}>
              <div style={{padding: '1rem', background: 'rgba(34, 139, 34, 0.1)', borderRadius: '12px', textAlign: 'center', border: '2px solid rgba(34, 139, 34, 0.3)'}}>
                <Recycle size={32} style={{color: '#228B22', margin: '0 auto 0.5rem'}} />
                <p style={{fontSize: '0.95rem', fontWeight: 'bold', color: '#1e293b', margin: '0.25rem 0'}}>Economía Circular</p>
                <p style={{fontSize: '0.8rem', color: '#64748b', margin: 0}}>Triple valorización de residuos</p>
              </div>
              <div style={{padding: '1rem', background: 'rgba(37, 99, 235, 0.1)', borderRadius: '12px', textAlign: 'center', border: '2px solid rgba(37, 99, 235, 0.3)'}}>
                <Shield size={32} style={{color: '#2563eb', margin: '0 auto 0.5rem'}} />
                <p style={{fontSize: '0.95rem', fontWeight: 'bold', color: '#1e293b', margin: '0.25rem 0'}}>Alta Durabilidad</p>
                <p style={{fontSize: '0.8rem', color: '#64748b', margin: 0}}>Resistente a agua, sol y termitas</p>
              </div>
              <div style={{padding: '1rem', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '12px', textAlign: 'center', border: '2px solid rgba(34, 197, 94, 0.3)'}}>
                <DollarSign size={32} style={{color: '#22c55e', margin: '0 auto 0.5rem'}} />
                <p style={{fontSize: '0.95rem', fontWeight: 'bold', color: '#1e293b', margin: '0.25rem 0'}}>Accesible</p>
                <p style={{fontSize: '0.8rem', color: '#64748b', margin: 0}}>Hasta 35% más económico</p>
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
            <h2 className="section-title">Galería de Aplicaciones Urbanas</h2>
            <p className="section-subtitle">Visualiza el mobiliario sostenible para espacios públicos de Santa Marta</p>
            
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

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease', cursor: 'pointer'}} onClick={() => openGalleryPopup('Banquillo-imagen-real.jpg')}>
                <div style={{height: '240px', overflow: 'hidden', position: 'relative'}}>
                  <img src="/images/Banquillo-imagen-real.jpg" alt="Banquillo real instalado" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3184436/pexels-photo-3184436.jpeg?auto=compress&cs=tinysrgb&w=800'; }} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(34, 139, 34, 0.9)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Proyecto Real
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Banquillos de WPC</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Banquillos instalados en espacios públicos, fabricados con material compuesto de alta resistencia y bajo mantenimiento.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Instalado</span>
                    <span style={{background: '#fef3c7', color: '#92400e', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Resistente</span>
                  </div>
                </div>
              </div>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease', cursor: 'pointer'}} onClick={() => openGalleryPopup('estructura para playas.jpg')}>
                <div style={{height: '240px', overflow: 'hidden', position: 'relative'}}>
                  <img src="/images/estructura para playas.jpg" alt="Estructura para playas" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/2291004/pexels-photo-2291004.jpeg?auto=compress&cs=tinysrgb&w=800'; }} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(34, 139, 34, 0.9)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Proyecto Real
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Kiosco de Playa Modular</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Estructura modular instalada en zona costera. Ideal para servicios turísticos con máxima resistencia al ambiente marino.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Resistente a sal</span>
                    <span style={{background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Implementado</span>
                  </div>
                </div>
              </div>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease', cursor: 'pointer'}} onClick={() => openGalleryPopup('Jardineras-real.jpg')}>
                <div style={{height: '240px', overflow: 'hidden', position: 'relative'}}>
                  <img src="/images/Jardineras-real.jpg" alt="Jardineras reales instaladas" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800'; }} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(34, 139, 34, 0.9)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Proyecto Real
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Jardineras de WPC</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Jardineras modulares instaladas en espacios públicos. Combinan funcionalidad paisajística con materiales sostenibles de larga duración.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Instalado</span>
                    <span style={{background: '#fce7f3', color: '#9f1239', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Decorativo</span>
                  </div>
                </div>
              </div>

              <div className="urban-app-card" style={{background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', transition: 'transform 0.3s ease', cursor: 'pointer'}} onClick={() => openGalleryPopup('kiosko.jpg')}>
                <div style={{height: '240px', overflow: 'hidden', position: 'relative'}}>
                  <img src="/images/kiosko.jpg" alt="Kiosko real instalado" style={{width: '100%', height: '100%', objectFit: 'cover'}} onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=800'; }} />
                  <div style={{position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(34, 139, 34, 0.9)', padding: '0.5rem 1rem', borderRadius: '20px', color: 'white', fontSize: '0.85rem', fontWeight: 'bold'}}>
                    Proyecto Real
                  </div>
                </div>
                <div style={{padding: '1.5rem'}}>
                  <h3 style={{fontSize: '1.4rem', marginBottom: '0.5rem', color: '#1e3a8a'}}>Kiosko Multifuncional</h3>
                  <p style={{color: '#666', lineHeight: '1.6', marginBottom: '1rem'}}>
                    Kiosko instalado con estructura completa de WPC. Ofrece protección y funcionalidad para distintos usos en espacios públicos.
                  </p>
                  <div style={{display: 'flex', gap: '0.5rem', flexWrap: 'wrap'}}>
                    <span style={{background: '#dcfce7', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Implementado</span>
                    <span style={{background: '#e0f2fe', color: '#0369a1', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem'}}>Duradero</span>
                  </div>
                </div>
              </div>

            </div>

            <div style={{marginTop: '3rem', padding: '2rem', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', border: '2px solid rgba(255,255,255,0.2)'}}>
              <p style={{color: 'white', fontSize: '1.1rem', textAlign: 'center', margin: 0, lineHeight: '1.8'}}>
                <strong style={{color: '#FFD700'}}>✓ Proyectos Reales Implementados:</strong> Estos son ejemplos tangibles de mobiliario urbano de WPC ya instalado.
                Soluciones sostenibles comprobadas listas para adaptarse a espacios públicos de Santa Marta.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 6: IMPACTO SOCIAL */}
        <section
          id="impacto"
          className="impacto-section"
          ref={el => el && (sectionsRef.current[5] = el)}
          style={{minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0 2rem 0'}}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container" style={{maxWidth: '1400px', margin: '0 auto', width: '100%'}}>
            <h2 className="section-title slide-up visible" style={{marginBottom: '1rem', fontSize: '2.2rem', paddingRight: '180px'}}>
              Impacto Social: Doble Beneficio
            </h2>
            <p style={{fontSize: '1rem', color: '#475569', marginBottom: '2rem', paddingRight: '180px', lineHeight: '1.6'}}>
              Transformamos residuos en oportunidades económicas para ciudades y comunidades rurales.
            </p>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start'}}>

              {/* COLUMNA IZQUIERDA: IMPACTO URBANO (PRIORIDAD) */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(30, 64, 175, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Building2 size={40} style={{color: '#93c5fd'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Impacto Urbano</h3>
                      <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Santa Marta y Costa Caribe</p>
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem'}}>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <Waves size={24} style={{color: '#93c5fd', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.15rem 0'}}>2,500</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>ton basura/año evitadas</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <Recycle size={24} style={{color: '#93c5fd', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.15rem 0'}}>3,800</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>ton HDPE/mes</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <Shield size={24} style={{color: '#93c5fd', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.15rem 0'}}>85%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>+ durabilidad</p>
                    </div>
                  </div>

                  <div style={{padding: '0.75rem', background: 'rgba(59, 130, 246, 0.3)', borderRadius: '8px', borderLeft: '4px solid #60a5fa'}}>
                    <p style={{color: 'white', fontSize: '0.85rem', margin: 0, lineHeight: '1.4'}}>
                      <strong>Santa Marta Líder:</strong> Embellecemos espacios públicos, protegemos costas y fortalecemos turismo ecológico.
                    </p>
                  </div>
                </div>

                {/* Beneficios Urbanos */}
                <div style={{background: 'rgba(30, 64, 175, 0.1)', padding: '1rem', borderRadius: '12px', border: '2px solid rgba(30, 64, 175, 0.3)'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', color: '#1e40af', margin: '0 0 0.75rem 0'}}>Beneficios Clave</h4>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Protección y limpieza marina</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Mobiliario público duradero</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Turismo sostenible potenciado</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Empleo en recolección y reciclaje</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#3b82f6', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Ciudad modelo en sostenibilidad</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: IMPACTO RURAL (SECUNDARIO) */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #78350f 0%, #92400e 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(120, 53, 15, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Users size={40} style={{color: '#fdba74'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Impacto Rural</h3>
                      <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Comunidades cafeteras</p>
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '1rem'}}>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <Users size={24} style={{color: '#fdba74', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.15rem 0'}}>540K</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>familias</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <DollarSign size={24} style={{color: '#fdba74', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.15rem 0'}}>35%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>ahorro</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <TreePine size={24} style={{color: '#fdba74', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.3rem', fontWeight: 'bold', margin: '0.15rem 0'}}>78K</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>ton CO₂ evitadas</p>
                    </div>
                  </div>

                  <div style={{padding: '0.75rem', background: 'rgba(194, 65, 12, 0.3)', borderRadius: '8px', borderLeft: '4px solid #f97316'}}>
                    <p style={{color: 'white', fontSize: '0.85rem', margin: 0, lineHeight: '1.4'}}>
                      <strong>Círculo Virtuoso:</strong> Familias reducen costos en vivienda y contribuyen a sostenibilidad ambiental.
                    </p>
                  </div>
                </div>

                {/* Beneficios Rurales */}
                <div style={{background: 'rgba(120, 53, 15, 0.1)', padding: '1rem', borderRadius: '12px', border: '2px solid rgba(120, 53, 15, 0.3)'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', color: '#78350f', margin: '0 0 0.75rem 0'}}>Beneficios Clave</h4>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#92400e', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Vivienda accesible para cafeteros</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#92400e', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Valorización del cisco de café</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#92400e', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Reducción huella ambiental</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#92400e', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Empleo en procesamiento</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#92400e', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Economía circular cafetera</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* IMPACTO GENERAL */}
            <div className="slide-up visible" style={{marginTop: '1.5rem', padding: '1.25rem', background: 'linear-gradient(135deg, rgba(34, 139, 34, 0.15) 0%, rgba(22, 163, 74, 0.15) 100%)', borderRadius: '16px', border: '2px solid rgba(34, 139, 34, 0.3)', textAlign: 'center'}}>
              <Leaf size={36} style={{color: '#228B22', margin: '0 auto 0.5rem'}} />
              <p style={{fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: 0, lineHeight: '1.6'}}>
                <strong style={{color: '#228B22'}}>Impacto Dual Comprobado:</strong> Transformamos desafíos ambientales urbanos y rurales en soluciones económicas sostenibles que benefician a toda la región.
              </p>
            </div>
          </div>
        </section>

        {/* SECCIÓN 7: ECONOMÍA CIRCULAR Y RSC */}
        <section
          id="economia-circular"
          className="economia-circular-section"
          ref={el => el && (sectionsRef.current[6] = el)}
          style={{minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '4rem 0 2rem 0'}}
        >
          <div className="contact-watermark">
            <div className="watermark-content">
              <p className="watermark-name">Juan Velásquez</p>
              <p className="watermark-phone">3104290020</p>
              <p className="watermark-email">jfvelasq@yahoo.com</p>
            </div>
          </div>
          <div className="container" style={{maxWidth: '1400px', margin: '0 auto', width: '100%'}}>
            <h2 className="section-title slide-up visible" style={{marginBottom: '1rem', fontSize: '2.2rem', paddingRight: '180px'}}>
              Responsabilidad Social y Ambiental
            </h2>
            <p style={{fontSize: '1rem', color: '#475569', marginBottom: '2rem', paddingRight: '180px', lineHeight: '1.6'}}>
              Compromiso con el desarrollo sostenible y la economía circular triple.
            </p>

            {/* ENFOQUE PRINCIPAL: GOBIERNO COMO LÍDER */}
            <div className="slide-up visible" style={{marginBottom: '2rem', padding: '1.5rem', background: 'linear-gradient(135deg, #1e40af 0%, #2563eb 100%)', borderRadius: '16px', color: 'white', boxShadow: '0 8px 24px rgba(30, 64, 175, 0.3)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                <Building2 size={36} style={{color: '#93c5fd'}} />
                <h3 style={{fontSize: '1.6rem', margin: 0}}>Santa Marta: Ciudad Líder en Sostenibilidad</h3>
              </div>
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem'}}>
                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'start'}}>
                  <div style={{minWidth: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <Waves size={18} />
                  </div>
                  <div>
                    <h4 style={{fontSize: '0.95rem', marginBottom: '0.25rem', fontWeight: 'bold'}}>Protección Costera</h4>
                    <p style={{opacity: 0.9, lineHeight: '1.4', fontSize: '0.85rem', margin: 0}}>Limpieza marina y recuperación de residuos para infraestructura urbana.</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'start'}}>
                  <div style={{minWidth: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <Recycle size={18} />
                  </div>
                  <div>
                    <h4 style={{fontSize: '0.95rem', marginBottom: '0.25rem', fontWeight: 'bold'}}>Reciclaje Urbano</h4>
                    <p style={{opacity: 0.9, lineHeight: '1.4', fontSize: '0.85rem', margin: 0}}>Transformación de HDPE en mobiliario público duradero.</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'start'}}>
                  <div style={{minWidth: '32px', height: '32px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <Shield size={18} />
                  </div>
                  <div>
                    <h4 style={{fontSize: '0.95rem', marginBottom: '0.25rem', fontWeight: 'bold'}}>Liderazgo Nacional</h4>
                    <p style={{opacity: 0.9, lineHeight: '1.4', fontSize: '0.85rem', margin: 0}}>Ciudad modelo en sostenibilidad y turismo ecológico.</p>
                  </div>
                </div>
                <div style={{display: 'flex', gap: '0.75rem', alignItems: 'start'}}>
                  <div style={{minWidth: '32px', height: '32px', background: 'rgba(255,215,0,0.3)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                    <Leaf size={18} style={{color: '#FFD700'}} />
                  </div>
                  <div>
                    <h4 style={{fontSize: '0.95rem', marginBottom: '0.25rem', fontWeight: 'bold'}}>Basura Cero</h4>
                    <p style={{opacity: 0.9, lineHeight: '1.4', fontSize: '0.85rem', margin: 0}}>Alineados con política nacional, embellecemos malecón y Parque de los Novios.</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start'}}>

              {/* COLUMNA IZQUIERDA: ECONOMÍA CIRCULAR URBANA */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(5, 150, 105, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <Recycle size={40} style={{color: '#6ee7b7'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Economía Circular Urbana</h3>
                      <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Triple valorización de residuos</p>
                    </div>
                  </div>

                  <div style={{display: 'grid', gap: '0.75rem'}}>
                    <div style={{display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', alignItems: 'center'}}>
                      <Waves size={24} style={{color: '#6ee7b7'}} />
                      <div>
                        <p style={{color: 'white', fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.15rem 0'}}>Madera Marina</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0}}>2,500 ton/año recuperadas del mar</p>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', alignItems: 'center'}}>
                      <Recycle size={24} style={{color: '#6ee7b7'}} />
                      <div>
                        <p style={{color: 'white', fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.15rem 0'}}>Plástico HDPE</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0}}>3,800 ton/mes recicladas</p>
                      </div>
                    </div>
                    <div style={{display: 'flex', gap: '0.75rem', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px', alignItems: 'center'}}>
                      <Coffee size={24} style={{color: '#6ee7b7'}} />
                      <div>
                        <p style={{color: 'white', fontSize: '0.9rem', fontWeight: 'bold', margin: '0 0 0.15rem 0'}}>Cisco de Café</p>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.8rem', margin: 0}}>Complemento para viviendas rurales</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Beneficios Ambientales */}
                <div style={{background: 'rgba(5, 150, 105, 0.1)', padding: '1rem', borderRadius: '12px', border: '2px solid rgba(5, 150, 105, 0.3)'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', color: '#059669', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <TreePine size={20} />
                    Beneficios Ambientales
                  </h4>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#10b981', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Limpieza de costas y océanos</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#10b981', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Reducción 40-60% emisiones CO₂</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#10b981', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Disminución deforestación</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#10b981', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Valorización integral de residuos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA: BENEFICIOS SOCIOECONÓMICOS */}
              <div className="slide-up visible">
                <div style={{background: 'linear-gradient(135deg, #ca8a04 0%, #eab308 100%)', padding: '1.5rem', borderRadius: '16px', marginBottom: '1rem', boxShadow: '0 8px 24px rgba(202, 138, 4, 0.3)'}}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
                    <DollarSign size={40} style={{color: '#fef08a'}} />
                    <div>
                      <h3 style={{color: 'white', fontSize: '1.5rem', margin: 0}}>Beneficios Económicos</h3>
                      <p style={{color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: '0.25rem 0 0 0'}}>Desarrollo sostenible regional</p>
                    </div>
                  </div>

                  <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem'}}>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <Users size={24} style={{color: '#fef08a', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>Empleo</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>urbano y rural</p>
                    </div>
                    <div style={{textAlign: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.15)', borderRadius: '8px'}}>
                      <TrendingDown size={24} style={{color: '#fef08a', margin: '0 auto 0.25rem'}} />
                      <p style={{color: 'white', fontSize: '1.2rem', fontWeight: 'bold', margin: '0.15rem 0'}}>-35%</p>
                      <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '0.7rem', margin: 0}}>costos vivienda</p>
                    </div>
                  </div>

                  <div style={{padding: '0.75rem', background: 'rgba(234, 179, 8, 0.3)', borderRadius: '8px', borderLeft: '4px solid #fde047'}}>
                    <p style={{color: 'white', fontSize: '0.85rem', margin: 0, lineHeight: '1.4'}}>
                      <strong>Turismo Sostenible:</strong> Espacios públicos embellecidos atraen turismo ecológico y mejoran calidad de vida.
                    </p>
                  </div>
                </div>

                {/* Respaldo Institucional */}
                <div style={{background: 'rgba(202, 138, 4, 0.1)', padding: '1rem', borderRadius: '12px', border: '2px solid rgba(202, 138, 4, 0.3)'}}>
                  <h4 style={{fontSize: '1rem', fontWeight: 'bold', color: '#ca8a04', margin: '0 0 0.75rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <Shield size={20} />
                    Respaldo Institucional
                  </h4>
                  <div style={{display: 'grid', gap: '0.5rem'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#eab308', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Plan Nacional de Desarrollo</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#eab308', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Política de Basura Cero</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#eab308', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Economía circular nacional</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                      <div style={{width: '6px', height: '6px', background: '#eab308', borderRadius: '50%'}}></div>
                      <p style={{fontSize: '0.85rem', margin: 0}}>Objetivos de desarrollo sostenible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* MENSAJE FINAL */}
            <div className="slide-up visible" style={{marginTop: '1.5rem', padding: '1.25rem', background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)', borderRadius: '16px', border: '2px solid rgba(37, 99, 235, 0.3)', textAlign: 'center'}}>
              <Recycle size={36} style={{color: '#2563eb', margin: '0 auto 0.5rem'}} />
              <p style={{fontSize: '1rem', fontWeight: '600', color: '#1e293b', margin: 0, lineHeight: '1.6'}}>
                <strong style={{color: '#2563eb'}}>De Residuo a Oportunidad:</strong> Compromiso real con un futuro sostenible que transforma desafíos ambientales en prosperidad regional.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="partnership-footer-section" style={{background: 'linear-gradient(135deg, #2d5016 0%, #1a3009 100%)', padding: '3rem 0', minHeight: '200px'}}>
        <div className="partnership-container">
          <div className="partnership-content">
            <h3 className="partnership-title" style={{fontSize: '1.5rem', marginBottom: '1rem', color: '#e2e8f0'}}>Innovación Sostenible para un Futuro Verde</h3>
            <p className="partnership-subtitle" style={{fontSize: '1rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto'}}>
              Transformando residuos en oportunidades a través de tecnología WPC
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