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
          last_triggered: this.hass.states[state].attributes.last_triggered,
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
          <span class="automation-name">${automation.path[automation.path.length - 1]}</span>
        </a>
        <div class="automation-last-run">
          <a href="/config/automation/trace/${automation.id}">
            <span class="automation-trace">${AutomationsTree.fromNow( automation.last_triggered)}</span>
          </a>  
        </div>
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

  /**
   *  * Human readable elapsed or remaining time (example: 3 minutes ago)
   * @param  {Date|Number|String} date A Date object, timestamp or string parsable with Date.parse()
   * @param  {Date|Number|String} [nowDate] A Date object, timestamp or string parsable with Date.parse()
   * @param  {Intl.RelativeTimeFormat} [trf] A Intl formater
   * @return {string} Human readable elapsed or remaining time
   * @author github.com/victornpb
   * @see https://stackoverflow.com/a/67338038/938822
   */
  static fromNow(date, nowDate = Date.now(), rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })) {
    if (date == null) {
      return "Never";
    }

    const SECOND = 1000;
    const MINUTE = 60 * SECOND;
    const HOUR = 60 * MINUTE;
    const DAY = 24 * HOUR;
    const WEEK = 7 * DAY;
    const MONTH = 30 * DAY;
    const YEAR = 365 * DAY;
    const intervals = [
      { ge: YEAR, divisor: YEAR, unit: 'year' },
      { ge: MONTH, divisor: MONTH, unit: 'month' },
      { ge: WEEK, divisor: WEEK, unit: 'week' },
      { ge: DAY, divisor: DAY, unit: 'day' },
      { ge: HOUR, divisor: HOUR, unit: 'hour' },
      { ge: MINUTE, divisor: MINUTE, unit: 'minute' },
      { ge: 30 * SECOND, divisor: SECOND, unit: 'seconds' },
      { ge: 0, divisor: 1, text: 'just now' },
    ];
    const now = typeof nowDate === 'object' ? nowDate.getTime() : new Date(nowDate).getTime();
    const diff = now - (typeof date === 'object' ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const interval of intervals) {
      if (diffAbs >= interval.ge) {
        const x = Math.round(Math.abs(diff) / interval.divisor);
        const isFuture = diff < 0;
        return interval.unit ? rft.format(isFuture ? x : -x, interval.unit) : interval.text;
      }
    }
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

      .automation-name {
        color: var(--primary-text-color);
        font-weight: bold;
        text-decoration: none;
      }

      .automation-trace {
        color: var(--primary-text-color);
        text-decoration: none;
      }

      div.automation-last-run {
        float:right;
        padding-right: 15px;
      }

      div.automation a {
        text-decoration: none;
      }
    `;
  }
}
customElements.define("automations-tree", AutomationsTree);
