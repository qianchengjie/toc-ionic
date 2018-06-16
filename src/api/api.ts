let env = [
    'http://111.231.60.39/toc/',
    'http://localhost/'
];
let BaseUrl = env[1];

/**
 * get 0
 * post 1
 * put 2
 * delete 3
 */

const UserApi = {
    login: ['user/login', 1],
    sendCode: ['user/sendCode', 1],
    basicInfo: ['users/{id}/basicInfo', 0],
    updateUserInfo: ['/users/{id}', 2]
};

const CommentApi = {
    addComment: ['comments', 1],
    findAllByPage: ['comments/pId/{pId}', 0]
};

const TopicApi = {
    getAllTopics: ['topics', 0],
    submitTopic: ['topics', 1],
    addHistory: ['topic/histories', 1],
    findAllHistory: ['topic/histories', 0],
    addCollection: ['topic/collections', 1],
    findCollection: ['topic/collections/u', 0],
    findAllCollection: ['topic/collections', 0],
    deleteCollection: ['topic/collections/{id}', 3],
    searchTopic: ['topics/search', 0]
};

const DiscussionApi = {
    getAllDiscussionByTopicId: ['discussions/topicId/{topicId}', 0],
    submitDiscussion: ['discussions', 1],
};

const FollowApi = {
    follow: ['follows', 1],
    unfollow: ['follows/{id}', 3],
    getAllFollowed: ['follows/followed/{userId}', 0],
    getAllFollowing: ['follows/following/{userId}', 0],
    isFollow: ['isFollow', 0]
}

const UpvoteApi = {
    getUpvoteState: ['upvotes/state', 0],
    upvote: ['upvotes', 1]
}

export {
    BaseUrl,
    UserApi,
    TopicApi,
    DiscussionApi,
    UpvoteApi,
    FollowApi,
    CommentApi
};
