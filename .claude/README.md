# .claude/ — конфігурація проєкту для Claude Code

Карта того, що тут лежить і навіщо.

```
.claude/
  rules/
    conventions.md   — конвенції коду (стек, стилі, дані, зображення)
    refactoring.md   — дисципліна рефакторингу (процедура + чек-листи)
    commands.md      — типові команди (dev / build / зображення / лінт / деплой)
  docs/
    architecture.md  — технічна пам'ять проєкту (Obsidian-сумісна вікі)
  commands/
    aim.md           — слеш-команда /aim (CRO: landing + audit)
  README.md          — цей файл
```

**Як це зв'язано.** Корінний `CLAUDE.md` тримається лін: він містить ядро дисципліни
і через `@import` автоматично підвантажує `rules/conventions.md` та `rules/refactoring.md`
у кожну сесію. `commands.md` і `docs/architecture.md` читаються за потреби (за посиланням).

**MCP.** Context7 підключено через `../.mcp.json` (актуальні доки бібліотек стеку).

**Пам'ять проєкту.** `docs/architecture.md` — звичайний Markdown із `[[wiki-links]]`.
Можна відкрити папку як Obsidian-сховище без жодних змін.
