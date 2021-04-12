package core

import (
	"io/ioutil"
	"os"
	"strings"
	"testing"

	"github.com/obonobo/sql-prepro/core"

	"github.com/stretchr/testify/assert"
)

const (
	tableName     = "People"
	tempInputFile = "TMP_sql-prepro-testing-input-file.dat"
)

const tabSeparatedInput = `1	Annie Potts	10
2	Bill Farmer	20
3	Don Rickles	3
4	Erik von Detten	13
5	Greg Berg	17
6	Jack Angel	6
7	Jan Rabson	19
8	Jim Varney	4
9	Joan Cusack	24
10	Joe Ranft	16
11	John Morris	23
12	John Ratzenberger	12
13	Kendall Cunningham	21
14	Laurie Metcalf	8
15	Patrick Pinney	9
16	Penn Jillette	15
17	Philip Proctor	11
18	R. Lee Ermey	14`

const commaSeparatedInput = `1,Annie Potts,10
2,Bill Farmer,20
3,Don Rickles,3
4,Erik von Detten,13
5,Greg Berg,17
6,Jack Angel,6
7,Jan Rabson,19
8,Jim Varney,4
9,Joan Cusack,24
10,Joe Ranft,16
11,John Morris,23
12,John Ratzenberger,12
13,Kendall Cunningham,21
14,Laurie Metcalf,8
15,Patrick Pinney,9
16,Penn Jillette,15
17,Philip Proctor,11
18,R. Lee Ermey,14`

var tempOutputFile = core.ConvertInputFileNameToOutputFileName(tempInputFile)
var expectedOutput = "INSERT INTO " + tableName + " VALUES\n" + `    (1, 'Annie Potts', 10),
    (2, 'Bill Farmer', 20),
    (3, 'Don Rickles', 3),
    (4, 'Erik von Detten', 13),
    (5, 'Greg Berg', 17),
    (6, 'Jack Angel', 6),
    (7, 'Jan Rabson', 19),
    (8, 'Jim Varney', 4),
    (9, 'Joan Cusack', 24),
    (10, 'Joe Ranft', 16),
    (11, 'John Morris', 23),
    (12, 'John Ratzenberger', 12),
    (13, 'Kendall Cunningham', 21),
    (14, 'Laurie Metcalf', 8),
    (15, 'Patrick Pinney', 9),
    (16, 'Penn Jillette', 15),
    (17, 'Philip Proctor', 11),
    (18, 'R. Lee Ermey', 14);
`

func TestCsvPreprocessing(t *testing.T) {
	createTempInputFile(t, tempInputFile, commaSeparatedInput)
	defer cleanupTempFile(t, tempInputFile)
	defer cleanupTempFile(t, tempOutputFile)
	core.ReadTable(tableName, tempInputFile, "", true)
	actualOutput := readOutputFile(t, tempOutputFile)
	assert.Equal(t, expectedOutput, actualOutput)
}

func TestTsvPreprocessing(t *testing.T) {
	createTempInputFile(t, tempInputFile, tabSeparatedInput)
	defer cleanupTempFile(t, tempInputFile)
	defer cleanupTempFile(t, tempOutputFile)
	core.ReadTable(tableName, tempInputFile, "", false)
	actualOutput := readOutputFile(t, tempOutputFile)
	assert.Equal(t, expectedOutput, actualOutput)
}

func TestOutputFileNameConversion(t *testing.T) {
	input := "./some/dir/some_file.dat"
	output := core.ConvertInputFileNameToOutputFileName(input)
	expected := "INSERT_some_file.sql"
	assert.Equal(t, expected, output)
}

func TestCSVPatternMatching(t *testing.T) {
	csv := "./some/path/actors.csv"
	tsv := "./some/path/actors.tsv"
	sql := "./some/path/actors.sql"
	cap := "./some/path/actors.CSV"
	assert.True(t, core.FileIsCSV(csv))
	assert.True(t, core.FileIsCSV(strings.TrimLeft(csv, "./")))
	assert.True(t, core.FileIsCSV(cap))
	assert.False(t, core.FileIsCSV(tsv))
	assert.False(t, core.FileIsCSV(sql))
	assert.False(t, core.FileIsCSV(strings.TrimLeft(tsv, "./")))
}

func readOutputFile(t *testing.T, outputFile string) string {
	bytes, err := ioutil.ReadFile(outputFile)
	assert.NoError(t, err)
	return string(bytes)
}

func createTempInputFile(t *testing.T, filename string, data string) {
	file, err := os.Create(filename)
	if assert.NoError(t, err) {
		file.WriteString(data)
	}
}

func cleanupTempFile(t *testing.T, filename string) {
	err := os.Remove(filename)
	assert.NoError(t, err)
}
