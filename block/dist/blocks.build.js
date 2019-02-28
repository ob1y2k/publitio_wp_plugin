/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!***********************!*\
  !*** ./src/blocks.js ***!
  \***********************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__block_block_js__ = __webpack_require__(/*! ./block/block.js */ 1);\n/**\n * Gutenberg Blocks\n *\n * All blocks related JavaScript files should be imported here.\n * You can create a new block folder in this dir and include code\n * for that block here as well.\n *\n * All blocks should be included here since this is the file that\n * Webpack is compiling as the input file.\n */\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9ja3MuanM/N2I1YiJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEd1dGVuYmVyZyBCbG9ja3NcbiAqXG4gKiBBbGwgYmxvY2tzIHJlbGF0ZWQgSmF2YVNjcmlwdCBmaWxlcyBzaG91bGQgYmUgaW1wb3J0ZWQgaGVyZS5cbiAqIFlvdSBjYW4gY3JlYXRlIGEgbmV3IGJsb2NrIGZvbGRlciBpbiB0aGlzIGRpciBhbmQgaW5jbHVkZSBjb2RlXG4gKiBmb3IgdGhhdCBibG9jayBoZXJlIGFzIHdlbGwuXG4gKlxuICogQWxsIGJsb2NrcyBzaG91bGQgYmUgaW5jbHVkZWQgaGVyZSBzaW5jZSB0aGlzIGlzIHRoZSBmaWxlIHRoYXRcbiAqIFdlYnBhY2sgaXMgY29tcGlsaW5nIGFzIHRoZSBpbnB1dCBmaWxlLlxuICovXG5cbmltcG9ydCAnLi9ibG9jay9ibG9jay5qcyc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxvY2tzLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Iiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///0\n");

/***/ }),
/* 1 */
/*!****************************!*\
  !*** ./src/block/block.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(/*! ./style.scss */ 2);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss__ = __webpack_require__(/*! ./editor.scss */ 3);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__editor_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__editor_scss__);\n/**\n * BLOCK: publitio\n *\n * Registering a publitio block with Gutenberg.\n * \n */\n\n//const { RichText, MediaUpload, PlainText } = wp.editor;\nvar registerBlockType = wp.blocks.registerBlockType;\nvar _wp$components = wp.components,\n    Button = _wp$components.Button,\n    TextControl = _wp$components.TextControl,\n    Icon = _wp$components.Icon;\n\n//  Import CSS.\n\n\n\n\nvar __ = wp.i18n.__; // Import __() from wp.i18n\n//const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks\n\nvar PublitioIcon = function PublitioIcon() {\n\treturn wp.element.createElement(Icon, { icon: wp.element.createElement(\n\t\t\t'svg',\n\t\t\tnull,\n\t\t\twp.element.createElement('path', { d: 'M5 4v3h5.5v12h3V7H19V4z' })\n\t\t) });\n};\n\n/**\n * Register: Publitio Block.\n *\n * Registers a new block provided a unique name and an object defining its\n * behavior. Once registered, the block is made editor as an option to any\n * editor interface where blocks are implemented.\n *\n * @link https://wordpress.org/gutenberg/handbook/block-api/\n * @param  {string}   name     Block name.\n * @param  {Object}   settings Block settings.\n * @return {?WPBlock}          The block, if it has been successfully\n *                             registered; otherwise `undefined`.\n */\nregisterBlockType('publitio/block', {\n\t// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.\n\ttitle: __('Publitio'), // Block title.\n\ticon: 'cloud', //'images-alt', // PublitioIcon, // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.\n\tcategory: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.\n\tkeywords: [__('media library'), __('publitio'), __('images videos')],\n\tattributes: {\n\t\tcontent: {\n\t\t\ttype: 'string',\n\t\t\tsource: 'html',\n\t\t\tselector: 'div'\n\t\t}\n\t},\n\n\tedit: function edit(props) {\n\t\tvar updateFieldValue = function updateFieldValue(val) {\n\t\t\t//console.log(\"updateFieldValue \" + val)\n\t\t\tprops.setAttributes({ content: val });\n\t\t};\n\t\tvar updateFieldValueSelect = function updateFieldValueSelect() {\n\t\t\tif (window.PublitioSourceHtml != 'undefined' && window.PublitioSourceHtml != undefined) {\n\t\t\t\t//console.log(\"updateFieldValueSelect \" + window.PublitioSourceHtml)\t  \t\n\t\t\t\tprops.setAttributes({ content: window.PublitioSourceHtml });\n\t\t\t\twindow.PublitioSourceHtml = undefined;\n\t\t\t}\n\t\t};\n\n\t\tif (props.attributes.content) {\n\n\t\t\t//return <div>{ props.attributes.content }</div>;\n\t\t\tvar createElement = wp.element.createElement;\n\t\t\tvar RawHTML = wp.element.RawHTML;\n\t\t\treturn wp.element.createElement(RawHTML, null, props.attributes.content);\n\t\t} else {\n\t\t\treturn wp.element.createElement(\n\t\t\t\t'div',\n\t\t\t\t{ className: 'PublitioBlockContainer' },\n\t\t\t\twp.element.createElement(\n\t\t\t\t\t'div',\n\t\t\t\t\t{ className: 'PublitioBlockButtonContainer' },\n\t\t\t\t\twp.element.createElement(TextControl, {\n\t\t\t\t\t\tonChange: updateFieldValue,\n\t\t\t\t\t\tonSelect: updateFieldValueSelect,\n\t\t\t\t\t\tclassName: 'publitioInput',\n\t\t\t\t\t\tvalue: props.attributes.content\n\t\t\t\t\t}),\n\t\t\t\t\twp.element.createElement(\n\t\t\t\t\t\t'a',\n\t\t\t\t\t\t{ title: 'Publitio', href: publitioBlockVars.url, id: 'publitioButtonLink', className: 'thickbox' },\n\t\t\t\t\t\twp.element.createElement(\n\t\t\t\t\t\t\tButton,\n\t\t\t\t\t\t\t{ className: 'button button-large' },\n\t\t\t\t\t\t\twp.element.createElement('img', { src: publitioBlockVars.icon, className: 'publitioIcon' }),\n\t\t\t\t\t\t\t' Select file from Publitio'\n\t\t\t\t\t\t)\n\t\t\t\t\t)\n\t\t\t\t)\n\t\t\t);\n\t\t}\n\t},\n\n\tsave: function save(_ref) {\n\t\tvar attributes = _ref.attributes;\n\n\t\t//return <div>{ attributes.content }</div>;\n\t\tvar createElement = wp.element.createElement;\n\t\tvar RawHTML = wp.element.RawHTML;\n\t\treturn wp.element.createElement(RawHTML, null, attributes.content);\n\t}\n\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9jay9ibG9jay5qcz85MjFkIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQkxPQ0s6IHB1YmxpdGlvXG4gKlxuICogUmVnaXN0ZXJpbmcgYSBwdWJsaXRpbyBibG9jayB3aXRoIEd1dGVuYmVyZy5cbiAqIFxuICovXG5cbi8vY29uc3QgeyBSaWNoVGV4dCwgTWVkaWFVcGxvYWQsIFBsYWluVGV4dCB9ID0gd3AuZWRpdG9yO1xudmFyIHJlZ2lzdGVyQmxvY2tUeXBlID0gd3AuYmxvY2tzLnJlZ2lzdGVyQmxvY2tUeXBlO1xudmFyIF93cCRjb21wb25lbnRzID0gd3AuY29tcG9uZW50cyxcbiAgICBCdXR0b24gPSBfd3AkY29tcG9uZW50cy5CdXR0b24sXG4gICAgVGV4dENvbnRyb2wgPSBfd3AkY29tcG9uZW50cy5UZXh0Q29udHJvbCxcbiAgICBJY29uID0gX3dwJGNvbXBvbmVudHMuSWNvbjtcblxuLy8gIEltcG9ydCBDU1MuXG5cbmltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCAnLi9lZGl0b3Iuc2Nzcyc7XG5cbnZhciBfXyA9IHdwLmkxOG4uX187IC8vIEltcG9ydCBfXygpIGZyb20gd3AuaTE4blxuLy9jb25zdCB7IHJlZ2lzdGVyQmxvY2tUeXBlIH0gPSB3cC5ibG9ja3M7IC8vIEltcG9ydCByZWdpc3RlckJsb2NrVHlwZSgpIGZyb20gd3AuYmxvY2tzXG5cbnZhciBQdWJsaXRpb0ljb24gPSBmdW5jdGlvbiBQdWJsaXRpb0ljb24oKSB7XG5cdHJldHVybiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoSWNvbiwgeyBpY29uOiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHQnc3ZnJyxcblx0XHRcdG51bGwsXG5cdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ3BhdGgnLCB7IGQ6ICdNNSA0djNoNS41djEyaDNWN0gxOVY0eicgfSlcblx0XHQpIH0pO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlcjogUHVibGl0aW8gQmxvY2suXG4gKlxuICogUmVnaXN0ZXJzIGEgbmV3IGJsb2NrIHByb3ZpZGVkIGEgdW5pcXVlIG5hbWUgYW5kIGFuIG9iamVjdCBkZWZpbmluZyBpdHNcbiAqIGJlaGF2aW9yLiBPbmNlIHJlZ2lzdGVyZWQsIHRoZSBibG9jayBpcyBtYWRlIGVkaXRvciBhcyBhbiBvcHRpb24gdG8gYW55XG4gKiBlZGl0b3IgaW50ZXJmYWNlIHdoZXJlIGJsb2NrcyBhcmUgaW1wbGVtZW50ZWQuXG4gKlxuICogQGxpbmsgaHR0cHM6Ly93b3JkcHJlc3Mub3JnL2d1dGVuYmVyZy9oYW5kYm9vay9ibG9jay1hcGkvXG4gKiBAcGFyYW0gIHtzdHJpbmd9ICAgbmFtZSAgICAgQmxvY2sgbmFtZS5cbiAqIEBwYXJhbSAge09iamVjdH0gICBzZXR0aW5ncyBCbG9jayBzZXR0aW5ncy5cbiAqIEByZXR1cm4gez9XUEJsb2NrfSAgICAgICAgICBUaGUgYmxvY2ssIGlmIGl0IGhhcyBiZWVuIHN1Y2Nlc3NmdWxseVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2lzdGVyZWQ7IG90aGVyd2lzZSBgdW5kZWZpbmVkYC5cbiAqL1xucmVnaXN0ZXJCbG9ja1R5cGUoJ3B1YmxpdGlvL2Jsb2NrJywge1xuXHQvLyBCbG9jayBuYW1lLiBCbG9jayBuYW1lcyBtdXN0IGJlIHN0cmluZyB0aGF0IGNvbnRhaW5zIGEgbmFtZXNwYWNlIHByZWZpeC4gRXhhbXBsZTogbXktcGx1Z2luL215LWN1c3RvbS1ibG9jay5cblx0dGl0bGU6IF9fKCdQdWJsaXRpbycpLCAvLyBCbG9jayB0aXRsZS5cblx0aWNvbjogJ2Nsb3VkJywgLy8naW1hZ2VzLWFsdCcsIC8vIFB1YmxpdGlvSWNvbiwgLy8gQmxvY2sgaWNvbiBmcm9tIERhc2hpY29ucyDihpIgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZXNvdXJjZS9kYXNoaWNvbnMvLlxuXHRjYXRlZ29yeTogJ2NvbW1vbicsIC8vIEJsb2NrIGNhdGVnb3J5IOKAlCBHcm91cCBibG9ja3MgdG9nZXRoZXIgYmFzZWQgb24gY29tbW9uIHRyYWl0cyBFLmcuIGNvbW1vbiwgZm9ybWF0dGluZywgbGF5b3V0IHdpZGdldHMsIGVtYmVkLlxuXHRrZXl3b3JkczogW19fKCdtZWRpYSBsaWJyYXJ5JyksIF9fKCdwdWJsaXRpbycpLCBfXygnaW1hZ2VzIHZpZGVvcycpXSxcblx0YXR0cmlidXRlczoge1xuXHRcdGNvbnRlbnQ6IHtcblx0XHRcdHR5cGU6ICdzdHJpbmcnLFxuXHRcdFx0c291cmNlOiAnaHRtbCcsXG5cdFx0XHRzZWxlY3RvcjogJ2Rpdidcblx0XHR9XG5cdH0sXG5cblx0ZWRpdDogZnVuY3Rpb24gZWRpdChwcm9wcykge1xuXHRcdHZhciB1cGRhdGVGaWVsZFZhbHVlID0gZnVuY3Rpb24gdXBkYXRlRmllbGRWYWx1ZSh2YWwpIHtcblx0XHRcdC8vY29uc29sZS5sb2coXCJ1cGRhdGVGaWVsZFZhbHVlIFwiICsgdmFsKVxuXHRcdFx0cHJvcHMuc2V0QXR0cmlidXRlcyh7IGNvbnRlbnQ6IHZhbCB9KTtcblx0XHR9O1xuXHRcdHZhciB1cGRhdGVGaWVsZFZhbHVlU2VsZWN0ID0gZnVuY3Rpb24gdXBkYXRlRmllbGRWYWx1ZVNlbGVjdCgpIHtcblx0XHRcdGlmICh3aW5kb3cuUHVibGl0aW9Tb3VyY2VIdG1sICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5QdWJsaXRpb1NvdXJjZUh0bWwgIT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vY29uc29sZS5sb2coXCJ1cGRhdGVGaWVsZFZhbHVlU2VsZWN0IFwiICsgd2luZG93LlB1YmxpdGlvU291cmNlSHRtbClcdCAgXHRcblx0XHRcdFx0cHJvcHMuc2V0QXR0cmlidXRlcyh7IGNvbnRlbnQ6IHdpbmRvdy5QdWJsaXRpb1NvdXJjZUh0bWwgfSk7XG5cdFx0XHRcdHdpbmRvdy5QdWJsaXRpb1NvdXJjZUh0bWwgPSB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdGlmIChwcm9wcy5hdHRyaWJ1dGVzLmNvbnRlbnQpIHtcblxuXHRcdFx0Ly9yZXR1cm4gPGRpdj57IHByb3BzLmF0dHJpYnV0ZXMuY29udGVudCB9PC9kaXY+O1xuXHRcdFx0dmFyIGNyZWF0ZUVsZW1lbnQgPSB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG5cdFx0XHR2YXIgUmF3SFRNTCA9IHdwLmVsZW1lbnQuUmF3SFRNTDtcblx0XHRcdHJldHVybiB3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoUmF3SFRNTCwgbnVsbCwgcHJvcHMuYXR0cmlidXRlcy5jb250ZW50KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0J2RpdicsXG5cdFx0XHRcdHsgY2xhc3NOYW1lOiAnUHVibGl0aW9CbG9ja0NvbnRhaW5lcicgfSxcblx0XHRcdFx0d3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFxuXHRcdFx0XHRcdCdkaXYnLFxuXHRcdFx0XHRcdHsgY2xhc3NOYW1lOiAnUHVibGl0aW9CbG9ja0J1dHRvbkNvbnRhaW5lcicgfSxcblx0XHRcdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoVGV4dENvbnRyb2wsIHtcblx0XHRcdFx0XHRcdG9uQ2hhbmdlOiB1cGRhdGVGaWVsZFZhbHVlLFxuXHRcdFx0XHRcdFx0b25TZWxlY3Q6IHVwZGF0ZUZpZWxkVmFsdWVTZWxlY3QsXG5cdFx0XHRcdFx0XHRjbGFzc05hbWU6ICdwdWJsaXRpb0lucHV0Jyxcblx0XHRcdFx0XHRcdHZhbHVlOiBwcm9wcy5hdHRyaWJ1dGVzLmNvbnRlbnRcblx0XHRcdFx0XHR9KSxcblx0XHRcdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHQnYScsXG5cdFx0XHRcdFx0XHR7IHRpdGxlOiAnUHVibGl0aW8nLCBocmVmOiBwdWJsaXRpb0Jsb2NrVmFycy51cmwsIGlkOiAncHVibGl0aW9CdXR0b25MaW5rJywgY2xhc3NOYW1lOiAndGhpY2tib3gnIH0sXG5cdFx0XHRcdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdFx0XHRcdEJ1dHRvbixcblx0XHRcdFx0XHRcdFx0eyBjbGFzc05hbWU6ICdidXR0b24gYnV0dG9uLWxhcmdlJyB9LFxuXHRcdFx0XHRcdFx0XHR3cC5lbGVtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycsIHsgc3JjOiBwdWJsaXRpb0Jsb2NrVmFycy5pY29uLCBjbGFzc05hbWU6ICdwdWJsaXRpb0ljb24nIH0pLFxuXHRcdFx0XHRcdFx0XHQnIFNlbGVjdCBmaWxlIGZyb20gUHVibGl0aW8nXG5cdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0KVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdH1cblx0fSxcblxuXHRzYXZlOiBmdW5jdGlvbiBzYXZlKF9yZWYpIHtcblx0XHR2YXIgYXR0cmlidXRlcyA9IF9yZWYuYXR0cmlidXRlcztcblxuXHRcdC8vcmV0dXJuIDxkaXY+eyBhdHRyaWJ1dGVzLmNvbnRlbnQgfTwvZGl2Pjtcblx0XHR2YXIgY3JlYXRlRWxlbWVudCA9IHdwLmVsZW1lbnQuY3JlYXRlRWxlbWVudDtcblx0XHR2YXIgUmF3SFRNTCA9IHdwLmVsZW1lbnQuUmF3SFRNTDtcblx0XHRyZXR1cm4gd3AuZWxlbWVudC5jcmVhdGVFbGVtZW50KFJhd0hUTUwsIG51bGwsIGF0dHJpYnV0ZXMuY29udGVudCk7XG5cdH1cblxufSk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxvY2svYmxvY2suanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");

/***/ }),
/* 2 */
/*!******************************!*\
  !*** ./src/block/style.scss ***!
  \******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9jay9zdHlsZS5zY3NzPzgwZjMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVtb3ZlZCBieSBleHRyYWN0LXRleHQtd2VicGFjay1wbHVnaW5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9ibG9jay9zdHlsZS5zY3NzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJtYXBwaW5ncyI6IkFBQUEiLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");

/***/ }),
/* 3 */
/*!*******************************!*\
  !*** ./src/block/editor.scss ***!
  \*******************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

eval("// removed by extract-text-webpack-plugin//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9ibG9jay9lZGl0b3Iuc2Nzcz80OWQyIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvYmxvY2svZWRpdG9yLnNjc3Ncbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sIm1hcHBpbmdzIjoiQUFBQSIsInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///3\n");

/***/ })
/******/ ]);