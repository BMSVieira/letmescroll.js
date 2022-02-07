
/*-------------------------
LetMeScroll.js
Made by: Bruno Vieira
--------------------------- */

class LetMeScroll {

    constructor(options) {

        const defaults = {
            selector : 'defaultId',
            config : {
                dimensions : {
                    width : "100%",
                    height : "500px"
                },
                scroll : {
                    bottomOffset: 0,
                    autoHide: false
                }
            },
            onComplete: function(){},
            onEnd: function(){},
            onTop: function(){},
            onMove: function(){},
            onDragStart: function(){},
            onDragStop: function(){},
            onTouchStart: function(){},
            onTouchStop: function(){}
        };      

        // Scroll Random ID
        var randomID = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
        
        this.randomID = randomID;
        this.selector = options.selector.substring(1) || defaults.selector.substring(1);
        this.onComplete = options.onComplete || defaults.onComplete;
        this.onEnd = options.onEnd || defaults.onEnd;
        this.onTop = options.onTop || defaults.onTop;
        this.onMove = options.onMove || defaults.onMove;
        this.onDragStart = options.onDragStart || defaults.onDragStart;
        this.onDragStop = options.onDragStop || defaults.onDragStop;
        this.onTouchStart = options.onTouchStart || defaults.onTouchStart;
        this.onTouchStop = options.onTouchStop || defaults.onTouchStop;

        // Get default dimensions
        options.config.dimensions == undefined ? options.config.dimensions = defaults.config.dimensions : options.config.dimensions
        for(var key in defaults.config.dimensions)
        { options.config.dimensions[key] == undefined ? options.config.dimensions[key] = defaults.config.dimensions[key] :  options.config.dimensions[key] = options.config.dimensions[key];}

        options.config.scroll == undefined ? options.config.scroll = defaults.config.scroll : options.config.scroll
        for(var key in defaults.config.scroll)
        { options.config.scroll[key] == undefined ? options.config.scroll[key] = defaults.config.scroll[key] :  options.config.scroll[key] = options.config.scroll[key];}

        // Global
        let _this = this;
        let scrollContainer = 0;
        let scrollContentWrapper = 0;
        let scrollContent = 0;
        let contentPosition = 0;
        let scrollerBeingDragged = false;
        let scroller = 0;
        let topPosition;
        let scrollerHeight;
        let normalizedPosition = 1;
        let reachedBottom = false;

        /*
        ** Detect OS
        */
        function androidOrIOS() {
            const userAgent = navigator.userAgent;
            if (/android/i.test(userAgent)){
                return 'android';
            }
            if (/iPad|iPhone|iPod/i.test(userAgent)){
                return 'ios';
            }
        }

        /*
        ** Check Track Click
        */
        var checkTrackClick = this.checkTrackClick = function checkTrackClick(evt) {

            // Check if it is clicking in the scrollbar
            if(evt.target.classList[0] != "lms_scroller")
            {
                // if it is before the scrollbar, goes up
                if(evt.layerY < scroller.offsetTop)
                {
                    _this.scroller.style.top = _this.scroller.style.top-20;
                    _this.scrollElement.scrollTop = _this.scrollElement.scrollTop-40;
                }
                // if is is after the scrollbar, goes down
                if(evt.layerY > scroller.offsetTop)
                {
                    _this.scroller.style.top = _this.scroller.style.top+20;
                    _this.scrollElement.scrollTop = _this.scrollElement.scrollTop+40;
                }
            }
        }

        /*
        ** Hide Elements
        */
        var hideElement = this.hideElement = function hideElement(element, value) {
            element.style.opacity = value;
        }

        /*
        ** Calculate Scrollbar Height
        */
        var calculateScrollerHeight = this.calculateScrollerHeight = function calculateScrollerHeight(evt) {
            var visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
            return visibleRatio * scrollContainer.offsetHeight;
        }

        /*
        ** Move Scroll
        */
        var moveScroller = this.moveScroller = function moveScroller(evt) {
            
            var newBottomOffset, bottomScroll; 

            // Move Scroll bar to top offset
            var scrollPercentage = evt.target.scrollTop / scrollContentWrapper.scrollHeight;
            topPosition = scrollPercentage * scrollContainer.offsetHeight;
            scroller.style.top = topPosition + 'px';

            // onMove callback()
            if (typeof _this.onMove == "function") { _this.onMove(); } 

            // onEnd callback()
            if(scrollContentWrapper.scrollTopMax != undefined)
            {   
                    // ###################################################
                    // For Gecko Engine (Mozilla)
                    // ###################################################

                    bottomScroll = Number(scrollContentWrapper.scrollTopMax);

                    // Check if exists bottomOffset
                    if(options.config.scroll.bottomOffset > 0)
                    {
                        newBottomOffset = Number(scrollContentWrapper.scrollTopMax) - Number(options.config.scroll.bottomOffset);
                    } else {  newBottomOffset = scrollContentWrapper.scrollTopMax; }

                    if(evt.target.scrollTop >= newBottomOffset)
                    {
                        // Check if scroll is current in reachedBottom state, so scroll can move further without trigger any callback
                        if(reachedBottom == false)
                        {
                            if (typeof _this.onEnd == "function") { _this.onEnd(); } reachedBottom = true;
                            reachedBottom = true;
                        }
                    } else { reachedBottom = false;  }

            } else { 
                    
                    // ###################################################
                    // // For Chromium Engine (Chrome, Opera, Edge..)
                    // ###################################################

                    bottomScroll = Number(scrollContentWrapper.scrollTop);
                    var ChromiumEngineBottom = scrollContentWrapper.scrollHeight - scrollContentWrapper.clientHeight; 
                    
                    // Check if exists bottomOffset
                    if(options.config.scroll.bottomOffset > 0)
                    {
                        newBottomOffset = ChromiumEngineBottom - Number(options.config.scroll.bottomOffset);
                    } else { newBottomOffset = ChromiumEngineBottom; }

                    if(Math.ceil(bottomScroll) >= newBottomOffset)
                    {
                        // Check if scroll is current in reachedBottom state, so scroll can move further without trigger any callback
                        if(reachedBottom == false)
                        {
                            if (typeof _this.onEnd == "function") { _this.onEnd(); } reachedBottom = true;
                            reachedBottom = true;
                        }
                    } else { reachedBottom = false; }
            }

            // oTop callback()
            if(evt.target.scrollTop <= 0){ if (typeof _this.onTop == "function") { _this.onTop(); } }
            
        }

        /*
        ** Start Drag Event
        */
        var startDrag = this.startDrag = function startDrag(evt) {

            normalizedPosition = evt.pageY;
            contentPosition = scrollContentWrapper.scrollTop;
            scrollerBeingDragged = true;

            // onDragStart callback()
            if (typeof _this.onDragStart == "function") { _this.onDragStart(); } 
        }

        /*
        ** Stop Drag Event
        */
        var stopDrag = this.stopDrag = function stopDrag(evt) {

            // Dispatch event when drag is stoppped
            if(scrollerBeingDragged == true)
            {
                scrollerBeingDragged = false;
                // OnDragStop callback()
                if (typeof _this.onDragStop == "function") { _this.onDragStop(); } 
            }

        }

        /*
        ** Scrollbar Event
        */
        var scrollBarScroll = this.scrollBarScroll = function scrollBarScroll(evt) {
            if (scrollerBeingDragged === true) {
                var mouseDifferential = evt.pageY - normalizedPosition;
                var scrollEquivalent = mouseDifferential * (scrollContentWrapper.scrollHeight / scrollContainer.offsetHeight);
                scrollContentWrapper.scrollTop = contentPosition + scrollEquivalent;
            }
        }

        /*
        ** Refresh scrollbar height
        */
        var refreshScroll = this.refreshScroll = function refreshScroll(evt) {
            scrollerHeight = calculateScrollerHeight();
            scroller.style.height = scrollerHeight + 'px';
        }

        /*
        ** Main throttle function
        */
        function throttle (func, interval) {
            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function () {
                    timeout = false;
                };
                if (!timeout) {
                    func.apply(context, args)
                    timeout = true;
                    setTimeout(later, interval)
                }
            }
        }

        /*
        ** Scroll Structure
        */
        var SetupScroll = this.SetupScroll = function SetupScroll() {

            // Obter o element
            let selectorElement = document.getElementById(this.selector);

            selectorElement.classList.add("lms_scrollable");
            selectorElement.style.cssText = 'width:'+options.config.dimensions.width+';height:'+options.config.dimensions.height;

            let selectorElementHTML = selectorElement.innerHTML;
            selectorElement.innerHTML = "";

            // Creates div main div
            selectorElement.insertAdjacentHTML("afterbegin", "<div id='scroll_inner_"+randomID+"' class='lms_content_wrapper'></div>");
            let scrollInner = document.getElementById("scroll_inner_"+randomID);
  
            // Creates div and track div
            scrollInner.insertAdjacentHTML("afterbegin", "<div id='scroll_content_"+randomID+"' class='lms_content'></div> <div id='lms_track_"+randomID+"' class='lms_scroll_track'></div>");
            let scrollContent = document.getElementById("scroll_content_"+randomID);
            let scrollTrack = document.getElementById("lms_track_"+randomID);

            // Content from original elements into the created elements
            scrollContent.innerHTML = selectorElementHTML;

            // Define variables from new elements
            this.scrollTrack = scrollTrack;
            this.scrollElement = scrollInner;
            this.scrollContent = scrollContent;
            this.mainElement = selectorElement;

            scrollContainer = selectorElement;
            scrollContentWrapper = scrollInner;

            // Calculate scrollbar height
            scrollerHeight = calculateScrollerHeight();
            
            // Check if scrollbar is needed based on height
            if (scrollerHeight / scrollContainer.offsetHeight < 1){

                // Creat scrollbar div
                scrollTrack.insertAdjacentHTML("beforeend", "<div id='lms_scroller_"+randomID+"' class='lms_scroller'></div>");
                scroller = document.getElementById("lms_scroller_"+randomID);
                this.scroller = scroller;

                // Apply scrollbar height
                scroller.style.height = scrollerHeight + 'px';
            
                // Show scroll path divot
                scrollContainer.className += ' lms_showScroll';
                
                // Attach related draggable listeners
                scroller.addEventListener('mousedown', startDrag);
                window.addEventListener('mouseup', stopDrag);
                window.addEventListener('mousemove', scrollBarScroll);
            }
            
            scrollContentWrapper.addEventListener('scroll', moveScroller);

            // Add global listeners
            if(!androidOrIOS())
            {
                // Global listeners for Desktop
                scrollTrack.addEventListener('click', checkTrackClick);

                if(options.config.scroll.autoHide == true)
                {   
                    this.hideElement(scroller, 0);
                    scrollContainer.addEventListener("mouseover", function(){ _this.hideElement(scroller, 1); }); 
                    scrollContainer.addEventListener("mouseout", function(){  _this.hideElement(scroller, 0); });  
                } 

            } else {

                // Hide scroll onload
                if(options.config.scroll.autoHide == true){  _this.hideElement(scroller, 0); }

                // Global listeners for Mobile
                scrollContainer.addEventListener("touchstart", function(){
                    if (typeof _this.onTouchStart == "function") { _this.onTouchStart(); } 
                    if(options.config.scroll.autoHide == true) { _this.hideElement(scroller, 1);} 
                }); 
                scrollContainer.addEventListener("touchend", function(){ 
                    if (typeof _this.onTouchStop == "function") { _this.onTouchStop(); } 
                    if(options.config.scroll.autoHide == true) { _this.hideElement(scroller, 0); } 
                });   
            }

            // onComplete callback() when LetMeScroll is initialized
            if (typeof this.onComplete == "function") { this.onComplete(); } 
        }

        // Init
        this.SetupScroll();

        // Refresh content
        var ResizeWindow = throttle(function() {
            refreshScroll();
        }, 10);

        // Add EventListener
        window.addEventListener('resize', ResizeWindow);
    }

    /*
    ** Methods
    */

    // Scroll to specific value
    scrollTo(value)
    {
        // Reset current scroll position
        this.scroller.style.top = "0px";
        this.scrollElement.scrollTop = 0;

        // Scroll to given value
        this.scroller.style.top = value+"px";
        this.scrollElement.scrollTop = value;
      
    }

    // Destroy scrollbar and unbind all its events
    destroy()
    {
        // Store content from inner divs
        let tempContent = this.scrollContent.innerHTML;

        // Remove all inner divs and all its events
        this.scrollContent.remove();
        this.scrollElement.remove();

        // Places content inside original div again and removes all classes associated with LetMeScroll.js
        this.mainElement.innerHTML = tempContent;
        this.mainElement.classList.remove("lms_scrollable");
        this.mainElement.classList.remove("lms_showScroll");
    }

    // Refresh scroll
    refresh()
    {
        // Refresh scrollbar height
        this.refreshScroll();
        // Fix scroll offset when new item is added
        this.scrollTo(this.scrollElement.scrollTop);
    }

    // rebuild scroll
    build()
    {
        // rebuild scroll
        this.SetupScroll();
    }

    // Append items to scroll container
    async appendTo(properties) {
        
        // OnComplete Callback
        function onComplete(callback) { 
            if (typeof callback == "function") { callback();}
        } 

        // Get position e check if position is undefined.
        var position = properties.position;
        if(position == undefined) { var position = "beforeend"; }

        if(properties.items && typeof(properties.items) === 'object')
        {
            // Loop object and add new options to original select box
            var prop = Object.keys(properties.items).length;
            for (var i = 0; i < prop; i++) {
                this.scrollContent.insertAdjacentHTML(position, properties.items[i].content);
            }
        }

        // Refresh scrollbar position because of the new content
        this.refresh();

        // if is "onComplete" is a function, call it back.
        if (typeof properties.onComplete == "function") { onComplete(properties.onComplete); }
    } 

    /*
    ** API > Gets
    */

    // Get main element Id
    get mainElementId() { return "scroll_content_"+this.randomID; }
    // Get scrollbar id
    get scrollbarId() { return "lms_scroller_"+this.randomID; }
    // Get trackbar id
    get trackbarId() { return "lms_track_"+this.randomID; }
}

// Export module to use it in browser and NodeJS
try {
   module.exports = exports = LetMeScroll;
} catch (e) {}

