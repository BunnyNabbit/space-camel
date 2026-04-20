# _space Camel_

Adds virtual spaces to camelCase / PascalCase, making them appear as camel Case / Pascal Case.

![A snippet of source code describing the class of a quick brown fox. Spaces are inserted between camel cased and pascal cased words. The Visual Studio Code editor is set to use a proportional font. The last line reads as: new Quick Brown Fox().jump Over(lazy Dog)](./media/example.png)

## known Limitations

This extension adds a space decoration on every capital letter that succeeds any other letter. Text that is mostly comprised of uppercase text (i.e.: SCREAMING_SNAKE_CASE or SQL) may be unreadable.

## extension Settings

- `spaceCamel.separator`: The text-based separator. Defaults to a space.
