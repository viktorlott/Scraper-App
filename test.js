function shortid() {
    return new Date().getTime() * Math.random() >>> 10
}

console.log(shortid())