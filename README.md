# igor-boiko-portfolio-v2

## TODO

### prepare

- [x] Install T3 template (https://create.t3.gg/)
- [x] Make it deploy (vercel)
- [16/30] Complete some git-based react intro course (https://github.com/Asabeneh/30-Days-Of-React)
    - https://dev.to/madza/19-github-repositories-to-become-a-react-master-379n
- [x] Install react-three-next template (https://github.com/pmndrs/react-three-next?tab=readme-ov-file)
- [almost] integrate r3f in to T3
- [x] drizzler db
- [ ] Use https://uploadthing-1m3c.vercel.app/ to upload .glb scene to it and load them to this website

### build

### userfull stuff

- Fiber guide - https://docs.pmnd.rs/react-three-fiber/getting-started/your-first-scene
- have a cool boid motion of stars made in ESC engine










### install from three-fiber-starter:

Installed:
    three@0.160.1 - The main three.js library, a lightweight 3D library with a default WebGL renderer. Used for creating and displaying animated 3D computer graphics in web applications.
    @react-three/fiber@8.16.3 - A React renderer for three.js, used for building interactive 3D animations and visualizations in React applications.
    @react-three/drei@9.105.6 - A collection of reusable helpers, abstractions, and components to enhance the use of react-three/fiber, making it easier to build 3D scenes.
    three-stdlib@2.29.11 - A stable collection of general-purpose modules extracted from the three.js code examples, offering extended functionalities beyond the core library.
    tunnel-rat@0.1.2 - Used for network tunneling capabilities; it facilitates connections between separated networks which cannot directly connect to each other.

SusCzIAmStoopid:
    (what even is it?) => @ducanh2912/next-pwa@10.2.7 - Integrates Progressive Web App (PWA) functionality with Next.js, enabling offline capabilities and improved loading times.
    file-loader@6.2.0 - Webpack loader to manage importing/including files such as images and fonts into your projects, handling them as URL/file dependencies.
    glslify-loader@2.0.0 - A Webpack loader for glslify, which allows importing GLSL shader code into JavaScript files as modules.
    glslify@7.1.1 - A node.js-style module system for GLSL, allowing the composition of shaders from various sources, enhancing reusability and maintainability.
    url-loader@4.1.1 - A Webpack loader similar to file-loader, but can return a Data URL if the file is smaller than a byte limit, reducing the number of requests needed for small files.

Plan:
    - [x] display styff in usual fiber components
    - [ ] test how routing will work in standard fiber components
    - [ ] redisplay it using stolen code from three-fiber-starter

TheHowTFThisWorks:
    <View /> = forwardRef(...)
        <Three /> = <r3f.In /> = tunnel()
            <fider/drei/View />     







---

some unrelated stuff idk how is it got here


This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

