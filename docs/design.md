# Grimoire Final Fantasy IV Editor Design

## High Level Organization.

```
        +-----------------+
        |                 +---------------------+
        |    ff4 - lib    |                     |
        |    (rust)       |                     V
        |                 |        +------------------------+
        +--------+--------+        |                        |
                 |                 |   grimoire - webapp    |
                 V                 |   (angular)            |
        +-----------------+        |                        |
        |                 |        +------------------------|
        |  ff4util - bin  |                     ^
        |  (rust)         |                     |
        |                 +---------------------+
        +-----------------+
```

### ff4
https://github.com/konkers/ff4

ff4 is a library written in Rust.  It provides the core which knows about
The various data types used in Final Fantasy IV as well as where they are
layed out in ROM.  Additionally, it contains code for manipulating that
data.   All public data type will provide serialization and de-serialization
using [serde](https://serde.rs/) macros.

### ff4util

ff4util is a light wrapper around ff4, also written in Rust. Its primary
purpose is to provide a command line interface for extracting data from a
rom to a tree of text files and re-applying those files to the mother rom.

An advantage to breaking the data apart into text (JSON?) files and working
on those (directly or though an editor) is that you can use something like
git to manage changes.

Open question:
 * How do ff4util and grimoire (below) interact.  Should the directory
   structure knowledge be in ff4 or ff4util.  If it's in ff4util, it'll need
   to provide a library interface as well as a cli.

### Grimoire
https://github.com/konkers/grimoire

Grimoire is a visual editor written in Angular.  Grimoire embeds ff4 and
ff4util as WebAssembly using
[wasm-bindgen](https://rustwasm.github.io/wasm-bindgen/) and
[wasm-pack](https://github.com/rustwasm/wasm-pack)

Grimoire can be run in two modes:
 1. Web based where you visit https://grimiore.cidsworkshop.com/ and upload
    the vanilla FF4 rom and start hacking.  The web based version will give
    you the option of downloading a new rom or the set of text files that
    comprise the data.
 2. Stand alone app using [Electron](https://electronjs.org/).  The stand
    alone app will primary work on the set of text files that comprise the
    data.  It will additionally give you the option to start a new project
    by providing the vanilla rom as well as produce a patched from from the
    project.

## TODO

### Bigish tasks
- [ ] Evaluate Electron as a platform for building a stand alone/desktop app.
  - How much disk space does a minimal hello world app take?
  - How much disk space does a minimal hello world Angular app take?
  - How much memory does a minimal hello world app take?
  - How much memory does a minimal hello world Angular app take?
- [ ] Add support for various data type:
  - [x] Monster data (@konkers)
  - [ ] Monster scripts (@konkers, in progress)
  - [ ] Item data
  - [ ] Map data
  - [ ] Events
  - [ ] I'm sure there's more.
- [ ] Start Angualar UI
  - @konkers prototyping read only UI.
- [ ] Map Editor UI
- [ ] Find a way to provide the vanilla rom to Travis CI w/o making it world
      readable.
   - Maybe host it on firebase or google cloud storage and store and auth
     token as an environment variable in the Travis CI settings for the
     project.

### Smallish tasks
- [ ] Support both headered and unheadered roms.
- [ ] Calculate a hash of the rom before parsing.  Check against a known hash
      for the vanilla ROM.