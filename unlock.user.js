// ==UserScript==
// @name         XGB430v unlock
// @description  Digi TP-Link XGB430v Pro web UI: force INCLUDE_USER_RESTRICTION=0 (full menu for the restricted account)
// @match        http://192.168.1.1/*
// @match        https://192.168.1.1/*
// @run-at       document-start
// @grant        none
// ==/UserScript==
// Same file works as a userscript (Tampermonkey/Violentmonkey) and as the MV3 content script in manifest.json.
// Client-side only: changes what the UI renders, never router config by itself.
// js/oid_str.js freezes the flag (defineProperty, writable:false, non-configurable), so devtools/bookmarklets are
// too late; this runs before page scripts and rewrites that one define.
(() => {
  const define = Object.defineProperty;
  Object.defineProperty = function (target, prop, descriptor) {
    if (target === window && prop === 'INCLUDE_USER_RESTRICTION') {
      descriptor = { value: 0, writable: true, configurable: true };
    }
    return define(target, prop, descriptor);
  };
  // ponytail: one flag. Flags declared as `var X=1` (e.g. INCLUDE_DIGI) need an accessor defined on window here instead.
})();
