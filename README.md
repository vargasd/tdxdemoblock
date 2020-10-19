# BlockSDK Demo Block

Sample Salesforce Marketing Cloud Content Builder Block using the [blocksdk](https://github.com/salesforce-marketingcloud/blocksdk) and SSO OAuth.

_This block is meant for demo purposes only._ There is insecure code, most notably storing an auth token on the session, and allow cross-site scripting in the browser.

## Description

This block is meant to demonstrate a common use case. It allows an HTML/AMPscript developer set up block templates that can then be configured by a less technical user without potentially changing something they shouldn't.

The template blocks should be HTML or code snippet blocks, and should have the tag `customblocktemplate`. The HTML will drive the UI of the block. The field replacement indicators in the HTML look like this:

`[[<field type>|<field name>|<superContent placeholder text (optional)>]]`

For example:

```html
<a href="[[link|Hero Link|]]"
  ><img
    src="[[image|Hero Image|https://dummyimage.com/600x400/000/fff.png?text=hero]]" /></a
>`
```

The supported types are `link`, `text`, and `image`.

To lock the configuration to a specific block, provision the custom block URL with the block ID. (e.g. `https://myblockbaseurl.com/block/12345`).

## Development

### Install and run as a node app

```bash
npm install
npm start
```

One click deployment to heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Environment variables

The node app needs the following env variables set:

- APP_ID - the app ID or installed package ID so it knows what SSO page to send to
- APP_SIGNATURE - the app signature or JWT signing secret so it can decode the JWT passed by SSO
- CLIENT_ID - the client id from the API integration so it can use the auth endpoing to get a token
- CLIENT_SECRET - the client secret from the API integration so it can use the auth endpoing to get a token

You can use a [.env](https://www.npmjs.com/package/dotenv) to make this process simpler.

To test your changes locally:

```bash
npm run build; npm start NODE_ENV=development
```

Then go to the block tester app and enter `http://localhost:3003` in the text field and click a block. You will have to allow unsecure iframes in your bowser (top right in the url bar in Chrome) first. You will need to [install a custom block](https://developer.salesforce.com/docs/atlas.en-us.mc-app-development.meta/mc-app-development/create-content-block.htm) in a Marketing Cloud account to fully test the authentication piece.

Once ready to deploy, commit your changes to your repo and click the deploy to heroku button on it.
