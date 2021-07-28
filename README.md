# Shortly

This is a project that I used to improve my usage of best practices in HTML, CSS and JS.

## BEM Naming

I followed BEM naming convention and added some tweaks (or could be the proper way 🤔) to it, according to https://en.bem.info/forum/51/

Blocks will remain as 
> [section's name]__[block's name]

<br>

Whereas elements will be named as
> [block's name]-[element's name]

<hr>

I find this to make more sense than my previous way of doing it.\
E.g. For elements:
> [section's name]__[element's name]

Doing this will create a relationship between the element and it's nearest parent block. \
This allows for a more generic and less unique *element*'s name.

## Accessibility

I found out that there are several attributes to be added to the hamburger button. [Source](https://dev.to/savvasstephnds/your-hamburger-menu-button-is-inaccessible-here-s-how-to-fix-it-7n)
* aria-haspopup (Totally my first time knowing this! 😂)
* aria-expanded

I also found out that I should be hiding (setting aria-hidden to true) my images quite often unless, it's necessary.  
For e.g. adding aria-hidden="true" to hamburger icon. To still allow screen reader users to know the button's function, add an aria-label to the button element.

## SCSS File Organization
I found this cool [5-1 Pattern Architecture](https://matthewelsom.com/blog/simple-scss-playbook.html)! It's my first time following this approach and it definitely makes the code looks neater~ 😀\
But it will probably take a while before I get used to it. 😂

## JS
Another project, comes another chance at improving my functional programming in JS! 😁
