import { Component, ElementRef, HostListener, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';

interface Product {
  name: string;
  description: string;
  icon: string;
  abv: string;
  ibu: string;
  delay: string;
}

interface Event {
  day: string;
  month: string;
  name: string;
  location: string;
  time: string;
  delay: string;
}

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('historySection') historySection!: ElementRef;
  @ViewChild('productsSection') productsSection!: ElementRef;
  @ViewChild('eventsSection') eventsSection!: ElementRef;
  @ViewChild('ctaSection') ctaSection!: ElementRef;
  @ViewChild('gallerySection') gallerySection!: ElementRef;

  visibleSections = {
    hero: false,
    history: false,
    products: false,
    events: false,
    gallery: false,
    cta: false
  };

  // Carrossel
  carouselImages = [
    'splinter.jpeg',
    'splinter1.jpeg',
    'splinter2.jpeg'
  ];
  currentSlide = 0;
  private carouselInterval: any;

  products: Product[] = [
    {
      name: 'Chopp Pilsen',
      description: 'A versão mais leve e tradicional, focada em refrescância. Perfeita para qualquer ocasião.',
      icon: '🍺',
      abv: '4.5% ABV',
      ibu: '15 IBU',
      delay: '0s'
    },
    {
      name: 'Chopp Gold',
      description: 'Puro malte claro e equilibrado. Um dos carros-chefes da marca.',
      icon: '🏆',
      abv: '4.8% ABV',
      ibu: '18 IBU',
      delay: '0.1s'
    },
    {
      name: 'Chopp Weiss',
      description: 'De trigo, não filtrado, com notas de cravo e banana.',
      icon: '🌾',
      abv: '5.0% ABV',
      ibu: '12 IBU',
      delay: '0.2s'
    },
    {
      name: 'Chopp IPA',
      description: 'Maior carga de lúpulo com amargor e aromas cítricos/florais.',
      icon: '🍻',
      abv: '6.5% ABV',
      ibu: '45 IBU',
      delay: '0.3s'
    },
    {
      name: 'Munich Dunkel',
      description: 'Opção escura com notas de malte torrado e caramelo.',
      icon: '🍫',
      abv: '5.5% ABV',
      ibu: '22 IBU',
      delay: '0.4s'
    },
    {
      name: 'Chopp de Vinho',
      description: 'Combinação do frescor do chopp com sabor frutado do vinho.',
      icon: '🍷',
      abv: '5.0% ABV',
      ibu: '10 IBU',
      delay: '0.5s'
    }
  ];

  upcomingEvents: Event[] = [
    {
      day: '25',
      month: 'JAN',
      name: 'Ravache Experience',
      location: 'Ravache Tap House, Caieiras/SP',
      time: '12h às 22h',
      delay: '0s'
    },
    {
      day: '08',
      month: 'FEV',
      name: 'Festival de Verão',
      location: 'Praça da Matriz, Itu/SP',
      time: '14h às 23h',
      delay: '0.15s'
    },
    {
      day: '15',
      month: 'FEV',
      name: 'Carnaval do Chopp',
      location: 'Parque do Varvito, Itu/SP',
      time: '16h às 02h',
      delay: '0.3s'
    },
    {
      day: '01',
      month: 'MAR',
      name: 'Beer Garden Weekend',
      location: 'Choperia Ravache, Jacarepaguá/RJ',
      time: '12h às 00h',
      delay: '0.45s'
    }
  ];

  ngOnInit() {
    // Ativa a seção hero imediatamente
    setTimeout(() => {
      this.visibleSections.hero = true;
    }, 100);

    // Inicia o carrossel automático
    this.startCarousel();
  }

  ngAfterViewInit() {
    this.checkVisibility();
  }

  ngOnDestroy() {
    this.stopCarousel();
  }

  // Métodos do Carrossel
  startCarousel() {
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopCarousel() {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
    // Reinicia o timer ao clicar manualmente
    this.stopCarousel();
    this.startCarousel();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.checkVisibility();
  }

  private checkVisibility() {
    const windowHeight = window.innerHeight;
    const triggerPoint = windowHeight * 0.8;

    if (this.historySection?.nativeElement) {
      const rect = this.historySection.nativeElement.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        this.visibleSections.history = true;
      }
    }

    if (this.productsSection?.nativeElement) {
      const rect = this.productsSection.nativeElement.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        this.visibleSections.products = true;
      }
    }

    if (this.eventsSection?.nativeElement) {
      const rect = this.eventsSection.nativeElement.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        this.visibleSections.events = true;
      }
    }

    if (this.gallerySection?.nativeElement) {
      const rect = this.gallerySection.nativeElement.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        this.visibleSections.gallery = true;
      }
    }

    if (this.ctaSection?.nativeElement) {
      const rect = this.ctaSection.nativeElement.getBoundingClientRect();
      if (rect.top < triggerPoint) {
        this.visibleSections.cta = true;
      }
    }
  }
}
