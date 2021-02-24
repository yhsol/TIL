## Controllers

Controllers are responsible for handling incoming **requests** and returning **responses** to the client.

```
             -  Controller
Client Side --- Controller
             -  Controller
```

A controller's purpose is to receive specific requests for the application.
The **routing** mechanism controls which controller receives which requests.
Frequently, each controller has more than one route, and different routes can perform different actions.

In order to create a basic controller,
we use classes and **decorators**.
Decorators associate classes with required metadata and enable Nest to create a routing map
(tie requests to the corresponding controllers).

### Routing

In the following example we'll use the `@Controller()` decorator,
which is **required** to define a basic controller.
We'll specify an optional route path prefix of `cats`.
Using a path prefix in a `@Controller()` decorator allows us to easily group a set of related routes,
and minimize repetitive code.
For example,
we may choose to group a set of routes that manage interactions
with a customer entity under the route `/customers`.
In that case,
we could specify the path prefix `customers` in the `@Controller()` decorator so that we don't have to repeat that portion of the path for each route in the file.

```ts
import { Controller, Get } from "@nestjs/common";

@Conroller("cats")
export class CatsConroller {
  @Get()
  findAll(): string {
    return `This action returns all cats`;
  }
}
```

**HINT**
To create a controller using the CLI, simply execute the `$ nest g controller cats` command.

The `@Get()` HTTP request method decorator before the `findAll()` method tells Nest to create a handler for a specific endpoint for HTTP requests.
The endpoint corresponds to the HTTP request method (GET in this case) and the route path.
What is the route path?
The route path for a handler is determined by concatenating the (optional) prefix declared for the controller, and any path specified in the request decorator.
Since we've declared a prefix for every route (`cats`),
and haven't added any path information in the decorator,
Nest will map `Get /cats` requests to this handler.
As mentioned, the path includes both the optional controller path prefix **and** any path string declared in the request method decorator.
For example, a path prefix of `customers` combined with the decorator `@Get('profile')` would produce a route mapping for requests like `GET /customers/profile`.

In our example above, when a GET request is made to this endpoint,
Nest routes the request to our user-defined `findAll()` method.
Note that the method name we choose here is completely arbitary.
We obviously must declare a method to bind the route to,
but Nest doesn't attach any significance to the method name chosen.

This method will return a 200 status code and the associated response,
which in this case is just a string.
Why does that happen?
To explain, we'll first introduce the concept that Nest employs two **differnt** options for manipulating responses:

- Standard (recommended)
  - Using this built-in method,
    when a request handler returns a JavaScript object or array,
    it will **automatically** be serialized to JSON.
    When it returns a JavaScript primitive type (e.g., `string`, `number`, `boolean`),
    however, Nest will send just the value without attempting to serialized it.
    This makes response handling simple:
    just return the value,
    and Nest takes care of the rest.
- Library-specific

  - We can use the library-specific (e.g., Express) **response object**, which can be injected using the `@Res()`
    decorator in the method handler signature (e.g., `findAll(@Res() response)`).
    With this approach,
    you have the ability to use the native response handling methods exposed by that object.
    For example, with Express,
    you can construct response using code like `response.status(200).send()`.

  **WARNING**
  Nest detects when the handler is using either @Res() or @Next(), indicating you have chosen the library-specific option. If both approaches are used at the same time, the Standard approach is automatically disabled for this single route and will no longer work as expected. To use both approaches at the same time (for example, by injecting the response object to only set cookies/headers but still leave the rest to the framework), you must set the passthrough option to true in the @Res({ passthrough: true }) decorator.

### Request object

Handlers often need access to the client **request** details.
Nest provides access to the **request object** of the underlying platform
(Express by default).
We can access the request object by instructing Nest to inject it by adding the `@Req()` decorator to the handler's signature.

cats.controller.ts

```ts
import { Controller, Get, Req } from "@nestjs/common";
import { Request } from "express";

@Controller("cats")
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    return "This action returns all cats";
  }
}
```

**HINT**
In order to take advantage of express typings (as in the request: Request parameter example above), install @types/express package.
