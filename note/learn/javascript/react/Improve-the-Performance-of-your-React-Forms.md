# Improve the Performance of your React Forms

Forms are a huge part
of the web.
Literally every interaction
the user takes to make changes to backend data
should use a `form`.
Some forms are pretty simple,
but in a real world scenario they get complicated quickly.
You need to submit the form data
the user entered,
respond to server errors, validate the user input as they're typing
(but not before they've blurred the input please),
and sometimes you even need to build custom-made UI elements for form input types that aren't supported (styleable selects, date pickers, etc.).

All this extra stuff your forms
need to do is just more JavaScript the browser
has to execute while the user is interacting with your form.
This often leads to performance problems that are tricky.
Sometimes there's a particular component that's the obvious problem and optimizing that one component will fix things and you can go on your merry way.

But often there's not a single bottleneck. Often the problem is that every user interaction triggers every component to re-render which is the performance bottleneck. I've had countless people ask me about this problem. Memoization won't help them because these form field components accept props that are indeed changing.

The easiest way to fix this is to just not react to every user interaction (don't use onChange). Unfortunately, this isn't really practical for many use cases. We want to display feedback to the user as they're interacting with our form, not just once they've hit the submit button.

So, assuming we do need to react to a user's interaction, what's the best way to do that without suffering from "perf death by a thousand cuts?" The solution? State colocation!

The demo

Allow me to demonstrate the problem and solution for you with a contrived example. Anyone who has experienced the problem above should hopefully be able to translate this contrived example to a real experience of their past. And if you haven't experienced this problem yet, hopefully you'll trust me when I say the problem is real and the solution works for most use cases.

You'll find the full demo in this codesandbox. Here's a screenshot of what it is:

This is rendered by the following <App /> component:

Each of the forms function exactly the same, but if you try it out the <SlowForm /> is observably slower (try typing into any field quickly). What they each render is a list of fields which all have the same validation logic applied:
