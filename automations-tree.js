import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

class AutomationsTree extends LitElement {
  static get properties() {
    return {
      hass: { type: Object },
    };
  }

  /*
   *    ADJUST TO YOUR NEEDS
   */
  divider = "//";

  getAutomations() {
    let automations = [];
    Object.keys(this.hass.states).forEach((state) => {
      if (state.startsWith("automation.")) {
        automations.push({
          id: this.hass.states[state].attributes.id,
          friendly_name: this.hass.states[state].attributes.friendly_name,
          path: [],
        });
      }
    });
    return automations;
  }

  calculatePath(automations) {
    automations.forEach((a) => {
      let pathSegments = a.friendly_name.split(this.divider);
      a.path = pathSegments;
    });
  }

  generateTree(tree) {
    tree.automations = tree.automations.reduce((automations, a) => {
      if (a.path.length == 1) {
        automations.push(a);
      }

      if (a.path.length > 1) {
        let firstPath = a.path.shift().trim();
        let childWithPath = tree.children.find((c) => c.name === firstPath);
        if (childWithPath) {
          childWithPath.automations.push(a);
        } else {
          tree.children.push({
            name: firstPath,
            automations: [a],
            children: [],
          });
        }
      }
      return automations;
    }, []);
    tree.children.forEach((tc) => {
      tc = this.generateTree(tc);
    });
    return tree;
  }

  renderTree(tree, i = 0) {
    i++;
    return html`
      <div id="automation">
        <details open>
          <summary style=${"padding-left: " + (i * 25 + 10) + "px"}>
            <span> ${tree.name} </span>
          </summary>
          ${tree.children.map((c) => this.renderTree(c, i))}
          ${tree.automations.map((a) => this.renderAutomation(a, i))}
        </details>
      </div>
    `;
  }

  renderAutomation(automation, i) {
    this.calculatePath([automation]);
    return html`
      <div class="automation" style=${"padding-left: " + (i * 25 + 35) + "px"}>
        <a href="/config/automation/edit/${automation.id}">
          ${automation.path[automation.path.length - 1]}
        </a>
      </div>
    `;
  }

  render() {
    let automations = this.getAutomations();
    this.calculatePath(automations);
    let tree = this.generateTree({
      name: "Automations",
      automations: automations,
      children: [],
    });
    return html` ${this.renderTree(tree)} `;
  }

  static get styles() {
    return css`
      .automation {
        height: 30px;
        line-height: 30px;
        border-bottom: 1px solid #9a9a9a;
      }

      summary {
        height: 52px;
        line-height: 52px;
        border-bottom: 1px solid #9a9a9a;
      }
    `;
  }
}
customElements.define("automations-tree", AutomationsTree);
