# Automation Tree for Home Assistant

![](/automation-tree-screenshot.png)

This custom panel shows automations in a tree structure. The tree is generated
by splitting the automation names (default on //).

The default automation view for the automations show above looks like this:
![](/automation-screenshot.png)

## Installation

1. Download the `automation-tree.js` from the
   [github releases](https://github.com/DirkHeinke/ha-automations-tree-panel/releases).
2. Place the file `automation-tree.js` in `<config>/www/`, where `<config>` is
   the root folder of the Home Assistant installation (the one with
   `configuration.yaml`)
3. Add the following block to the `configuration.yaml`

```yaml
panel_custom:
  - name: automation-tree
    # url_path needs to be unique for each panel_custom config
    url_path: automation-tree
    sidebar_title: Automations
    sidebar_icon: mdi:robot
    module_url: /local/automation-tree.js
    config:
      divider: "//"
      defaultOpenTreeDepth: 999
      automationHeight: 30
      summaryHeight: 52
```

4. If your automations are not named following the pattern _something //
   something // AutomationName_, adjust the `divider` option in
   `configuration.yaml` to use something else than `//`.
5. Restart Home Assistant

## Customization

- `divider`: see above
- `defaultOpenTreeDepth`: number of levels to open by default
- `automationHeight`: sets the height of the "automation" element (a leaf of the
  tree)
- `summaryHeight`: sets the height of the "path to automation" element (aka
  "summary", a branch of the tree)

Example values:

- `automationHeight: 30px;` and `summaryHeight: 52px;` for a "comfortable" view
- `automationHeight: 20px;` and `summaryHeight: 30px;`for a "compact" view
