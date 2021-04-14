<!-- Header and logo -->
<p align="center">
<a href="https://obonobo.github.io/preprosql/">
    <img src="site/public/logo-2-transparent.png"
         alt="Godzilla ERP"
         height="150rem"
         />
        </a>
</p>

<!-- Docs -->

<!-- CI/CD builds -->
<p align="center">
  <a href="https://github.com/obonobo/preprosql/actions/workflows/test.yml" target="_blank">
    <img src="https://github.com/obonobo/preprosql/actions/workflows/test.yml/badge.svg" alt="Maven Build" height="30rem">
  </a>
</p>

Commandline tool - give it your `.tsv` and `.csv` files and it spits out big fat
`INSERT` SQL statements for convenient importing.

## Installation

**You can find precompiled binaries in the [releases page (latest)](https://github.com/obonobo/preprosql/releases/tag/latest).**

Alternatively, you can install the Go module globally:

```bash
go install github.com/obonobo/preprosql@latest
preprosql --help
```

## Usage

```plaintext
preprosql: Convert TSV (default) and CSV files to SQL insert statements

USAGE: preprosql [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...

OPTIONS:

  -out string
    	Output directory for processed files, use '--' to output to STDOUT
  -version
    	Outputs the program version and then exits
```
