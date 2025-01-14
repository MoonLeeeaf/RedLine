const express = require('express')
express()
.use('/', express.static('client/web'))
.listen(80)
