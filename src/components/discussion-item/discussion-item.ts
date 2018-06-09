import { Component, Input } from '@angular/core';
@Component({
  selector: 'discussion-item',
  templateUrl: 'discussion-item.html'
})
export class DiscussionItemComponent {

  @Input('discussion') discussion;

  constructor() {
  }

  isNotUndefined(): boolean {
    return typeof this.discussion !== 'undefined';
  }

}
