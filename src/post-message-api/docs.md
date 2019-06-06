# Elateral's iframe embedding:
- get the id of template to be configured
- copy and paste this template into your page/component, `:id` in `src` attribute should be replaced with template's id:
```
<iframe
  style={{ width: '100%', height: '100%', border: 'none' }}
  src="<BRANDGILITY ENDPOINT>/embedded-template-configure/{new|edit}/:id" />
```

# API library
*To get iframe working you have to use Elateral's library to be able to use methods of configurator*

## Methods

|method|description|params|returns|
|:-----:|:-----:|:-----:|:-----:|
|save|triggers a save action|-|-|
|on|subscribes to event|eventName:`String`, callback:`function`|-|

## Events
### to subscribe use `on` method:
```
clientPostMessageAPI.on('load', () => {
  console.info('loaded');
});
```

|event|description|arguments|
|:-----:|:-----:|:-----:|
|load|success load event|asdasd|
|save|success save event|asd|
