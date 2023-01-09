# Automation Tree for Home Assistant

![](/automation-tree-screenshot.jpeg)

This custom panel shows automations in a tree structure. The tree is generate by splitting the automation names (default on //).

## Installation

1. Place the file `automations-tree.js` in `/config/www/`
2. Add the following block to the `configuration.yaml`
3. If your Automations are not structured like _Folder // Folder // AutomationName_, adjust the `divider` variable in `automations-tree.js`.

```
panel_custom:
  - name: automations-tree
    # url_path needs to be unique for each panel_custom config
    url_path: automations-tree
    sidebar_title: Automations
    sidebar_icon: mdi:robot
    module_url: /local/automations-tree.js
```

4. Restart Home Assistant
