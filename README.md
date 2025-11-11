# S3 invalidate CloudFront

Invalidate CloudFront caches for a bucket.

![Review](https://img.shields.io/github/actions/workflow/status/JoelLefkowitz/s3-invalidate-cloudfront/review.yaml)
![Version](https://img.shields.io/npm/v/s3-invalidate-cloudfront)
![Downloads](https://img.shields.io/npm/dw/s3-invalidate-cloudfront)
![Size](https://img.shields.io/bundlephobia/min/s3-invalidate-cloudfront)
![Quality](https://img.shields.io/codacy/grade/58c781082a8a402baa12bffe087f66d0)
![Coverage](https://img.shields.io/codacy/coverage/58c781082a8a402baa12bffe087f66d0)

## Motivation

After uploading to an S3 bucket I need to invalidate the CloudFront cache:

```bash
> aws s3 sync src/ s3://<bucket-name>
> aws cloudfront create-invalidation --distribution-id <cloudfront-distribution-id> --paths "/*"
```

The AWS cli only accepts distribution IDs which then have to be hardcoded. It would be much more ergonomic to lookup the matching distribution IDs based on the bucket name:

```bash
> s3-invalidate-cloudfront <bucket-name>

Deleted <cloudfront-distribution-id> at path /*
```

Benefits:

- Uses the bucket name which is recognisable and not allocated by AWS like the distribution ID
- Simplifies invalidating caches for a bucket that has multiple cloudfront consumers

```ts
import { lookup, invalidate } from "s3-invalidate-cloudfront";

lookup("bucket-name", "us-east-1").then((caches) => Promise.all(caches.map(invalidate)));
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
  name                                                                  [string]

Options:
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
  -r, --region                                   [string] [default: "us-east-1"]
  -d, --dry-run                                       [boolean] [default: false]
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
