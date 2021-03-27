/****************************************************************************/
/***  ##   # ######  ####_ ##   # ##     ######  ####_ ##   # ######  *******/
/***  ######   ##   ##  __ ###### ##       ##   ##  __ ######   ##    *******/
/***  ##   #   ##   ##  ^# ##   # ##       ##   ##  ^# ##   #   ##    *******/
/***  ##   # ######  ####* ##   # ###### ######  ####* ##   #   ##    *******/
/****************************************************************************/
        
				/* universal syntax highlighting function */
                  

HSYN = [];      // <- carries rules for all languages by name


function highlight( e, z, y ){ z = HSYN[z];

	// invalid scope array or target element?
	if(!z||!e||!e.nodeType==1){ return 0; }

	var // statement ends on line: 161

		l = y || 0, 			// name of current level in array
		a = [l], 				// scope list array
		s = z[l],				// choose initial scope or 0 for top
		t = e,    				// target element for adding characters
		o,  					// scope level being evaluated
		c,   					// current term being built
        i, j,   				// iterators
		ua = false,				// scope up after token completed?

    // truncated (one character) typeof check:
    ty = function(v,d){ 
		return ((typeof v).charAt(0)==d); 
	},

    // enter into a new scope level, child tag of the current:
    to = function(n){
		l = n; 					// name of the current level
		a.push(n); 				// add it to the scope depth
		s = z[n]; 				// select current scope from definition

		// create the tag associated with this scope depth and
		// set as target tag for pasting characters.
		t = t.appendChild(document.createElement(s.tg||'span'));
		// apply class and optional style attributes to the element.
      	cl = s.cl || ''; if(cl){ t.setAttribute('class',cl); }
      	st = s.st || ''; if(st){ t.setAttribute('style',st); } 
	},

    // check scope tag contents for 'id' or 'ib', etc... matches:
    idm = function(w){
		// which type?  id | ib
		// just selects name of property from definition.
		if(!w){ return 0; }
		// if the match of this scope is a function, call the
		// function with the target tag as a single argument.
		// the function can then analyse the tag with the term
		// to alter presentation accordingly.
    	if(ty(s[w],'f')){ 
			s[w](t); 
			return 0; 
		} 
		// if the match is an object, each of the members will
		// be a table of terms, the first index holding an
		// operation to perform on the tag if a match from 
		// this list is found.
		if(ty(s[w],'o')){ 
    		var k, l, x = null, v = t.textContent;
			// check for an (ip) initial processing function on this 
			// scope and execute prior to checking any matches. 
			// This can implement case insensitivity, etc...
			if(ty(s.ip,'f')){ v = s.ip(v); } 
			// loop through the entire library of term classes.
      		for(k=0; k<s[w].length; k++){
				// check each term in the library for a full match.
				for(l=1; l<s[w][k].length; l++){
    				if(v==s[w][k][l]){
						// match found, store the operation to perform.
						x = s[w][k][0];
						// run the operation if it is a function, 
						if(ty(x,'f')){ x(t); }
						// otherwise apply .class or styles from string
						// to the target element.
      					else if(ty(x,'s')){
							if(x.charAt(0)=='.'){ 
        						t.setAttribute('class', x.substr(1)); 
							} else {
        						t.setAttribute('style', x); 
							}
						} 
						return 1; 
					} 
				} 
			} 
		} 
		return 0; 
	},

    // search array of scope children for new scope level:
    chl = function(){ 
		var y;
		// check this scope's (ch) child scope list in order.
		// each scope will be evaluated as (o)...
		for(j=0; j<s.ch.length; j++){
			o = z[s.ch[j]];
			// check for (os) opening string, inclusive, that
			// opens this scope level.
      		if(ty(o.os,'s') && at(i,o.os)){ 
				to(s.ch[j]); 
				y = o.os.length;
				c+=src.substr(i+1,y-1); 
				i+=y-1; 
				return 1; 
			}
			// if the opening string is an array, check each
			// index in the array for an opener match.
			if(ty(o.os,'o')){ 
				for(h=0; h<o.os.length; h++){
					if(at(i,o.os[h])){ 
						to(s.ch[j]); 
						y = o.os[h].length;
              			c+=src.substr(i+1,y-1); 
						i+=y-1; 
						return 1; 
					} 
				} 
			}
			// check opening characters if this scope may be
			// opened by a range of single characters.
			// provide a string and any characters within will
			// open this scope. (words, numbers, etc...)
			if(ty(o.oc,'s') && ch(o.oc)){ 
				to(s.ch[j]); 
				return 1; 
			} 
		} 
	},

    // confirm string matches on the source (src) and char (c).
	// tests if the current pointer is at a sequence.
    at = function(p,m){ 
		return (src.substr(p,m.length)==m); 
	},

	// check that the current term (c) only contains characters
	// in the (h) haystack provided.
    ch = function(h){ 
		for(var i=0; i<c.length; i++){
			if(h.indexOf(c.charAt(i))==-1){ return 0; } 
		} 
		return 1; 
	},

    // leave a scope level and re-enter the parent tag.
	// check 'id' on full literal completion.
    up = function(){ 
		idm('id'); 
		a.pop(); 
		l = a[a.length-1]; 
		s = z[l];
		t = t.parentNode; 
	}, 

	src = e.textContent; // END OF FIRST var...

	// wipe the contents of the target tag and prepare to 
	// insert finished HTML. Reset up-after and fetch character.
    t.innerHTML=''; 
	for(i=0; i<src.length; i++){
		ua = false; 
		c = src.charAt(i);
		// conditions that cause this scope to return up to the
		// previous scope immediately, excluding the character.
		// this will execute recursively up the nested scope
		// levels until one level allows the character.
    	while(
			// check (cx) characters not allowed in scope.
			(ty(s.cx,'s') && ch(s.cx)) 
			// check (cp) characters permitted. (negative)
			|| (ty(s.cp,'s') && !ch(s.cp))
			// check (lm) character limit has been exceeded.
       		|| (ty(s.lm,'n') && t.textContent.length>s.lm-1))
		{ up(); }
		// check (nd) discrete enders at current position.
		// these will up-scope after having printed, though.
    	if(ty(s.nd,'s') && at((i-s.nd.length)+1, s.nd)){ ua = true; }
		// if the ender is an array, check all of the strings
		// provided and match any discrete ender.
		if(ty(s.nd,'o')){
			for(j=0; j<s.nd.length; j++){
				if(at((i-s.nd[j].length)+1, s.nd[j])){
					ua = true; 
					break; 
				}
			}
		}
		// searching all child scope levels for a new match...
    	if(ty(s.ch,'o')){ chl(); }
		// escape HTML entities for output and add to current element:
		t.innerHTML+=(c.replace(/&/g,'&amp;').replace(/</g,'&lt;'));
		// up-scope if (ua) up-after is true.
		// otherwise, check (ib) instantly breaking matches,
		// for terms that will immediately terminate a literal.
    	if(ua || idm('ib')){ up(); }
	} 
}

/****************************************************************************/

//		https://github.com/Motekye/USHF		Universal Syntax Highlighting

