import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { HotComponent } from './hot/hot';
import { RecComponent } from './rec/rec';
import { DiscussionItemComponent } from './discussion-item/discussion-item';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
@NgModule({
	declarations: [HotComponent,
    RecComponent,
    DiscussionItemComponent,
    EmojiPickerComponent,
    ],
	imports: [
		IonicModule
	],
	exports: [HotComponent,
	RecComponent,
    DiscussionItemComponent,
    EmojiPickerComponent,
    ],
	entryComponents: [
		HotComponent,
		RecComponent,
	]
})
export class ComponentsModule {}
