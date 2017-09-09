module.exports = {
  get: function(props) {
    return {
      "url": props.url,
      "adminUrl": `${props.url}/admin`,
      "mail": {
        "transport": "SMTP",
        "options": {
          "service": "Mailgun",
          "auth": {
            "user": props.mail.user,
            "pass": props.mail.pass
          }
        }
      },
      "database": {
        "client": "mysql",
        "connection": {
          "host": props.database.host,
          "user": props.database.user,
          "password": props.database.pass,
          "database": props.database.name
        },
        "debug": "true"
      },
      "server": {
        "host": props.server.host,
        "port": props.server.port
      },
      "paths": {
        "contentPath": props.content
      }
    }
  }
}

