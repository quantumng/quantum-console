# Quantum Console
This is a plugin to call some console tool(current is Eruda) for your webapp.

## Install

You can get it on npm.
```bash
npm install eruda --save
```

Add this script to your page.

```html
<script src="node_modules/quantum-console/index.js"></script>
<script>
    new QuantumConsole({
        url: '//cdn.jsdelivr.net/npm/eruda',
        entry: '#entry'
    });
</script>
```

ES Module
```javascript
import QuantumConsole from 'quantum-console';
new QuantumConsole({
    url: '',
    entry: '',
    consoleConfig: {},
    plugins: []
});
```

## Configuration

* url: String value, Your console tool's cdn link.
* entry: String value, An entry to call your console tool.
* consoleConfig: Object value, Some configs for your console tool.
* plugins: Array value, Add plugins to your console tool.