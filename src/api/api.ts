let env = [
    'http://111.231.60.39/toc',
    'http://localhost'
];
let BaseUrl = env[1];

let UserApi = {
    login: ['/user/login', 1],
    sendCode: ['/user/sendCode', 1],
    basicInfo: ['/users/{id}/basicInfo', 0],
    updateUserInfo: ['/users/{id}', 2]
};

let TopicApi = {
    getAllTopics: ['/topics', 0],
    submitTopic: ['/topics', 1],
    addHistory: ['/topic/histories', 1],
    findAllHistory: ['/topic/histories', 0],
    addCollection: ['/topic/collections', 1],
    findCollection: ['/topic/collections/u', 0],
    findAllCollection: ['/topic/collections', 0],
    deleteCollection: ['/topic/collections/{id}', 3],
    searchTopic: ['/topics/search', 0]
};

let DiscussionApi = {
    getAllDiscussionByTopicId: ['/discussions/topicId/{topicId}', 0],
    submitDiscussion: ['/discussions', 1],
};

let UpvoteApi = {
    getUpvoteState: ['/upvotes/state', 0],
    upvote: ['/upvotes', 1]
}

export {
    BaseUrl,
    UserApi,
    TopicApi,
    DiscussionApi,
    UpvoteApi
};
