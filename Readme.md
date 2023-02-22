# Automation Tree for Home Assistant

![](/automation-tree-screenshot.png)

This custom panel shows automations in a tree structure. The tree is generate by splitting the automation names (default on //).

The default automation view for the automations show above looks like this:
![](/automation-screenshot.png)

## Installation

1. Place the file `automations-tree.js` in `/config/www/`
2. Add the following block to the `configuration.yaml`

```
panel_custom:
  - name: automations-tree
    # url_path needs to be unique for each panel_custom config
    url_path: automations-tree
    sidebar_title: Automations
    sidebar_icon: mdi:robot
    module_url: /local/automations-tree.js
```

3. If your Automations are not named following the pattern _something // something // AutomationName_, adjust the `divider` variable in `automations-tree.js` to use something else than `//`.
4. Restart Home Assistant
