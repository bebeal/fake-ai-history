# Tags

This directory compartmentalizes everything relating to Tags. The file structure is loosely:

* `Tag.tsx`: Generic Tag Component
* `TagList.tsx`: Generic TagList Component
* `Tags.tsx`: Util functions and components
* `Tags/`: Directory containing the Individual Tag Set components.
* `index.ts`: Exports
* `README.md`: This file

## The Two Generic Components

---

* Tag
* TagList

### Tag

A Tag component consists of an optional label and optional icon. It takes in a `tagName`, searches the global `TAG` map for the name, and displays the label and icon using the retrieved tag.

Props:

* `tagName`: The name of the tag to render. This is used to look up the tag in the TAGS map.
* `initiallyActive`: Whether the tag should be active or inactive when the component is first rendered. Default: true.
* `useHref`: Whether the tag should be rendered as an anchor tag or a div. Default: false.
* variant: The variant of the tag to render. Default: 0.
* `tagColor`: The color of the tag. Default: white.
* `width`: The width of the tag. Default: 24px.
* `height`: The height of the tag. Default: 24px.

### TagList

A TagList component consists of a list of tags. It takes in a list of tag names and renders the corresponding tags.

Props:

* `tagNames`: The names of the tags to render. These are used to look up the tags in the TAGS map.
* `direction`: "row" or "column" for the direction of the tags. Default: "row"
* `useHref`: Whether the tags should be rendered as anchor tags or divs. Default: false.
* `tagColors`:  The color (corresponding to css classes) of the tags. Default: white.

## The Tag Sets

---

Sources Icon Sets from [icones](https://icones.js.org/collection)

Icon Sets:

* Custom:
* Carbon ([Icones Set](https://icones.js.org/collection/carbon)):
* Material Design ([Icones Set](https://icones.js.org/collection/mdi)):
* Google Material ([Icones Set](https://icones.js.org/collection/ic)):
* Logo ([Icones Set](https://icones.js.org/collection/logo)):
* VSCode ([Icones Set](https://icones.js.org/collection/vscode-icons)):
* Ion ([Icones Set](https://icones.js.org/collection/ion)):
* MingCute ([Icones Set](https://icones.js.org/collection/mingcute)):
* Phosphor ([Icones Set](https://icones.js.org/collection/ph)):
* Unicons ([Icones Set](https://icones.js.org/collection/uil)):
* Teeny Icons ([Icones Set](https://icones.js.org/collection/teeny-icons)):
* Remix ([Icones Set](https://icones.js.org/collection/ri)):
* Tabler ([Icones Set](https://icones.js.org/collection/tabler)):
* Font Awesome 6 (Regular) ([Icones Set](https://icones.js.org/collection/fa6-regular)):
* Font Awesome 6 (Brand) ([Icones Set](https://icones.js.org/collection/fa6-brands)):
* Bootstrap ([Icones Set](https://icones.js.org/collection/bi)):
* Box ([Icones Set](https://icones.js.org/collection/bx)):

## Customization


