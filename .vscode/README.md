## Predefined Development Terminals

This project includes predefined terminals configuration for the
"Terminals Manager" extension

### Option 1 – Command Palette

1. Install the recommended extensions
2. Open Command Palette (`Ctrl + Shift + P`)
3. Run: `Terminals: Run`

---

### Option 2 – Keyboard Shortcut (my recommendation)

Custom shortcut can be added to open all predefined terminals

1. Open Keyboard Shortcuts JSON:
   - `Ctrl + Shift + P`
   - Type: `Open Keyboard Shortcuts (JSON)`

2. Add the following entry:

```json
{
  "key": "your_preferred_shortcut",
  "command": "terminals.runTerminals"
}
```

Replace "your_preferred_shortcut" with any shortcut that fits your workflow
