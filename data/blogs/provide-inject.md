---
title: Solve Props drilling in Vue with Provide and Inject
---

Usually when we need to pass data from parent component to a child component we use props. This is perfectly find solution for a small component tree, but once we are in a large component tree object this solution is not efficient and it is called ‘props drilling’, because we need to pass the props from a parent to the descendant all the way through every descendant on the tree chain, even when the components on the chain do not actually use or need the props.

Example graphic:

![prop-drilling](/prop-drilling.png)

From the example we can see that the <Footer> component event does not need nor use the props , but it will have to declare and pass them down to the <DeepChild> component , which needs them.

This situation can be resolved with Provide and Inject options available.
Parent component can act as a provider to its dependance no matter how deeply nested in the component tree. Child components from other hand can inject dependencies provided by the components up in its parent chain.

![provide-inject](/provide-inject.png)

**Provide**

To provide data to a component’s descendant use provide option:

```
export default {
    inject: ['message'],
    created() {
        console.log(this.message)// injected value
```