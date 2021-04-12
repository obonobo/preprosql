#!/bin/bash

################################ SOEN 363 #####################################
#
# AUTHOR: @obonobo - Ethan Benabou - ethanbnb@gmail.com
#

print_done() {
    echo -e "\033[0;32m done\033[0m"
}

# Convert all the .dat files in 'input' dir to .sql files in 'output' dir
convert() (
    prefix_dir=data

    ! [[ -d ${prefix_dir}/output ]] && mkdir ${prefix_dir}/output

    for file in ${prefix_dir}/input/*.dat; do
        temp="$(basename $file)"
        prefix=$(echo "$temp" | python3 \
            -c 'import sys; print(sys.stdin.readlines()[0].split(".")[0])')

        output="${prefix_dir}/output/INSERT_${prefix}.sql"
        echo -n -e "Converting \033[0;34m${file}\033[0m to \033[0;34m${output}\033[0m ..."
        ./${prefix_dir}/converter.py "$file" \
                                     "$prefix" \
                                     > "$output"
        print_done
    done
)

connect() {
    env PGPASSWORD=admin123 \
    psql --host localhost \
         --port 5555 \
         --user admin \
         --dbname=soen363 $@
}

start() {
    docker-compose start
}

stop() {
    docker-compose stop
}

# Executes a SQL file against the docker database
execute_sql() {
    echo -e "Executing SQL file \033[0;34m${1}\033[0m ..."
	connect -f $1
	ret=$?
	return $ret
}

new() {
    docker-compose down
    docker-compose up -d
}

load_all_data() (
    data=data
    execute_sql $data/output/*movies.sql
    execute_sql $data/output/*tag_names.sql
    execute_sql $data/output/*tags.sql
    execute_sql $data/output/*actors.sql
    execute_sql $data/output/*genres.sql
)

build_all() {
    new
    convert
    while ! execute_sql schema.sql; do
        echo 'Retrying...'
        sleep 0.1
    done
    load_all_data
}

record_query() (
    save_as="RESULT_$(basename $1).log"
    execute_sql $1 | head -n -1 | tail -n +2 | tee "$save_as"
)

main() {
    case $1 in
        connect)    connect                       ;;
        convert)    convert                       ;;
        record)     record_query $2               ;;
        new)        new                           ;;
        start)      start                         ;;
        stop)       stop                          ;;
        sql)        execute_sql $2                ;;
        all)        load_all_data                 ;;
        build-all)  build_all                     ;;
        *)          echo Command $1 unrecognized  ;;
    esac
}

[[ ${BASH_SOURCE} == $0 ]] && main $@
