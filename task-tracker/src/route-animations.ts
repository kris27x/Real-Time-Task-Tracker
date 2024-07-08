import { trigger, transition, style, query, group, animate, animateChild } from '@angular/animations';

// Route animation trigger
export const slideInAnimation = trigger('routeAnimations', [
  // Define transition between any two states
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'scale(0.9) translateY(10%)'
      })
    ], { optional: true }),
    // Initial state of the new page
    query(':enter', [
      style({ opacity: 0, transform: 'scale(0.9) translateY(10%)' })
    ], { optional: true }),
    // Animate the old page out
    query(':leave', animateChild(), { optional: true }),
    group([
      // Move page off screen right on leave
      query(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'scale(1.1) translateY(-10%)' }))
      ], { optional: true }),
      // Move page in screen from left to right
      query(':enter', [
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ], { optional: true })
    ]),
    // Animate the new page in
    query(':enter', animateChild(), { optional: true }),
  ])
]);
