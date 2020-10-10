# Quantum Console
This is a plugin to call some console tool(current is Eruda) for your webapp.

## Usage
```javascript
    new QuantumConsole({
        url: '', // Your console tool's cdn link.
        entry: '', // An entry to call your console tool.
        consoleConfig: {}, // Some configs for your console tool.
        plugins: [] // Add plugins to your console tool.
    });
```