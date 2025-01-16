const regex = /^[\s]*(my|hi)([\s]*[+\-*/][\s]*(my|hi))*[\s]*$/
const str = ' my '
prompt('sdsd')
console.log(regex.test(str))

// ^\s*(my|hi)(\s*[+\-*/]\s*(my|hi))*\s*$
// ^\s*(my|hi)\s*([+-\/*]\s*(my|hi)\s*)*$
// ^\s*(my|hi)(?:s*([+-/*])s*(my|hi))*$
