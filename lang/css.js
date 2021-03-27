/****************************************************************************/
/***   ####_ .####_ .####_  *************************************************/
/***  ##   ` ##__ ^ ##__ ^  *************************************************/
/***  ##   _ __^^## __^^##  *************************************************/
/***   ####` *####  *####   *************************************************/
/****************************************************************************
 *
 *	Syntax highlighting for Cascading Style Sheets.
 *
 *	Currently supports CSS2		TODO: CSS3 support.
*/
		
		
	HSYN.CSS = {		 // CSS syntax rules...
	

		'0': { ch:['cm','rl','tg','at'] },

		'cm': { cl:'comm', os:'/*', nd:'*/' },

		'rl': { os:'{', nd:'}', ch:['cm','pr','vl'] },

		/* known HTML tag names */
		'tg': { cl:'tagn', lm: 1, os: [

				'code'

			] },

		/* known HTML tag names */
		'at': { os:'[', nd: ']', ch: ['sq','dq'] },

		/* property space... */
		'pr': { cl:'color:#F00;', cx:':;}',
			oc: 'abcdefghijklmnopqrstuvwxyz', 
			id:[


	/*  box model properties.......... */ 
	['.boxm',
	'display','position','float','clear',
	'top','right','bottom','left','z-index',
	'width','height','min-width','min-height','max-width','max-height',
	'margin','margin-top','margin-right','margin-bottom','margin-left',
	'padding','padding-top','padding-right','padding-bottom','padding-left',
	'border','border-top','border-right','border-bottom','border-left',
	'background','background-position','background-attachment',
	'background-color','background-image' 
	],

	/*  typographical properties...... */ 
	['.typo',
	'color','font','font-size','font-family','font-weight','font-style',
	'text-align','text-decoration','text-transform','text-indent',
	'line-height','vertical-align','letter-spacing',
	'list-style','list-style-type','list-style-position','list-style-image'
	],

	/*  newer or CSS3 properties...... */ 
	[ '.css3',
	'border-radius','opacity','','','','' 
	]

	/*  accessibility properties...... *
	[ '',
	'','','','','','','','' 
	],
	/*  optimization properties....... *
	[ '',
	'','','','','','','','' 
	] */ ]


		},

		/* value space */
		'vl': {
			oc: ':', cx:';}', 
			ch: ['hx','nm','un','sw','kw','im'] 
		},

		/* numbers and units */
		'nm': { 
			cl: 'nums', 
			oc:'.-0123456789', cp:'.0123456789' 
		},
		
		'un': { 
			cl: 'unit', 
			lm: 1, os:['px','%','em','pt'] 
		},

		/* numbers and units */
		'sq': { 
			cl:'quote', 
			os:"'", nd:"'",
		},

		'dq': { 
			cl:'quote', 
			os:'"', nd:'"',
		},

		/* important */
		'im': { 
			cl: 'impt', 
			oc:'!', cx:';}' 
		},

		/* global value keywords */
		'sw': { 
			cl: 'skey',
			lm: 1, os:[
				'none','inherit','initial',
			] 
		},

		/* value keywords */
		'kw': { 
			cl: 'vkey',
			lm: 1, os:[
			'left','top','right','bottom','center','both','solid',
			'dotted','block','inline','absolute','relative','fixed'
			] 
		},

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

	};


/****************************************************************************/

//		https://github.com/Motekye/USHF		Universal Syntax Highlighting

