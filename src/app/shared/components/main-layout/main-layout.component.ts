import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ModalAddPostComponent} from "../modal-add-post/modal-add-post.component";
import {RefDirective} from "../../ref.directive";
import {Subscription, timer} from "rxjs";
import {button} from "../../button.animation";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
  animations: [button]
})
export class MainLayoutComponent {

  subTimer: Subscription
  subModal: Subscription
  isShowButton: boolean = true

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective

  constructor(private resolver: ComponentFactoryResolver) {
  }

  showModalAddPost() {
    this.isShowButton = false
    this.subModal = timer(250).subscribe(() => {
        const modalAddPostFactory = this.resolver.resolveComponentFactory(ModalAddPostComponent)
        this.refDir.containerRef.clear()

        const component = this.refDir.containerRef.createComponent(modalAddPostFactory)

        component.instance.close.subscribe(() => {
          this.subTimer = timer(250).subscribe(() => {
            this.isShowButton = true
            this.refDir.containerRef.clear()
            this.subTimer.unsubscribe()
            this.subModal.unsubscribe()
          })
        })
      }
    )

  }
}
