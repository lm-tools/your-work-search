#!/bin/bash

cat ./template/startJobSeed.dat > job_seed.js
while IFS=, read account id title employer filter status statusindex
do
   cat ./template/job.dat | sed "s/-id-/$id/g; s/-account-/$account/g; s/-title-/$title/g; s/-employer-/$employer/g; s/-filter-/$filter/g; s/-status-/$status/g; s/-statusindex-/$statusindex/g" >> job_seed.js
done < jobs.csv
cat ./template/endJobSeed.dat >> job_seed.js

mkdir ./seeds/$1
mv job_seed.js ./seeds/$1
cat ./template/knexfile.js | sed "s/-dir-/$1/g" > ./seeds/knexfile-$1.js

