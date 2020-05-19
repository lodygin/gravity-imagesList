import {animate, style, transition, trigger} from "@angular/animations";

export const button = trigger('button', [
  transition(':enter', [
    style(
      {left: '100%'}
    ),
    animate('250ms ease-in-out')
  ]),
  transition(':leave', [
    animate('250ms ease-in-out', style(
      {left: '100%'}
    ))
  ])
])
