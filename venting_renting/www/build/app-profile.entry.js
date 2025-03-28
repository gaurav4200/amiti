import { r as registerInstance, h } from './index-0ae3ea8a.js';

const appProfileCss = ".app-profile{padding:10px}";

const AppProfile = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.name = undefined;
    }
    normalize(name) {
        if (name) {
            return name.substr(0, 1).toUpperCase() + name.substr(1).toLowerCase();
        }
        return '';
    }
    render() {
        debugger;
        if (this.name) {
            return (h("div", { key: '0c81af7eee346a0d3828e9cb0f43f3479ee7cdcf', class: "app-profile" }, h("p", { key: '7af3f765cb552aaf0543146d9fd169f9d9225d44' }, "Hello! My name is ", this.normalize(this.name), ". My name was passed in through a route param!")));
        }
    }
};
AppProfile.style = appProfileCss;

export { AppProfile as app_profile };

//# sourceMappingURL=app-profile.entry.js.map