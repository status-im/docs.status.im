# Key concepts

Every extension begins with a [hook](hook) into some part of the Status application. Status is the `host` application, and hooks define which of the host's capabilities can be extended.

These hooks expose certain Status primitives for developers to customize with their own logic and UI.

By implementing one or multiple hooks, developers can access:

- [Views](views) to create native UI. Views are comprised of nestable _components_, e.g. `text`, `lists`, `images`, etc.
- [Queries](queries) to access local host data, e.g. `contacts`, `contact code`, etc. 
- [Events](events) to interact with the host environment, e.g. `create a contact`, `scan a QR code`, `send a message`, etc.

### Relationship between primitives

View _components_ get data from _queries_ and surface it to the user. Data is structured according to component specifications.

Some components can trigger _events_ based on user interaction, e.g. `on-click`.

Triggering events can modify host state and surface new data in a view.

### Storage

Extensions are stored in decentralized storage systems like [IPFS](https://ipfs.io/) or [Swarm](https://swarm-guide.readthedocs.io/en/latest/introduction.html). 

They can be identified using ENS addresses.
