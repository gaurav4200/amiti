import { r as registerInstance, h } from './index-0ae3ea8a.js';
import { c as createRouter } from './index-74674300.js';

const Router = createRouter();

const appHomeCss = ".app-home{padding:10px}button{background:#5851ff;color:white;margin:8px;border:none;font-size:13px;font-weight:700;text-transform:uppercase;padding:16px 20px;border-radius:2px;box-shadow:0 8px 16px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08);outline:0;letter-spacing:0.04em;transition:all 0.15s ease;cursor:pointer}button:hover{box-shadow:0 3px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.1);transform:translateY(1px)}";

const AppHome = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
    }
    render() {
        return (h("div", { key: '14363cc7ce36afce468ebffc1588a31289b0f425', class: "app-home" }, h("p", { key: '5117eaa598b7e1c0f350963e8d3a47e9f2920973' }, "Welcome to the Stencil App Starter. You can use this starter to build entire apps all with web components using Stencil! Check out our docs on", ' ', h("a", { key: '05d765efecf40b9033ca4559bf5d8c1f509b1841', href: "https://stenciljs.com" }, "stenciljs.com"), " to get started."), h("button", { key: '66da7393ac4b9927b4da9557a7cc072552c64278', onClick: () => Router.push('/profile/stencil') }, "Profile Page")));
    }
};
AppHome.style = appHomeCss;

export { AppHome as app_home };

//# sourceMappingURL=app-home.entry.js.map