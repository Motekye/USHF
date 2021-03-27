# USHF
Universal syntax highlighting function for &lt;code> blocks.

## LANGUAGES SUPPORTED:

HTML, CSS, JavaScript, PHP

## TODO:

* Written many years ago, should be updated as object with state instead of local functions.
* Object with state will also facilitate usage for a web based editor.
* Perform benchmarking and optimization of matches.
* Add regular expression matches, although it seems to get along without.
* Flush out terms in CSS, JS, PHP definitions.
* More language definitions.

## Universal Syntax Highlighting Function

The function itself is miniscule, only **1767 bytes** minified. (ushf-min.js)
The language definitions are also quite brief, they are stored in **lang/**.
Styles are available for the languages defined in **style/**,
Though many languages are lumped into a handful of CSS files as they are so
small.

## Language Definitions

The definitions are currently stored in **HSYN** named after their file extensions in uppercase.
The highlight function will fetch from this array using the named key provided.

```javascript:
highlight (
  element,
  "HTML"
);
```

Providing a third argument allows you to select precisely which scope of the language you want to begin inside of. 

The definition included for PHP begins in a copy of *HTML scope*, but you may explicitly begin in PHP space by providing the index [8] as a starting scope.
See **lang/php.js** to see the scopes for PHP.

```javascript:
highlight (
  element,
  "PHP",
  8
);
```

