# Brandgility's embedded demo

Controls on the page, from left to right:
1. **template id input**: the id of template you want to open to configure
2. **Open Template button**: used to open the template to configure, needs a template id to be filled in
3. **saved item id input**: the id of previously saved item to configure
4. **Open Saved Item button**: used to open a previously saved item to configure, needs a saved item id to be filled in
5. **Save button**: triggers save of current configuration
   - if item is a draft template then it will be added to saved items
   - if item has been configured and saved previously then configuration will be overwrited with current one.
6. **Save As button**: works only for saved items. Configuration will be saved to a newly created item, current item won't be changed.

Also if error occurs then it will be visible in bottom of the page.
