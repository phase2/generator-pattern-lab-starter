# Generator Pattern Lab Starter

This is a [Yeoman](http://yeoman.io) generator for [Particle](https://github.com/phase2/pattern-lab-starter), a modern design-system driven Drupal theme.

## Install

To install generator-pattern-lab-starter from npm, run:

```bash
npm install -g generator-pattern-lab-starter
```

## Usage

*Note that this template will generate files in the current directory, so be sure to change to a new directory first if you don't want to overwrite existing files.*

Finally, initiate the generator:

```bash
yo pattern-lab-starter
```

Extras can be installed with:

```bash
yo pattern-lab-starter:extras
```

### Options

* **release**: Run with `--release=<branch-tag-or-hash>` to override the default use of master branch.

## Docker-based Development

You can perform local development of this generator using our Docker integration.

Install the dependencies:

```
docker-compose run --rm cli npm install
```

Then run the generator:

```
docker-compose run --rm yo pattern-lab-starter
```

This will output your code in ~/Projects/newproject. To change this, use the `YO_PROJECT_DIRECTORY` environment variable:

```
YO_PROJECT_DIRECTORY=/opt/development/mytheme docker-compose run --rm yo pattern-lab-starter
```
