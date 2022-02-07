<br><p align="center">
<img width="450" src="https://raw.githubusercontent.com/BMSVieira/letmescroll.js/main/demo/img/letmescroll.png?token=GHSAT0AAAAAABLNGOUJ6XQPSAWIBDLY5ZZEYPZUQ3A">
</p>


<p align="center" size="20pt"><font size="20pt"><b><a href="https://github.com/BMSVieira/letmescroll.js#%EF%B8%8F-demo">Demo</a></b> - <b><a href="https://github.com/BMSVieira/letmescroll.js#%EF%B8%8F-installation-browser">Installation</a></b> - <b><a href="https://github.com/BMSVieira/letmescroll.js#%EF%B8%8F-methods">Methods</a></b> - <b><a href="https://github.com/BMSVieira/letmescroll.js#%EF%B8%8F-callbacks">Callbacks</a></b> - <b><a href="https://github.com/BMSVieira/letmescroll.js#%EF%B8%8F-styling-">Styling</a></b>  
 

◼️ Features:
-
- 🔧 Native Scroll Behavior
- 🛠 Standardized events / shortcuts / API
- 🌠 Fast & Lightweight
- 💪 No dependencies, built with VanillaJS
- 🌎 Tested in all modern browsers
- 🖌 Easy Customization
- 📢 Multiple Callbacks

◼️ Demo:
-
https://bmsvieira.github.io/letmescroll.js/

◼️ Installation (Browser):
-

<b>1 - Include JavaScript Source.</b>
```javascript
<script src="path/to/letmescroll.js"></script>
```
<b>2 - Include Styles.</b>
```javascript
<link rel="stylesheet" href="path/to/letmescroll.css">
```
<b>3 - Set HTML.</b>
```html
<div id="example">
 <!-- HTML CODE HERE -->
</div>
```
<b>4 - Initilize.</b>
```javascript
document.addEventListener("DOMContentLoaded", function() {
    demo = new LetMeScroll({
     selector: "#example",
     config : {
           dimensions : {
               width : "auto",
               height : "500px"
           },
           scroll : {
             bottomOffset: 0,
             autoHide: true
           }
     }
   });
});
```
◼️ CDN:
-
You can use our CDN (provided by JSDelivr) for the JavaScript and CSS files.

```html
// Javascript
<script src="https://cdn.jsdelivr.net/gh/BMSVieira/letmescroll.js@latest/js/letmescroll.js"></script>

// CSS
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BMSVieira/letmescroll.js@latest/css/letmescroll.css">
```
◼️ Methods:
-

<b>destroy:</b>
Destroy current scrollbar and unbind all its events

```javascript
demo.destroy();
```

<b>build:</b>
 Build new LetMeScroll

```javascript
demo.build();
```

<b>refresh:</b>
Refresh current scrollbar

```javascript
demo.refresh();
```

<b>scrollTo:</b>
Scroll to specific location (px)

Type | Description |
| --- | --- |
| `int` | Jump to specific location in the container |

```javascript
demo.scrollTo(200);
```
 
<b>appendTo:</b>
Add new content to the scroll container
 
| Name | Value | Description |
| --- | --- | --- |
| `position` | `afterbegin` or `beforeend` | Add new items at beginning or ending of the container |
| `items` | `object` | Options to add to original selectbox |

```javascript
demo.appendTo({
    position: "afterbegin",
    items : {
            0: {
                content: '<!-- HTML ELEMENT HERE -->'
            }
    },
    onComplete: function(){
        <!-- CODE HERE -->
    } 
});
```
 
◼️ Callbacks:
-

There are multiple callbacks you can use when building a new instance.

 ```javascript
// Called when LetMeScroll is initialized
onComplete: function(){ <!-- CODE HERE --> }
```
```javascript
// Called when scrollbar reaches the bottom.
onEnd: function(){ <!-- CODE HERE --> }
```
```javascript
// Called when scrollbar reaches the top
onTop: function(){ <!-- CODE HERE --> }
```
```javascript
// Called everytime scrollbar moves
onMove: function(){ <!-- CODE HERE --> }
```
```javascript
// Called when Drag starts
onDragStart: function(){ <!-- CODE HERE --> }
```
```javascript
// Called when Drag Stops
onDragStop: function(){ <!-- CODE HERE --> }
```
<b>Mobile Only</b>
```javascript
// Called when Touch starts
onTouchStart: function(){ <!-- CODE HERE --> }
```
```javascript
// Called when Touch Stops
onTouchStop: function(){ <!-- CODE HERE --> }
```
 ◼️ API > Gets:
-
```javascript
// Returns container DOM element (With this one, you can add new content)
demo.mainElementId

// Returns scrollbar container id
demo.scrollbarId

// Returns trackbar container id
demo.trackbarId
```
 
 
◼️ Styling :
-

Using <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties" target="_blank">CSS Custom Properties</a> you can easily customize your scrollbar. 
<br>Check below a list of variables and what they are used for:

| Name | Description | Default |
| --- | --- | --- |
| `--lms_scrollbar_bg` | Scrollbar background-color | `#868686`|
| `--lms_scrollbar_radius` | Scrollbar border-radius  | `5px`|
| `--lms_scrollpath_bg`| Scrollbar path background-color | `transparent`|
| `--lms_scrollpath_radius`| Scrollbar path border-radius | `5px`|

