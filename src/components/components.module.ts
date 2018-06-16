import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { HotComponent } from './hot/hot';
import { RecComponent } from './rec/rec';
import { DiscussionItemComponent } from './discussion-item/discussion-item';
import { EmojiPickerComponent } from './emoji-picker/emoji-picker';
import { FollowedComponent } from './followed/followed';
import { FollowingComponent } from './following/following';
@NgModule({
	declarations: [HotComponent,
    RecComponent,
    DiscussionItemComponent,
    EmojiPickerComponent,
    FollowedComponent,
    FollowingComponent,
    ],
	imports: [
		IonicModule
	],
	exports: [HotComponent,
	RecComponent,
    DiscussionItemComponent,
    EmojiPickerComponent,
    FollowedComponent,
    FollowingComponent,
    ],
	entryComponents: [
		HotComponent,
		RecComponent,
	]
})
export class ComponentsModule {}
