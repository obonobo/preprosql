package core

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
	"prepro.ca/core"
)

const (
	tableName         = "People"
	tempInputFile     = "TMP_sql-prepro-testing-input-file.dat"
	tabSeparatedInput = `1	Annie Potts	10
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

	commaSeparatedInput = `1,Annie Potts,10
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
)

var (
	tempOutputFile = core.ConvertInputFileNameToOutputFileName(tempInputFile)
	expectedOutput = "INSERT INTO " + tableName + " VALUES\n" +
		`    (1, 'Annie Potts', 10),
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
)

func TestCsvPreprocessing(t *testing.T) {
	createTempInputFile(t, tempInputFile, commaSeparatedInput)
	defer cleanupTempFile(t, tempInputFile)
}

func TestTsvPreprocessing(t *testing.T) {
	createTempInputFile(t, tempInputFile, tabSeparatedInput)
	defer cleanupTempFile(t, tempInputFile)
	defer cleanupTempFile(t, tempOutputFile)
	core.ReadTable(tableName, tempInputFile, "")
	actualOutput := readOutputFile(t, tempOutputFile)
	assert.Equal(t, expectedOutput, actualOutput)
}

func readOutputFile(t *testing.T, outputFile string) string {
	bytes, err := os.ReadFile(outputFile)
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
