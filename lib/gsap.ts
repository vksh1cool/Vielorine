/**
 * GSAP Configuration Module
 * 
 * Registers ScrollTrigger plugin and exports configured gsap instance.
 * This module should only be imported in client-side components.
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

// Export configured instances
export { gsap, ScrollTrigger };

