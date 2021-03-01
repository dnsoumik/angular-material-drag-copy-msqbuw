import {
  Component, ElementRef, ViewChild
} from '@angular/core';
import { MatList } from '@angular/material';
import { CdkDragStart, CdkDragMove, CdkDragDrop, moveItemInArray, copyArrayItem } from '@angular/cdk/drag-drop';

@Component({
  styles: [`
.field-placeholder {
  background: #ccc;
  border: dotted 3px #999;
  min-height: 60px;
  transition: transform 250ms cubic-bezier(0, 0, 0.2, 1);
}

fieldset {
  height: 300px;
}

mat-list-item {
  display: block !important;
}
`],
  selector: 'material-app',
  templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(MatList, { read: ElementRef }) child: ElementRef;

  _currentIndex;
  _currentField;

  types = [
    'boolean',
    'string',
    'text',
    'user'
  ]

  fields: string[] = [];

  dragStart(event: CdkDragStart) {
    this._currentIndex = this.types.indexOf(event.source.data); // Get index of dragged type
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
  }

  moved(event: CdkDragMove) {
    // Check if stored HTML field is as same as current field
    if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
      // Replace current field, basically replaces placeholder with old HTML content
      this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    }
  }

  itemDropped(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(this.fields, event.previousIndex, event.currentIndex);
    } else {
      this.addField(event.item.data, event.currentIndex);
    }
  }

  addField(fieldType: string, index: number) {
    this.fields.splice(index, 0, fieldType)
  }
}
