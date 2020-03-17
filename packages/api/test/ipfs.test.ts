/* eslint-disable @typescript-eslint/no-var-requires */
// import { BlogContent, PostContent, CommentContent } from '@subsocial/types/offchain';
import { SubsocialIpfsApi } from '../src/ipfs';
const ipfsClient = require('ipfs-http-client')
const ipfsConnect = ipfsClient({ host: '127.0.0.1', port: '5002', protocol: 'http' });
const ipfs = new SubsocialIpfsApi(ipfsConnect);

const cids = new Map();
cids.set('TEST', 'QmRrRmi6x6SaSnapfzdPENDfboUWyXwjBmCcNNj4bLpSmQ');
// const blogContent: BlogContent = {
//   name: 'Test Blog',
//   desc: 'Desc',
//   image: '',
//   tags: [ '' ]
// }

// const postContent: PostContent = {
//   title: 'Test Post',
//   body: 'Body',
//   image: '',
//   tags: [ '' ]
// }

// const commentContent: CommentContent = {
//   body: 'Comment'
// }
// test('Save blog', async () => {

//   const hash = await ipfs.saveBlog(blogContent);
//   cids.set('Blog', hash);
//   expect(typeof hash).toBe('string');
// })

// test('Save post', async () => {

//   const hash = await ipfs.savePost(postContent);
//   cids.set('Post', hash);
//   expect(typeof hash).toBe('string');
// })

// test('Save comment', async () => {

//   const hash = await ipfs.saveComment(commentContent);
//   cids.set('Comment', hash);
//   expect(typeof hash).toBe('string');
// })

// test('Find comment', async () => {

//   const struct = await ipfs.findComment(cids.get('Comment'));
//   expect(struct).toEqual(commentContent);
// })

// test('Find post', async () => {

//   const struct = await ipfs.findPost(cids.get('Post'));
//   expect(struct).toEqual(postContent);
// })

// test('Find comment', async () => {

//   const struct = await ipfs.findBlog(cids.get('Blog'));
//   expect(struct).toEqual(blogContent);
// })

test('Test finds', async () => {
  const res = await ipfs.getContentArray(['QmRrRmi6x6SaSnapfzdPENDfboUWyXwjBmCcNNj4bLpSmQ']);
  const res1 = await ipfsConnect.cat('QmRrRmi6x6SaSnapfzdPENDfboUWyXwjBmCcNNj4bLpSmQ');
  console.log(res, res1);
})
