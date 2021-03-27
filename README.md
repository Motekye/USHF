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

## Using highlight ()

The definitions are currently stored in **HSYN**, named after their file extensions in uppercase.
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

## Language Definitions

The named members of HSYN for each language are themselves named or numbered arrays. The language array holds all of the *scopes* defined by that language. The scopes needn't be listed in a particular order, but scope `HSYN["LANG"][0]` is expected as the root scope of the language.

the HTML language array in **lang/html.js** is a good, simple example. This is the full contents of the `HSYN["HTML"]` language array...

```javascript:
/* 0. TOP        */{ ch:[1,2] },
/* 1. ENTITY     */{ cl:'ents', os:'&', nd:';', cx:' \r\n\t' },
/* 2. TAGSPACE   */{ cl:'tags', os:'<', nd:'>', ch: [3,4,5,6] },
/* 3. ATTRIBUTES */{ cl:'attrs', oc:' ', cx:'=>/"\'' },
/* 4. S QUOTES   */{ cl:'quote', os:"'", nd:"'", ch:[1] },
/* 5. D QUOTES   */{ cl:'quote', os:'"', nd:'"', ch:[1] },
/* 6. DTD SPACE  */{ cl:'dtd', os:'!', cx:'>', ch:[7] },
/* 7. COMMENT    */{ cl:'comm', os:'--', nd:'--' }
```

Each scope member of the array allows a `ch` array, listing each child scope reachable in the order they should be evaluated.

In a simple definition like this named members are not required, but you may use json notation to give names to the scope levels, and reference them by name in `ch` as some definitions do.

## Scope Level Properties

* `ch` = `[]` ... Array of child scopes by named or numbered index.
* `tg` = `""` ... Scope should build this HTML tag name for term, or <span> if unspecified.
* `cl` = `""` ... Apply this "class" attribute to the element created.
* `st` = `""` ... String to fill in "style" attribute of element.
* `oc` = `""` ... String of any characters that open this scope level when found.
* `os` = `""||[]` ... String (or array of strings) that open this scope level when found.
* `nd` = `""||[]` ... String (or array of strings) that terminate this scope level (inclusive).
* `cx` = `""` ... String of any characters that this scope will terminate *before* reaching.
* `lm` = `1` ... Character limit for scope. `os` is allowed to violate this.
* `id` = `[[]]` ... Library of terms sorted into categories that match on completion.
* `ib` = `[[]]` ... Library of terms sorted into categories that match on each character added.
* `pi` = `fn{}` ... Function to execute prior to identifier matches to groom terms.

## Identifier Match Libraries







