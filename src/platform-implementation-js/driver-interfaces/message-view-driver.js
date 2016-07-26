/* @flow */

import Kefir from 'kefir';

export type VIEW_STATE = 'HIDDEN'|'COLLAPSED'|'EXPANDED';

export type MessageViewLinkDescriptor = {
	text: string;
	html: string;
	element: HTMLElement;
	href: string;
	isInQuotedArea: boolean;
};

export type MessageViewToolbarButtonDescriptor = {
	section: 'MORE';
	title: string;
	iconUrl?: ?string;
	iconClass?: ?string;
	onClick(): void;
	orderHint?: ?number;
};

export type MessageViewDriver = {
	getMessageID(): string;
	getContentsElement(): HTMLElement;
	getLinks(): Array<MessageViewLinkDescriptor>;
	isElementInQuotedArea(el: HTMLElement): boolean;
	addMoreMenuItem(options: MessageViewToolbarButtonDescriptor): void;
	addAttachmentIcon(options: Object): void;
	getAttachmentCardViewDrivers(): Array<Object>;
	addAttachmentCard(options: Object): Object;
	addAttachmentCardNoPreview(options: Object): Object;
	addButtonToDownloadAllArea(options: Object): void;
	getEventStream(): Kefir.Stream;
	getViewState(): VIEW_STATE;
	getDateString(): string;
	getSender(): Contact;
	getRecipients(): Array<Contact>;
	getThreadViewDriver(): Object;
	isLoaded(): boolean;
	hasOpenReply(): boolean;
};
