const likesRoutes = (handler) => [
  {
    method: 'PUT',
    path: '/threads/{threadId}/comments/{commentId}/likes',
    handler: handler.likeCommentHandler,
    options: {
      auth: 'forumapi_jwt',
    },
  },
];

module.exports = { likesRoutes };
