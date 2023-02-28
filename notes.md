# Spike 6 notes

## DOM Manipulation

- Manipulating the **DOM** (the **Document Object Model**) is actually the original reason JavaScript was developed. It refers to JavaScript's ability to target parts of the HTML document and manipulate their appearance and/or functionality. This is often in response to user interaction, or to dynamically display data coming from an external source.

- The targeted element can be saved into a **variable**, which can then have properties manipulated using JavaScript. [This](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Manipulating_documents) page is a great starting point. The **window** object represents the browser window itself, while the **document** object is the HTML page being displayed.

- The DOM can be viewed like a **tree** made up of **nodes**. A **node** is any type of object in the DOM tree - **HTML elements** are types of nodes, but not all nodes are elements! Let's target some elements to get a better look.

- There are quite a few **get methods** to target elements on a page. Giving your HTML element an Id and using **.getElementById()** is the safest way to target a specific element, but you an also get by **class**, or by **tag**. The recommended modern approach is to use **document.querySelector()** - you can use any valid **CSS selector** inside the parentheses to target an element. Just be aware that changes to your document layout can sometimes affect whether a CSS selector targets a specific element (you may have had this issue in your last project..). eg:

```js
const pElement = document.querySelector("p"); //targets the first <p> element on the page
const pById = document.getElementById("p-id"); //targets the <p> element with an id attribute of "p-id"
const pById2 = document.querySelector("#p-id"); //targets the <p> element with an id attribute of "p-id" (notice you have to specify # for query selector)
const pByClass = document.querySelector(".p-class"); //targets the first <p> element with a class attribute of "p-class"
const pChildOfDiv = document.querySelector("div > p"); //targets first <p> element that is a direct child of a <div>
```

- If you want to target more than a single element, you can use **document.querySelectorAll()** which targets _all_ elements that fit the specified CSS selector. It returns those elements in a **Node List**, essentially an array of element nodes. **.getElementsByTagName()** and **.getElementsByClassName()** also return Node Lists. You can now **loop** over or display by **index**, just like on a regular array. eg:

```js
const pElements = document.querySelectorAll("p"); // targets all <p> elements on the page

for (let i = 0; i < pElements.length; i++) {
  console.log(pElements[i]); // logs each <p> element to the console
}
```

- Once you have an element assigned to a variable, you can start manipulating:

  - **.setAttribute()** - takes two arguments: the attribute to be added/manipulated, and the value of that attribute. Example of changing the **src** and **alt** attributes for an **&lt;img&gt;**:

  ```js
  const image = document.querySelector("img");
  image.setAttribute("src", "http://new-url.com");
  image.setAttribute(
    "alt",
    "New alt text to match the new image from src change."
  );
  ```

  - **.classList** gives you access to all the classes assigned to an element. You can then **.add()**, **.remove()**, **.replace()** or **.toggle()** individual classes without resetting the whole attribute. eg:

  ```js
  image.classList.add("new-class");
  ```

  - **.innerHTML** can read or reset the nested HTML content of an element. For a text element, like a **&lt;p&gt;** or **&lt;h1&gt;**, this is simply the text content. For other elements, like a **&lt;div&gt;** or **&lt;table&gt;**, this is all the child elements nested inside. If you want only the text without the element tags, you can use **.innerText** instead. [This](https://www.w3schools.com/jsref/prop_node_innertext.asp) page does a good job of explaining the difference. Example of replacing the content of a **&lt;p&gt;** tag:

  ```js
  const p = document.querySelector("#my-p");
  p.innerHTML = "This paragraph has been changed.";
  ```

- Finding the **value** of an input is an important use for JavaScript. A user can **input** some information in the form of text, or by selecting an option from available inputs (checkbox, radio, select, etc). You can use **.checked** to see whether a radio or checkbox has been checked, and then **.value** and take the value. For a group of inputs, such as a collection of radio inputs, you might have to use a **loop** to look at all of them and identify the one that is checked. We can wrap this process in a function to be called when a button is clicked. eg:

```js
function whichCheckbox() {
  const allRadios = document.querySelectorAll("input[type='radio']");
  const checkedRadio = "none";
  for (let i = 0; i < allRadios.length; i++) {
    if (allRadios[i].checked) {
      checkedRadio = allRadios[i].value
    }
  })
}
```

- JavaScript also let's us **create** new elements! The process involves using the **document.createElement()** method, the parentheses hold the element type to be created. Any attributes or classes can be added using **.setAttribute()** and/or **.classList.add()**. Dynamically created elements _must_ be **appended** to the document. You will use querySelector or another get-method to target the element your new element can be nested inside, then use **.append()** or **.appendChild()** to attach the new element to the already existing one. Note that your new element will always be appended to the end of its parent. Example adding a **&lt;p&gt;** to an existing **&lt;div&gt;**:

```js
const p = document.createElement("p");
p.innerHTML = "This is a new paragraph.";
const div = document.querySelector("div");
div.appendChild(p);
```
