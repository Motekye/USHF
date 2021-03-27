/****************************************************************************/
/***  ###### .####_  ********************************************************/
/***     ##  ##__ ^  ********************************************************/
/***  #  ##  __^^##  ********************************************************/
/***  *###^  *####   ********************************************************/
/****************************************************************************
 *
 *	Syntax highlighting for JavaScript.
*/
        
    HSYN.JS = [         // JavaScript syntax rules...
    
    
    /* 0. TOP       */{ cx:0, ch:[1,2,3,4,5,6,7] },
    /* 1. NUMBERS   */{ cl:'nums', oc:'0123456789', cp:'0123456789' },
    /* 2. S QUOTES  */{ cl:'quote', os:"'", nd:"'", ch:[4] },
    /* 3. D QUOTES  */{ cl:'quote', os:'"', nd:'"', ch:[4] },
    /* 4. ESCAPES   */{ cl:'escp', os:'\\', lm:2 },
    /* 5. L COMMENT */{ cl:'comm', os:'//', cx:'\r\n' },
    /* 6. B COMMENT */{ cl:'comm', os:'/*', nd:'*/' },
    /* 7. WORDS     */{ cl:'word', ch:[4],
    
            oc:'_$ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 
            cx:' \t\r\n.,:;+-*/\\%^<>=#&|!~\'"()[]{}?',
            id:[ 
            
            ['.keyw',                 				// language vocabulary:

    'if','else','switch','break','case','while','for','continue',
    'try','throw','catch','goto','with','in','do','var','new',
    'import','finally','function','return','let','export','typeof',
    'instanceof','default','throws','window','document','arguments' ],
    
            ['.null', 								// falsey things:

    'false','null','undefined','NaN','alert' ],
    
            ['.true', 								// truthy things:

    'true','Infinity','this','Object','Array','Math','String','Date',
    'Number' ],
    
            ['.term',                        		// common terms:

    'length','children','innerHTML','textContent','charAt','charCodeAt',
    'parentNode','previousSibling','nextSibling','substr','replace',
    'getAttribute','setAttribute','getHours','getMinutes','getSeconds',
    'getMilliseconds','getDay','getDate','getMonth','getYear',
    'innerHeight','innerWidth','outerHeight','outerWidth','indexOf',
    'fromCharCode','getElementsByTagName','toUpperCase','toLowerCase',
    'style','display','width','height','src','style','endsWith','startsWith',
    'valueOf','pageXOffset','pageYOffset','screenX','screenY','scroll',
    'setInterval','setTimeout','clearInterval','clearTimeout',
    'encodeURI','decodeURI','floor','ceil','random','from',
    'delete','parseInt','toString','setInterval','isPrototypeOf',
    'encodeURIComponent','parseFloat','createElement','head','body',
    'push','pop','shift','unshift','appendChild','insertBefore',
    'onmousemove','onmousedown','onmouseup','onscroll','onresize',
    'clientX','clientY','getBoundingClientRect','nodeType','which',
    'left','top','bottom','right','scrollLeft','scrollTop','detail',
    'documentElement','wheelDelta','offsetTop','offsetLeft','scrollWidth',
    'offsetWidth','offsetHeight','getElementById','scrollHeight',
    'getContext','getImageData','toDataURL','putImageData','drawImage',
    'contentWindow' ]
    
    	]} 
	];


/****************************************************************************/

//		https://github.com/Motekye/USHF		Universal Syntax Highlighting

