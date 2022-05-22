const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const users = require('../../Interfaces/http/api/users');
const authentications = require('../../Interfaces/http/api/authentications');

const { extensionsPlugin } = require('../../Interfaces/http/extensions');

const { threadsPlugin } = require('../../Interfaces/http/api/threads');
const { commentsPlugin } = require('../../Interfaces/http/api/comments');
const { repliesPlugin } = require('../../Interfaces/http/api/replies');

const { SERVER_CONFIG, JWT_CONFIG } = require('../../Commons/helpers');

const createServer = async (container) => {
  const server = Hapi.server({
    host: SERVER_CONFIG.HOST,
    port: SERVER_CONFIG.PORT,
  });

  await server.register([{ plugin: Jwt }]);

  server.auth.strategy(
    JWT_CONFIG.AUTH_STRATEGY_NAME,
    JWT_CONFIG.AUTH_STRATEGY_SCHEME,
    JWT_CONFIG.AUTH_STRATEGY_OPTIONS
  );

  await server.register([
    {
      plugin: users,
      options: { container },
    },
    {
      plugin: authentications,
      options: { container },
    },
    {
      plugin: threadsPlugin,
      options: { container },
    },
    {
      plugin: commentsPlugin,
      options: { container },
    },
    {
      plugin: repliesPlugin,
      options: { container },
    },
  ]);

  await server.register([{ plugin: extensionsPlugin }]);

  return server;
};

module.exports = createServer;
