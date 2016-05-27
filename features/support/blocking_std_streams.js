// Set blocking writes on stderr and stdout to prevent cucumber pretty formatter from getting
// truncated on failure.
// see https://github.com/nodejs/node/issues/6456

/*eslint-disable*/
[process.stdout, process.stderr].forEach((s) => {
  s && s.isTTY && s._handle && s._handle.setBlocking &&
    s._handle.setBlocking(true)
})
