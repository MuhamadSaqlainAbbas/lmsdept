import {animate, group, query, stagger, style, transition, trigger} from '@angular/animations';

export const FadeSlideIn = trigger('FadeSlideIn', [
  transition(':enter', [
    style({transform: 'translateX(-10%)', opacity: 0}),
    animate('200ms ease-out', style({transform: 'translateX(0%)', opacity: 1}))
  ])
]);

export function FadeSlideInDown(duration = '1000ms') {
  return trigger('FadeSlideInDown', [
    transition('* <=> *', [
      style({transform: 'translateY(-20%)', opacity: 0}),
      animate(duration + ' cubic-bezier(0.075, 0.820, 0.165, 1.000)', style({transform: 'translateY(0%)', opacity: 1}))
    ])
  ]);
}

export function SlideInFromLeft(duration = '1000ms') {
  return trigger('SlideInFromLeft', [
    transition('* <=> *', [
      style({transform: 'translateX(-100%)'}),
      animate(duration + ' cubic-bezier(0.190, 1.000, 0.220, 1.000)', style({transform: 'translateX(0%)'}))
    ])
  ]);
}


export const FadeIn = (duration = '1000ms') => {
  return trigger('FadeIn', [
    transition(':enter', [
      style({opacity: 0}),
      animate(duration + ' ease-out', style({opacity: 1}))
    ])
  ]);
};



