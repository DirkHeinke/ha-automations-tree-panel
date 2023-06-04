import { LitElement, html, css, PropertyValues } from "lit";

type Automation = {
  id: string;
  friendly_name: string;
  last_triggered: string;
  path: string[];
  state: string;
};

type TreeElement = {
  name: string;
  automations: Automation[];
  children: TreeElement[];
};

class AutomationTree extends LitElement {
  hass: {
    states: {
      [key: string]: {
        attributes: {
          id: string;
          friendly_name: string;
          last_triggered: string;
        };
        state: string;
      };
    };
  };

  panel: {
    config: {
      summaryHeight: number;
      automationHeight: number;
      divider: string;
      defaultOpenTreeDepth: number;
    };
  };

  static get properties() {
    return {
      hass: { type: Object },
      panel: { type: Object },
    };
  }

  willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has("panel")) {
      const automationHeight = this.panel.config.automationHeight ?? 30;
      const summaryHeight = this.panel.config.summaryHeight ?? 52;
      document.documentElement.style.setProperty(
        `--at-automation-height`,
        `${automationHeight}px`
      );
      document.documentElement.style.setProperty(
        `--at-summary-height`,
        `${summaryHeight}px`
      );
    }
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

  getAutomations() {
    let automations: Automation[] = [];
    Object.keys(this.hass.states).forEach((state) => {
      if (state.startsWith("automation.")) {
        automations.push({
          id: this.hass.states[state].attributes.id,
          friendly_name: this.hass.states[state].attributes.friendly_name,
          last_triggered: this.hass.states[state].attributes.last_triggered,
          path: [],
          state: this.hass.states[state].state,
        });
      }
    });
    return automations;
  }

  calculatePath(automations: Automation[]) {
    automations.forEach((a) => {
      let pathSegments = a.friendly_name.split(this.panel.config.divider);
      a.path = pathSegments;
    });
  }

  generateTree(tree: TreeElement) {
    tree.automations = tree.automations.reduce<Automation[]>(
      (automations, a) => {
        if (a.path.length == 1) {
          automations.push(a);
        }

        if (a.path.length > 1) {
          let firstPath = a.path.shift()!.trim();
          let teWithSamePath = tree.children.find((c) => c.name === firstPath);
          if (teWithSamePath) {
            // if a tree element with the same firstPath already exists, add the automation to it
            teWithSamePath.automations.push(a);
          } else {
            // create a new tree element with the firstPath and add the automation to it
            tree.children.push({
              name: firstPath,
              automations: [a],
              children: [],
            });
          }
        }
        return automations;
      },
      []
    );
    // create the subtree for each child recursively
    tree.children.forEach((tc) => {
      tc = this.generateTree(tc);
    });
    return tree;
  }

  renderTree(tree: TreeElement, i = 0) {
    i++;
    return html`
      <div id="automation">
        <details ?open=${i <= this.panel.config.defaultOpenTreeDepth}>
          <summary style=${"padding-left: " + (i * 25 + 10) + "px"}>
            <span> ${tree.name} </span>
          </summary>
          ${tree.children.map((c) => this.renderTree(c, i))}
          ${tree.automations.map((a) => this.renderAutomation(a, i))}
        </details>
      </div>
    `;
  }

  renderAutomation(automation: Automation, i) {
    this.calculatePath([automation]);
    return html`
      <div
        class="automation ${automation.state === "off" ? "disabled" : ""}"
        style=${"padding-left: " + (i * 25 + 35) + "px"}
      >
        <a
          href="/config/automation/edit/${automation.id}"
          class="automation-name"
        >
          ${automation.path[automation.path.length - 1]}
        </a>
        <div class="automation-last-run">
          <a
            href="/config/automation/trace/${automation.id}"
            class="automation-trace"
          >
            ${AutomationTree.fromNow(automation.last_triggered)}
          </a>
        </div>
      </div>
    `;
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
  static fromNow(
    date,
    nowDate: Date | number = Date.now(),
    rft = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" })
  ) {
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
      { ge: YEAR, divisor: YEAR, unit: "year" },
      { ge: MONTH, divisor: MONTH, unit: "month" },
      { ge: WEEK, divisor: WEEK, unit: "week" },
      { ge: DAY, divisor: DAY, unit: "day" },
      { ge: HOUR, divisor: HOUR, unit: "hour" },
      { ge: MINUTE, divisor: MINUTE, unit: "minute" },
      { ge: 30 * SECOND, divisor: SECOND, unit: "seconds" },
      { ge: 0, divisor: 1, text: "just now" },
    ];
    const now =
      typeof nowDate === "object"
        ? nowDate.getTime()
        : new Date(nowDate).getTime();
    const diff =
      now - (typeof date === "object" ? date : new Date(date)).getTime();
    const diffAbs = Math.abs(diff);
    for (const interval of intervals) {
      if (diffAbs >= interval.ge) {
        const x = Math.round(Math.abs(diff) / interval.divisor);
        const isFuture = diff < 0;
        return interval.unit
          ? rft.format(isFuture ? x : -x, interval.unit)
          : interval.text;
      }
    }
  }

  static get styles() {
    return css`
      .automation {
        /* you can adjust the height of the elements here */
        height: var(--at-automation-height);
        line-height: var(--at-automation-height);
        border-bottom: 1px solid #9a9a9a;
      }

      summary {
        /* you can adjust the height of the elements here */
        height: var(--at-summary-height);
        line-height: var(--at-summary-height);
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
        float: right;
        padding-right: 15px;
      }

      div.automation a {
        text-decoration: none;
      }

      .disabled {
        text-decoration-line: line-through;
      }
    `;
  }
}
customElements.define("automation-tree", AutomationTree);
