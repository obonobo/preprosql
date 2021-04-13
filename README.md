# preprosql [![Build](https://github.com/obonobo/preprosql/actions/workflows/test.yml/badge.svg)](https://github.com/obonobo/preprosql/actions/workflows/test.yml)

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
