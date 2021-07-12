#!/bin/bash

file=audit/audit-results-yarn.json
info=$(grep '"type":"auditSummary"' $file | jq '.data.vulnerabilities.info')
low=$(grep '"type":"auditSummary"' $file | jq '.data.vulnerabilities.low')
moderate=$(grep '"type":"auditSummary"' $file | jq '.data.vulnerabilities.moderate')
high=$(grep '"type":"auditSummary"' $file | jq '.data.vulnerabilities.high')
critical=$(grep '"type":"auditSummary"' $file | jq '.data.vulnerabilities.critical')


dependencies=$(grep '"type":"auditSummary"' $file | jq '.data.dependencies')
devDependencies=$(grep '"type":"auditSummary"' $file | jq '.data.devDependencies')
optionalDependencies=$(grep '"type":"auditSummary"' $file | jq '.data.optionalDependencies')
totalDependencies=$(grep '"type":"auditSummary"' $file | jq '.data.totalDependencies')


rows="%-22s %7s\n"
echo "---Vulnerability check by yarn summary---"
printf "\n$rows" "Dependencies:" "$dependencies"
printf "$rows" "Dev Dependencies:" "$devDependencies"
printf "$rows" "Optional Dependencies:" "$optionalDependencies"
printf "\n%22s %7s\n" "Total:" "$totalDependencies"
echo "========================================="
rows="%22s %7s\n"
printf "\n%s\n" "Vulnerabilities:"
printf "$rows" "info:" "$info"
printf "$rows" "low:" "$low"
printf "$rows" "moderate:" "$moderate"
printf "$rows" "high:" "$high"
printf "$rows" "critical:" "$critical"
echo "-----------------------------------------"
