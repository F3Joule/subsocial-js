import { BlogId, PostId, CommentId, Blog, Post, Comment } from '@subsocial/types/interfaces';
import { getFirstOrUndefinded } from './utils';
import { ApiPromise as SubstrateApi } from '@polkadot/api';
import { Option } from '@polkadot/types';

export type SubstrateId = BlogId | PostId | CommentId;

export type CommonStruct = Blog | Post | Comment;

export class SubsocialSubstrateApi {

  private api: SubstrateApi // Polkadot Api (connected)

  constructor (api: SubstrateApi) {
    this.api = api
    console.log('Created SubsocialSubstrateApi instance')
  }

  socialQuery = () => this.api.query.social;

  // ---------------------------------------------------------------------
  // Multiple

  async findStructs<T extends CommonStruct> (ids: SubstrateId[], methodName: string): Promise<T[]> {
    const optionStruct = await this.socialQuery()[methodName].multi(ids) as Option<T>[];
    const optionFillStruct = optionStruct.filter(x => x.isSome);
    return optionFillStruct.map(x => x.unwrap()) as T[];
  }

  async findBlogs (ids: SubstrateId[]): Promise<Blog[]> {
    return this.findStructs(ids, 'blogById');
  }

  async findPosts (ids: SubstrateId[]): Promise<Post[]> {
    return this.findStructs(ids, 'postById');
  }

  async findComments (ids: SubstrateId[]): Promise<Comment[]> {
    return this.findStructs(ids, 'commentById');
  }

  async findStructsAndSubscribe<T extends CommonStruct> (methodName: string, args: SubstrateId[]): Promise<T[]> {
    const optionStruct = await this.socialQuery()[methodName].multi(args) as Option<T>[];
    return optionStruct.filter(x => x.isSome).map(x => x.unwrapOr(undefined)) as T[];
  }

  // ---------------------------------------------------------------------
  // Single

  async findBlog (id: SubstrateId): Promise<Blog | undefined> {
    return getFirstOrUndefinded(await this.findBlogs([ id ]))
  }

  async findPost (id: SubstrateId): Promise<Post | undefined> {
    return getFirstOrUndefinded(await this.findPosts([ id ]))
  }

  async findComment (id: SubstrateId): Promise<Comment | undefined> {
    return getFirstOrUndefinded(await this.findComments([ id ]))
  }
}
