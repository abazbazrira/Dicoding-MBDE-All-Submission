const repliesRoutes = (handler) => [
  {
    method: 'POST',
    path: '/threads/{threadId}/comments/{commentId}/replies',
    handler: handler.postRepliesHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
  {
    method: 'delete',
    path: '/threads/{threadId}/comments/{commentId}/replies/{replyId}',
    handler: handler.deleteRepliesHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = { repliesRoutes };
