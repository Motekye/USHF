Universal Syntax Highlighting Function

The function itself is miniscule, only **1767 bytes** minified. (ushf-min.js)
The language definitions are also quite brief, they are stored in **lang/**.
Styles are available for the languages defined in **style/**,
Though many languages are lumped into a handful of CSS files as they are so
small.

## LANGUAGES SUPPORTED:

HTML, CSS, JavaScript, PHP

## TODO:

* Written many years ago, should be updated as object with state instead of nested functions.
* Object with state will also facilitate usage in a web based editor.
* Perform benchmarking and optimization of matches.
* Add regular expression matches, although it seems to get along without.
* Flush out terms in CSS, JS, PHP definitions.
* More language definitions.

## Using highlight ()

The definitions are currently stored in **HSYN**, named after their file extensions in uppercase.
The highlight function will fetch from this array using the named key provided.

```javascript
highlight (
  element,
  "HTML"
);
```

Providing a third argument allows you to select precisely which scope of the language you want to begin inside of. 

The definition included for PHP begins in a copy of *HTML scope*, but you may explicitly begin in PHP space by providing the index [8] as a starting scope.
See **lang/php.js** to see the scopes for PHP.

```javascript
highlight (
  element,
  "PHP",
  8
);
```

## Language Definitions

The named members of HSYN for each language are themselves named or numbered arrays. The language array holds all of the *scopes* defined by that language. The scopes needn't be listed in a particular order, but scope `HSYN["LANG"][0]` is expected as the root scope of the language.

the HTML language array in **lang/html.js** is a good, simple example. This is the full contents of the `HSYN["HTML"]` language array...

```javascript
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

In a simple definition like this named members are not required, but you may give names to the scope levels, and reference them by name in `ch` as some definitions do.

## Scope Level Properties

Every one of these properties is optional, but you will need to use some for a scope to be reachable / leaveable.

* `ch` = `[]` ... Array of child scopes by named or numbered index.
* `tg` = `""` ... Scope should build this HTML tag name for term, or `<span>` if unspecified.
* `cl` = `""` ... Apply this "class" attribute to the element created.
* `st` = `""` ... String to fill in "style" attribute of element.
* `oc` = `""` ... String of any characters that open this scope level when found.
* `cp` = `""` ... String of any characters permitted to appear in this scope after opening.
* `os` = `""||[]` ... String (or array of strings) that open this scope level when found.
* `nd` = `""||[]` ... String (or array of strings) that terminate this scope level (inclusive).
* `cx` = `""` ... String of any characters that this scope will terminate *before* reaching.
* `lm` = `1` ... Character limit for scope. `os` is allowed to violate this, but will close the term.
* `id` = `[[]]` ... Library of terms sorted into categories that match on completion. (identifiers)
* `ib` = `[[]]` ... Library of terms sorted into categories that match on each character added. (instantly breaking)
* `pi` = `fn{}` ... Function to execute prior to identifier matches to groom terms.

When a scope ends by `cx`, the match will propagate up the parent levels if they also have the character in `cx`. Many scope levels can be ended at once like this. Likewise, for characters not found in `cp`, or if the parent's `lm` has been broken after leaving the child scope.

In contrast, the `nd` enders are *inclusive* and will be absorbed by the term.

## Identifier Match Libraries

The `id` and `ib` properties carry libraries of terms sorted by category.

(Excerpt from: **lang/js.js**)

```javascript
            id:[ 

            ['.keyw',                 		  // language vocabulary:

    'if','else','switch','break','case','while','for','continue',
    'try','throw','catch','goto','with','in','do','var','new',
    'import','finally','function','return','let','export','typeof',
    'instanceof','default','throws','window','document','arguments' ],
    
            ['.null', 								      // falsey things:

    'false','null','undefined','NaN','alert' ],
...
```

The entire scope level must match these terms to pass.

The first member of each category is a string that either begins with a `.` and is a class to apply to the target element, or will populate the *style* attribute.

```javascript
            ['color:#F44; text-shadow:1px 1px #800;',

    'false','null','undefined','NaN','alert' ],
```

### Identifier Match Callback

(Excerpt from: **lang/css.js**)

```javascript
		/* hexadecimal color values */
		'hx': {
			cl: 'hexc', 
			oc:'#', cp:'0123456789abcdefABCDEF', 
			/*
			 *	Function applies background color of 
			 *	the value contained to the element.
			*/
			id: function(e){
				e.style.backgroundColor = e.textContent;
			}
		}
```

You may make the entire `id` property a function. The function is called once the scope has finished, and the argument `e` is the HTML element holding the completed term. The CSS definition uses this to put a background color on `#HEX` color codes.

If you made the `ib` property a function, the form is the same, but the function is called every time a character is added to the scope. The `ib` function should also return `true` if the scope should end, or `false||undefined||0` to continue adding characters.

### Identifier Library Callback

```javascript
            [ function(e){ ... },

    'term1','term2','term3','term4','term5' ],
```

This is like the `id` callback, but only for a specific category in an `id` or `ib` library. Once one of the matches is made, the callback gets run on the target element with the completed term *instead of* applying classes or styles from a string. Callbacks like this let you add *reflection* and other goodies to a language spec.

### Pre-Identifer Match Callback

```javascript
	pi: function(e){
		e.textContent = e.textContent.toLowerCase();
	}
```

Another property, `pi`, is only used as a callback function. When this property is used in a scope, the function will be run *prior to* identifier matches being checked. This lets you do pre-filtering of patterns to reduce match count, or implementation of case insensitivity, as depicted.




