/****************************************************************************/
/***  #####_ ##   # #####_  *************************************************/
/***  ##  .# ###### ##  .#  *************************************************/
/***  #####^ ##   # #####^  *************************************************/
/***  ##     ##   # ##      *************************************************/
/****************************************************************************
 *
 *	Syntax highlighting for PHP. 
 *
 *	Begins in the scope of HTML, reference [8] to begin in PHP.
*/


	HSYN.PHP = [         // PHP in HTML mode rules...

/* 0. TOP       */{ cx:0, ch:[ 8,1,2 ] },
/* 1. ENTITY    */{ cl:'ents', os:'&', nd:';', cx:' \r\n\t', ch:[8] },
/* 2. TAGSPACE  */{ cl:'tags', os:'<', nd:'>', ch:[3,4,5,6,8] },
/* 3. ATTRIBUTE */{ cl:'attrs', oc:' ', cx:'=>/"\'', ch:[8] },
/* 4. S QUOTES  */{ cl:'quote', os:"'", nd:"'", ch:[1,8] },
/* 5. D QUOTES  */{ cl:'quote', os:'"', nd:'"', ch:[1,8] },
/* 6. DTD SPACE */{ cl:'dtd', os:'!', cx:'>', ch:[7,8] },
/* 7. COMMENT   */{ cl:'comm', os:'--', nd:'--', ch:[8] },
	
/* 8. PHP SPACE */{ cl:'php', os:['<?php','<?'], nd:'?>',
					ch:[9,10,11,12,13,14,15,16,19,20,21] },
	
/* 9. NUMBERS   */{ cl:'nums', oc:'0123456789', cp:'0123456789' },
/* 10. S QUOTES */{ cl:'quote', os:"'", nd:"'" },
/* 11. D QUOTES */{ cl:'quote', os:'"', nd:'"', ch:[12,20] },
/* 12. ESCAPES  */{ cl:'escp', os:'\\', lm:2 },
/* 13. L COMM   */{ cl:'comm', os:'//', cx:'\r\n' },
/* 14. B COMM   */{ cl:'comm', os:'/*', nd:'*/' },
/* 15. H COMM   */{ cl:'comm', os:'#', cx:'\r\n' },

/* 16. HEREDOC  */{ cl:'quote', os:'<<<EOT', nd:'EOT;', ch:[19,20] },

/* RESERVED LEVELS... */
					{},
					{},

/* 19. EMBED V  */{ cl:'vars', os:'${', nd:'}', ch:[9] },
	
/* 20. VARIABLE */{ 
		cl:'vars', 
		oc:'$', 
		cp:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'+
		   '0123456789_',
	   
		id:[
		  ['.supr',
				'$_SERVER','$_SESSION']
		] },
	
/* 21. WORDS    */{
		oc:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
		cp:'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_',
				   
		id:[
	
	// bright green things:
	['.true', 
		'true', 'echo' ],
	
	 // fuzzy red things:
	['.null',
		'false','NULL','eval' ],
	
	// primary logical constructs:
	['.keyw',
		'if','else','elseif','for','while','switch',
		'function','return','continue','case','default','break' ],
			
	// integrated common functions:
	['.func',
		'header','strlen','substr','str_replace',
		'trim','rtrim','ltrim','strtolower','strtoupper',
		'strip_tags' ],

	// array functions:
	['.arry',
		'count','explode','array','join',
		'array_merge','array_search','array_push' ],
			
	// PHP meta functions:
	['.meta',
		'get_loaded_extensions','get_extension_funcs',
		'include','ini_set','set_include_path'],
			
	// PHP Filesystem functions:
	['.file',
		'file','is_dir','mkdir','file_get_contents',
		'fopen','fread','fclose','glob' ],
			
	// PHP GD functions:
	['.gdfn',
		'imagecreatefrompng','imagecreatefromgif',
		'imagecreatefromjpeg','imagecreatetruecolor',
		'getimagesize','imagesavealpha','imagealphablending',
		'imagecopyresampled','imagecolorallocatealpha',
		'imagecolorat','imagesetpixel', 'imagecopy',
		'imagepng','imagegif','imagejpeg','imagedestroy' ]
	
		] }
	
	];


/****************************************************************************/

//		https://github.com/Motekye/USHF		Universal Syntax Highlighting

