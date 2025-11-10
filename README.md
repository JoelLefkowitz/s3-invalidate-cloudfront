# S3 invalidate CloudFront

Invalidate CloudFront caches for a bucket.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/s3-invalidate-cloudfront/review.yaml)
![Version](https://img.shields.io/npm/v/s3-invalidate-cloudfront)
![Downloads](https://img.shields.io/npm/dw/s3-invalidate-cloudfront)
![Size](https://img.shields.io/bundlephobia/min/s3-invalidate-cloudfront)
![Quality](https://img.shields.io/codacy/grade/58c781082a8a402baa12bffe087f66d0)
![Coverage](https://img.shields.io/codacy/coverage/58c781082a8a402baa12bffe087f66d0)

## Motivation

```ts
import { lookup, invalidate } from "s3-invalidate-cloudfront";

lookup("bucket-name").then(
    (caches) => Promise.all(caches.map(invalidate))
);
```

```bash
> s3-invalidate-cloudfront bucket-name

Deleted distribution-1 at path /*
Deleted distribution-2 at path /images/*
```

## Installing

```bash
npm install s3-invalidate-cloudfront
```

To make the cli accessible install the package globally with the `-g` flag or invoke it with `npx`.

## Usage

```ts
s3-invalidate-cloudfront bucket-name
```

### CLI

```bash
s3-invalidate-cloudfront <name>

Invalidate CloudFront caches for a bucket.

Positionals:
  name

Options:
  -h, --help     Show help           [boolean]
  -v, --version  Show version number [boolean]
  -d, --dry-run  Dry run             [boolean]
```

## Tooling

### Dependencies

To install dependencies:

```bash
yarn install
```

### Tests

To run tests:

```bash
yarn test
```

### Documentation

To generate the documentation locally:

```bash
yarn docs
```

### Linters

To run linters:

```bash
yarn lint
```

### Formatters

To run formatters:

```bash
yarn format
```

## Contributing

Please read this repository's [Code of Conduct](CODE_OF_CONDUCT.md) which outlines our collaboration standards and the [Changelog](CHANGELOG.md) for details on breaking changes that have been made.

This repository adheres to semantic versioning standards. For more information on semantic versioning visit [SemVer](https://semver.org).

Bump2version is used to version and tag changes. For example:

```bash
bump2version patch
```

### Contributors

- [Joel Lefkowitz](https://github.com/joellefkowitz) - Initial work

## Remarks

Lots of love to the open source community!

<div align='center'>
    <img width=200 height=200 src='https://media.giphy.com/media/osAcIGTSyeovPq6Xph/giphy.gif' alt='Be kind to your mind' />
    <img width=200 height=200 src='https://media.giphy.com/media/KEAAbQ5clGWJwuJuZB/giphy.gif' alt='Love each other' />
    <img width=200 height=200 src='https://media.giphy.com/media/WRWykrFkxJA6JJuTvc/giphy.gif' alt="It's ok to have a bad day" />
</div>
