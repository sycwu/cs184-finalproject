class PageLayout extends HTMLElement{
	constructor(){
		super();
	}

	connectedCallback(){
		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		let elm = this.querySelectorAll( ":scope > *" );								// Get list of Root Nodes
		this.appendChild( document.importNode( PageLayout.Template.content, true ) );	// Load template into component

		//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		// Move Root Nodes into Template Page Content Area
		let root = this.querySelector( "*[name=PageContent]");
		for( let e of elm ) root.appendChild( e );
	}
} 

PageLayout.Template = document.createElement("template");
PageLayout.Template.innerHTML = `
<header><div class="HeaderArea">
	<label><a href="/index.html">Sketchpunk Labs</a> <span>[ Prototypes ]</span></label>
	<nav>
		<a href="/about.html">About</a>
		<a href="https://twitter.com/SketchpunkLabs">Twitter</a>
		<a href="https://www.youtube.com/c/sketchpunklabs/">Youtube</a>
		<a href="https://github.com/sketchpunk">Github</a>
		<a href="https://www.patreon.com/sketchpunk">Patreon</a>
	</nav>
</div></header>

<main><div class="MainArea" name="PageContent"></div></main>

<footer><div class="FooterArea">
	<header>&copy; 2021 Sketchpunk Labs. All rights reserved.</header>
	<main>@</main>
	<nav>
		<a href="javascript:void(0)">Lorem</a>
		<a href="javascript:void(0)">Ipsum</a>
		<a href="javascript:void(0)">Dolor</a>
	</nav>
</div></footer>`;


/////////////////////////////////////////////////////////////////////////////////////
/*
(function(){
	let mod_path	= import.meta.url.substring( 0, import.meta.url.lastIndexOf("/") + 1 ),
		link		= document.createElement( "link" );

	link.rel	= "stylesheet";
	link.type	= "text/css";
	link.media	= "all";
	link.href	= mod_path + "PageLayout.css";
	document.getElementsByTagName( "head" )[0].appendChild( link );
})();
*/
/*
WebCom.append_slots = function( o ){
    let i, elm, slot, sname, slots = o.querySelectorAll("*[slot]");

    for( i=0; i < slots.length; i++ ){
        if( !slots[i].hasAttribute("slot") ) continue;

        elm		= slots[i];
        sname	= elm.getAttribute("slot");
        slot	= o.querySelector( "*[name="+sname+"]" );

        if( !slot ) continue;

        if( slot.tagName == "SLOT" )	slot.parentNode.replaceChild( elm, slot );
        else 							slot.appendChild( elm );
    }
}
*/

window.customElements.define( "page-layout", PageLayout );

//export default PageLayout;