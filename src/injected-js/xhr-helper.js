/* @flow */
//jshint ignore:start

import ajax from '../common/ajax';

export default function xhrHelper() {
  document.addEventListener('inboxSDKpageAjax', function(event: any) {
    var id = event.detail.id;
    var opts = {
      url: event.detail.url,
      method: event.detail.method,
      headers: event.detail.headers,
      xhrFields: event.detail.xhrFields,
      data: event.detail.data
    };
    ajax(opts).then(({text, xhr}) => {
      document.dispatchEvent(new CustomEvent('inboxSDKpageAjaxDone', {
        bubbles: false, cancelable: false,
        detail: {
          id,
          error: false,
          text,
          responseURL: (xhr:any).responseURL
        }
      }));
    }, err => {
      document.dispatchEvent(new CustomEvent('inboxSDKpageAjaxDone', {
        bubbles: false, cancelable: false,
        detail: {
          id,
          error: true,
          message: err && err.message,
          stack: err && err.stack,
          status: err && err.xhr && err.xhr.status
        }
      }));
    });
  });
}
