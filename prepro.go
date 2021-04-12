package main

import (
	"errors"
	"flag"

	"prepro.ca/core"
)

const (
	input string = "data/input"
)

func main() {
	// core.ReadTable("Movies", input+"/actors.dat", "--")
	core.ReadTable("Movies", "INPUT", "--")
	parsedArguments := parseArgs()
	doWhatNeedsToBeDone := tellMeWhatToDoBasedOnArgs(parsedArguments)
	doWhatNeedsToBeDone()
}

func parseArgs() map[string]interface{} {
	outputDirectory := flag.String("out", "", "Output directory for processed files")
	rest := flag.Args()
	flag.Parse()
	return map[string]interface{}{
		"outputDirectory": *outputDirectory,
		"rest":            rest,
	}
}

// Parses commandline arguments and returns a function for you to execute
func tellMeWhatToDoBasedOnArgs(args map[string]interface{}) func() {
	// outputDirectory := ""
	if args["outputDirectory"] == nil {
		panic(errors.New("something went wrong while attempting to process commandline arguments"))
	} else if args["outputDirectory"] == "" {

	}

	return func() {

	}
}
