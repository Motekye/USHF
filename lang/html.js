/****************************************************************************/
/***  ##   # ###### ##   # ##      ******************************************/
/***  ######   ##   ### ## ##      ******************************************/
/***  ##   #   ##   ## * # ##      ******************************************/
/***  ##   #   ##   ##   # ######  ******************************************/
/****************************************************************************
 *
 *	Syntax highlighting for HTML, but also mostly compatible with XML.
 *
 *	This definition is so tiny, named scopes are really uneccessary.
*/
        
        
    HSYN.HTML = [         // HTML syntax rules...
    
    
/* 0. TOP        */{ cx:0, ch:[1,2] },
/* 1. ENTITY     */{ cl:'ents', os:'&', nd:';', cx:' \r\n\t' },
/* 2. TAGSPACE   */{ cl:'tags', os:'<', nd:'>', ch: [3,4,5,6] },
/* 3. ATTRIBUTES */{ cl:'attrs', oc:' ', cx:'=>/"\'' },
/* 4. S QUOTES   */{ cl:'quote', os:"'", nd:"'", ch:[1] },
/* 5. D QUOTES   */{ cl:'quote', os:'"', nd:'"', ch:[1] },
/* 6. DTD SPACE  */{ cl:'dtd', os:'!', cx:'>', ch:[7] },
/* 7. COMMENT    */{ cl:'comm', os:'--', nd:'--' }
    
    
    ];


/****************************************************************************/

//		https://github.com/Motekye/USHF		Universal Syntax Highlighting
