<p align="center">
<img width="450" src="https://raw.githubusercontent.com/BMSVieira/letmescroll.js/main/demo/img/letmescroll.png?token=GHSAT0AAAAAABLNGOUJ6XQPSAWIBDLY5ZZEYPZUQ3A">
</p>


<p align="center" size="20pt"><font size="20pt"><b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-demo">Demo</a></b> 🔸 <b><a href="https://github.com/BMSVieira/moovie.js#%EF%B8%8F-installation-browser">Installation</a></b> 
 

◼️ Features:
-
- 🔧 Native Scroll Behavior
- 🛠 Standardized events / shortcuts / API
- 🌠 Fast & Lightweight
- 💪 No dependencies, built with VanillaJS
- 🌎 Tested in all modern browsers
- 🖌 Easy Customization

◼️ Demo:
-
https://mooviejs.com/

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
             bottomOffset: 0
           }
     }
   });
});
```

◼️ API > Methods:
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

| Name | Type | Description |
| --- | --- | --- |
| `value` | `int` | Jump to specific location in the container |

```javascript
demo.scrollTo(200);
```
