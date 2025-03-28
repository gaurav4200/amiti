import { B as BUILD, c as consoleDevInfo, H, d as doc, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-0ae3ea8a.js';
export { s as setNonce } from './index-0ae3ea8a.js';
import { g as globalScripts } from './app-globals-b2ffd28d.js';

/*
 Stencil Client Patch Browser v4.22.2 | MIT Licensed | https://stenciljs.com
 */
var patchBrowser = () => {
  if (BUILD.isDev && !BUILD.isTesting) {
    consoleDevInfo("Running in development mode.");
  }
  if (BUILD.cloneNodeFix) {
    patchCloneNodeFix(H.prototype);
  }
  const scriptElm = BUILD.scriptDataOpts ? Array.from(doc.querySelectorAll("script")).find(
    (s) => new RegExp(`/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute("data-stencil-namespace") === NAMESPACE
  ) : null;
  const importMeta = import.meta.url;
  const opts = BUILD.scriptDataOpts ? (scriptElm || {})["data-opts"] || {} : {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};
var patchCloneNodeFix = (HTMLElementPrototype) => {
  const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
  HTMLElementPrototype.cloneNode = function(deep) {
    if (this.nodeName === "TEMPLATE") {
      return nativeCloneNodeFn.call(this, deep);
    }
    const clonedNode = nativeCloneNodeFn.call(this, false);
    const srcChildNodes = this.childNodes;
    if (deep) {
      for (let i = 0; i < srcChildNodes.length; i++) {
        if (srcChildNodes[i].nodeType !== 2) {
          clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["app-root",[[1,"app-root",{"currentPage":[32],"sports":[32],"venues":[32],"bookings":[32]}]]],["app-home",[[1,"app-home"]]],["app-profile",[[1,"app-profile",{"name":[1]}]]],["app-booking",[[1,"app-booking",{"sports":[16],"venues":[16],"bookings":[16],"selectedSportId":[32],"selectedVenueId":[32],"selectedDate":[32],"startTime":[32],"endTime":[32],"customerName":[32],"customerPhone":[32],"bookingConflictError":[32],"phoneError":[32]}]]],["app-history",[[1,"app-history",{"bookings":[16],"venues":[16],"sports":[16]}]]],["app-management",[[1,"app-management",{"venues":[16],"sports":[16],"newVenueName":[32],"newVenueLocation":[32],"newVenueSportId":[32],"newVenuePricePerHour":[32]}]]]], options);
});

//# sourceMappingURL=app.esm.js.map