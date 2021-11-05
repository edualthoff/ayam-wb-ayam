import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Unsubscribable } from 'rxjs';

@Directive({
  selector: '[appValidEditorTexto]'
})
export class EditorTextoDirective implements OnInit, OnDestroy {

  private unsubscript: Unsubscribable;

  constructor(private render: Renderer2, private el: ElementRef, private control: NgControl) {
  }

  ngOnInit(): void {
    this.unsubscript = this.control.statusChanges.subscribe(
      (x) => {
        if (x === 'VALID') {
          this.render.removeClass(this.el.nativeElement.getElementsByClassName('angular-editor-textarea').item(0), 'app-warn-invalid');
        } else if (x === 'INVALID') {
          this.render.addClass(this.el.nativeElement.getElementsByClassName('angular-editor-textarea').item(0), 'app-warn-invalid');
        }
    });
  }

  ngOnDestroy(): void {
    this.unsubscript.unsubscribe();
  }
}
