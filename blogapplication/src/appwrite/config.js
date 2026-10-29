import conf from "../conf/conf";
import { Client, TablesDB, ID, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  tablesDB;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appWriteUrl)
      .setProject(conf.appWriteProjectId);

    this.tablesDB = new TablesDB(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appWriteDataBaseId,
        tableId: conf.appWriteCollectionId,
        rowId: slug,
        data: { title, content, featuredImage, status, userId },
      });
    } catch (error) {
      console.error("Appwrite service :: createPost ::", error);
      throw error;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appWriteDataBaseId,
        tableId: conf.appWriteCollectionId,
        rowId: slug,
        data: { title, content, featuredImage, status },
      });
    } catch (error) {
      console.error("Appwrite service :: updatePost ::", error);
      throw error;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appWriteDataBaseId,
        tableId: conf.appWriteCollectionId,
        rowId: slug,
      });
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost ::", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appWriteDataBaseId,
        tableId: conf.appWriteCollectionId,
        rowId: slug,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal(["status", "active"])]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appWriteDataBaseId,
        tableId: conf.appWriteCollectionId,
        queries,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async uploadFile(file) {
    try {
      return await this.bucket.createFile({
        bucketId: conf.appWritebucketId,
        fileId: ID.unique(),
        file: file,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      return await this.bucket.deleteFile({
        bucketId: conf.appWritebucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getFilePreview(fileId) {
    try {
      return this.bucket.getFilePreview({
        bucketId: conf.appWritebucketId,
        fileId: fileId,
      });
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

const service = new Service();

export default service;
