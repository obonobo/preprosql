import styled from "styled-components";
import Article from "../Article";
import { CodeSnippet } from "../CodeSnippet";

const article = `
# How-To (SOEN-363)

Check out the latest release: https://github.com/obonobo/preprosql/releases/tag/latest

Download the \`363-scripts.zip\` to get the whole package (the Go preprocessing CLI tool + the docker and sql scripts).

There is a tool called \`prepro\`:

\`\`\`plaintext
preprosql: Convert TSV (default) and CSV files to SQL insert statements

USAGE: preprosql [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...

OPTIONS:

  -out string
    	Output directory for processed files, use '--' to output to STDOUT
  -version
    	Outputs the program version and then exits
\`\`\`

So let's say you have a \`actors.tsv\` file, you can do:

\`\`\`bash
./prepro Actors:actors.tsv  # => creates a file INSERT_actors.sql
\`\`\`

As for the Docker stuff, inside \`363-scripts.zip\` there is a bash script called \`do\`. You can spin up a postgres docker container like so:

\`\`\`bash
./do new

# Or you can use docker-compose directly
docker-compose up -d
\`\`\`

The \`do\` script has some convenience functions that you can use to execute SQL on your Postgres instance in docker:

\`\`\`bash
# Execute a sql file
./do sql INSERT_actors.sql

# Execute a sql command on your instance
./do sql '
CREATE TABLE Actors (
    id INTEGER,
    name VARCHAR,
    age INTEGER
);
'
\`\`\`

There are some other functions in there, but those are the main ones.
`;

const CoolLink = styled.a.attrs(({ children }) => ({
  children,
  href: children,
}))``;

export default function Wiki(props: React.ComponentPropsWithoutRef<"div">) {
  return (
    <Article {...props}>
      <h1>How-To (SOEN-363)</h1>
      Check out the latest release:{" "}
      <CoolLink>
        https://github.com/obonobo/preprosql/releases/tag/latest
      </CoolLink>
      <br />
      <br />
      Download the <code>363-scripts.zip</code> to get the whole package (the Go
      preprocessing CLI tool + the docker and sql scripts). There is a tool
      called <code>prepro</code>:
      <CodeSnippet>
        {`
          | preprosql: Convert TSV (default) and CSV files to SQL insert statements
          |
          | USAGE: preprosql [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...
          |
          | OPTIONS:
          |
          |   -out string
          |       Output directory for processed files, use '--' to output to STDOUT
          |   -version
          |       Outputs the program version and then exits
        `}
      </CodeSnippet>
      <CodeSnippet>
        {`
          | preprosql: Convert TSV (default) and CSV files to SQL insert statements
          |
          | USAGE: preprosql [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...
          |
          | OPTIONS:
          |
          |   -out string
          |       Output directory for processed files, use '--' to output to STDOUT
          |   -version
          |       Outputs the program version and then exits
        `}
      </CodeSnippet>{" "}
      <CodeSnippet>
        {`
          | preprosql: Convert TSV (default) and CSV files to SQL insert statements
          |
          | USAGE: preprosql [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...
          |
          | OPTIONS:
          |
          |   -out string
          |       Output directory for processed files, use '--' to output to STDOUT
          |   -version
          |       Outputs the program version and then exits
        `}
      </CodeSnippet>{" "}
      <CodeSnippet>
        {`
          | preprosql: Convert TSV (default) and CSV files to SQL insert statements
          |
          | USAGE: preprosql [OPTIONS] <table-name-1>:<file-1> <table-name-2>:<file-2> ...
          |
          | OPTIONS:
          |
          |   -out string
          |       Output directory for processed files, use '--' to output to STDOUT
          |   -version
          |       Outputs the program version and then exits
        `}
      </CodeSnippet>
    </Article>
  );
}
