import axios from "axios";

const URI = "api/posts/";

class PostService {
  //load post
  static getPosts() {
    return new Promise((resolve, reject) => {
      axios
        .get(URI)
        .then(res => {
          const data = res.data;
          resolve(
            data.map(post => ({
              ...post,
              createdAt: new Date(post.createdAt)
            }))
          );
        })
        .catch(err => {
          reject(err);
        });
    });
  }
  //insert posts
  static insertPost(text) {
    return axios.post(URI, {
      text
    });
  }

  //delete posts
  static deletePost(id) {
    return axios.delete(`${URI}${id}`);
  }
}

export default PostService;
