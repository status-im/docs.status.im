---
id: desktop_inline_eval
title: Coming to Grips with Status-react and Desktop
---

# Coming to Grips with Status-react and Desktop

## Inline Evaluation as a Means of Understanding Clojure

Working with Clojure is awesome, but it can be daunting to get up to speed with a new project - especially one as ambitious as Status. There is a, after all,

1. **The Forest of Tooling**
2. **The Mountain of Language**
3. **The Cave of Artifacts**
4. **The Cloud Castle of Mindset**

which must all be overcome if you truly wish to ascend into the blockchain with us ;)

The goal of this tutorial is to get someone new to [status-react](https://github.com/stauts-im/status-react) to the point where they can evaluate expressions in-line in their editor. Inline evaluation is one of the things that makes Clojure both fun and powerful. Bruce Hauman talks about this in his motivation behind creating [rebel-readline](https://github.com/bhauman/rebel-readline/blob/master/rebel-readline/doc/intro.md).

What follows is a layman’s account of how to get to that “aha” moment, specifically for the desktop flavor of `status-react`.

## Part 1: Through the Forest

The offical instructions for building status-desktop are [here](../build_status/desktop.html) Go check them out: they’re great! You'll see that the “big 4” commands you need run at any one time are:

```bash
make react-native-desktop
make desktop-server
make watch-desktop
make run-desktop
```

For the purposes of understanding the repl and eventually getting inline-eval working, the remainder of this post will focus on the first step: `make startdev-desktop`. Under the hood it runs:

```bash
clj -R:dev build.clj watch --platform desktop
```

Here, `clj` (really just `rlwrap` around the clojure command) calls a method in the `build.clj` file called `watch`. Straightforward enough! Peeling back the layers of how this starts a repl is one route towards understanding our tooling and getting inline-eval working.

## Part 2: Up the Mountain

First though, some backstory. One big move for clojure users recently is the shift away from lein and towards clojure [deps & cli](https://clojure.org/reference/deps_and_cli). Fewer things are done automagically in this new world but what you can see is easier to reason about. Dependencies are listed in `deps.edn` at the root of the project and a hand-rolled build script is located (you guessed it) at `build.clj`. If you’re looking for a distilled version of why it's a good iea to do it this way, look [here](http://www.functionalbytes.nl/clojure/nodejs/figwheel/repl/clojurescript/cli/2017/12/20/tools-deps-figwheel.html).

Aside from moving from `lein` to `cli`, the second big part of the tooling to grok in order to get to that repl/inline-eval goodness has to do with `figwheel`. Thankfully, this is pretty straightforward. `Fighweel-sidecar` is `figwheel` without any inherent dependency on `lein`. Check it out at [here](https://github.com/bhauman/lein-figwheel/tree/master/sidecar).

Now that there’s a bit of context around clojure `cli` and `figwheel`, it might be worth revisiting that command: `clj -R:dev build.clj watch --platform desktop` which we set out to understand in pursuit of a larger truth. The command starts `figwheel` to hot-reload project files (though status uses a helper utility `clj-rn` to do it) and then it starts a clojurescript repl right in your terminal via `figwheel sidecar`.

One final side effect of this command worth noting is that it starts nrepl on a port that we can connect to later. What is nrepl? More on that in Part 3.

## Part 3: Connecting The Caves

Working with a clojure repl can be an enjoyable experience, but something about a clojure nrepl feels daunting. Most ignore the `n`, until one day they realise that `n` just stands for `network`, making nrepl the network repl. It comes with a client and a server. When we run `make watch-desktop`, figwheel starts an nrepl server on port `7888` and a first client of that server right in your terminal.

The goal of this exercise is now to connect a second client from your editor.

(Disclaimer the rest of this post assumes [cider-emacs](https://github.com/clojure-emacs/cider). There are other ways, vim-fireplace, etc. Experiment with whichever one works for you!)

As of the time of writing, November 2018, it can be confusing to track down which version of nrepl to use. There are a lot of github repositories and clojars artifacts who have thrown their hats into the arena. Clojure tools has an nrepl. Cider has an nrepl. Even nrepl has an nrepl! To keep things simple: `status-react` includes `cider/cider-nrepl` in its `deps.edn` and it works well for the purposes of our project. If you’re curious about the history and origins of nrepl: [this post by Bozhidar](https://nrepl.xyz/nrepl/about/history.html) goes into more depth.

Since the decision of using cider’s nrepl has been made for us (at least within the context of status-react) we can peruse the narrower set of options at our disposal for connecting to it. Cider has a [great website](https://cider.readthedocs.io/en/latest/), but for specifics around configuring an nrepl connection, a helpful read can be found within the [project source itself](https://github.com/clojure-emacs/cider/blob/master/doc/clojurescript.md).

## Part 4: Into the Clouds

Where does all that leave us? Time to take stock. If we’ve run “the big 4”, we can assume that our development environment has a running nrepl as a result of running `make watch-desktop` and we’re now at the final step of connecting to it properly. The cider docs linked above offer a suite of commands which all seem promising. Among them are: `cider-jack-in`, `cider-connect`, and `cider-connect-cljs`.

`Cider-jack-in` is a bit too heavy here. It would try to start a new nrepl and we already have one running. Either of the connect commands would work, but cider has prevsiously given some thought to defaults for `cider-connect-cljs`, as well as providing custom alternatives, so that route makes sense to pursue.

The only reason we can’t just hit the ground running with selecting a default of `figwheel` here is that figwheel is already started (via `make watch-desktop`), and trying to start it again would break things. What we can do then, is modify the source of cider’s pre-defined `figwheel cljs` type to require sidecar and to start a cljs repl with it, but just remove the part where we start figwheel all over again!

Some elisp code to define and connect via this new, pared-down repl type could look like:

```lisp
(cider-register-cljs-repl-type 'figwheel-cljs "(do (require 'figwheel-sidecar.repl-api) (figwheel-sidecar.repl-api/cljs-repl))")
(setq cider-default-cljs-repl 'figwheel-cljs)
(cider-connect-cljs '(:host "localhost" :port 7888)))
```

You evaluate this elisp code however you want. The goal of this post is just to show one possible way. I’ve rolled the above into a [single defun](https://github.com/rcullito/emacsfiles/commit/4332d44c21cf264eb7c20bf9760c090dc17c08e9) that I call when opening up emacs. 

Our [build docs](https://status.im/build_status/desktop.html) offers another great solution by using a `.dir-locals` file. Any solution is fair game, it’s just worth noting that an understanding of how all the pieces work together is crucial for how you go about configuring this last step.

So, in order to run status-react, follow along via all the init steps outlined [here](https://status.im/build_status/desktop.html) and run “the big 4”, which are:

```bash
make react-native-desktop
make desktop-server
make watch-desktop
make run-desktop
```

Finally, open emacs and evaluate the elisp code in the manner agreeable to you. Then, at long last, you can open an arbitrary clojurescript file, and evaulate any expression to your heart’s content. Happy coding.

## Conclusion

The above steps are meant to make it a little easier to get started with, and reason about, status-react. This should hopefully help you, an intrepid new contributor to building a better web, get a foot in the door. Gaining some sense of momentum when participating in a new project for the first time is important, so let us know how we can improve this further! (And don't hesitate to reach out to us within Status in the [#clojure channel](https://get.status.im/chat/public/clojure)).

Inline eval is something I find fun about clojure and status-react, which is why I’ve chosen to outline my experience getting to that point. The process outlined above is certainly rough, but my hope is that by taking a stab at a set of reproducible steps, it will be easier for people to reach a “tipping point” where status-react is something they can get their arms around. Improvements and suggestions are both welcome. I’m sure there’s a lot I’ve put forth that is at best janky or at worst downright incorrect. It’s meant as a starting point from which, over time, we can hopefully continue to bring more tribal knowledge into the light.

-- Rob Culliton, November 2018.
