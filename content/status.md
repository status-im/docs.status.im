---
weight: 30
title: Status API Reference
---

# status (API)

https://github.com/status-im/status-react/blob/develop/resources/js/status.js

## status

Remember, this is all about Ethereum. Anywhere.

Below you will find the formal API specification from which you can glean all the information you need to make your DApp truly mobile, with native mobile commands and an intuitive chat interface through which users can actually see, interact with, and pay for the services you offer.

## status.command

> A really simple template:

```js
status.command({
 name: "hello",
 title: "HelloBot",
 description: "Helps you say hello",
 color: "#7099e6",
 preview: function () {
 return status.components.text({}, "you’re saying hello");
 }
});
```

> It is important to note that params are available for any status.command(), including in params itself. For instance, if your user sends /hello whatsup, the input "whatsup" will be available in your command under params.hello. You can add additional params to - for instance - preview like so:

```js
params: [{
 name: "hello",
 type: status.types.TEXT
 placeholder: "Why not say hello"
}],
```

> The placeholder parameter above only applies if your users haven’t input anything into the command, not even the name. You can use it to include helpful guidance where necessary, i.e. "Type your password". Alternatively, you can also include suggestions for your users’ input. This should return a component to be rendered. For instance, if you are using the Console DApp and you select the /faucet command, you’ll see two suggestions to choose from.

> Example validator function (this specific example will raise an error if your user doesn’t input a string. Notice that you should return your message inside one of the status.components):

```js
validator: function(params) {
 if (!params.hello) {
   return status.components.text({}, "Say hello");
   }
 }
 ```
 
> Example of the request command to get a user send some amount of Ether somewhere:

```js
handler: function (params) {
        return {
            event: "request",
            params: [params.amount],
            request: {
                command: "send",
                params: {
                    amount: params.amount
                }
            }
        };
    },
```

> Full example of pretty much all the status.command stuff in action:

```js
status.command({
    name: "faucet",
    title: I18n.t('faucet_title'),
    description: I18n.t('faucet_description'),
    color: "#7099e6",
    registeredOnly: true,
    params: [{
        name: "url",
        type: status.types.TEXT,
        suggestions: faucetSuggestions,
        placeholder: I18n.t('faucet_placeholder')
    }],
    preview: function (params) {
        return {
            markup: status.components.text(
                {},
                params.url
            )
        };
    },
    shortPreview: function (params) {
        return {
            markup: status.components.text(
                {},
                I18n.t('faucet_title') + ": " + params.url
            )
        };
    },
    validator: function (params, context) {
        var f = faucets.map(function (entry) {
            return entry.url;
        });

        if (f.indexOf(params.url) == -1) {
            var error = status.components.validationMessage(
                I18n.t('faucet_incorrect_title'),
                I18n.t('faucet_incorrect_description')
            );

            return {markup: error};
        }
    }
});
```

### Parameters

Argument |  Description 
--------- |  ----------- 
name |  What your users will type in following a forward slash to invoke the command. For instance, if you wrote `name: "hello"`, your user might invoke `/hello`. There is an additional `params` object available on any of the below commands, including in params itself.
title | This is what will appear in the list of suggestions when a user starts typing a command. 
description | Appears below the `title` in the list of suggestions and allows you to provide a description of the command. 
validator | Allows you to check your users’ input before sending off the command. It takes a function, which should return an error if the input is invalid.
color | Defines the background color of the name of your command as it appears in the list of suggestions. Give commands different colors to help your users distinguish commands easily, and to harmonize with your DApp’s brand and color scheme.
icon | Define which icon will appear next to action messages, such as sending Ether or requesting a location. Think an arrow for sending, a pin for location etc.
params | Defines all the possible inputs to your command. Requires an array holding an object, with possible parameters `name`, `placeholder`, `suggestions`, and one of the `status.types`, which are: `status.types.TEXT`, `status.types.NUMBER`, `status.types.PHONE`, and `status.types.PASSWORD`.
preview | Defines what your user will see as a result of *their* action, before any other response. The preview parameter takes a function, which should return a `status.component`.
shortPreview | While `preview` controls how your command appears within your DApp’s chat interface, `short-preview` controls how your commands get shown in the list of chats, before your users tap on your chat. `short-prview` expects two params: `icon` and `params`.  
onSend | A self-explanatory param that takes a function which will be executed when the user presses the "send" button. It will return a map that should contain the markup value. If you specify this function, there will be no way to send a command to the chat and, in this case, the area (it’s called the `result-box`) with a specified markup will be displayed instead.
fullscreen | If your command has suggestions, this param controls whether that list of suggestions expands to fill the entire screen. See the interactive suggestion area tutorial for more.
request | This will allow you to request any action from the user, such as a phone number, password, confirmation to send Ether etc. Used with the `executeImmediately` option set to `true`, it will create a message the user can tap on an execute immediately.
executeImmediately (Boolean) | If true, this means that the **response** will be executed immediately when you press on it. For instance, when you see a response in a chat, you don’t have to type something — you just need to press on a response and it will be executed right after that.
sequentialParams (Boolean) | Specifies the way command arguments will be "requested". The default approach (`sequentialParams = false`) is to type a command this way: `/send 0.1 ETH somebody`, where `0.1`, `ETH` and `somebody` are arguments. However, there may be situations when you want to ask each argument separately. You can see the difference by executing `/password` command; it asks you for a password and, only after the user has provided one, requests confirmation.  Currently there is one limitation — you can use argument types (`type` value) only for `sequentialParams`, and if you want to (for example) hide the argument input, you should use `sequentialParams`
handler (!= null) | Of course, you probably want the command to do something when your users call it! The `handler` parameter takes a function to accomplish this. For instance, suppose your user inputs `/hello howdy`. "Howdy" is a valid string, and will pass the `hello` validator. From there, your handler could take over to send this greeting to another user: `handler: web3.shh.post(params.hello)`.

## status.response

> An example response for a confirmation code sent via SMS:

```js
status.response({
    name: "confirmation-code",
    color: "#7099e6",
    description: I18n.t('confirm_description'),
    sequentialParams: true,
    params: [{
        name: "code",
        type: status.types.NUMBER
    }],
    validator: function (params) {
        if (!/^[\d]{4}$/.test(params.code)) {
            var error = status.components.validationMessage(
                I18n.t('confirm_validation_title'),
                I18n.t('confirm_validation_description')
            );

            return {markup: error};
        }
    }
});
```

Now that you’ve covered all the parameters for `status.command()`, you can easily understand `status.response()`. This method takes the same parameters that `status.command()` does. The difference is that, with this method, you can actively ask a user to issue a command of their own.

For example, the Status DApp Wallet allows you to `/request` money. In that case, the person you’re requesting money from will see the result of `status.response(send)`. In other words, they’ll be asked to give a command, `/send`, in response to your `/request` command. Please check line 160-217 [here](https://github.com/status-im/status-react/blob/30596f743f0a6ac0b7aec575cc1483dd306cc1ef/bots/wallet/bot.js#L160) for more code.

The Wallet example illustrates that, as a DApp developer, you may wish to use `status.command()` and `status.response()` together to create dialogues of commands. You can also just use `status.response()` by itself to prompt your users to enter necessary information as part of the onboarding process for your DApp.

Because `status.command()` and `status.response()` take the same parameters, you can sometimes use nearly the same code for both of them. You simply have to consider when you want to ask a user to issue a command, and when you want to just make the command available. Most of the time, you’ll use `status.command()`.

## status.on

```js
status.on("init", function(params, context) {
 status.sendMessage("Hello, man!");
});
```

This method allows your DApp to respond to events. It requires an event name as a string, and a callback function. With the "init" option shown here, your DApp will trigger `status.sendMessage()` when the Status app loads your DApp — your DApp will greet your users even before they have clicked on it. Other options include "text-change" and "message"

## status.addListener

```js
status.addListener("on-message-input-change", 
 function (params, context) {
    return jsSuggestions({code: params.message}, context);
});
```

```js
status.addListener("init", 
 function (params, context) {
    return {"text-message": "Hey, man!"};
});
```

```js
status.addListener("on-message-send", 
 function (params, context) {
    if (isNaN(params.message)) {
        return {"text-message": "Seems that you don't want to send money :("};
    }

    var balance = web3.eth.getBalance(context.from);
    var value = parseFloat(params.message);
    var weiValue = web3.toWei(value, "ether");
    if (bn(weiValue).greaterThan(bn(balance))) {
        return {"text-message": "No way man, you don't have enough money! :)"};
    }
    try {
        web3.eth.sendTransaction({
            from: context.from,
            to: context.from,
            value: weiValue
        });
        return {"text-message": "You are the hero, you sent " + value + " ETH to yourself!"};
    } catch (err) {
        return {"text-message": "Something went wrong :("};
    }
});
```

Listener |  Description
-------------------------- |  -----------
on-message-input-change | This is analogous to a `text-change` event, except that it targets the chat’s input. You can find the jsSuggestions that are passed in in the example [here](https://github.com/status-im/status-react/blob/2862af86c960b481ddf64ec1713e14908a366616/bots/console/bot.js#L708).
init | Is called once, when a new session begins ("session" is currently taken to mean the interval between login and logout from a user's account). In the example provided the bot will just send the "Hey, man!" message to the user, but it could also it could return `markup` which will be shown in the suggestions area, etc.
on-message-send | Will be called when any (not command) message is sent. The example provided shows you how to send ether to yourself as a neat way of testing the functionality.


## status.localizeNumber

```js
preview: function (params, context) {
        return {
            markup: status.components.text(
                {},
                I18n.t('request_requesting') + " "
                + status.localizeNumber(params.amount, context.delimiter, context.separator)
                + " ETH"
            )
        };
    },
 ```

A simple method to try and ensure that whatever number the user inputs, is put into a usable format. The example provided shows it in use to make sure the number requesting ETH is handled correctly. This is part of a larger `status.command()` object that can be found [here](https://github.com/status-im/status-react/blob/30596f743f0a6ac0b7aec575cc1483dd306cc1ef/bots/wallet/bot.js#L182).

## status.types

```js
    types: {
        TEXT: 'text',
        NUMBER: 'number',
        PHONE: 'phone',
        PASSWORD: 'password'
    }
```

Types dictate what sort of data your users may input. The type you specify will determine what kind of keyboard gets shown to the user (if you have not already defined a custom one) so that they can input their response easily. It is important to specify them for a smooth, easy, and intuitive UI.

## status.types.TEXT

```js

status.command({
    name: "faucet",
    title: I18n.t('faucet_title'),
    description: I18n.t('faucet_description'),
    color: "#7099e6",
    registeredOnly: true,
    params: [{
        name: "url",
        type: status.types.TEXT,
        suggestions: faucetSuggestions,
        placeholder: I18n.t('faucet_placeholder')
    }],
```

If you define a `text` input, when the user responds, it will pop up a normal QWERTY keyboard.   
The example provided shows the first part of the `status.commnad()` we use to interact with our faucet so that our users can get some (test) ether to do interesting things with.

## status.types.NUMBER

```js
status.response({
    name: "confirmation-code",
    color: "#7099e6",
    description: I18n.t('confirm_description'),
    sequentialParams: true,
    params: [{
        name: "code",
        type: status.types.NUMBER
    }],
```

Defining `number` will result in the keyboard opening to it's number section.  
The example provided shows the first part of the `status.response()` object we use to request a confirmation code from the user when syncing their phone contacts.

## status.types.PHONE
```js
var phoneConfig = {
    name: "phone",
    registeredOnly: true,
    icon: "phone_white",
    color: "#5bb2a2",
    title: I18n.t('phone_title'),
    description: I18n.t('phone_description'),
    sequentialParams: true,
    validator: function (params) {
        return {
            validationHandler: "phone",
            parameters: [params.phone]
        };
    },
    params: [{
        name: "phone",
        type: status.types.PHONE,
        suggestions: phoneSuggestions,
        placeholder: I18n.t('phone_placeholder')
    }]
};
```
Defining `phone` will result in the keyboard opening to it's number section as well. One example should suffice to give you a general idea of how this works, so we have provided an excerpt of how we do phone cofirmation using the `PHONE` type. You can find the full code [here](https://github.com/status-im/status-react/blob/30596f743f0a6ac0b7aec575cc1483dd306cc1ef/bots/console/bot.js#L450)

## status.types.PASSWORD

```js 
status.response({
    name: "password",
    color: "#7099e6",
    description: I18n.t('password_description'),
    icon: "lock_white",
    sequentialParams: true,
    params: [
        {
            name: "password",
            type: status.types.PASSWORD,
            placeholder: I18n.t('password_placeholder'),
            hidden: true
        },
        {
            name: "password-confirmation",
            type: status.types.PASSWORD,
            placeholder: I18n.t('password_placeholder2'),
            hidden: true
        }
```

Defining `password` will result in the keyboard opening to it's variable character section.  
The example provided shows the first part of the `status.response()` object we use to request and confirm a password from our user when they are setting up their account.

## status.events

```js
    events: {
        SET_VALUE: 'set-value',
        SET_COMMAND_ARGUMENT: 'set-command-argument'
    }
```

Events are essentially the glue that allow you to commuicate with the Status API effectively.

## status.events.SET_VALUE
```js 
{onPress: status.components.dispatch([status.events.SET_VALUE, entry])},
```

This method will completely update the content of text input. The full function around the snippet example provided can be found [here](https://github.com/status-im/status-react/blob/30596f743f0a6ac0b7aec575cc1483dd306cc1ef/bots/console/bot.js#L560).

## status.events.SET_COMMAND_ARGUMENT
```js
{onPress: status.components.dispatch([status.events.SET_COMMAND_ARGUMENT, [0, entry.url]])},
```
As opposed to `SET_VALUE`, this event will only update a single argument which you define. The full function around the snippet example provided can be found [here](https://github.com/status-im/status-react/blob/30596f743f0a6ac0b7aec575cc1483dd306cc1ef/bots/console/bot.js#L485).

## status.components

Create React Native Components yourself or use our pre-fabricated components.

## status.components.view

```js
function faucetSuggestions(params) {
    var suggestions = faucets.map(function (entry) {
        return status.components.touchable(
            {onPress: status.components.dispatch([status.events.SET_COMMAND_ARGUMENT, [0, entry.url]])},
            status.components.view(
                suggestionContainerStyle,
                [status.components.view(
                    suggestionSubContainerStyle,
                    [
                        status.components.text(
                            {style: valueStyle},
                            entry.name
                        ),
                        status.components.text(
                            {style: descriptionStyle},
                            entry.url
                        )
                    ]
                )]
            )
        );
    });
```

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.   
Expects 2 arguments - `options` and `element`.  
The example provided shows how we use the `view` component (in combination with the `text` component) to provide different suggestions about which faucets our users can call to get some test ether.

## status.components.text

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.   
Expects 2 arguments - `options` and some array of strings `s`.

## status.components.slider

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.  
Expects only one argument - `options`.  

Please see the `defineSubscription` method below for an example of this component in action.

## status.components.image

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.  
Expects only one argument - `options`.

## status.components.touchable

```js
function jsSuggestions(params, context) {
    var suggestions = getJsSuggestions(params.code, context);
    var sugestionsMarkup = [];

    for (var i = 0; i < suggestions.length; i++) {
        var suggestion = suggestions[i];

        if (suggestion.title.indexOf('*') >= 0) {
            suggestion.title = createMarkupText(suggestion.title);
        }
        var suggestionMarkup = status.components.view(jsSuggestionContainerStyle,
            [status.components.view(jsSubContainerStyle,
                [
                    status.components.text({style: jsValueStyle},
                        suggestion.title),
                    status.components.text({style: jsDescriptionStyle},
                        suggestion.desc)
                ])]);
        if (suggestion.pressValue) {
            suggestionMarkup = status.components.touchable({
                    onPress: status.components.dispatch([status.events.SET_VALUE, suggestion.pressValue])
                },
                suggestionMarkup
            );
        }
        sugestionsMarkup.push(suggestionMarkup);
    }

    if (sugestionsMarkup.length > 0) {
        var view = status.components.scrollView(jsSuggestionsContainerStyle(sugestionsMarkup.length),
            sugestionsMarkup
        );
        return {markup: view};
    }
}
```

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.  
Expects 2 arguments - `options` and `element`.  
The example provided uses the `touchable` component to make our suggestions that much more native and-feeling and interactive.
It's worth noting that `touchable` components can only wrap `view` components, so any touchable text for example needs to first be wrapped in a `view`.

## status.components.scrollView

```js
    var view = status.components.scrollView(
        suggestionsContainerStyle(ph.length),
        suggestions
    );

    return {markup: view};
```

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.  
Expects 2 arguments - `options` and `elements`.  
In the code snippet provided, we have taken the suggestions from the example above to do `components.view` and now want to inject it into a scrollView component for a better and smoother UI that our users have more control over.

## status.components.webView

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more.  
Expects only 1 argument - `url` and is what we use to display - as expected - the webView of a given DApp when browsing to it.

## status.components.validationMessage

> An example of using validationMessage within the validator argument being passed to status.command.

```js
validator: function (params, context) {
    var f = faucets.map(function (entry) {
        return entry.url;
    });

    if (f.indexOf(params.url) == -1) {
        var error = status.components.validationMessage(
            I18n.t('faucet_incorrect_title'),
            I18n.t('faucet_incorrect_description')
        );

        return {markup: error};
    }
}
```

This is the only custom Status component and it takes just two strings, and will return them wrapped in text components inside a view. You can find the full example [here](https://github.com/status-im/status-react/blob/2862af86c960b481ddf64ec1713e14908a366616/bots/console/bot.js#L550).

## status.components.bridgedWebview

Standard RN component - please see [JSCoach](https://js.coach/react-native) for more. Expects only 1 argument - `url`.

## status.components.subscribe

A method that allows you to add a subscription in the markup and expects just 1 argument - `path`. The added subscription will get the value from the bot-db using your specifiied path.

## status.components.dispatch

```js
var view = ["view", {},
        ["text", {}, "Balance " + balance + " ETH"],
        ["text", {}, ["subscribe", ["doubledValue"]]],
        ["slider", {
            maximumValue: ["subscribe", ["balance"]],
            value: defaultSliderValue,
            minimumValue: 0,
            onSlidingComplete: ["dispatch", ["set", "sliderValue"]],
            step: 0.05
        }],
        ['touchable',
            {onPress: ['dispatch', ["set-value-from-db", "roundedValue"]]},
            ["view", {}, ["text", {}, "Set value"]]
        ],
        ["text", {style: {color: "red"}}, ["subscribe", ["validationText"]]]
    ];
```

A method that allows you to specify an event that will be dispatched on some other event that occurs inside the markup (like pressing button, text change etc.). By 'markup', we mean - essentially - the view, or the mobile equivalent of the DOM.   
In the example provided, the variable `view` is what we mean by markup (and is, in this case, part of our `superSuggestion` function found [here](https://github.com/status-im/status-react/blob/2862af86c960b481ddf64ec1713e14908a366616/bots/demo_bot/bot.js#L31)) we specify that `["set", "sliderValue"]` will be dispatched on `onSlidingComplete`. We can’t allow user to write a real js handler here, so this is our workaround for now.

## status.setSuggestions

A method that allows you to set the suggestions that will appear in the markup, whether this is something simple like sending a message, or pretty much anything

## status.setDefaultDb and status.updateDb

```js
function superSuggestion(params, context) {
    var balance = parseFloat(web3.fromWei(web3.eth.getBalance(context.from), "ether"));
    var defaultSliderValue = balance / 2;

    var view = ["view", {},
        ["text", {}, "Balance " + balance + " ETH"],
        ["text", {}, ["subscribe", ["doubledValue"]]],
        ["slider", {
            maximumValue: ["subscribe", ["balance"]],
            value: defaultSliderValue,
            minimumValue: 0,
            onSlidingComplete: ["dispatch", ["set", "sliderValue"]],
            step: 0.05
        }],
        ['touchable',
            {onPress: ['dispatch', ["set-value-from-db", "roundedValue"]]},
            ["view", {}, ["text", {}, "Set value"]]
        ],
        ["text", {style: {color: "red"}}, ["subscribe", ["validationText"]]]
    ];

    status.setDefaultDb({
        sliderValue: defaultSliderValue,
        doubledValue: doubledValueLabel({value: defaultSliderValue})
    });

    var validationText = "";

    if (isNaN(params.message)) {
        validationText = "That's not a float number!";
    } else if (parseFloat(params.message) > balance) {
        validationText =
            "Input value is too big!" +
            " You have only " + balance + " ETH on your balance!";
    }

    status.updateDb({
        balance: balance,
        validationText: validationText
    });

    return {markup: view};
};
```

It is easiest to show you an example of these two methods at work in our [demo-bot](https://github.com/status-im/status-react/blob/2862af86c960b481ddf64ec1713e14908a366616/bots/demo_bot/bot.js#L31) within a superSuggestions object we have created.

`status.setDefaultDb` is a method that can be used to add default values to bot-db. These values will be applied to app-db only when markup is rendered the first time. For instance, on each change in command input suggestions handler for particular command's parameter is called, and this handler returns some markup. If markup wasn't changed between calls values passed to setDefaultDb will not be applied to bot-db

`status.updateDb` is a method that updates the bot-db, even if the markup doesn't contain any changes. It too expects just 1 argument - `map`

## status.sendMessage

This has just been implemented in the latest nightlies! Go and grab one of those and you'll have access to this route, as demonstrated by our updated [demo bot](https://github.com/status-im/status-react/blob/883b702fcba7d94b93828ccfaa6d6053100fe52d/resources/js/bots/demo_bot/bot.js#L102). The snippet provided also reveals how to work with the javascript concept of `localStorage`.

```js
status.addListener("on-message-send", function (params, context) {
    var cnt = localStorage.getItem("cnt");
    if(!cnt) {
        cnt = 0;
    }

    cnt++;

    localStorage.setItem("cnt", cnt);
    if (isNaN(params.message)) {
        return {"text-message": "Seems that you don't want to send money :(. cnt = " + cnt};
    }

    var balance = web3.eth.getBalance(context.from);
    var value = parseFloat(params.message);
    var weiValue = web3.toWei(value, "ether");
    if (bn(weiValue).greaterThan(bn(balance))) {
        return {"text-message": "No way man, you don't have enough money! :)"};
    }
    web3.eth.sendTransaction({
        from: context.from,
        to: context.from,
        value: weiValue
    }, function (error, hash) {
        if (error) {
            status.sendMessage("Something went wrong, try again :(");
            status.showSuggestions(demoSuggestions(params, context).markup);
        } else {
            status.sendMessage("You are the hero, you sent " + value + " ETH to yourself!")
        }
    });
});
```

## status.defineSubscription


```js
function round(n) {
    return Math.round(n * 100) / 100;
}

function doubledValueLabel(params) {
    var value = round(params.value);
    return "sliderValue = " + value +
        "; (2 * sliderValue) = " + (2 * value);
}

status.defineSubscription(
    // the name of subscription and the name of the value in bot-db
    // associated with this subscription
    "doubledValue",
    // the map of values on which subscription depends: keys are arbitrary names
    // and values are db paths to another value
    {value: ["sliderValue"]},
    // the function which will be called as reaction on changes of values above,
    // should be pure. Returned result will be associated with subscription in bot-db
    doubledValueLabel
);

status.defineSubscription(
    "roundedValue",
    {value: ["sliderValue"]},
    function (params) {
        return round(params.value);
    }
);
```
This method was added to allow a bot to react on changes in the bot-db and add another calculated value to that bot-db in the result. It expects 3 arguments: the name of subscription, a map of values on which the subscription depends, and a callback function.
