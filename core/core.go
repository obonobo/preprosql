package core

import (
	"os"
	"regexp"
	"strconv"
	"strings"
	"sync"
)

const (
	indent string = "    "
)

var (
	fileExtension = regexp.MustCompile(`\..*$`)
)

// Reads multiple files and table names
func ReadTables(tables map[string]string) {
	for tableName, inputFile := range tables {
		outputFile := ConvertInputFileNameToOutputFileName(inputFile)
		ReadTable(tableName, inputFile, outputFile)
	}
}

// Reads a '.dat' file to parse each line
func ReadTable(tableName string, inputFile string, outputFile string) error {
	out, err := getOutputFile(inputFile, outputFile)
	if err != nil {
		return err
	}
	out.WriteString("INSERT INTO " + tableName + " VALUES\n")
	printLineByLine(inputFile, out, func(s string) string {
		return indent + parseLine(s)
	})
	return nil
}

func getOutputFile(inputFile string, outputFile string) (*os.File, error) {
	var out *os.File
	if outputFile == "--" {
		out = os.Stdout
	} else if outputFile == "" {
		var err error
		out, err = os.Create(ConvertInputFileNameToOutputFileName(inputFile))
		if err != nil {
			return nil, err
		}
	} else {
		var err error
		out, err = os.Create(outputFile)
		if err != nil {
			return nil, err
		}
	}
	return out, nil
}

func ConvertInputFileNameToOutputFileName(inputFile string) string {
	return "INSERT_" + fileExtension.ReplaceAllString(inputFile, ".sql")
}

func printLineByLine(filename string, outputFile *os.File, transformLine func(string) string) {
	dispatchIn := make(chan string, 300000)
	dispatchOut := make(chan string, 300000)
	go dispatcher(100000, dispatchIn, dispatchOut, transformLine)
	go dispenseFileLineByLine(filename, dispatchIn)
	logLines(dispatchOut, outputFile)
}

func logLines(in chan string, file *os.File) {
	fileWriter := fileOrStdout(file)
	lastLine := writeAllLines(in, fileWriter)
	fileWriter.WriteString(lastLine + ";\n")
}

func writeAllLines(in chan string, file *os.File) string {
	prev := ""
	for l := range in {
		if prev != "" {
			file.WriteString(prev + ",\n")
		}
		prev = l
	}
	return prev
}

func fileOrStdout(file *os.File) *os.File {
	if file != nil {
		return file
	} else {
		return os.Stdout
	}
}

func dispatcher(
	bufferSize int,
	dispatchIn chan string,
	dispatchOut chan string,
	transformLine func(string) string) {

	var wg sync.WaitGroup
	var dispatched int
	var workerIn chan string

	transformWorker := func(in chan string) {
		for str := range in {
			dispatchOut <- transformLine(str)
		}
		wg.Done()
	}

	swapToNewWorker := func() {
		dispatched = 0
		workerIn = make(chan string, bufferSize)
		wg.Add(1)
		go transformWorker(workerIn)
	}

	swapToNewWorker()
	for s := range dispatchIn {
		if dispatched >= bufferSize {
			close(workerIn)
			swapToNewWorker()
		}
		workerIn <- s
		dispatched++
	}
	close(workerIn)
	wg.Wait()
	close(dispatchOut)
}

func dispenseFileLineByLine(filename string, out chan string) {
	data, _ := os.ReadFile(filename)
	lines := strings.Split(string(data), "\n")
	for _, line := range lines {
		out <- line
	}
	close(out)
}

// Parses a row in a '.dat' file
func parseLine(line string) string {
	var replace = strings.ReplaceAll(line, "\r", "")
	replace = strings.ReplaceAll(replace, "\n", "")
	replace = strings.ReplaceAll(replace, `\N`, "null")
	replace = strings.ReplaceAll(replace, "'", "''")
	split := strings.Split(replace, "\t")
	var ret strings.Builder
	ret.WriteRune('(')
	for _, v := range split[:len(split)-1] {
		ret.WriteString(surroundWithQuotesIfString(v))
		ret.WriteString(", ")
	}
	ret.WriteString(surroundWithQuotesIfString(split[len(split)-1]))
	ret.WriteRune(')')
	return ret.String()
}

// Surrounds a string with single quotes
func surroundWithQuotesIfString(field string) string {
	_, e := strconv.ParseFloat(field, 64)
	isWord := e != nil
	if isWord && !isNull(field) {
		var temp strings.Builder
		temp.WriteRune('\'')
		temp.WriteString(field)
		temp.WriteRune('\'')
		return temp.String()
	} else {
		return field
	}
}

// Checks if the contents of a string are equal to 'null'
func isNull(field string) bool {
	return field == "null"
}
