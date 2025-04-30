import { Component, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-landing',
  standalone: false,

  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  constructor() {
    gsap.registerPlugin(ScrollTrigger);
  }

  ngOnInit() {
    // Hero section animations
    gsap.from('.gsap-hero-title', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.gsap-hero-content',
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.gsap-hero-description', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      delay: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.gsap-hero-content',
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.gsap-hero-buttons', {
      opacity: 0,
      y: 30,
      duration: 1.5,
      delay: 0.4,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.gsap-hero-content',
        start: 'top center',
        toggleActions: 'play none none reverse'
      }
    });

    // Floating card animation
    gsap.from('.gsap-float-card', {
      opacity: 0,
      y: 50,
      duration: 1.8,
      delay: 0.6,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.gsap-hero-content',
        start: 'top 60%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.to('.gsap-float-card', {
      y: -20,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 2
    });

    gsap.from('.gsap-feature-card', {
      opacity: 0,
      y: 40,
      scale: 0.95,
      duration: 1.2,
      stagger: 0.25,
      ease: 'back.out(1.4)',
      scrollTrigger: {
        trigger: '.features-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Marketplace cards animation
    gsap.from('.gsap-marketplace-card', {
      opacity: 0,
      x: -30,
      y: 20,
      scale: 0.95,
      duration: 1.2,
      stagger: 0.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '#marketplace',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    gsap.from('.gsap-user-card', {
      opacity: 0,
      y: 25,
      rotation: 3,
      duration: 1.2,
      stagger: 0.2,
      ease: 'elastic.out(1, 0.8)',
      scrollTrigger: {
        trigger: '#top-users',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }
}
