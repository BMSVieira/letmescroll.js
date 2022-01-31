
/*-------------------------
Made by: Bruno Vieira
--------------------------- */

// TODO
// Refresh da scroll bar sempre que se redimensiona a div
// Colocar callback para inicio, fim e movimento

class LetMeScroll {
    constructor(options) {

        const defaults = {
            selector : 'defaultId',
            dimensions : {
              width: "100%"
            },
            config : {
                storage : {
                    captionOffset: false,
                    playrateSpeed: false,
                    captionSize: false
                }
            }
        };      

        // Scroll Random ID
        var randomID = Math.floor(Math.random() * (9999 - 0 + 1)) + 0;
        
        this.selector = options.selector.substring(1) || defaults.selector.substring(1);

        // Global
        var _this = this;
        var scrollContainer = 0;
        var scrollContentWrapper = 0;
        var scrollContent = 0;
        var contentPosition = 0;
        var scrollerBeingDragged = false;
        var scroller = 0;
        var topPosition;
        var scrollerHeight;
        var normalizedPosition = 1;

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
        ** Calculate Scrollbar Height
        */
        var calculateScrollerHeight = this.calculateScrollerHeight = function calculateScrollerHeight(evt) {
            // *Calculation of how tall scroller should be
            var visibleRatio = scrollContainer.offsetHeight / scrollContentWrapper.scrollHeight;
            return visibleRatio * scrollContainer.offsetHeight;
        }

        /*
        ** Move Scroll
        */
        var moveScroller = this.moveScroller = function moveScroller(evt) {
            // Move Scroll bar to top offset
            var scrollPercentage = evt.target.scrollTop / scrollContentWrapper.scrollHeight;
            topPosition = scrollPercentage * (scrollContainer.offsetHeight - 3); // 5px arbitrary offset so scroll bar doesn't move too far beyond content wrapper bounding box
            scroller.style.top = topPosition + 'px';
        }

        /*
        ** Start Drag Event
        */
        var startDrag = this.startDrag = function startDrag(evt) {
            normalizedPosition = evt.pageY;
            contentPosition = scrollContentWrapper.scrollTop;
            scrollerBeingDragged = true;
        }

        /*
        ** Stop Drag Event
        */
        var stopDrag = this.stopDrag = function stopDrag(evt) {
            scrollerBeingDragged = false;
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
        ** Scroll Structure
        */
        var SetupScroll = this.SetupScroll = function SetupScroll() {

            // Obter o element
            var selectorElement = document.getElementById(this.selector);
            var selectorElementHTML = selectorElement.innerHTML;

            // Criar uma div e colocar la todo o conteudo
            selectorElement.insertAdjacentHTML("afterbegin", "<div id='scroll_inner_"+randomID+"' class='content-wrapper'></div>");
            var scrollInner = document.getElementById("scroll_inner_"+randomID);

            scrollInner.insertAdjacentHTML("afterbegin", "<div id='scroll_content_"+randomID+"' class='content'></div>");
            var scrollContent = document.getElementById("scroll_content_"+randomID);

            scrollContent.innerHTML = selectorElementHTML;
            this.scrollContent = scrollContent;

            scrollContainer = selectorElement;
            scrollContentWrapper = scrollInner;

                // Creates scroller element and appends to '.scrollable' div
                scroller = document.createElement("div");
                scroller.className = 'scroller';

                this.scroller = scroller;
                // determine how big scroller should be based on content
                scrollerHeight = calculateScrollerHeight();
                
                if (scrollerHeight / scrollContainer.offsetHeight < 1){
                    // *If there is a need to have scroll bar based on content size
                    scroller.style.height = scrollerHeight + 'px';

                    // append scroller to scrollContainer div
                    scrollContainer.appendChild(scroller);
                    
                    // show scroll path divot
                    scrollContainer.className += ' showScroll';
                    
                    // attach related draggable listeners
                    scroller.addEventListener('mousedown', startDrag);
                    window.addEventListener('mouseup', stopDrag);
                    window.addEventListener('mousemove', scrollBarScroll)
                }
                
                // *** Listeners ***
                scrollContentWrapper.addEventListener('scroll', moveScroller);

        }

        // Setup
        this.SetupScroll();

    }
}

// Export module to use it in browser and NodeJS
try {
   module.exports = exports = Moovie;
} catch (e) {}

