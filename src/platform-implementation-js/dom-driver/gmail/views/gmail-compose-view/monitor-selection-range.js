/* @flow */

import Kefir from 'kefir';

import fromEventTargetCapture from '../../../../lib/from-event-target-capture';

import type GmailComposeView from '../gmail-compose-view';

export default function (gmailComposeView: GmailComposeView) {
  Kefir.merge([
    fromEventTargetCapture((document.body: any), 'mousedown'),
    fromEventTargetCapture(gmailComposeView.getBodyElement(), 'keydown'),
    gmailComposeView
      .getEventStream()
      .filter((e) => e.eventName === 'bodyChanged'),
  ])
    .takeUntilBy(gmailComposeView.getStopper())
    .onValue((event) => {
      var body = gmailComposeView.getMaybeBodyElement();
      var selection = (document: any).getSelection();
      if (
        body &&
        selection.rangeCount > 0 &&
        body.contains(selection.anchorNode)
      ) {
        gmailComposeView.setLastSelectionRange(selection.getRangeAt(0));
      }
    });
}
