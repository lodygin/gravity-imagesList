import {Component, ComponentFactoryResolver, ViewChild} from '@angular/core';
import {ModalAddPostComponent} from "../modal-add-post/modal-add-post.component";
import {RefDirective} from "../../ref.directive";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  @ViewChild(RefDirective, {static: false}) refDir: RefDirective

  constructor(private resolver: ComponentFactoryResolver) {
  }

  showAddImg() {
    const modalAddPostFactory = this.resolver.resolveComponentFactory(ModalAddPostComponent)
    this.refDir.containerRef.clear()

    const component = this.refDir.containerRef.createComponent(modalAddPostFactory)

    component.instance.close.subscribe(() => {
      this.refDir.containerRef.clear()
    })
  }
}
