'use strict'

const co = require('co')
const cli = require('heroku-cli-util')
const {Dyno} = require('heroku-run')

function * run (context, heroku) {
  let opts = {
    heroku: heroku,
    app: context.app,
    command: `mkdir vim
    curl https://s3.amazonaws.com/heroku-vim/vim-7.3.tar.gz --location --silent | tar xz -C vim
      export PATH=$PATH:/app/vim/bin
      export VIMRUNTIME=/app/vim/share/vim/vim73
    bash`,
    env: context.flags.env,
    showStatus: false,
    attach: true
  }
  if (!opts.command) throw new Error('Usage: heroku run COMMAND\n\nExample: heroku run bash')

  let dyno = new Dyno(opts)
  yield dyno.start()
}

const vim = {
  topic: 'vim',
  needsAuth: true,
  needsApp: true,
  run: cli.command(co.wrap(run))
}

exports.commands = [
  vim
]
