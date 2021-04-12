package main

import (
	"errors"
	"flag"
	"fmt"
	"strings"

	"prepro.ca/core"
)

const tableNameFilePathSeparator = ":"
const usageHeader = `sql-prepro: Convert TSV and CSV files to SQL insert statements

USAGE: prepro [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...

OPTIONS:
`

func main() {
	arguments := parseArgs()
	doWhatNeedsToBeDone, err := tellMeWhatToDoBasedOnArgs(arguments)
	check(err)
	err = doWhatNeedsToBeDone()
	if err != nil {
		fmt.Println(err)
	}
}

func parseArgs() map[string]interface{} {
	flag.Usage = func() {
		fmt.Fprintln(flag.CommandLine.Output(), usageHeader)
		flag.PrintDefaults()
	}
	outputDirectory := flag.String("out", "", "Output directory for processed files, use '--' to output to STDOUT")
	flag.Parse()
	rest := flag.Args()
	if rest == nil {
		rest = []string{}
	}
	return map[string]interface{}{
		"outputDirectory": *outputDirectory,
		"rest":            rest,
	}
}

// Parses commandline arguments and returns a function for you to execute
func tellMeWhatToDoBasedOnArgs(args map[string]interface{}) (func() error, error) {

	somethingWentWrong := errors.New("something went wrong while attempting to process commandline arguments")

	do := func(doIt func(map[string]string)) error {
		for _, arg := range args["rest"].([]string) {
			tableName, inputFile, err := parseArgument(arg)
			if err != nil {
				return err
			}
			doIt(map[string]string{*tableName: *inputFile})
		}
		return nil
	}

	if args["outputDirectory"] == nil {
		return nil, somethingWentWrong
	} else if args["outputDirectory"] == "" {
		return func() error { return do(core.ReadTables) }, nil
	} else if len(args["rest"].([]string)) > 0 {
		outputDir, ok := args["outputDirectory"].(string)
		if !ok {
			return nil, somethingWentWrong
		}
		return func() error {
			return do(func(m map[string]string) {
				core.ReadTablesOutputTo(outputDir, m)
			})
		}, nil
	} else {
		return func() error { flag.Usage(); return nil }, nil
	}
}

// Arguments are passed like: `TableName:input/file/path.dat`. this function
// parses a single argument of this form
func parseArgument(arg string) (tableName *string, inputFile *string, err error) {
	split := strings.Split(arg, tableNameFilePathSeparator)
	if len(split) == 2 {
		return &split[0], &split[1], nil
	} else {
		return nil, nil, errors.New("inputs must be specified as <table-name>:<file-name>")
	}
}

func check(err error) {
	if err != nil {
		panic(err)
	}
}
