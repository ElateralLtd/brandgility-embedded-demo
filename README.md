# Brandgility's embedded demo

Controls on the page, from left to right:
1. **template id input**: the id of the template you want to open to configure
2. **Open Template button**: used to open the template to configure, needs a template id to be supplied.
3. **saved item id input**: the id of the previously saved item to configure
4. **Open Saved Item button**: used to open a previously saved item to configure, needs a saved item id to be supplied.
5. **Save button**: triggers save of the current configuration
   - if the item is a draft template then it will be added to saved items
   - if the item is configured and saved previously then configuration will be overwritten.
6. **Save As button**: works only for a saved item. Configuration will be saved as a new saved item, and the current item will not be changed.

When an error occurs, it will be displayed at bottom of the page.
