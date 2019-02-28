/**
 * BLOCK: publitio
 *
 * Registering a publitio block with Gutenberg.
 * 
 */

//const { RichText, MediaUpload, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const { Button, TextControl, Icon } = wp.components;

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
//const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

const PublitioIcon = () => (
    <Icon icon={ <svg><path d="M5 4v3h5.5v12h3V7H19V4z" /></svg> } />
);

/**
 * Register: Publitio Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'publitio/block', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Publitio' ), // Block title.
	icon: 'cloud', //'images-alt', // PublitioIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'media library' ),
		__( 'publitio' ),
		__( 'images videos' ),		
	],
	attributes: {	  
	   content: {
	        type: 'string',
	        source: 'html',
	        selector: 'div'
	    }
	},

	edit: function( props ) {
	    var updateFieldValue = function( val ) {
	    	//console.log("updateFieldValue " + val)
	        props.setAttributes( { content: val } );
	    }
	    var updateFieldValueSelect = function() {	    	 
	    	if(window.PublitioSourceHtml!='undefined'&&window.PublitioSourceHtml!=undefined)  {
	    		//console.log("updateFieldValueSelect " + window.PublitioSourceHtml)	  	
	        	props.setAttributes( { content: window.PublitioSourceHtml } );
	        	window.PublitioSourceHtml=undefined;
	        }
	    }	    

	    if(props.attributes.content) {
	    	
	    	//return <div>{ props.attributes.content }</div>;
	    	var createElement = wp.element.createElement;
			var RawHTML = wp.element.RawHTML;
			return wp.element.createElement( RawHTML, null, props.attributes.content );

	    } else {
	    	return (

	    		<div className="PublitioBlockContainer">
	    		<div className="PublitioBlockButtonContainer">

	    			<TextControl 
			          onChange={ updateFieldValue }
			          onSelect={ updateFieldValueSelect } 
			          className="publitioInput"
			          value={ props.attributes.content }
			        ></TextControl>
			        					
					<a title="Publitio" href={ publitioBlockVars.url } id="publitioButtonLink" className="thickbox">
					    <Button className="button button-large" >
				        	<img src={ publitioBlockVars.icon } className="publitioIcon" /> Select file from Publitio 
				        </Button>
					</a>	

			    </div>
			    </div>
			          
	    	);
	    }
	    
	},

	save: ( { attributes } ) => {
	    //return <div>{ attributes.content }</div>;
	    var createElement = wp.element.createElement;
		var RawHTML = wp.element.RawHTML;
		return wp.element.createElement( RawHTML, null, attributes.content );
	},

} );

