import {animate, style, transition, trigger} from "@angular/animations";

export const backdrop = trigger('backdrop', [
  transition(':enter', [
    style(
      {opacity: 0}
    ),
    animate('150ms ease-in-out')
  ]),
  transition(':leave', [
    animate('150ms ease-in-out', style(
      {opacity: 0}
    ))
  ])
])

export const modalWindow = trigger('modalWindow', [
  transition(':enter', [
    style(
      {top: '-100%'}
    ),
    animate('250ms ease-in-out')
  ]),
  transition(':leave', [
    animate('250ms ease-in-out', style(
      {top: '-100%'}
    ))
  ])
])
