require('dotenv').config();

const Readline = require('readline');
const matcher = require('./matcher');

const rl = Readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.setPrompt('> ');
rl.prompt();
rl.on('line', async question => {
  const reply = matcher(question);

  if (reply.api) {
    console.log(reply.waiting(reply.entities));
    const data = await reply.api(reply.entities);
    console.log(reply.response(data))
  } else {
    console.log(reply.response(reply.entities));
  }

  process.exit(0);
});

